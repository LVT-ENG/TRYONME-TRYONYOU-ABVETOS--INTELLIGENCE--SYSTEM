import React from "react";

const { useState, createElement: h } = React;

// Import components
import MeasureFlow from "./components/MeasureFlow.jsx";
import ScanView from "./components/ScanView.jsx";
import ProcessingView from "./components/ProcessingView.jsx";

export default function App() {
  const [view, setView] = useState("landing"); // landing, measure, scan, processing
  const [measurements, setMeasurements] = useState(null);

  // Landing view
  if (view === "landing") {
    return h(
      "div",
      { className: "min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white" },
      // Header
      h(
        "header",
        { className: "fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800" },
        h(
          "div",
          { className: "max-w-7xl mx-auto px-4 py-4 flex justify-between items-center" },
          h("h1", { className: "text-2xl font-bold tracking-widest" }, "TRYONYOU"),
          h("div", { className: "text-sm text-gray-400" }, "Demo v3.0")
        )
      ),
      // Hero Section
      h(
        "section",
        { className: "pt-32 px-4 pb-20" },
        h(
          "div",
          { className: "max-w-4xl mx-auto text-center" },
          h(
            "h1",
            { className: "text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent" },
            "TRYONYOU"
          ),
          h(
            "p",
            { className: "text-2xl md:text-3xl text-gray-300 mb-4" },
            "AI-Powered Virtual Try-On"
          ),
          h(
            "p",
            { className: "text-lg text-gray-400 mb-12 max-w-2xl mx-auto" },
            "See how clothes fit your body before you buy. Powered by advanced AI and computer vision."
          ),
          h(
            "button",
            {
              onClick: () => setView("measure"),
              className: "px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50"
            },
            "Start Your Journey"
          )
        )
      ),
      // Features
      h(
        "section",
        { className: "px-4 py-16" },
        h(
          "div",
          { className: "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8" },
          // Feature 1
          h(
            "div",
            { className: "bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center hover:border-blue-500/50 transition-colors" },
            h("div", { className: "text-5xl mb-4" }, "📏"),
            h("h3", { className: "text-xl font-bold mb-3" }, "Precise Measurements"),
            h("p", { className: "text-gray-400" }, "AI captures your body dimensions with camera-based scanning")
          ),
          // Feature 2
          h(
            "div",
            { className: "bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors" },
            h("div", { className: "text-5xl mb-4" }, "👗"),
            h("h3", { className: "text-xl font-bold mb-3" }, "Virtual Try-On"),
            h("p", { className: "text-gray-400" }, "See how any outfit looks on your exact body shape")
          ),
          // Feature 3
          h(
            "div",
            { className: "bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center hover:border-pink-500/50 transition-colors" },
            h("div", { className: "text-5xl mb-4" }, "🎯"),
            h("h3", { className: "text-xl font-bold mb-3" }, "Perfect Fit"),
            h("p", { className: "text-gray-400" }, "Shop with confidence knowing clothes will fit perfectly")
          )
        )
      ),
      // Footer
      h(
        "footer",
        { className: "border-t border-gray-800 py-8 px-4 text-center text-gray-500" },
        h("p", null, "© 2026 TRYONYOU - AI Virtual Try-On Platform"),
        h("p", { className: "text-sm mt-2" }, "Demo Version - Zero Backend, Static Frontend")
      )
    );
  }

  // Measure Flow
  if (view === "measure") {
    return h(MeasureFlow, {
      onComplete: (data) => {
        setMeasurements(data);
        setView("scan");
      },
      onBack: () => setView("landing")
    });
  }

  // Scan View
  if (view === "scan") {
    return h(ScanView, {
      measurements,
      onComplete: () => setView("processing"),
      onBack: () => setView("measure")
    });
  }

  // Processing View
  if (view === "processing") {
    return h(ProcessingView, {
      measurements,
      onComplete: () => {
        alert("Demo Complete! In production, you would now see your virtual avatar and try on clothes.");
        setView("landing");
        setMeasurements(null);
      }
    });
  }

  return null;
}
