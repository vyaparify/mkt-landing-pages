import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Check, Shield, Zap, Users, Award, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackViewContent, trackInitiateCheckout } from "@/lib/tracking";
import logo from "@assets/logo.svg";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const planFeatures = [
  "Professional Business Website",
  "AI-Powered Chatbot Integration",
  "Google Top SEO Setup",
  "Lead Capture Form",
  "WhatsApp Integration",
  "Mobile-Responsive Design",
  "SSL Security Certificate",
  "24/7 Technical Support",
  "Free Vyaparify Domain & Hosting",
  "Regular Updates & Maintenance",
];

const price = 7999;

export default function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    trackViewContent('Checkout Page', price);
  }, []);

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

  const handlePayNow = async () => {
    setIsProcessing(true);
    trackInitiateCheckout(price);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load payment gateway");
      }

      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          customerInfo: {},
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Vyaparify",
        description: "Vyaparify Premium - Annual Subscription",
        order_id: order.orderId,
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
              // Track Meta Pixel Purchase event
              if (typeof (window as any).fbq === 'function') {
                (window as any).fbq('track', 'Purchase', {
                  value: price,
                  currency: 'INR',
                  content_name: 'Vyaparify Premium',
                });
              }

              await fetch("/api/submissions/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  fullName: "Checkout User",
                  email: "checkout@vyaparify.com",
                  phone: "0000000000",
                  amount: price,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  status: "success",
                  source: "checkout",
                }),
              });
              window.location.href = `/thankyou?txn=${response.razorpay_payment_id}&amount=${price.toLocaleString()}`;
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
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

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
                    <p className="text-3xl font-bold text-primary">₹{price.toLocaleString()}</p>
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

                <div className="pt-6 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total Amount</span>
                    <span className="text-3xl font-bold text-primary">₹{price.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4">
                <p className="w-full text-center font-bold text-orange-800">
                  Get started with Vyaparify Premium today!
                </p>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="order-1 lg:order-2 space-y-4"
          >
            {/* Social Proof Banner */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-green-900">30 people viewing this offer</p>
                  <p className="text-green-700 text-sm">Join 247+ businesses that chose Vyaparify this month</p>
                </div>
              </div>
            </div>

            {/* Security & Speed Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                </div>
                <p className="font-bold text-gray-900">Bank-Grade Security</p>
                <p className="text-gray-600 text-sm">SSL Encrypted Payment</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <p className="font-bold text-purple-900">Instant Activation</p>
                <p className="text-purple-600 text-sm">Website live in 24hrs</p>
              </div>
            </div>

            {/* Professional Service Guarantee */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="font-bold text-green-900 text-center text-lg">Professional Service Guarantee</p>
              <p className="text-green-700 text-sm text-center mt-1">24/7 support, and proven AI technology for your success</p>
            </div>

            {/* Technical Guarantee */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-blue-900">3-Month Technical Guarantee</p>
                  <p className="text-blue-700 text-sm">100% refund for technical failures</p>
                </div>
              </div>
            </div>

            {/* Total Amount & Payment */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">Total Amount (Inclusive of all taxes):</p>
                  <p className="text-muted-foreground text-sm">No hidden charges • GST included</p>
                </div>
                <p className="text-3xl font-bold text-primary">₹{price.toLocaleString()}</p>
              </div>

              <Button 
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-xl"
                data-testid="button-buy-now"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay ₹{price.toLocaleString()} Securely
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <Shield className="w-4 h-4" />
                <span>Secured by Razorpay • 100% Safe Payment</span>
              </div>

              <p className="text-center text-xs text-muted-foreground pt-2">
                By proceeding, you agree to our{" "}
                <a href="https://id.vyaparify.com/terms-conditions" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Terms</a>
                {" "}and{" "}
                <a href="https://id.vyaparify.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Privacy Policy</a>.
                {" "}Your payment is processed securely through Razorpay.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
