import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { 
  ArrowRight, Check, Shield, Zap, Users, TrendingUp, 
  MessageCircle, Star, Phone, Mail, Clock,
  Bot, Calculator, X, ChevronRight, Smartphone, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trackPageView } from "@/lib/tracking";
import logo from "@assets/logo.svg";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const secrets = [
  {
    number: "SECRET #1",
    title: "Why Digital Marketers Don't Want You To Know About Vyaparify",
    description: "Digital marketing agencies make ₹15,000-50,000 monthly by keeping you dependent on their services. They deliberately avoid telling you about AI platforms like Vyaparify because it eliminates their recurring revenue."
  },
  {
    number: "SECRET #2", 
    title: "The \"Existing Website\" Trap That's Costing You Customers",
    description: "Even if you have a website, 87% of existing business websites are \"silent killers\" - they look professional but convert zero visitors. Your current website lacks AI chatbot integration, proper lead capture, and Google ranking optimization."
  },
  {
    number: "SECRET #3",
    title: "The AI + Google Top Page Ranking Combination That Agencies Fear",
    description: "Agencies charge separately for website development (₹25,000), SEO services (₹8,000/month), and chatbot integration (₹15,000). Vyaparify combines all three in one platform for just ₹7,999 annually."
  }
];

const comparisonData = [
  { service: "Professional Website", agency: "₹15,000+", competitor: "₹12,000+", vyaparify: "Included" },
  { service: "AI Chatbot", agency: "₹15,000+", competitor: "₹10,000+", vyaparify: "Included" },
  { service: "SEO & Google Rankings", agency: "₹25,000/year", competitor: "₹18,000/year", vyaparify: "Included" },
  { service: "Maintenance & Support", agency: "₹60,000/year", competitor: "₹36,000/year", vyaparify: "Included" },
  { service: "Total Annual Cost", agency: "₹1,15,000+", competitor: "₹76,000+", vyaparify: "₹7,999" },
];

const successStories = [
  {
    name: "Klingaru",
    business: "Ethnic Clothes for Kids",
    quote: "Wanted to expand my ethnic kids clothing business to Singapore market. Vyaparify helped me achieve #1 ranking and now getting international orders!",
    searchTerm: "Ethnic Clothes for Kids In Singapore",
    ranking: "#1 Position",
    location: "Singapore"
  },
  {
    name: "Shivaay Enterprises",
    business: "Multi-Service Business",
    quote: "Running AC repair services in Kanpur. Vyaparify helped me achieve #2 ranking for AC repair services and now getting steady customer inquiries!",
    searchTerm: "AC Repair Services in Mall Road Kanpur",
    ranking: "#2 Position",
    location: "Kanpur, UP"
  },
  {
    name: "Vanati",
    business: "Women's Formal Wear",
    quote: "Specializing in formal wear for women in Ankleshwar. Vyaparify helped me achieve #3 ranking and now getting customers from across Gujarat!",
    searchTerm: "Best Formal Wear for Women in Ankleshwar Gujarat",
    ranking: "#3 Position",
    location: "Ankleshwar, Gujarat"
  }
];

export default function AgencyReplacement() {
  const [, navigate] = useLocation();

  useEffect(() => {
    trackPageView("agency-replacement");
  }, []);

  const goToCheckout = () => {
    navigate("/checkout?source=agency-replacement");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/#" className="flex items-center gap-2">
            <img src={logo} alt="Vyaparify" className="h-8 w-auto" />
          </a>
          <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={goToCheckout}
            >
              Get Started
            </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-red-50 via-white to-orange-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-6">
              <span className="text-red-600 font-bold text-sm">Limited Time Offer - 93% OFF!</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] mb-6">
              STOP OVERPAYING <span className="text-red-600">₹1,07,000+</span> FOR WEBSITE!
            </motion.h1>

            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-4">
              Get Professional Website + AI Chatbot + Google Top Rankings
            </motion.p>

            <motion.div variants={fadeIn} className="mb-8">
              <span className="text-5xl font-bold text-primary">ALL FOR JUST ₹7,999/YEAR</span>
            </motion.div>

            <motion.p variants={fadeIn} className="text-muted-foreground mb-8">
              Join 100,000+ Businesses Saving ₹1,07,001+ Annually
            </motion.p>

            <motion.div variants={fadeIn}>
              <Button 
                size="lg" 
                className="h-16 px-10 text-xl font-bold rounded-full bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30"
                onClick={goToCheckout}
                data-testid="button-hero-cta"
              >
                Buy Now ₹7,999
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {[
                { value: "1,00,000+", label: "Active Users" },
                { value: "4.9/5", label: "Rating" },
                { value: "99.9%", label: "Uptime" },
                { value: "300%", label: "Growth Rate" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted by Banks */}
      <section className="py-12 bg-white border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold font-heading mb-2">Trusted by Leading Banks</h3>
            <p className="text-muted-foreground text-sm">Bank-Grade Security & Compliance</p>
          </div>
          
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {[
              "https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/68455df884f7dbb961db9102_1.png",
              "https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/68455df84635034fba3a9792_2.png",
              "https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/68455df826534506568ee82d_3.png",
              "https://cdn.prod.website-files.com/66cc4a7725e8b95940b34e83/6845b98b5d7092f023e9d98f_5.png"
            ].map((src, i) => (
              <div key={i} className="p-4 flex items-center justify-center h-20 w-40 border rounded-xl bg-white">
                <img src={src} alt="Bank Logo" className="max-h-10 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secrets Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Here Is Why They Don't Want You To Know
            </h2>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {secrets.map((secret, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="p-8">
                    <span className="text-primary font-bold text-sm">{secret.number}</span>
                    <h3 className="text-xl font-bold mt-2 mb-4">{secret.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{secret.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Master These 3 Secrets And Transform Your Business Online Forever</h3>
            <p className="text-muted-foreground mb-8">~ And You Can Skip Years To Be In The Top 10... Even Top 1% Of Profitable Indian Businesses</p>
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90"
              onClick={goToCheckout}
            >
              GET MY TALKING WEBSITE NOW
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Compare & Save Money</h2>
            <p className="text-muted-foreground">See how we stack up against traditional agencies</p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left font-bold border">Service</th>
                  <th className="p-4 text-center font-bold border">Traditional Agency</th>
                  <th className="p-4 text-center font-bold border">Competitor</th>
                  <th className="p-4 text-center font-bold border bg-primary/10 text-primary">Vyaparify</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i === comparisonData.length - 1 ? "bg-gray-50 font-bold" : ""}>
                    <td className="p-4 border">{row.service}</td>
                    <td className="p-4 text-center border text-red-600">{row.agency}</td>
                    <td className="p-4 text-center border text-orange-600">{row.competitor}</td>
                    <td className="p-4 text-center border bg-primary/5 text-primary font-bold">{row.vyaparify}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-10">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90"
              onClick={goToCheckout}
            >
              Buy Now ₹7,999
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* AI Chatbot Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-6">
                Experience Our AI Chatbot Live
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                See how it can handle your customer queries 24/7
              </p>

              <div className="space-y-6">
                {[
                  { icon: Clock, title: "24/7 Customer Support", desc: "Never miss a customer query, even while you sleep" },
                  { icon: Users, title: "Lead Generation", desc: "Automatically collect visitor information and convert them" },
                  { icon: Globe, title: "Multi-Language Support", desc: "Communicate in Hindi, English, and regional languages" },
                  { icon: MessageCircle, title: "WhatsApp Integration", desc: "Seamlessly connect with customers on their preferred platform" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">AI Assistant</h4>
                  <p className="text-sm text-green-600">Online</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm">Hello! How can I help you today?</p>
                </div>
                <div className="bg-primary text-white rounded-2xl rounded-tr-none p-4 max-w-[80%] ml-auto">
                  <p className="text-sm">What services do you offer?</p>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm">We offer professional websites, AI chatbots, and Google SEO optimization - all included in our ₹7,999/year plan!</p>
                </div>
              </div>
              <Button className="w-full" onClick={goToCheckout}>
                Try Live Demo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">Success Stories from Our Clients</h2>
            <p className="text-muted-foreground">Real businesses, real savings, real results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <Card key={i} className="border hover:shadow-lg transition-shadow">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 font-bold text-sm px-3 py-1 rounded-full">
                      {story.ranking}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{story.name}</h4>
                    <p className="text-sm text-muted-foreground">{story.business}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">"{story.quote}"</p>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Search Term:</span>
                      <span className="font-medium text-xs">{story.searchTerm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{story.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile First Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-green-100 text-green-700 font-bold text-sm px-4 py-2 rounded-full">
              100% Mobile Ready
            </span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mt-6 mb-4">
              Built for Bharat. Run from Your Phone.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From store setup to order tracking — run your business from the palm of your hand. 90% of Indian businesses operate mobile-first.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { title: "Add a Product", desc: "Just 3 taps and your new item is live", stat: "3 taps" },
              { title: "Send Catalog on WhatsApp", desc: "Instant PDF or clickable catalog", stat: "Instant" },
              { title: "Collect Payments", desc: "Share a branded payment link", stat: "1 link" },
              { title: "View Daily Sales", desc: "Dashboard in your pocket", stat: "Real-time" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <p className="text-2xl font-bold text-primary mb-2">{item.stat}</p>
                <h4 className="font-bold mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90"
              onClick={goToCheckout}
            >
              Get Started on Mobile
              <Smartphone className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Real Google Search Results
            </h2>
            <p className="text-muted-foreground">From invisible to #1 ranking</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <X className="w-8 h-8 text-red-500" />
                <div>
                  <h3 className="font-bold text-xl">BEFORE - Page 5+</h3>
                  <p className="text-sm text-muted-foreground">Lost in search results</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-red-700">
                  <X className="w-4 h-4" />
                  <span>No visibility on Google first page</span>
                </li>
                <li className="flex items-center gap-2 text-red-700">
                  <X className="w-4 h-4" />
                  <span>Zero organic traffic</span>
                </li>
                <li className="flex items-center gap-2 text-red-700">
                  <X className="w-4 h-4" />
                  <span>Competitors dominating the market</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="bg-green-50 border-2 border-green-200 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Check className="w-8 h-8 text-green-500" />
                <div>
                  <h3 className="font-bold text-xl">AFTER - #1 Position</h3>
                  <p className="text-sm text-muted-foreground">Dominating search results</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-green-700">
                  <Check className="w-4 h-4" />
                  <span>#1 Google ranking achieved</span>
                </li>
                <li className="flex items-center gap-2 text-green-700">
                  <Check className="w-4 h-4" />
                  <span>500%+ traffic increase</span>
                </li>
                <li className="flex items-center gap-2 text-green-700">
                  <Check className="w-4 h-4" />
                  <span>Daily orders from customers</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">Transformation Timeline: 10-12 Weeks</p>
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90"
              onClick={goToCheckout}
            >
              Get Similar Results for ₹7,999
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Stop Paying Agencies ₹1,07,000+ Every Year
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Get everything you need - Professional Website, AI Chatbot, Google Rankings - all for just ₹7,999/year
          </p>
          <Button 
            size="lg" 
            className="h-16 px-10 text-xl font-bold rounded-full bg-primary hover:bg-primary/90 shadow-2xl"
            onClick={goToCheckout}
          >
            Get Started Now - ₹7,999
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
          
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm">SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Check className="w-4 h-4" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Data Protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Vyaparify" className="h-6 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">© 2025 Vyaparify. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="https://id.vyaparify.com/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</a>
              <a href="https://id.vyaparify.com/terms-conditions" className="text-muted-foreground hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
