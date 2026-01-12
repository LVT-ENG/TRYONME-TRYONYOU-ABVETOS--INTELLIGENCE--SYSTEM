import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Zap, BarChart3 } from "lucide-react";

/**
 * DemoBrands Page - Selling demo access to fashion brands
 */
export default function DemoBrands() {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Styling",
      description: "Let PAU (Empathic Stylist) demonstrate personalized recommendations"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track customer engagement and style preferences in real-time"
    },
    {
      icon: CheckCircle,
      title: "Full Integration",
      description: "Connect your inventory and start selling through TRYONYOU"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter Demo",
      price: "$499",
      duration: "7 days",
      features: [
        "Access to PAU Stylist",
        "Up to 100 style recommendations",
        "Basic analytics",
        "Email support"
      ]
    },
    {
      name: "Professional Demo",
      price: "$1,499",
      duration: "30 days",
      features: [
        "Full PAU integration",
        "Unlimited recommendations",
        "Advanced analytics",
        "Priority support",
        "Custom branding"
      ],
      highlighted: true
    },
    {
      name: "Enterprise Demo",
      price: "Custom",
      duration: "90 days",
      features: [
        "Complete platform access",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "Training included"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gold/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <span className="font-bold text-lg text-white">TRYONYOU</span>
          </Link>
          <Link href="/" className="text-sm hover:text-gold transition">
            Back to Home
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-black via-black to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
              Instant Demo Access
            </span>
            <br />
            <span className="text-white">for Fashion Brands</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the power of TRYONYOU's AI-driven styling platform. See how our intelligent system can transform your brand's customer experience.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How the Demo Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="p-6 rounded-lg bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 hover:border-gold/50 transition"
              >
                <Icon className="w-12 h-12 text-gold mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-gold/10 to-transparent border border-gold/20 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold mb-4">What's Included in Your Demo</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "PAU Empathic Stylist access",
              "Smart Wardrobe integration",
              "Real-time analytics dashboard",
              "Customer recommendation engine",
              "Inventory management tools",
              "ABVETOS Payment integration",
              "Brand customization options",
              "Technical support & training"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Demo Pricing Plans</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`rounded-lg p-8 border transition ${
                  plan.highlighted 
                    ? 'bg-gradient-to-br from-gold/20 to-gold/5 border-gold/50 transform md:scale-105' 
                    : 'bg-gradient-to-br from-white/5 to-transparent border-gold/20 hover:border-gold/50'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gold">{plan.price}</span>
                  <p className="text-gray-400 mt-2">{plan.duration}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-gold hover:bg-yellow-500 text-black font-bold' 
                      : 'bg-transparent border border-gold text-gold hover:bg-gold/10'
                  }`}
                >
                  Request Demo
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-4">Need a custom solution? Contact our sales team.</p>
            <Button 
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Brand?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Start your TRYONYOU demo today and see how our AI-powered platform can revolutionize your customer experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gold hover:bg-yellow-500 text-black font-bold"
            >
              Request Demo Now
            </Button>
            <Link href="/">
              <Button 
                size="lg"
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gold/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>&copy; 2024 TRYONYOU — ABVETOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
