import React from "react";

const { useState, createElement: h } = React;

export default function MeasureFlow({ onComplete, onBack }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    gender: "",
    age: ""
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step === 1 && formData.gender) {
      setStep(2);
    } else if (step === 2 && formData.height && formData.weight) {
      setStep(3);
    } else if (step === 3 && formData.age) {
      onComplete(formData);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.gender;
    if (step === 2) return formData.height && formData.weight;
    if (step === 3) return formData.age;
    return false;
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
        h("div", { className: "text-sm text-gray-400" }, `Step ${step} of 3`)
      )
    ),
    // Main Content
    h(
      "section",
      { className: "py-12 px-4" },
      h(
        "div",
        { className: "max-w-2xl mx-auto" },
        // Progress Bar
        h(
          "div",
          { className: "mb-8" },
          h(
            "div",
            { className: "h-2 bg-gray-800 rounded-full overflow-hidden" },
            h("div", {
              className: "h-full bg-blue-500 transition-all duration-500",
              style: { width: `${(step / 3) * 100}%` }
            })
          )
        ),
        // Form Card
        h(
          "div",
          { className: "bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-xl" },
          // Step 1: Gender
          step === 1 && h(
            "div",
            null,
            h("h2", { className: "text-3xl font-bold mb-6" }, "Select Your Gender"),
            h("p", { className: "text-gray-400 mb-8" }, "This helps us provide better fit recommendations"),
            h(
              "div",
              { className: "grid grid-cols-2 gap-4" },
              ["Male", "Female"].map((gender) =>
                h(
                  "button",
                  {
                    key: gender,
                    onClick: () => handleChange("gender", gender),
                    className: `p-6 rounded-lg border-2 transition-all ${
                      formData.gender === gender
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-600 hover:border-gray-500"
                    }`
                  },
                  h("div", { className: "text-4xl mb-2" }, gender === "Male" ? "👨" : "👩"),
                  h("div", { className: "font-bold text-lg" }, gender)
                )
              )
            )
          ),
          // Step 2: Height & Weight
          step === 2 && h(
            "div",
            null,
            h("h2", { className: "text-3xl font-bold mb-6" }, "Body Measurements"),
            h("p", { className: "text-gray-400 mb-8" }, "Enter your height and weight"),
            h(
              "div",
              { className: "space-y-6" },
              // Height
              h(
                "div",
                null,
                h("label", { className: "block text-sm font-bold mb-2 text-gray-300" }, "Height (cm)"),
                h("input", {
                  type: "number",
                  value: formData.height,
                  onChange: (e) => handleChange("height", e.target.value),
                  placeholder: "175",
                  className: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                })
              ),
              // Weight
              h(
                "div",
                null,
                h("label", { className: "block text-sm font-bold mb-2 text-gray-300" }, "Weight (kg)"),
                h("input", {
                  type: "number",
                  value: formData.weight,
                  onChange: (e) => handleChange("weight", e.target.value),
                  placeholder: "70",
                  className: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                })
              )
            )
          ),
          // Step 3: Age
          step === 3 && h(
            "div",
            null,
            h("h2", { className: "text-3xl font-bold mb-6" }, "Almost There!"),
            h("p", { className: "text-gray-400 mb-8" }, "Last piece of information"),
            h(
              "div",
              null,
              h("label", { className: "block text-sm font-bold mb-2 text-gray-300" }, "Age"),
              h("input", {
                type: "number",
                value: formData.age,
                onChange: (e) => handleChange("age", e.target.value),
                placeholder: "25",
                className: "w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
              })
            )
          )
        ),
        // Navigation Buttons
        h(
          "div",
          { className: "flex gap-4 mt-8" },
          h(
            "button",
            {
              onClick: step === 1 ? onBack : () => setStep(step - 1),
              className: "flex-1 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-white transition-colors uppercase tracking-wider"
            },
            "Back"
          ),
          h(
            "button",
            {
              onClick: handleNext,
              disabled: !canProceed(),
              className: `flex-1 py-4 rounded-lg font-bold text-white transition-colors shadow-lg uppercase tracking-wider ${
                canProceed()
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-600 cursor-not-allowed"
              }`
            },
            step === 3 ? "Continue to Scan" : "Next"
          )
        )
      )
    )
  );
}
