import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './Nav.css';

const LINKS = [
  { href: '#about', label: 'About', tilt: -1.5 },
  { href: '#builds', label: 'Builds', tilt: 1 },
  { href: '#archive', label: 'Archive', tilt: -0.5 },
  { href: '#awards', label: 'Awards', tilt: 1.5 },
  { href: '#notes', label: 'Field notes', tilt: -1 },
  { href: '#contact', label: 'Contact', tilt: 0.5 },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#top" className="nav-logo" aria-label="Back to top">
        <span className="nav-logo-mark" />
      </a>

      <nav aria-label="Sections" className="nav-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="label-tape nav-tape" style={{ '--tilt': `${l.tilt}deg` }}>
            {l.label}
          </a>
        ))}
      </nav>

      <a href="#resume" className="btn signal nav-resume">
        Resume
      </a>

      <button
        type="button"
        className="label-tape nav-menu"
        aria-expanded={open}
        aria-controls="nav-sheet"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? 'Close' : 'Menu'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="nav-sheet"
            aria-label="Sections"
            className="nav-sheet paper"
            initial={{ y: -16, opacity: 0, rotate: -1 }}
            animate={{ y: 0, opacity: 1, rotate: -1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="tape" style={{ top: -12, left: '40%', transform: 'rotate(3deg)' }} />
            {[...LINKS, { href: '#resume', label: 'Resume' }].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
