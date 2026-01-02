import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackPurchase } from "@/lib/tracking";
import logo from "@assets/logo.svg";

export default function ThankYou() {
  const params = new URLSearchParams(window.location.search);
  const transactionId = params.get("txn") || "";
  const amount = params.get("amount") || "6,399";
  const numericAmount = parseInt(amount.replace(/,/g, '')) || 6399;

  useEffect(() => {
    document.title = "Payment Successful | Vyaparify";
    trackPurchase(numericAmount, transactionId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 font-sans">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center">
          <img src={logo} alt="Vyaparify" className="h-8 w-auto" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200"
          >
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for choosing Vyaparify. Your subscription is now active and ready to use.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8"
          >
            <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">Vyaparify Premium (Annual)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-bold text-green-600">₹{amount}</span>
              </div>
              {transactionId && (
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="font-mono text-sm text-gray-600">{transactionId}</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 text-left"
          >
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              What's Next?
            </h4>
            <ul className="text-blue-800 text-sm space-y-2">
              <li>• Check your email for login credentials</li>
              <li>• Our team will contact you within 24 working hours for onboarding</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <Button
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-xl"
              onClick={() => window.location.href = "https://id.vyaparify.com/register?utm_source=metagoogle&utm_medium=landing&utm_campaign=retail-local-shops&utm_id=vrpl1225"}
              data-testid="button-get-started"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <a
              href="/retail-local-shops"
              className="inline-block text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-back-home"
            >
              Back to Home
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-muted-foreground mb-3">Need help? Contact us</p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <a href="mailto:support@vyaparify.com" className="flex items-center gap-2 text-primary hover:underline">
                <Mail className="w-4 h-4" />
                support@vyaparify.com
              </a>
              <a href="tel:+918818881628" className="flex items-center gap-2 text-primary hover:underline">
                <Phone className="w-4 h-4" />
                +91 88188 81628
              </a>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
