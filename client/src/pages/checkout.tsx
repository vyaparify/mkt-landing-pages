import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, Lock, ShieldCheck, ShoppingCart, Info, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import logo from "@assets/logo.svg";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const planFeatures = [
  "AI Talking Website (24/7 Sales)",
  "Higher Google Rankings",
  "Complete Lead Management Dashboard",
  "Free Vyaparify Domain & Hosting Included",
];

const originalPrice = 7999;
const discountPercent = 20;
const discountAmount = Math.round(originalPrice * discountPercent / 100);
const discountedPrice = originalPrice - discountAmount;

export default function Checkout() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load payment gateway");
      }

      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: discountedPrice,
          customerInfo: values,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Vyaparify",
        description: "Vyaparify Premium - Annual Subscription",
        order_id: order.id,
        prefill: {
          name: values.fullName,
          email: values.email,
          contact: values.phone,
        },
        theme: {
          color: "#F97316",
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyRes.ok) {
              window.location.href = `/thankyou?txn=${response.razorpay_payment_id}&amount=${discountedPrice.toLocaleString()}`;
            } else {
              window.location.href = `/payment-failed?order=${response.razorpay_order_id}&error=verification_failed`;
            }
          } catch (error) {
            window.location.href = `/payment-failed?order=${response.razorpay_order_id}&error=verification_error`;
          }
          setIsProcessing(false);
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            window.location.href = `/payment-failed?error=cancelled`;
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/retail-local-shops" className="flex items-center gap-2">
            <img src={logo} alt="Vyaparify" className="h-8 w-auto" />
          </a>
          <a href="/retail-local-shops" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="order-2 lg:order-1"
          >
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-orange-500 h-2" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Order Summary</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-start pb-6 border-b">
                  <div>
                    <h3 className="font-bold text-xl">Vyaparify Premium</h3>
                    <p className="text-muted-foreground">Annual Subscription Plan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground line-through">₹{originalPrice.toLocaleString()}</p>
                    <p className="text-3xl font-bold text-primary">₹{discountedPrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {planFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-blue-800 text-sm">
                      Your subscription will automatically activate immediately after payment. You'll receive login details via email/SMS.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total Amount</span>
                    <span className="text-3xl font-bold text-primary">₹{discountedPrice.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4">
                <p className="w-full text-center font-bold text-orange-800">
                  🎉 YOU ARE SAVING {discountPercent}% (₹{discountAmount.toLocaleString()}) TODAY!
                </p>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Your Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your name" 
                              {...field} 
                              className="h-12"
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your email" 
                              type="email"
                              {...field} 
                              className="h-12"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your phone number" 
                              type="tel"
                              {...field} 
                              className="h-12"
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-xl" 
                      disabled={isProcessing}
                      data-testid="button-pay-now"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Pay ₹{discountedPrice.toLocaleString()} Securely</>
                      )}
                    </Button>
                    
                    <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Secured by Razorpay • 100% Safe Payment</span>
                    </div>

                    <p className="text-center text-xs text-muted-foreground pt-4 border-t">
                      By proceeding, you agree to our Terms of Service and Privacy Policy. 
                      Your payment is processed securely through Razorpay.
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
