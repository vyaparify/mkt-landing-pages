import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, MessageCircle, Phone, TrendingUp, Zap, Calendar, Star, Clock, ShoppingBag, Instagram, MessageSquare, ShoppingCart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";

import heroImage from "@assets/generated_images/indian_shop_owner_businessman_using_smartphone.png";
import mapImage from "@assets/generated_images/local_business_visibility_3d_illustration.png";
import dashboardImage from "@assets/screencapture-id-vyaparify-admin-beta-dashboard-2025-12-11-14__1767084671886.png";
import logo from "@assets/logo.svg";
import caseStudyAI from "@assets/Screenshot_2025-12-30_at_6.33.47_PM_1767099854878.png";
import caseStudyGoogle from "@assets/Screenshot_2025-12-30_at_6.33.55_PM_1767099854890.png";
import caseStudyDashboard from "@assets/Screenshot_2025-12-30_at_6.34.03_PM_1767099854890.png";
import avatar1 from "@assets/generated_images/indian_businessman_portrait_headshot.png";
import avatar2 from "@assets/generated_images/indian_woman_entrepreneur_headshot.png";
import avatar3 from "@assets/generated_images/indian_shopkeeper_man_headshot.png";
import avatar4 from "@assets/generated_images/young_indian_businessman_headshot.png";

const avatars = [avatar1, avatar2, avatar3, avatar4];

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

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function EcommerceD2C() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/hello-vyaparify/new-meeting' });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">

        <nav className="bg-background/80 backdrop-blur-md border-b border-border/40 w-full">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Vyaparify" className="h-8 w-auto" />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
            </div>

            <div className="flex items-center gap-4">
            </div>
          </div>
        </nav>
      </div>

      <section className="pt-40 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
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
                <span className="text-sm font-medium text-muted-foreground">Trusted by 15,000+ online sellers & D2C brands</span>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] mb-6">
                Online Selling Made <span className="text-primary">Simple</span> for D2C & Online Brands
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                No technical knowledge needed. Launch your online store, accept direct orders, and grow your brand — without marketplaces or high commissions.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 items-start">
                <a href="https://id.vyaparify.com/register?utm_source=metagoogle&utm_medium=landing&utm_campaign=ecommerce-d2c&utm_id=ved1225">
                  <Button size="lg" className="h-16 px-10 text-xl font-bold rounded-full bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 transform hover:scale-105 transition-all duration-200">
                    Create Your Store in 2 Mins
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </a>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="h-12 px-6 text-base rounded-full border border-muted-foreground/30 text-muted-foreground hover:text-foreground hover:border-foreground/50 hover:bg-transparent"
                  onClick={openCalendly}
                >
                  <Calendar className="mr-2 w-4 h-4" />
                  Book a Demo
                </Button>
              </motion.div>
              
              <motion.p variants={fadeIn} className="text-sm text-muted-foreground mt-3">
                No credit card required. Free setup.
              </motion.p>
              
              <motion.div variants={fadeIn} className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {avatars.map((avatar, i) => (
                    <img key={i} src={avatar} alt={`Customer ${i + 1}`} className="w-8 h-8 rounded-full border-2 border-background object-cover" />
                  ))}
                </div>
                <p>Join other D2C brands growing online</p>
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
                alt="Happy online seller using smartphone" 
                className="rounded-[2rem] shadow-2xl border-4 border-white object-cover w-full h-[600px] hover:scale-[1.02] transition-transform duration-500"
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-border max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">New Order</p>
                    <p className="font-bold">₹2,499 Received</p>
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

      <section className="py-12 bg-white border-y border-border overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold font-heading mb-2">Trusted by Leading Banks & Payment Partners</h3>
            <p className="text-muted-foreground text-sm">Bank-Grade Security & Compliance</p>
          </div>
          
          <div className="relative w-full">
            <div className="flex animate-marquee">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex shrink-0">
                  <div className="mx-4 p-4 flex items-center justify-center h-24 w-48 border rounded-xl bg-white">
                    <img 
                      src="https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/68455df884f7dbb961db9102_1.png" 
                      alt="HDFC Bank" 
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="mx-4 p-4 flex items-center justify-center h-24 w-48 border rounded-xl bg-white">
                    <img 
                      src="https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/68455df84635034fba3a9792_2.png" 
                      alt="AU Small Finance Bank" 
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="mx-4 p-4 flex items-center justify-center h-24 w-48 border rounded-xl bg-white">
                    <img 
                      src="https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/68455df826534506568ee82d_3.png" 
                      alt="City Union Bank" 
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="mx-4 p-4 flex items-center justify-center h-24 w-48 border rounded-xl bg-white">
                    <img 
                      src="https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/6845b98b5d7092f023e9d98f_5.png" 
                      alt="Yalamanchili" 
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            Used by D2C brands, Instagram shops & online sellers across India
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Selling Online Feels Complicated?</h2>
            <p className="text-muted-foreground text-lg">
              Most online sellers struggle with platforms, ads, and customer ownership. We've simplified it.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-secondary/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Too Much Dependency on Marketplaces?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  High commissions, discount pressure, and no control over customers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-secondary/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Social Media Isn't Enough?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Instagram & WhatsApp bring enquiries — but converting and managing orders is messy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-secondary/30">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Ads Are Expensive?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Customer acquisition costs keep rising with unpredictable returns.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-lg font-semibold text-primary mt-10">
            Vyaparify is built for sellers - not tech teams
          </p>
        </div>
      </section>

      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 transform scale-90" />
              <img 
                src={dashboardImage} 
                alt="Vyaparify Dashboard Interface" 
                className="relative z-10 rounded-xl shadow-2xl border-4 border-white mx-auto w-full"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6">
                Zero Tech Skills Needed
              </div>
              <h2 className="text-4xl font-heading font-bold mb-6">Simple Enough for <br />Anyone to Use</h2>
              <p className="text-lg text-muted-foreground mb-8">
                No coding. No store-building headaches. If you can sell on WhatsApp or Instagram, you can use Vyaparify.
              </p>
              
              <ul className="space-y-4">
                {[
                  "No technical knowledge required",
                  "Create your online store easily",
                  "Manage products, orders & payments",
                  "Get instant order alerts on your phone"
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

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-6">
                Get Direct Orders
              </div>
              <h2 className="text-4xl font-heading font-bold mb-6">Customers From Everywhere <br />— Directly to You</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Turn social media traffic into real orders and repeat customers.
              </p>
              
              <div className="bg-secondary/30 p-6 rounded-2xl mb-4 border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-green-600">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Share Your Store on Instagram & WhatsApp</h4>
                    <p className="text-sm text-muted-foreground">Share your store link and start getting orders.</p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 p-6 rounded-2xl mb-4 border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-green-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Appear on Google for Brand Searches</h4>
                    <p className="text-sm text-muted-foreground">Help customers find your store beyond social media.</p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/30 p-6 rounded-2xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-orange-600">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Accept Orders Directly Without Middlemen</h4>
                    <p className="text-sm text-muted-foreground">No marketplace commissions, keep more profits.</p>
                  </div>
                </div>
              </div>
              
              <a href="https://id.vyaparify.com/register?utm_source=metagoogle&utm_medium=landing&utm_campaign=ecommerce-d2c&utm_id=ved1225" className="inline-block mt-8">
                <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25">
                  Create Your Store in 2 Mins
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-orange-100 rounded-full blur-3xl opacity-50 transform scale-90" />
              <img 
                src={mapImage} 
                alt="Customer discovery" 
                className="relative z-10 rounded-3xl shadow-2xl border-4 border-white w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-6">
              Success Stories
            </div>
            <h2 className="text-4xl font-heading font-bold mb-4">Real Stores, Real Growth</h2>
            <p className="text-muted-foreground text-lg">
              Join 10,000+ online sellers & D2C brands growing with Vyaparify.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-6">
                <div className="flex gap-1 text-orange-500">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "We moved from Instagram DMs to proper online orders."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold">Aarav</h4>
                    <p className="text-xs text-muted-foreground">D2C Brand Owner, Mumbai</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Growth
                    </span>
                    <span className="font-bold text-green-600">3x Orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location
                    </span>
                    <span className="font-medium">Mumbai</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-6">
                <div className="flex gap-1 text-orange-500">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "Now customers order directly instead of asking price on WhatsApp."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    M
                  </div>
                  <div>
                    <h4 className="font-bold">Megha</h4>
                    <p className="text-xs text-muted-foreground">Online Seller, Delhi</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Growth
                    </span>
                    <span className="font-bold text-green-600">2x Sales</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location
                    </span>
                    <span className="font-medium">Delhi</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-6">
                <div className="flex gap-1 text-orange-500">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "Our homegrown brand now gets repeat customers directly!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    P
                  </div>
                  <div>
                    <h4 className="font-bold">Priya</h4>
                    <p className="text-xs text-muted-foreground">Homegrown Brand, Bangalore</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Growth
                    </span>
                    <span className="font-bold text-green-600">5x Repeat</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location
                    </span>
                    <span className="font-medium">Bangalore</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://id.vyaparify.com/register?utm_source=metagoogle&utm_medium=landing&utm_campaign=ecommerce-d2c&utm_id=ved1225"
              className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Join 15,000+ D2C brands → Create your store in 2 mins
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
              What You Get
            </div>
            <h2 className="text-4xl font-heading font-bold mb-4">Everything You Need to Grow Your Brand Online</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From professional online store to Google visibility and order management - we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center">
              <div className="overflow-hidden rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <img 
                  src={caseStudyAI} 
                  alt="Professional Online Store" 
                  className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Professional Online Store</h3>
              <p className="text-muted-foreground leading-relaxed">
                Show products, pricing, photos & variants clearly.
              </p>
            </div>

            <div className="group text-center">
              <div className="overflow-hidden rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <img 
                  src={caseStudyGoogle} 
                  alt="Google Visibility for Your Brand" 
                  className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Google Visibility for Your Brand</h3>
              <p className="text-muted-foreground leading-relaxed">
                Help customers find your store beyond social media.
              </p>
            </div>

            <div className="group text-center">
              <div className="overflow-hidden rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <img 
                  src={caseStudyDashboard} 
                  alt="Order, Payment & Customer Management" 
                  className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Order, Payment & Customer Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track orders, payments, and repeat buyers in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4">Perfect for Your Online Business</h2>
            <p className="text-muted-foreground">Built for modern selling channels.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: ShoppingBag, label: "D2C Brands" },
              { icon: Instagram, label: "Instagram Shops" },
              { icon: MessageSquare, label: "WhatsApp Sellers" },
              { icon: ShoppingCart, label: "Online Sellers" },
              { icon: Gift, label: "Homegrown Brands" },
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

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-3 bg-slate-900 rounded-3xl p-10 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4 leading-tight">
                Start Free — Launch Your Online Store in Minutes
              </h2>
              <p className="text-slate-400 mb-8">
                Take control of your sales, customers, and brand growth.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "No marketplace dependency",
                  "No technical setup",
                  "Full ownership of customers",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-800 rounded-xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-primary font-bold text-sm">Limited Time Offer</p>
                  <p className="text-slate-400 text-sm">
                    First 100 online sellers get free setup assistance worth ₹5,000
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-border flex flex-col justify-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  Best Value for Online Sellers
                </span>
              </div>
              <p className="text-sm text-center text-muted-foreground mb-4 leading-relaxed mt-2">
                Online store. Payment & order management. Customer ownership. All in one.
              </p>
              <p className="text-muted-foreground text-center mb-2">Annual Access</p>
              <div className="text-center mb-2">
                <span className="text-5xl lg:text-6xl font-bold text-primary">₹7,999</span>
              </div>
                            
              <a href="/checkout" className="block">
                <Button className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 shadow-lg">
                  GET STARTED
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              
              <p className="text-center text-muted-foreground text-sm mt-6">
                No contracts, no hidden fees, cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-border pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Vyaparify" className="h-8 w-auto" />
            </div>
            <p className="text-muted-foreground max-w-md">
              All-in-one platform to launch, manage & grow your D2C or online business.
            </p>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 Vyaparify. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://id.vyaparify.com/privacy-policy" className="hover:text-primary">Privacy Policy</a>
              <a href="https://id.vyaparify.com/terms-conditions" className="hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
