import { useEffect } from "react";
import { motion } from "framer-motion";
import { XCircle, RefreshCw, Phone, Mail, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@assets/logo.svg";

export default function PaymentFailed() {
  useEffect(() => {
    document.title = "Payment Failed | Vyaparify";
  }, []);

  const params = new URLSearchParams(window.location.search);
  const errorCode = params.get("error") || "";
  const orderId = params.get("order") || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 font-sans">
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
            className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-red-200"
          >
            <XCircle className="w-12 h-12 text-white" strokeWidth={2} />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Failed
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            We couldn't process your payment. Don't worry, no amount has been deducted from your account.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-left"
          >
            <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Common Reasons for Payment Failure
            </h4>
            <ul className="text-amber-800 text-sm space-y-2">
              <li>• Insufficient balance in your account</li>
              <li>• Card details entered incorrectly</li>
              <li>• Transaction declined by your bank</li>
              <li>• Network connectivity issues</li>
              <li>• Payment session expired</li>
            </ul>
          </motion.div>

          {(errorCode || orderId) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8 text-left text-sm"
            >
              {orderId && (
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Order Reference</span>
                  <span className="font-mono text-gray-600">{orderId}</span>
                </div>
              )}
              {errorCode && (
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Error Code</span>
                  <span className="font-mono text-gray-600">{errorCode}</span>
                </div>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <Button
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-xl"
              onClick={() => window.location.href = "/checkout"}
              data-testid="button-try-again"
            >
              <RefreshCw className="mr-2 w-5 h-5" />
              Try Again
            </Button>

            <a
              href="/retail-local-shops"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-back-home"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-muted-foreground mb-3">
              If amount was deducted, contact us immediately
            </p>
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
