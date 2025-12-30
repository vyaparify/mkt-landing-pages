import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, MessageCircle, ShoppingBag, Smartphone, Store, TrendingUp, ShieldCheck, Globe, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Assets
import heroImage from "@assets/generated_images/professional_indian_shop_owner_digital_business.png";
import appImage from "@assets/generated_images/vyaparify_mobile_app_interface.png";
import mapImage from "@assets/generated_images/local_customers_map_concept_3d_render.png";

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white p-2 rounded-lg shadow-lg shadow-primary/20">
              <Store className="w-6 h-6" />
            </div>
            <span className="font-heading font-bold text-2xl text-foreground tracking-tight">Vyaparify</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Solutions</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Platform</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Success Stories</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hidden sm:block text-sm font-semibold text-foreground hover:text-primary">Log In</a>
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 rounded-lg px-6 h-10">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-100/30 -skew-x-12 translate-x-1/4 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 mb-6 text-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm">Trusted by 50,000+ Businesses</span>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-heading font-bold text-foreground leading-[1.1] mb-6 tracking-tight">
                Digital Power for <br />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Local Business</span>
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Stop competing, start dominating. Vyaparify gives your local shop the professional digital identity, tools, and reach to grow in the modern economy.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-lg rounded-xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 font-semibold">
                  Start Your Growth
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-2 hover:bg-blue-50 hover:text-primary hover:border-primary/20 font-semibold text-muted-foreground">
                  <BarChart3 className="mr-2 w-5 h-5" />
                  View Live Demo
                </Button>
              </motion.div>
              
              <motion.div variants={fadeIn} className="mt-10 flex items-center gap-6 border-t border-border/60 pt-6">
                <div>
                  <p className="text-2xl font-bold text-foreground">2M+</p>
                  <p className="text-sm text-muted-foreground">Orders Processed</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-2xl font-bold text-foreground">₹50Cr</p>
                  <p className="text-sm text-muted-foreground">Business Generated</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl -z-10 transform rotate-3" />
              <img 
                src={heroImage} 
                alt="Professional Shop Owner" 
                className="rounded-2xl shadow-2xl border-4 border-white object-cover w-full h-[600px] hover:scale-[1.01] transition-transform duration-500"
              />
              
              {/* Floating Cards - More Professional Look */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-8 -left-8 bg-white p-5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border/50 max-w-[240px]"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-100 p-2.5 rounded-lg text-primary">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Weekly Growth</p>
                    <p className="font-heading font-bold text-xl text-foreground">+24.5%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md w-fit">
                  <TrendingUp className="w-3 h-3" />
                  <span>Outperforming local average</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section - Professional Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-heading font-bold mb-4 text-foreground">Is Your Business Falling Behind?</h2>
            <p className="text-muted-foreground text-lg">
              The retail landscape is changing. Traditional methods are no longer enough to compete with big marketplaces.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                color: "text-red-600",
                bg: "bg-red-50",
                title: "Complexity Barrier",
                desc: "Technical hurdles and complex systems preventing you from adopting modern tools."
              },
              {
                icon: Globe,
                color: "text-blue-600",
                bg: "bg-blue-50",
                title: "Limited Reach",
                desc: "Restricted to walk-in customers while your competitors are capturing the online market."
              },
              {
                icon: Users,
                color: "text-orange-600",
                bg: "bg-orange-50",
                title: "Marketplace Dependency",
                desc: "Losing brand identity and profits to high commissions on aggregator platforms."
              }
            ].map((item, i) => (
              <Card key={i} className="border border-border shadow-sm hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section 1: Dashboard/Tech */}
      <section className="py-24 overflow-hidden bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-blue-200 rounded-3xl blur-3xl opacity-30 transform scale-90 group-hover:scale-100 transition-transform duration-700" />
              <img 
                src={appImage} 
                alt="Vyaparify App Interface" 
                className="relative z-10 rounded-3xl shadow-2xl border border-border/50 mx-auto w-full max-w-md transform group-hover:-translate-y-2 transition-transform duration-500"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-primary font-semibold text-sm mb-6">
                Enterprise Grade Simplicity
              </div>
              <h2 className="text-4xl font-heading font-bold mb-6">Sophisticated Tech, <br />Simple Experience</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Vyaparify distills complex ecommerce technology into a simple, powerful mobile command center for your business.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Zero-Code Setup", desc: "Launch your professional storefront in under 5 minutes." },
                  { title: "Smart Inventory", desc: "Automated stock tracking and low-inventory alerts." },
                  { title: "Instant Orders", desc: "Real-time notifications directly on your smartphone." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center text-primary shrink-0 shadow-sm">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section 2: Growth */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-6">
                Hyper-Local Domination
              </div>
              <h2 className="text-4xl font-heading font-bold mb-6">Capture Your <br />Local Market</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't get lost in the global noise. Vyaparify optimizes your presence for high-intent local customers looking for you right now.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Card className="bg-blue-50/50 border-blue-100">
                  <CardContent className="p-5">
                    <MessageCircle className="w-6 h-6 text-primary mb-3" />
                    <h4 className="font-bold mb-1">Direct Connect</h4>
                    <p className="text-sm text-muted-foreground">Seamless WhatsApp integration for direct customer relationships.</p>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50/50 border-orange-100">
                  <CardContent className="p-5">
                    <MapPin className="w-6 h-6 text-orange-600 mb-3" />
                    <h4 className="font-bold mb-1">Local SEO</h4>
                    <p className="text-sm text-muted-foreground">Auto-optimized to appear in "Near Me" searches.</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-orange-100 rounded-3xl blur-3xl opacity-40 transform scale-95" />
              <img 
                src={mapImage} 
                alt="Local Market Dominance" 
                className="relative z-10 rounded-2xl shadow-2xl border-4 border-white w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section - Clean Tabs Style */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Engineered for Indian Retail</h2>
            <p className="text-muted-foreground">Specialized modules for every retail sector.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: ShoppingBag, label: "Kirana & Marts" },
              { icon: Smartphone, label: "Electronics" },
              { icon: Store, label: "Fashion & Apparel" },
              { icon: ShieldCheck, label: "Pharmacy" },
              { icon: TrendingUp, label: "Stationery" },
            ].map((item, i) => (
              <Button 
                key={i}
                variant="outline"
                className="h-auto py-4 px-8 bg-white hover:bg-white hover:border-primary text-base font-medium rounded-xl border-border shadow-sm hover:shadow-md hover:text-primary transition-all"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Professional */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-foreground rounded-3xl p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-20 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
                Build Your Legacy Online
              </h2>
              <p className="text-xl text-gray-400 mb-10">
                Join the fastest growing network of digitized local businesses. Start your 14-day free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-10 text-lg rounded-xl font-bold shadow-xl shadow-primary/20">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-gray-700 text-white hover:bg-white/5 hover:text-white hover:border-white h-14 px-10 text-lg rounded-xl font-bold">
                  Schedule Demo
                </Button>
              </div>
              <div className="mt-10 flex items-center justify-center gap-8 text-gray-500 text-sm font-medium">
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> No credit card needed</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Cancel anytime</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary text-white p-2 rounded-lg">
                  <Store className="w-5 h-5" />
                </div>
                <span className="font-heading font-bold text-2xl text-foreground">Vyaparify</span>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                The complete digital operating system for modern Indian retail businesses. Simple, powerful, and built for growth.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-foreground">Platform</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Solutions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Hardware</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-foreground">Company</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Vyaparify Technologies Pvt Ltd. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}