import React from "react";

const measurements = [
  { name: "Bust length", icon: "📏" },
  { name: "Waist & hips", icon: "📐" },
  { name: "Leg & calf width", icon: "📍" },
  { name: "Shoulder width", icon: "↔️" },
  { name: "Arm length", icon: "💪" },
];

export default function MeasureFlow() {
  return (
    <div className="p-6 bg-white/10 backdrop-blur rounded-xl border border-white/20">
      <h3 className="font-semibold mb-4 text-white">Real Measure Points</h3>
      <ul className="space-y-2">
        {measurements.map((m, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-white/80">
            <span className="text-lg">{m.icon}</span>
            <span>{m.name}</span>
            <span className="ml-auto text-xs text-white/40">Ready</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
