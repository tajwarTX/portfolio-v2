import { useEffect, useRef, useState } from 'react';

// The markings printed on a self-healing cutting mat: edge rulers with numbers,
// 30/45/60 degree guide lines and a protractor arc. Drawn to the page's real height.
export default function MatPrint() {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const unit = 40;
  const ticks = [];
  if (h) {
    for (let y = 0, i = 0; y < h; y += unit / 2, i++) {
      const major = i % 10 === 0;
      const mid = i % 2 === 0;
      const len = major ? 18 : mid ? 11 : 6;
      ticks.push(<line key={`l${i}`} x1="0" y1={y} x2={len} y2={y} />);
      ticks.push(<line key={`r${i}`} x1={w} y1={y} x2={w - len} y2={y} />);
      if (major && y > 0) {
        ticks.push(
          <text key={`t${i}`} x="24" y={y + 4} fontSize="11">
            {i / 2}
          </text>,
        );
      }
    }
    for (let x = 0, i = 0; x < w; x += unit / 2, i++) {
      const len = i % 10 === 0 ? 18 : i % 2 === 0 ? 11 : 6;
      ticks.push(<line key={`b${i}`} x1={x} y1="0" x2={x} y2={len} />);
    }
  }

  // guide lines anchored at a few points down the page
  const guides = [];
  if (w && h) {
    const anchors = [0.12, 0.38, 0.63, 0.86];
    anchors.forEach((a, k) => {
      const y = a * h;
      const fromLeft = k % 2 === 0;
      const x0 = fromLeft ? 0 : w;
      const dir = fromLeft ? 1 : -1;
      [30, 45, 60].forEach((deg) => {
        const r = (deg * Math.PI) / 180;
        const L = Math.min(w, 1400);
        guides.push(
          <line
            key={`${k}-${deg}`}
            x1={x0}
            y1={y}
            x2={x0 + dir * Math.cos(r) * L}
            y2={y + Math.sin(r) * L}
            strokeDasharray={deg === 45 ? 'none' : '2 6'}
          />,
        );
      });
      guides.push(
        <text key={`deg${k}`} x={x0 + dir * 150} y={y + 70} fontSize="12" textAnchor="middle">
          30°
        </text>,
        <text key={`deg45${k}`} x={x0 + dir * 120} y={y + 150} fontSize="12" textAnchor="middle">
          45°
        </text>,
      );
    });
  }

  return (
    <div ref={ref} className="mat-print" aria-hidden="true">
      {w > 0 && (
        <svg width={w} height={h} style={{ display: 'block' }}>
          <g stroke="currentColor" strokeWidth="1" opacity="0.5">
            {ticks.filter((t) => t.type === 'line')}
          </g>
          <g fill="currentColor" opacity="0.55" fontFamily="Archivo" fontWeight="600">
            {ticks.filter((t) => t.type === 'text')}
          </g>
          <g stroke="currentColor" strokeWidth="1" opacity="0.18">
            {guides.filter((g) => g.type === 'line')}
          </g>
          <g fill="currentColor" opacity="0.3" fontFamily="Archivo">
            {guides.filter((g) => g.type === 'text')}
          </g>
          {/* protractor arc near the awards section */}
          <g stroke="currentColor" fill="none" opacity="0.16" transform={`translate(${w * 0.82}, ${h * 0.52})`}>
            <circle r="220" />
            <circle r="160" strokeDasharray="2 5" />
            {Array.from({ length: 37 }).map((_, i) => {
              const r = (i * 5 * Math.PI) / 180;
              const inner = i % 6 === 0 ? 196 : 208;
              return <line key={i} x1={Math.cos(r) * inner} y1={-Math.sin(r) * inner} x2={Math.cos(r) * 220} y2={-Math.sin(r) * 220} />;
            })}
          </g>
        </svg>
      )}
    </div>
  );
}
