// Hand-drawn SVG workshop props that lie on the mat. Purely decorative.

export function SolderSpool({ size = 150, style, className }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 150 150" aria-hidden="true">
      <defs>
        <radialGradient id="spool-wire" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#e6e9eb" />
          <stop offset="60%" stopColor="#aeb3b6" />
          <stop offset="100%" stopColor="#6f7579" />
        </radialGradient>
        <pattern id="spool-wind" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="5" height="5" fill="url(#spool-wire)" />
          <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(60,64,66,0.35)" strokeWidth="1.2" />
        </pattern>
      </defs>
      <ellipse cx="78" cy="82" rx="66" ry="64" fill="rgba(0,0,0,0.45)" />
      <circle cx="75" cy="75" r="66" fill="#1e2124" />
      <circle cx="75" cy="75" r="60" fill="#2b2f33" />
      <circle cx="75" cy="75" r="54" fill="url(#spool-wind)" />
      <circle cx="75" cy="75" r="54" fill="url(#spool-wire)" opacity="0.35" />
      <circle cx="75" cy="75" r="22" fill="#1e2124" />
      <circle cx="75" cy="75" r="11" fill="#0d1a19" />
      <path d="M 122 52 C 140 40, 146 20, 138 6" stroke="#c4c8cb" strokeWidth="3" fill="none" strokeLinecap="round" />
      <text x="75" y="44" textAnchor="middle" fontSize="7" fill="#e7e4da" fontFamily="Archivo" fontWeight="700" letterSpacing="1">
        Sn63 Pb37
      </text>
    </svg>
  );
}

const BAND = { brown: '#6b3b1f', black: '#141414', red: '#b3261e', orange: '#d9621b', yellow: '#d8b23a', gold: '#b8923a', violet: '#6b3fa0', green: '#2e7d32' };

export function Resistor({ bands = ['brown', 'black', 'orange', 'gold'], width = 150, style, className }) {
  return (
    <svg className={className} style={style} width={width} height={width * 0.2} viewBox="0 0 150 30" aria-hidden="true">
      <line x1="0" y1="15" x2="150" y2="15" stroke="#b8bcbf" strokeWidth="2" />
      <line x1="0" y1="17" x2="150" y2="17" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      <rect x="44" y="6" width="62" height="18" rx="9" fill="#d7c6a0" />
      <rect x="44" y="6" width="62" height="7" rx="4" fill="rgba(255,255,255,0.25)" />
      {bands.map((b, i) => (
        <rect key={i} x={54 + i * 11 + (i === 3 ? 6 : 0)} y="6" width="5" height="18" fill={BAND[b]} />
      ))}
    </svg>
  );
}

export function Esp32({ width = 190, style, className }) {
  const pins = Array.from({ length: 15 });
  return (
    <svg className={className} style={style} width={width} height={width * 0.52} viewBox="0 0 190 98" aria-hidden="true">
      <rect x="4" y="6" width="186" height="92" rx="3" fill="rgba(0,0,0,0.4)" />
      <rect x="0" y="0" width="184" height="90" rx="3" fill="#1b2a52" />
      {pins.map((_, i) => (
        <g key={i}>
          <circle cx={22 + i * 10.5} cy="7" r="2.6" fill="#c9a43a" />
          <circle cx={22 + i * 10.5} cy="83" r="2.6" fill="#c9a43a" />
        </g>
      ))}
      <rect x="64" y="22" width="78" height="46" rx="2" fill="#c3c7ca" />
      <rect x="68" y="26" width="70" height="38" fill="#aeb3b6" />
      <text x="103" y="43" textAnchor="middle" fontSize="7" fontFamily="Archivo" fontWeight="700" fill="#3b4144">ESP32-WROOM</text>
      <text x="103" y="53" textAnchor="middle" fontSize="5" fontFamily="Archivo" fill="#3b4144">FCC ID 2AC7Z</text>
      <path d="M 146 24 h 22 v 6 h -16 v 6 h 16 v 6 h -16 v 6 h 16 v 6 h -22" stroke="#c9a43a" strokeWidth="2" fill="none" />
      <rect x="14" y="34" width="20" height="22" rx="2" fill="#c3c7ca" />
      <rect x="40" y="38" width="10" height="14" fill="#111" />
      <circle cx="44" cy="68" r="3" fill="#ff5a1f" opacity="0.9" />
    </svg>
  );
}

export function BinderClip({ size = 70, style, className }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 70 70" aria-hidden="true">
      <path d="M 18 30 C 14 10, 30 2, 35 14" stroke="#b8bcbf" strokeWidth="3" fill="none" />
      <path d="M 52 30 C 56 10, 40 2, 35 14" stroke="#9aa0a4" strokeWidth="3" fill="none" />
      <path d="M 8 30 h 54 l -6 28 h -42 z" fill="#151617" />
      <path d="M 10 32 h 50 l -1 5 h -48 z" fill="rgba(255,255,255,0.12)" />
    </svg>
  );
}

export function Screw({ size = 22, style, className }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.4)" />
      <circle cx="11" cy="11" r="10" fill="#9ea4a8" />
      <path d="M 5 11 h 12 M 11 5 v 12" stroke="#4a5054" strokeWidth="2.2" />
    </svg>
  );
}

export function PaperClip({ height = 70, style, className }) {
  return (
    <svg className={className} style={style} width={height * 0.35} height={height} viewBox="0 0 24 70" aria-hidden="true">
      <path
        d="M 7 22 V 56 a 5 5 0 0 0 10 0 V 12 a 8 8 0 0 0 -16 0 V 58 a 11 11 0 0 0 22 0 V 24"
        stroke="#c4c8cb"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
