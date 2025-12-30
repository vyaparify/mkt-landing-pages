import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, MessageCircle, ShoppingBag, Smartphone, Store, TrendingUp, Zap, Calendar, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useState, useEffect } from "react";

// Assets
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

export default function RetailLocalShops() {
  const [showBanner, setShowBanner] = useState(true);

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
      document.head.removeChild(script);
      document.head.removeChild(link);
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
        {/* Promotional Banner */}
        {showBanner && (
          <div className="bg-orange-600 text-white px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2 relative">
            <span>🎉 Limited Time Offer: Get <span className="font-bold text-yellow-300">20% OFF</span> your subscription when you start today!</span>
            <a href="/checkout" className="underline font-bold hover:text-yellow-300 ml-2">
              Buy Now
            </a>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 ml-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full"
              onClick={() => setShowBanner(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Navigation */}
        <nav className="bg-background/80 backdrop-blur-md border-b border-border/40 w-full">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Vyaparify" className="h-8 w-auto" />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {/* Header menu removed */}
            </div>

            <div className="flex items-center gap-4">
              {/* Buy Now button removed from header */}
            </div>
          </div>
        </nav>
      </div>

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
                <span className="text-sm font-medium text-muted-foreground">Trusted by 1,50,000+ local shops</span>
              </motion.div>
              
              <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] mb-6">
                Online Selling Made <span className="text-primary">Simple</span> for Local Shops
              </motion.h1>
              
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                No technical knowledge needed. Your AI Website. capture orders from nearby customers and grow your business today.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <a href="https://id.vyaparify.com/register?utm_source=metagoogle&utm_medium=landing&utm_campaign=retail-local-shops&utm_id=vrpl1225">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25">
                    Create Shop in 2 Mins
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 text-lg rounded-full border-2 hover:bg-secondary/50"
                  onClick={openCalendly}
                >
                  <Calendar className="mr-2 w-5 h-5 text-green-600" />
                  Book a Demo
                </Button>
              </motion.div>
              
              <motion.div variants={fadeIn} className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {avatars.map((avatar, i) => (
                    <img key={i} src={avatar} alt={`Customer ${i + 1}`} className="w-8 h-8 rounded-full border-2 border-background object-cover" />
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

      {/* Trusted By Banks Section */}
      <section className="py-12 bg-white border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold font-heading mb-2">Trusted by Leading Banks</h3>
            <p className="text-muted-foreground text-sm">Bank-Grade Security & Compliance</p>
          </div>
          
          <div className="w-full max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4 items-center">
                <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/4">
                  <div className="p-4 flex items-center justify-center h-24 border rounded-xl hover:shadow-md transition-shadow">
                    <img 
                      src="https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/68455df884f7dbb961db9102_1.png" 
                      alt="HDFC Bank" 
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/4">
                  <div className="p-4 flex items-center justify-center h-24 border rounded-xl hover:shadow-md transition-shadow">
                    <img 
                      src="https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/68455df84635034fba3a9792_2.png" 
                      alt="AU Small Finance Bank" 
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/4">
                  <div className="p-4 flex items-center justify-center h-24 border rounded-xl hover:shadow-md transition-shadow">
                    <img 
                      src="https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/68455df826534506568ee82d_3.png" 
                      alt="City Union Bank" 
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/4">
                  <div className="p-4 flex items-center justify-center h-24 border rounded-xl hover:shadow-md transition-shadow">
                    <img 
                      src="https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/6845b98b5d7092f023e9d98f_5.png" 
                      alt="Yalamanchili" 
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
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
                If you can take an order at the counter, you can take it online. We stripped away all the confusing buttons.
              </p>
              
              <ul className="space-y-4">
                {[
                  "No technical knowledge needed",
                  "One Simple Platform",
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
                    <p className="text-sm text-muted-foreground">Higher Google Search Ranking in your area</p>
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

      {/* Success Stories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-6">
              Success Stories
            </div>
            <h2 className="text-4xl font-heading font-bold mb-4">Real Google Rankings, Real Success</h2>
            <p className="text-muted-foreground text-lg">
              Join 1,00,000+ merchants already ranking on Google's first page.
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
                  "Wanted to expand my ethnic kids clothing business to Singapore market. Vyaparify helped me achieve #1 ranking and now getting international orders!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    K
                  </div>
                  <div>
                    <h4 className="font-bold">Klingaru</h4>
                    <p className="text-xs text-muted-foreground">Ethnic Clothes for Kids</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Ranking
                    </span>
                    <span className="font-bold text-green-600">#1 Position</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location
                    </span>
                    <span className="font-medium">Singapore International</span>
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
                  "Running AC repair services in Kanpur. Vyaparify helped me achieve #2 ranking for AC repair services and now getting steady customer inquiries!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold">Shivaay Enterprises</h4>
                    <p className="text-xs text-muted-foreground">Multi-Service Business</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Ranking
                    </span>
                    <span className="font-bold text-green-600">#2 Position</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location
                    </span>
                    <span className="font-medium">Kanpur, UP</span>
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
                  "Specializing in formal wear for women in Ankleshwar. Vyaparify helped me reach #3 ranking and now getting customers from across Gujarat!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                    V
                  </div>
                  <div>
                    <h4 className="font-bold">Vanati</h4>
                    <p className="text-xs text-muted-foreground">Women's Formal Wear</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Ranking
                    </span>
                    <span className="font-bold text-green-600">#3 Position</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location
                    </span>
                    <span className="font-medium">Ankleshwar, Gujarat</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
              What You Get
            </div>
            <h2 className="text-4xl font-heading font-bold mb-4">Everything You Need to Succeed Online</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From AI-powered websites to Google rankings and lead management - we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center">
              <div className="overflow-hidden rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <img 
                  src={caseStudyAI} 
                  alt="AI-Powered Website" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Complete AI-Powered Website</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get access to India's most advanced AI website platform designed specifically for non-technical business owners. Build, customize, and manage your professional talking website that converts visitors into customers 24/7.
              </p>
            </div>

            <div className="group text-center">
              <div className="overflow-hidden rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <img 
                  src={caseStudyGoogle} 
                  alt="Google First Page Rankings" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Google First Page Rankings</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our SEO optimization ensures your business appears on Google's first page for local searches.
              </p>
            </div>

            <div className="group text-center">
              <div className="overflow-hidden rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <img 
                  src={caseStudyDashboard} 
                  alt="Dashboard & Lead Management" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Dashboard & Lead Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track visitors, manage customer inquiries, and grow your business with our powerful dashboard.
              </p>
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
                Join thousands of shop owners growing their business with Vyaparify.
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
                <img src={logo} alt="Vyaparify" className="h-8 w-auto" />
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
            <p>© 2025 Vyaparify. All rights reserved.</p>
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