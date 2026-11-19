import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, useReducedMotion } from 'motion/react';

const TRAVEL = 150; // mm shown at the bottom of the page

// Digital caliper pinned to the right edge (desktop). Its jaw opens as you scroll
// and the LCD reads the scroll position in millimetres.
export function Caliper() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const p = reduce ? scrollYProgress : smooth;
  const y = useTransform(p, [0, 1], [0, 430]);
  const lcd = useRef(null);

  useMotionValueEvent(p, 'change', (v) => {
    if (lcd.current) lcd.current.textContent = (v * TRAVEL).toFixed(2);
  });

  const ticks = [];
  for (let i = 0; i <= 90; i++) {
    const yy = 92 + i * 5;
    const len = i % 10 === 0 ? 12 : i % 5 === 0 ? 8 : 5;
    ticks.push(<line key={i} x1={44} y1={yy} x2={44 + len} y2={yy} />);
    if (i % 10 === 0) {
      ticks.push(
        <text key={`n${i}`} x={60} y={yy + 3} fontSize="7">
          {i / 10}
        </text>,
      );
    }
  }

  return (
    <motion.div
      className="caliper"
      aria-hidden="true"
      initial={reduce ? false : { x: 140, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.9, type: 'spring', stiffness: 120, damping: 18 }}
    >
      <svg viewBox="0 0 110 600" preserveAspectRatio="xMidYMin meet">
        <defs>
          <linearGradient id="steel" x1="0" x2="1">
            <stop offset="0" stopColor="#8c9396" />
            <stop offset="0.45" stopColor="#dfe3e5" />
            <stop offset="1" stopColor="#7c8386" />
          </linearGradient>
          <linearGradient id="steel-h" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dfe3e5" />
            <stop offset="1" stopColor="#8c9396" />
          </linearGradient>
        </defs>
        {/* shadow */}
        <rect x="46" y="28" width="34" height="566" rx="3" fill="rgba(0,0,0,0.45)" />
        {/* beam */}
        <rect x="40" y="20" width="34" height="566" rx="3" fill="url(#steel)" />
        <g stroke="#2a2e30" strokeWidth="0.9" fill="#2a2e30" fontFamily="Archivo" fontWeight="700">
          {ticks}
        </g>
        {/* fixed jaw (top) */}
        <path d="M 40 22 L 6 30 L 2 46 L 40 70 Z" fill="url(#steel-h)" stroke="#6f7579" strokeWidth="0.8" />
        <path d="M 74 26 L 96 32 L 96 40 L 74 46 Z" fill="url(#steel-h)" stroke="#6f7579" strokeWidth="0.8" />

        {/* slider */}
        <motion.g style={{ y }}>
          <path d="M 40 74 L 2 98 L 6 114 L 40 122 Z" fill="url(#steel-h)" stroke="#6f7579" strokeWidth="0.8" />
          <rect x="30" y="70" width="80" height="120" rx="8" fill="rgba(0,0,0,0.45)" transform="translate(4 6)" />
          <rect x="30" y="70" width="76" height="120" rx="8" fill="#22272a" />
          <rect x="30" y="70" width="76" height="10" rx="5" fill="rgba(255,255,255,0.08)" />
          {/* LCD */}
          <rect x="37" y="84" width="62" height="34" rx="3" fill="#9fae95" />
          <rect x="37" y="84" width="62" height="34" rx="3" fill="none" stroke="#11140f" strokeWidth="1.5" />
          <text
            ref={lcd}
            x="94"
            y="108"
            textAnchor="end"
            fontSize="17"
            fontFamily="Archivo"
            fontWeight="700"
            style={{ fontStretch: '75%', fontVariantNumeric: 'tabular-nums' }}
            fill="#1a2016"
          >
            0.00
          </text>
          <text x="41" y="93" fontSize="6" fill="#1a2016" fontFamily="Archivo" fontWeight="700">
            mm
          </text>
          {/* buttons */}
          <circle cx="50" cy="134" r="6" fill="#ff5a1f" />
          <text x="50" y="148" textAnchor="middle" fontSize="5" fill="#cfd4d6" fontFamily="Archivo" fontWeight="700">ON/OFF</text>
          <circle cx="68" cy="134" r="6" fill="#3a4044" />
          <text x="68" y="148" textAnchor="middle" fontSize="5" fill="#cfd4d6" fontFamily="Archivo" fontWeight="700">ZERO</text>
          <circle cx="86" cy="134" r="6" fill="#3a4044" />
          <text x="86" y="148" textAnchor="middle" fontSize="5" fill="#cfd4d6" fontFamily="Archivo" fontWeight="700">mm/in</text>
          {/* thumb wheel */}
          <rect x="62" y="166" width="20" height="16" rx="3" fill="#3a4044" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={65 + i * 3.5} y1="168" x2={65 + i * 3.5} y2="180" stroke="#1d2123" />
          ))}
        </motion.g>
      </svg>
    </motion.div>
  );
}

// On small screens the caliper turns into a thin ruler that fills as you scroll.
export function ScrollRuler() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="scroll-ruler" aria-hidden="true">
      <motion.div className="scroll-ruler-fill" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
