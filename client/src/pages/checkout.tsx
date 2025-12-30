import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Check, CreditCard, Loader2, Lock, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Schema for form validation
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  businessName: z.string().min(2, "Business name is required"),
  paymentMethod: z.enum(["upi", "card"]),
});

export default function Checkout() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      paymentMethod: "upi",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2); // Move to success state
      toast({
        title: "Order Placed Successfully!",
        description: "Welcome to Vyaparify. Check your email for next steps.",
      });
    }, 2000);
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for choosing Vyaparify. Your account has been created successfully.
          </p>
          <div className="bg-secondary/50 p-4 rounded-xl mb-8 text-left text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-bold">₹2,499.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono">VYAP-{Math.floor(Math.random() * 100000)}</span>
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => window.location.href = "/"}>
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/attached_assets/logo.svg" alt="Vyaparify" className="h-8 w-auto" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">Complete your purchase</h1>
              <p className="text-muted-foreground">Enter your details to get started with Vyaparify.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                      Personal Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
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
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="My Awesome Shop" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border p-4 hover:bg-secondary/20 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 transition-all">
                                <FormControl>
                                  <RadioGroupItem value="upi" />
                                </FormControl>
                                <div className="flex-1 flex items-center justify-between">
                                  <FormLabel className="font-normal cursor-pointer flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-muted-foreground" />
                                    UPI / QR Code
                                  </FormLabel>
                                  <div className="flex gap-1">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4 opacity-70" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="GPay" className="h-4 opacity-70" />
                                  </div>
                                </div>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border p-4 hover:bg-secondary/20 cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 transition-all">
                                <FormControl>
                                  <RadioGroupItem value="card" />
                                </FormControl>
                                <div className="flex-1 flex items-center justify-between">
                                  <FormLabel className="font-normal cursor-pointer flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                                    Credit / Debit Card
                                  </FormLabel>
                                  <div className="flex gap-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-3 opacity-70" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3 opacity-70" />
                                  </div>
                                </div>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay ₹2,499 & Get Started"
                  )}
                </Button>
                
                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Payments are 100% secure and encrypted
                </p>
              </form>
            </Form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Card className="bg-gray-50/50 border-2">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Review your plan details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Store className="w-8 h-8" /> {/* Using Store icon as fallback if Image is not imported yet, but I'll import it */}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Vyaparify Premium</h3>
                      <p className="text-sm text-muted-foreground">Annual Plan</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Custom Domain Name</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Unlimited Products</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>0% Commission</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>WhatsApp Integration</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹4,999.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount (50% OFF)</span>
                      <span>-₹2,500.00</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-2xl text-primary">₹2,499.00</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-secondary/30 border-t p-4 rounded-b-xl">
                  <p className="text-xs text-muted-foreground leading-relaxed text-center w-full">
                    By confirming your payment, you agree to our Terms of Service and Privacy Policy. 30-day money-back guarantee.
                  </p>
                </CardFooter>
              </Card>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-4 grayscale opacity-60">
                {/* Placeholders for trust badges if needed, currently just text/icon mockup */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Import Store icon which I used in the component
import { Store } from "lucide-react";