import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "70%", label: "Fewer Returns", desc: "Customers buy with confidence" },
  { value: "3s", label: "Instant Fit", desc: "Real-time body analysis" },
  { value: "98%", label: "Accuracy", desc: "Precision measurement tech" },
];

const steps = [
  {
    num: "01",
    title: "Stand & Scan",
    desc: "Position your phone 2 meters away. Our AI guides you through the perfect pose.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Real Measure",
    desc: "We capture 9 key body points: shoulders, bust, waist, hips, legs, arms, and more.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Perfect Fit",
    desc: "See exactly how clothes fit YOUR body. No more guessing, no more returns.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const benefits = [
  {
    title: "For Shoppers",
    items: [
      "Know your exact size before buying",
      "See how clothes fit your body shape",
      "Save time, avoid returns",
      "Shop with confidence online",
    ],
  },
  {
    title: "For Retailers",
    items: [
      "Reduce return rates by 70%",
      "Increase conversion rates",
      "Capture qualified leads",
      "Build customer loyalty",
    ],
  },
];

export default function Landing() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          event: "landing_signup",
          meta: { source: "landing_page", timestamp: new Date().toISOString() }
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-32 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Fashion Tech Revolution
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Stop Guessing.<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Start Fitting.
              </span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
              The first real-body measurement system that tells you exactly how clothes will fit 
              before you buy. No avatars. No mannequins. Just you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => nav("/measure")}
                className="px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:bg-white/90 transition-all text-lg"
              >
                Try It Now - Free
              </button>
              <button
                onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all text-lg border border-white/20"
              >
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/10 bg-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-white/50 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Three simple steps to find your perfect fit. No special equipment needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                  {step.num}
                </div>
                <div className="text-white/40 mb-4 group-hover:text-blue-400 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/60">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => nav("/measure")}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold hover:opacity-90 transition-all"
            >
              Start Measuring Now
            </button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why TRYONYOU?</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Benefits for everyone in the fashion ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-8 bg-slate-900/50 border border-white/10 rounded-2xl">
                <h3 className="text-2xl font-semibold text-white mb-6">{benefit.title}</h3>
                <ul className="space-y-4">
                  {benefit.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                The Problem With Online Shopping
              </h2>
              <div className="space-y-4 text-white/70">
                <p>
                  <span className="text-red-400 font-semibold">30% of online clothing purchases are returned</span> because 
                  they don't fit. That's billions in lost revenue and frustrated customers.
                </p>
                <p>
                  Size charts don't work. Every brand fits differently. And trying to guess your size 
                  from a photo of a model? Impossible.
                </p>
                <p className="text-white font-semibold">
                  TRYONYOU solves this with real body measurement technology.
                </p>
              </div>
            </div>
            <div className="p-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl">
              <div className="text-6xl font-bold text-white mb-4">30%</div>
              <div className="text-white/60 mb-6">of online clothes are returned due to fit issues</div>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-red-500/30 rounded-full overflow-hidden">
                  <div className="w-[30%] h-full bg-red-500 rounded-full"></div>
                </div>
                <span className="text-red-400 font-semibold">Returns</span>
              </div>
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="text-green-400 font-semibold">With TRYONYOU:</div>
                <div className="text-white/80">Reduce returns to under 10%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-24 bg-gradient-to-b from-blue-900/20 to-transparent">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Fitting Experience?
          </h2>
          <p className="text-white/60 mb-8">
            Join retailers and shoppers who are already using TRYONYOU to eliminate fit guesswork.
          </p>

          {submitted ? (
            <div className="p-8 bg-green-500/10 border border-green-500/30 rounded-2xl">
              <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-semibold text-white mb-2">You're In!</h3>
              <p className="text-white/70 mb-6">We'll be in touch soon with exclusive access.</p>
              <button
                onClick={() => nav("/measure")}
                className="px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:bg-white/90 transition-all"
              >
                Try the Demo Now
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
              >
                {loading ? "..." : "Get Early Access"}
              </button>
            </form>
          )}

          <p className="mt-6 text-white/40 text-sm">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Are you really going to try 510 pants...
            <br />
            <span className="text-white/60">or just find the one that fits?</span>
          </h2>
          <button
            onClick={() => nav("/measure")}
            className="mt-8 px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold text-xl hover:opacity-90 transition-all"
          >
            Find Your Perfect Fit
          </button>
        </div>
      </section>
    </div>
  );
}
