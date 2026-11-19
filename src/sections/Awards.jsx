import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { awards } from '../data/content';
import Lightbox from '../components/Lightbox';
import Reveal from '../components/Reveal';

const COUNTERS = [
  { kind: 'gold', label: 'Gold' },
  { kind: 'silver', label: 'Silver' },
  { kind: 'bronze', label: 'Bronze' },
  { kind: 'technical', label: 'Technical' },
  { kind: 'hackathon', label: 'Hackathon prizes' },
];

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'international', label: 'International' },
  { id: 'national', label: 'National' },
  { id: 'hackathon', label: 'Hackathons' },
  { id: 'other', label: 'Other' },
];

const RESULT_MARK = { gold: 'G', silver: 'S', bronze: 'B', technical: 'T', rank: '#', hackathon: 'H', other: '·' };

export default function Awards() {
  const [filter, setFilter] = useState('all');
  const list = useMemo(() => (filter === 'all' ? awards : awards.filter((a) => a.scope === filter)), [filter]);
  const firstWithCert = list.find((a) => a.cert);
  const [selected, setSelected] = useState(awards.find((a) => a.cert));
  const [zoom, setZoom] = useState(null);
  const current = list.includes(selected) ? selected : firstWithCert || list[0];

  const counts = useMemo(
    () => Object.fromEntries(COUNTERS.map((c) => [c.kind, awards.filter((a) => a.kind === c.kind).length])),
    [],
  );

  return (
    <section id="awards" className="section awards" aria-labelledby="awards-h">
      <div className="section-inner">
        <div className="section-head">
          <h2 id="awards-h" className="stencil">Awards</h2>
          <p>National and international robot olympiads since 2020, and hackathon prizes since 2026.</p>
        </div>

        <ul className="tags" aria-label="Medal count">
          {COUNTERS.map((c, i) => (
            <Reveal as="li" key={c.kind} className={`tag tag-${c.kind}`} rotate={[-3, 2, -1, 3, -2][i]} delay={i * 0.05}>
              <span className="tag-hole" aria-hidden="true" />
              <span className="tag-n">{String(counts[c.kind]).padStart(2, '0')}</span>
              <span className="tag-l">{c.label}</span>
            </Reveal>
          ))}
        </ul>

        <div className="filters" role="group" aria-label="Filter awards">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`filter ${filter === f.id ? 'is-on' : ''}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="awards-grid">
          <div className="cert-stack">
            <span className="cert-under paper" aria-hidden="true" />
            <span className="cert-under two paper" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current ? current.event + current.title + current.year + current.category : 'none'}
                className="cert-top"
                initial={{ opacity: 0, y: 24, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                exit={{ opacity: 0, y: -24, rotate: 3 }}
                transition={{ duration: 0.25 }}
              >
                {current?.cert ? (
                  <button type="button" className="cert-btn" onClick={() => setZoom(current)} aria-label={`Enlarge certificate: ${current.title}, ${current.event} ${current.year}`}>
                    <img src={current.cert.thumb} alt="" loading="lazy" />
                    <span className="cert-zoom label-tape">Enlarge</span>
                  </button>
                ) : (
                  <div className="cert-none paper">
                    <strong>{current?.title}</strong>
                    <span>{current?.event}</span>
                    <span className="placeholder-note">Certificate photo coming soon</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="log paper">
            <div className="log-head" aria-hidden="true">
              <span>Year</span>
              <span>Result</span>
              <span>Event · Category</span>
            </div>
            <ol className="log-rows">
              {list.map((a) => {
                const on = a === current;
                return (
                  <li key={a.event + a.title + a.year + a.category}>
                    <button type="button" className={`log-row ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={() => setSelected(a)}>
                      <span className="log-year">{a.year}</span>
                      <span className={`log-mark mark-${a.kind}`} aria-hidden="true">{RESULT_MARK[a.kind]}</span>
                      <span className="log-text">
                        <strong>{a.title}</strong>
                        <span>
                          {a.event} · {a.category}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
      <Lightbox
        src={zoom?.cert?.full}
        alt={zoom ? `${zoom.title}, ${zoom.event} ${zoom.year}` : ''}
        onClose={() => setZoom(null)}
      />
    </section>
  );
}
