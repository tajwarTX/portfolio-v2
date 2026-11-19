import { useCallback, useEffect, useRef, useState } from 'react';
import shohidFont from '../assets/fonts/shohid.ttf';
import './NameTag.css';

// Ported from v1 Home 2. Click / Enter cycles the name through six scripts,
// with a random per-letter reveal.
const NAMES = [
  { first: 'Mahir Tajwar', last: 'Chowdhury', font: 'nt-rocksalt', lang: 'en' },
  { first: 'gvwni ZvRIqvi', last: '†PŠayix', font: 'nt-shohid', lang: 'bn' },
  { first: '马希尔·塔杰瓦尔', last: '乔杜里', font: 'nt-zcool', lang: 'zh' },
  { first: 'ماهير تاجوار', last: 'تشودري', font: 'nt-lemonada', lang: 'ar', dir: 'rtl' },
  { first: 'माहिर ताजवार', last: 'चौधरी', font: 'nt-kalam', lang: 'hi' },
  { first: 'マヒル・タジュワル', last: 'チョウドゥリー', font: 'nt-rocknroll', lang: 'ja' },
];

const REVEAL_MS = 600;

function Reveal({ text, run }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.children);
    if (!run) {
      spans.forEach((s) => (s.style.opacity = '0'));
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      spans.forEach((s) => (s.style.opacity = '1'));
      return;
    }
    const delays = spans.map(() => Math.random() * REVEAL_MS);
    spans.forEach((s) => (s.style.opacity = '0'));
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = now - start;
      let done = true;
      spans.forEach((s, i) => {
        if (t >= delays[i]) s.style.opacity = '1';
        else done = false;
      });
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, run]);

  return (
    <span ref={ref} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} style={{ opacity: 0 }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function NameTag({ startDelay = 0 }) {
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setRun(1), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % NAMES.length);
    setRun((r) => r + 1);
  }, []);

  const n = NAMES[index];

  return (
    <div className="nametag-wrap">
      <style>{`@font-face{font-family:'LiShohidTahmid';src:url('${shohidFont}') format('truetype');font-display:swap;}`}</style>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="fabric-warp" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.015" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="nametag-sticker">
        <button type="button" className="nametag" onClick={next} aria-label="Name tag: Mahir Tajwar Chowdhury. Press to switch language.">
          <span className="nametag-head">
            <span className="nametag-hello">HELLO</span>
            <span className="nametag-my">my name is</span>
          </span>
          <span className="nametag-body" lang={n.lang} dir={n.dir || 'ltr'}>
            <span className={`nametag-line ${n.font}`}>
              <Reveal key={`f${index}-${run}`} text={n.first} run={run} />
            </span>
            <span className={`nametag-line ${n.font}`}>
              <Reveal key={`l${index}-${run}`} text={n.last} run={run} />
            </span>
          </span>
          <span className="nametag-foot" />
        </button>
      </div>
      <p className="nametag-hint" aria-hidden="true">
        <svg width="44" height="34" viewBox="0 0 44 34">
          <path d="M 40 4 C 30 2, 12 6, 8 26" stroke="currentColor" strokeWidth="1.8" fill="none" strokeDasharray="4 4" />
          <path d="M 3 20 L 8 28 L 14 21" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
        tap to switch languages
      </p>
    </div>
  );
}
