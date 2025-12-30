import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, MessageCircle, ShoppingBag, Smartphone, Store, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Assets
import heroImage from "@assets/generated_images/shop_owner_using_smartphone_in_retail_store.png";
import mapImage from "@assets/generated_images/local_customers_map_concept_3d_render.png";
import mobileImage from "@assets/generated_images/simple_mobile_interface_for_accepting_orders.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <Store className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">DukaanOnline</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">How it Works</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Stories</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hidden sm:block text-sm font-medium text-foreground hover:text-primary">Login</a>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-full px-6">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/50 -skew-x-12 translate-x-1/4 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-border shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">Trusted by 10,000+ local shops</span>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] mb-6">
                Online Selling Made <span className="text-primary">Simple</span> for Local Shops
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                No technical knowledge needed. Works like WhatsApp. capture orders from nearby customers and grow your business today.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25">
                  Create Shop in 2 Mins
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-secondary/50">
                  <MessageCircle className="mr-2 w-5 h-5 text-green-600" />
                  Chat on WhatsApp
                </Button>
              </motion.div>
              
              <motion.div variants={fadeIn} className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-gray-200" />
                  ))}
                </div>
                <p>Join other shop owners in your area</p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2rem] blur-3xl -z-10 transform rotate-3" />
              <img 
                src={heroImage} 
                alt="Happy shop owner using smartphone" 
                className="rounded-[2rem] shadow-2xl border-4 border-white object-cover w-full h-[600px] hover:scale-[1.02] transition-transform duration-500"
              />
              
              {/* Floating Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-border max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">New Order</p>
                    <p className="font-bold">₹1,250.00</p>
                  </div>
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-green-500 rounded-full" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Going Online Feels Complicated?</h2>
            <p className="text-muted-foreground text-lg">
              Most shop owners worry about technology, costs, and finding customers. We solved that.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-secondary/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Too Technical?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Apps, English menus, and confusing dashboards make online selling feel like a headache.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-secondary/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Where are Customers?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  "If I make an online shop, who will find it?" You don't need nationwide buyers, you need locals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-secondary/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Too Expensive?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  High commissions and expensive ads eat into your profits. You need a better way.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section 1: Simplicity */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 transform scale-90" />
              <img 
                src={mobileImage} 
                alt="Simple mobile interface" 
                className="relative z-10 rounded-[2.5rem] shadow-2xl border-8 border-white mx-auto max-w-sm w-full"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6">
                Zero Tech Skills Needed
              </div>
              <h2 className="text-4xl font-heading font-bold mb-6">Simple Enough for <br />Anyone to Use</h2>
              <p className="text-lg text-muted-foreground mb-8">
                If you can take an order at the counter, you can take it online. We stripped away all the confusing buttons.
              </p>
              
              <ul className="space-y-4">
                {[
                  "No technical knowledge needed",
                  "Works just like WhatsApp",
                  "Set up your catalog in minutes",
                  "Receive orders instantly on your phone"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section 2: Local Customers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-6">
                Get Found Locally
              </div>
              <h2 className="text-4xl font-heading font-bold mb-6">Customers From Your <br />Local Area</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your shop shows up in local online searches. Nearby customers can easily find and contact you directly.
              </p>
              
              <div className="bg-secondary/30 p-6 rounded-2xl mb-8 border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-green-600">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Share on WhatsApp</h4>
                    <p className="text-sm text-muted-foreground">Send your shop link to customers. They browse, you deliver.</p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-orange-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Local Visibility</h4>
                    <p className="text-sm text-muted-foreground">Real people near you, not empty internet traffic.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-orange-100 rounded-full blur-3xl opacity-50 transform scale-90" />
              <img 
                src={mapImage} 
                alt="Local customers map" 
                className="relative z-10 rounded-3xl shadow-2xl border-4 border-white w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Perfect for Your Business</h2>
            <p className="text-muted-foreground">Tailored for the needs of Indian retail shops.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: ShoppingBag, label: "Kirana" },
              { icon:  Smartphone, label: "Electronics" },
              { icon: Store, label: "Apparel" },
              { icon: Zap, label: "Pharmacy" },
              { icon: TrendingUp, label: "Stationery" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm text-center border border-border hover:border-primary/50 transition-colors cursor-default"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground">{item.label}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[2.5rem] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent opacity-20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
                Ready to take your shop online?
              </h2>
              <p className="text-xl text-white/80 mb-10">
                Join thousands of shop owners growing their business with DukaanOnline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 text-lg rounded-full font-bold shadow-xl">
                  Start for Free
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 h-14 px-10 text-lg rounded-full font-bold">
                  View Demo
                </Button>
              </div>
              <p className="mt-6 text-white/60 text-sm">No credit card required • Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary text-white p-1.5 rounded-lg">
                  <Store className="w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-xl">DukaanOnline</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Empowering local businesses with simple, effective tools to sell online and grow locally.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Showcase</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Community</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 DukaanOnline. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}