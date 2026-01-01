import React from "react";

const { useState, useEffect, createElement: h } = React;

export default function ProcessingView({ measurements, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("Analyzing measurements");

  useEffect(() => {
    const stages = [
      { text: "Analyzing measurements", duration: 1500 },
      { text: "Building 3D body model", duration: 2000 },
      { text: "Calibrating proportions", duration: 1500 },
      { text: "Finalizing avatar", duration: 1000 }
    ];

    let currentStage = 0;
    let currentProgress = 0;

    const updateProgress = () => {
      if (currentStage >= stages.length) {
        onComplete();
        return;
      }

      const stage = stages[currentStage];
      setStage(stage.text);

      const increment = 100 / (stage.duration / 100);
      const interval = setInterval(() => {
        currentProgress += increment;
        setProgress(Math.min(currentProgress, ((currentStage + 1) / stages.length) * 100));

        if (currentProgress >= ((currentStage + 1) / stages.length) * 100) {
          clearInterval(interval);
          currentStage++;
          setTimeout(updateProgress, 200);
        }
      }, 100);
    };

    updateProgress();
  }, [onComplete]);

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
        h("div", { className: "text-sm text-gray-400" }, "Processing")
      )
    ),
    // Main Content
    h(
      "section",
      { className: "py-12 px-4 flex items-center justify-center min-h-[80vh]" },
      h(
        "div",
        { className: "max-w-2xl w-full" },
        // Processing Card
        h(
          "div",
          { className: "bg-gray-800 rounded-xl p-12 border border-gray-700 shadow-2xl text-center" },
          // Animated Spinner
          h(
            "div",
            { className: "mb-8 flex justify-center" },
            h("div", { className: "w-24 h-24 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin" })
          ),
          // Title
          h("h2", { className: "text-3xl font-bold mb-4" }, "Creating Your Digital Avatar"),
          // Current Stage
          h("p", { className: "text-xl text-blue-400 mb-8" }, stage),
          // Progress Bar
          h(
            "div",
            { className: "space-y-2 mb-8" },
            h(
              "div",
              { className: "h-3 bg-gray-700 rounded-full overflow-hidden" },
              h("div", {
                className: "h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300",
                style: { width: `${progress}%` }
              })
            ),
            h("p", { className: "text-sm text-gray-400" }, `${Math.round(progress)}% complete`)
          ),
          // Measurements Summary
          measurements && h(
            "div",
            { className: "bg-gray-700/50 rounded-lg p-6 border border-gray-600" },
            h("h3", { className: "font-bold mb-4 text-lg" }, "Your Measurements"),
            h(
              "div",
              { className: "grid grid-cols-2 gap-4 text-sm" },
              h(
                "div",
                null,
                h("div", { className: "text-gray-400" }, "Height"),
                h("div", { className: "font-bold text-white" }, `${measurements.height} cm`)
              ),
              h(
                "div",
                null,
                h("div", { className: "text-gray-400" }, "Weight"),
                h("div", { className: "font-bold text-white" }, `${measurements.weight} kg`)
              ),
              h(
                "div",
                null,
                h("div", { className: "text-gray-400" }, "Gender"),
                h("div", { className: "font-bold text-white" }, measurements.gender)
              ),
              h(
                "div",
                null,
                h("div", { className: "text-gray-400" }, "Age"),
                h("div", { className: "font-bold text-white" }, measurements.age)
              )
            )
          ),
          // Info
          h(
            "div",
            { className: "mt-8 text-sm text-gray-400" },
            h(
              "p",
              null,
              "Please wait while we process your data and create your personalized avatar..."
            )
          )
        )
      )
    )
  );
}
