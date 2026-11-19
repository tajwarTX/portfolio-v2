import { motion, useReducedMotion } from 'motion/react';
import NameTag from '../components/NameTag';
import { SolderSpool, Resistor, Esp32, Screw } from '../components/Props';
import { person } from '../data/content';

export default function Hero() {
  const reduce = useReducedMotion();
  const slap = reduce
    ? {}
    : {
        initial: { y: -60, scale: 1.35, opacity: 0, rotate: -9 },
        animate: { y: 0, scale: 1, opacity: 1, rotate: 0 },
        transition: { type: 'spring', stiffness: 260, damping: 17, mass: 0.9, delay: 0.15 },
      };
  const lay = (delay, from = { scaleX: 0 }) =>
    reduce ? {} : { initial: { ...from, opacity: 0 }, animate: { scaleX: 1, opacity: 1, x: 0, y: 0 }, transition: { delay, duration: 0.35, ease: [0.2, 0.8, 0.2, 1] } };
  const drift = (delay, x = 0, y = 30) =>
    reduce ? {} : { initial: { opacity: 0, x, y }, animate: { opacity: 1, x: 0, y: 0 }, transition: { delay, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } };

  return (
    <section id="top" className="hero section" aria-label="Introduction">
      <div className="hero-inner section-inner">
        <h1 className="sr-only">{person.name}</h1>

        <motion.div className="hero-tag" {...slap}>
          <NameTag startDelay={reduce ? 0 : 450} />
          <motion.span className="tape kapton hero-kapton" style={{ originX: 0 }} {...lay(0.55)} />
        </motion.div>

        <motion.p className="hero-line" style={{ originX: 0 }} {...lay(0.8)}>
          {person.tagline}
        </motion.p>

        <motion.div className="hero-cta" {...drift(1.0, 0, 12)}>
          <a className="btn" href="#builds">See what I&rsquo;ve built</a>
          <a className="btn signal" href="#resume">Get my resume</a>
        </motion.div>

        <motion.div className="prop prop-spool" {...drift(0.35, 40, -20)}>
          <SolderSpool size={170} />
        </motion.div>
        <motion.div className="prop prop-esp" {...drift(0.5, 30, 30)}>
          <Esp32 width={200} />
        </motion.div>
        <motion.div className="prop prop-res1" {...drift(0.6, -30, 10)}>
          <Resistor width={160} />
        </motion.div>
        <motion.div className="prop prop-res2" {...drift(0.65, -20, 20)}>
          <Resistor width={140} bands={['yellow', 'violet', 'red', 'gold']} />
        </motion.div>
        <Screw className="prop prop-screw1" />
        <Screw className="prop prop-screw2" size={18} />

        <a href="#about" className="hero-scroll" aria-label="Scroll to About">
          <span>scroll</span>
          <svg width="14" height="40" viewBox="0 0 14 40" aria-hidden="true">
            <path d="M 7 0 V 36 M 1 30 L 7 37 L 13 30" stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>
        </a>
      </div>
    </section>
  );
}
