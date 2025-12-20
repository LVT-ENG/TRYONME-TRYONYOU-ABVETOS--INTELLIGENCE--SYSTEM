export function avatarFromMetrics({ heightCm, weightKg }) {
  const h = Number(heightCm);
  const w = Number(weightKg);
  if (!h || !w) return { bmi: null, suggestedSize: "M" };

  const bmi = w / ((h / 100) ** 2);

  const suggestedSize =
    bmi < 20 ? "S" :
    bmi < 25 ? "M" :
    bmi < 30 ? "L" : "XL";

  return { bmi: Number(bmi.toFixed(1)), suggestedSize };
}

export function fitLabel(score) {
  if (score >= 90) return { label: "FIT", note: "Te queda muy bien" };
  if (score >= 85) return { label: "CASI FIT", note: "Puede ir algo justo" };
  return { label: "NO FIT", note: "Mejor otra talla o prenda" };
}
