from pathlib import Path

ROOT = Path.cwd()
SRC = ROOT / "src"
PAGES = SRC / "pages"
COMP = SRC / "components"
DATA = SRC / "data"

def write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"[JULES] written {path}")

# ------------------------
# LANDING (/)
# ------------------------
write(PAGES / "Landing.jsx", """
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div className="landing">
      <section className="hero">
        <h1>Saca tu mejor versión</h1>
        <p>La ropa que mejor te queda, sin probártela</p>
        <button onClick={() => nav("/demo")}>
          Probar la experiencia
        </button>
      </section>

      <section className="carousel">
        {[
          "Sin probadores",
          "Sin devoluciones",
          "Sin perder tiempo",
          "Para cada cuerpo, cada ocasión"
        ].map((c, i) => (
          <div key={i} className="claim">{c}</div>
        ))}
      </section>
    </div>
  );
}
""")

# ------------------------
# DEMO (/demo)
# ------------------------
write(PAGES / "Demo.jsx", """
import React, { useState } from "react";
import Scanner from "../components/Scanner";
import Questions from "../components/Questions";
import Result from "../components/Result";
import { recommendGarment } from "../engine/recommendation";

export default function Demo() {
  const [body, setBody] = useState(null);
  const [prefs, setPrefs] = useState(null);
  const [result, setResult] = useState(null);

  if (!body) return <Scanner onComplete={setBody} />;
  if (!prefs) return <Questions onComplete={setPrefs} />;

  if (!result) {
    const rec = recommendGarment(body, prefs);
    setResult(rec);
    return null;
  }

  return <Result garment={result} />;
}
""")

# ------------------------
# SCANNER (MediaPipe stub)
# ------------------------
write(COMP / "Scanner.jsx", """
import React from "react";

export default function Scanner({ onComplete }) {
  return (
    <div className="scanner">
      <p>Colócate frente al espejo</p>
      <p>Nos adaptamos a ti</p>
      <button onClick={() => onComplete({
        shoulders: "medium",
        torso: "long",
        legs: "long",
        build: "balanced"
      })}>
        Simular escaneo
      </button>
    </div>
  );
}
""")

# ------------------------
# QUESTIONS (voz / UI)
# ------------------------
write(COMP / "Questions.jsx", """
import React from "react";

export default function Questions({ onComplete }) {
  return (
    <div className="questions">
      <p>¿Para qué ocasión es?</p>
      <button onClick={() => onComplete({
        occasion: "evento",
        feeling: "entallado"
      })}>
        Continuar
      </button>
    </div>
  );
}
""")

# ------------------------
# RESULT
# ------------------------
write(COMP / "Result.jsx", """
import React from "react";

export default function Result({ garment }) {
  return (
    <div className="result">
      <h2>Esta prenda es la que mejor se adapta a ti</h2>
      <p>{garment.name}</p>
      <p>{garment.message}</p>
    </div>
  );
}
""")

# ------------------------
# DATABASE (piloto)
# ------------------------
write(DATA / "garments.js", """
export const garments = [
  {
    name: "Chaqueta fluida azul",
    type: "chaqueta",
    elasticity: "media",
    drape: "fluida",
    intended: ["evento", "trabajo"],
    bodyMatch: ["balanced", "long"]
  },
  {
    name: "Pantalón estructurado negro",
    type: "pantalón",
    elasticity: "baja",
    drape: "estructurada",
    intended: ["evento"],
    bodyMatch: ["balanced"]
  }
];
""")

# ------------------------
# ENGINE
# ------------------------
write(SRC / "engine" / "recommendation.js", """
import { garments } from "../data/garments";

export function recommendGarment(body, prefs) {
  return garments.find(g =>
    g.intended.includes(prefs.occasion)
  ) || garments[0];
}
""")

print("[JULES] PILOT STRUCTURE READY — no sizes, no numbers, pilot-compliant")
