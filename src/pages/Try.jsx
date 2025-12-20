import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { avatarFromMetrics } from "../services/fitEngine";

export default function Try() {
  const nav = useNavigate();
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");

  const result = useMemo(
    () => avatarFromMetrics({ heightCm, weightKg }),
    [heightCm, weightKg]
  );

  const onContinue = () => {
    localStorage.setItem(
      "tryonyou_avatar",
      JSON.stringify({
        heightCm: Number(heightCm),
        weightKg: Number(weightKg),
        bmi: result.bmi,
        suggestedSize: result.suggestedSize,
        ts: Date.now()
      })
    );
    nav("/demo");
  };

  const disabled = !heightCm || !weightKg;

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4">Tu talla perfecta</h1>
      <p className="opacity-60 mb-6">
        Basado en tu cuerpo real. Reduce devoluciones.
      </p>

      <input
        type="number"
        placeholder="Altura (cm)"
        value={heightCm}
        onChange={(e) => setHeightCm(e.target.value)}
        className="w-full mb-4 p-4 rounded-xl"
      />

      <input
        type="number"
        placeholder="Peso (kg)"
        value={weightKg}
        onChange={(e) => setWeightKg(e.target.value)}
        className="w-full mb-6 p-4 rounded-xl"
      />

      <div className="mb-6">
        <div className="text-sm opacity-60">Talla sugerida</div>
        <div className="text-4xl font-black">{result.suggestedSize}</div>
        <div className="text-xs opacity-50">BMI: {result.bmi ?? "-"}</div>
      </div>

      <button
        onClick={onContinue}
        disabled={disabled}
        className={`w-full py-4 rounded-xl font-bold ${disabled ? "bg-white/10 opacity-40" : "bg-blue-600"}`}
      >
        Ver mi look
      </button>
    </div>
  );
}
