import React from "react";

const { useState, useEffect, createElement: h } = React;

export default function ScanView({ measurements, onComplete, onBack }) {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleStartScan = () => {
    setScanning(true);
    setScanProgress(0);

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          // Navigate to processing after a brief delay
          setTimeout(() => {
            onComplete();
          }, 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 400);
  };

  return h(
    "div",
    { className: "min-h-screen bg-gray-950 text-white pt-20" },
    // Header
    h(
      "header",
      { className: "fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800" },
      h(
        "div",
        { className: "max-w-7xl mx-auto px-4 py-4 flex justify-between items-center" },
        h("h1", { className: "text-2xl font-bold tracking-widest" }, "TRYONYOU"),
        h("div", { className: "text-sm text-gray-400" }, "Body Scan")
      )
    ),
    // Main Content
    h(
      "section",
      { className: "py-12 px-4" },
      h(
        "div",
        { className: "max-w-4xl mx-auto" },
        // Instructions
        h(
          "div",
          { className: "bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8" },
          h("h2", { className: "text-3xl font-bold mb-6" }, "Body Scan Setup"),
          h(
            "div",
            { className: "space-y-4 mb-8" },
            h("h3", { className: "font-bold text-lg" }, "Preparation"),
            h(
              "ul",
              { className: "space-y-2 text-gray-300" },
              [
                "Wear fitted clothing that shows your body shape",
                "Stand in a well-lit area with your phone 2 meters away",
                "Position yourself vertically in the frame (head to toe)",
                "Keep your arms at your sides and stand naturally"
              ].map((instruction, i) =>
                h(
                  "li",
                  { key: i, className: "flex gap-3" },
                  h("span", { className: "text-blue-400 font-bold" }, i + 1),
                  h("span", null, instruction)
                )
              )
            )
          ),
          h(
            "div",
            { className: "bg-blue-600/10 border border-blue-500/30 rounded-lg p-4" },
            h(
              "p",
              { className: "text-blue-300" },
              "Our AI will capture your body proportions using computer vision. No video is stored—only your measurements are saved."
            )
          )
        ),
        // Camera Placeholder
        h(
          "div",
          { className: "relative h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl flex items-center justify-center mb-8" },
          !scanning
            ? h(
                "div",
                { className: "text-center" },
                h("div", { className: "text-6xl mb-4" }, "📷"),
                h("p", { className: "text-gray-400 mb-2" }, "Camera Placeholder"),
                h("p", { className: "text-sm text-gray-500" }, "In production, this would show your camera feed")
              )
            : h(
                "div",
                { className: "text-center w-full h-full flex flex-col items-center justify-center" },
                h("div", { className: "w-32 h-32 border-4 border-blue-500 rounded-full mb-6 animate-pulse" }),
                h("p", { className: "text-xl text-gray-300" }, "Scanning..."),
                h("p", { className: "text-sm text-gray-500 mt-2" }, `${Math.round(scanProgress)}%`)
              )
        ),
        // Progress Bar
        scanning && h(
          "div",
          { className: "space-y-2 mb-8" },
          h(
            "div",
            { className: "h-2 bg-gray-700 rounded-full overflow-hidden" },
            h("div", {
              className: "h-full bg-blue-500 rounded-full transition-all duration-300",
              style: { width: `${scanProgress}%` }
            })
          ),
          h("p", { className: "text-sm text-gray-400 text-center" }, "Processing body measurements...")
        ),
        // Action Buttons
        h(
          "div",
          { className: "flex gap-4" },
          h(
            "button",
            {
              onClick: onBack,
              className: "flex-1 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-colors uppercase tracking-wider"
            },
            "Back"
          ),
          h(
            "button",
            {
              onClick: handleStartScan,
              disabled: scanning,
              className: `flex-1 py-4 rounded-lg font-bold text-white transition-colors shadow-lg uppercase tracking-wider ${
                scanning
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`
            },
            scanning ? "Scanning..." : "Start Scan"
          )
        ),
        // Info Box
        h(
          "div",
          { className: "bg-gray-800 rounded-xl p-6 border border-gray-700 text-sm text-gray-400 mt-8" },
          h(
            "p",
            { className: "mb-2" },
            h("span", { className: "font-bold text-white" }, "Note: "),
            "This is a demo interface. In production, MediaPipe will provide real-time body pose detection."
          )
        )
      )
    )
  );
}
