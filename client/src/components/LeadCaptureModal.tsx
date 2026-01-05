import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";


interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

export function LeadCaptureModal({ isOpen, onClose, source = "retail-local-shops" }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; mobile?: string; email?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, ""))) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const leadResponse = await fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.mobile,
          source,
        }),
      });
      
      if (!leadResponse.ok) {
        throw new Error("Failed to capture lead");
      }
      
      const leadData = await leadResponse.json();
      
      // Track Meta Pixel Lead event on form submission with user data
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Vyaparify Premium',
          content_category: source,
          value: 7999,
          currency: 'INR',
          email: formData.email.toLowerCase().trim(),
          phone: '+91' + formData.mobile.replace(/\s/g, ''),
          first_name: formData.name.split(' ')[0]?.toLowerCase().trim(),
          last_name: formData.name.split(' ').slice(1).join(' ')?.toLowerCase().trim() || '',
        });
      }
      
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 7999,
          customerInfo: {
            fullName: formData.name,
            email: formData.email,
            phone: formData.mobile,
          },
          leadId: leadData.id,
        }),
      });
      
      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }
      
      const orderData = await orderResponse.json();
      
      if (!(window as any).Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }
      
      const options: RazorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Vyaparify",
        description: "Vyaparify Premium Annual Plan",
        order_id: orderData.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#FF6B00",
        },
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                leadId: leadData.id,
              }),
            });
            
            if (verifyResponse.ok) {
              // Track Meta Pixel Purchase event on successful payment
              if (typeof (window as any).fbq === 'function') {
                (window as any).fbq('track', 'Purchase', {
                  content_name: 'Vyaparify Premium Annual',
                  content_category: source,
                  value: 7999,
                  currency: 'INR',
                });
              }
              window.location.href = `/thank-you?payment_id=${response.razorpay_payment_id}&name=${encodeURIComponent(formData.name)}`;
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch {
            alert("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };
      
      const RazorpayConstructor = (window as any).Razorpay;
      const rzp = new RazorpayConstructor(options);
      rzp.open();
      
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="lead-capture-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Start Your Online Journey
          </DialogTitle>
          <p className="text-center text-muted-foreground mt-2">
            Enter your details to get started with Vyaparify
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              data-testid="input-lead-name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              data-testid="input-lead-mobile"
              placeholder="Enter 10-digit mobile number"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
              className={errors.mobile ? "border-red-500" : ""}
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              data-testid="input-lead-email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          
          <Button
            type="submit"
            data-testid="button-submit-lead"
            className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Continue to Payment - ₹7,999"
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
