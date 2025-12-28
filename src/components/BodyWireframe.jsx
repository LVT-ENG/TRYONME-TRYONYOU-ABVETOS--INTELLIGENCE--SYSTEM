/**
 * Body Wireframe Visualizer
 * Renders a technical, schematic view of user proportions based on measurements.
 * "No avatars, only real proportions"
 */

export const BodyWireframe = ({ measurements }) => {
  const { height, shoulders, chest, waist, hips, arm_length, leg_length, torso_length } = measurements;

  // Default fallbacks if measurements missing (prevent crash)
  const h = height || 175;
  const s = shoulders || 45;
  const c = chest || 95;
  const w = waist || 80;
  const hi = hips || 100;
  const al = arm_length || 60;
  const ll = leg_length || 85;
  const tl = torso_length || 50;

  // Scale factors for SVG (Canvas: 200x400)
  // Height maps to ~350px. Scale = 350 / h
  const scale = 350 / h;
  const centerX = 100;
  const startY = 20;

  // Y Positions
  const headSize = 25; // Fixed head size for schematic
  const neckY = startY + headSize;
  const shoulderY = neckY + 10;
  const chestY = shoulderY + (tl * 0.3 * scale); // Chest approx 30% down torso
  const waistY = shoulderY + (tl * 0.7 * scale); // Waist approx 70% down torso
  const hipsY = shoulderY + (tl * scale);
  const feetY = hipsY + (ll * scale);

  // Widths (half-widths for symmetry)
  const shoulderHalf = (s * scale) / 2;
  const chestHalf = (c / 3.14 * scale) / 2; // Approx diameter from circumference
  const waistHalf = (w / 3.14 * scale) / 2;
  const hipsHalf = (hi / 3.14 * scale) / 2;

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="400" viewBox="0 0 200 400" className="opacity-80">
        <defs>
          <linearGradient id="wireGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D3B26A" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#D3B26A" stopOpacity="0.2"/>
          </linearGradient>
        </defs>

        {/* Center Line (Axis) */}
        <line x1={centerX} y1={0} x2={centerX} y2={400} stroke="#333" strokeDasharray="4 4" />

        {/* Head (Schematic Circle) */}
        <circle cx={centerX} cy={startY + headSize/2} r={headSize/2} stroke="#D3B26A" fill="none" strokeWidth="1.5" />

        {/* Shoulders Line */}
        <line x1={centerX - shoulderHalf} y1={shoulderY} x2={centerX + shoulderHalf} y2={shoulderY} stroke="#D3B26A" strokeWidth="2" />
        <text x={centerX + shoulderHalf + 10} y={shoulderY + 4} fill="#666" fontSize="10" fontFamily="monospace">{s}cm</text>

        {/* Chest Line (Schematic width) */}
        <line x1={centerX - chestHalf} y1={chestY} x2={centerX + chestHalf} y2={chestY} stroke="#D3B26A" strokeWidth="1" strokeDasharray="2 2" />

        {/* Waist Line */}
        <line x1={centerX - waistHalf} y1={waistY} x2={centerX + waistHalf} y2={waistY} stroke="#D3B26A" strokeWidth="1.5" />

        {/* Hips Line */}
        <line x1={centerX - hipsHalf} y1={hipsY} x2={centerX + hipsHalf} y2={hipsY} stroke="#D3B26A" strokeWidth="2" />

        {/* Torso Outline (Simplified Trapezoid connection) */}
        <path d={`
          M ${centerX - shoulderHalf} ${shoulderY}
          L ${centerX - chestHalf} ${chestY}
          L ${centerX - waistHalf} ${waistY}
          L ${centerX - hipsHalf} ${hipsY}
          L ${centerX + hipsHalf} ${hipsY}
          L ${centerX + waistHalf} ${waistY}
          L ${centerX + chestHalf} ${chestY}
          L ${centerX + shoulderHalf} ${shoulderY}
        `} fill="url(#wireGradient)" stroke="none" opacity="0.1" />

        {/* Legs (Lines) */}
        <line x1={centerX - hipsHalf + 10} y1={hipsY} x2={centerX - hipsHalf + 10} y2={feetY} stroke="#D3B26A" strokeWidth="1.5" />
        <line x1={centerX + hipsHalf - 10} y1={hipsY} x2={centerX + hipsHalf - 10} y2={feetY} stroke="#D3B26A" strokeWidth="1.5" />

        {/* Arms (Lines) */}
        <line x1={centerX - shoulderHalf} y1={shoulderY} x2={centerX - shoulderHalf - 15} y2={shoulderY + (al * scale)} stroke="#D3B26A" strokeWidth="1.5" />
        <line x1={centerX + shoulderHalf} y1={shoulderY} x2={centerX + shoulderHalf + 15} y2={shoulderY + (al * scale)} stroke="#D3B26A" strokeWidth="1.5" />

        {/* Height Marker */}
        <line x1={10} y1={startY} x2={10} y2={feetY} stroke="#666" strokeWidth="1" />
        <line x1={5} y1={startY} x2={15} y2={startY} stroke="#666" strokeWidth="1" />
        <line x1={5} y1={feetY} x2={15} y2={feetY} stroke="#666" strokeWidth="1" />
        <text x={15} y={(startY + feetY)/2} fill="#666" fontSize="10" fontFamily="monospace" transform={`rotate(-90 15 ${(startY + feetY)/2})`}>{h}cm</text>

      </svg>
      <div className="text-xs text-abvetos-gold font-mono mt-2 uppercase tracking-widest">
        Normalized Wireframe
      </div>
    </div>
  );
};
