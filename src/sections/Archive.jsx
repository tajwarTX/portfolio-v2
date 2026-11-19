import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { archive } from '../data/content';
import Reveal from '../components/Reveal';

const ModelViewer = lazy(() => import('../components/ModelViewer'));

function useNear(ref, margin = '400px') {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}

const isSmall = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

export default function Archive() {
  const [active, setActive] = useState(0);
  const [optIn, setOptIn] = useState(() => !isSmall());
  const stage = useRef(null);
  const near = useNear(stage);
  const item = archive[active];

  return (
    <section id="archive" className="section archive" aria-labelledby="archive-h">
      <div className="section-inner">
        <div className="section-head">
          <h2 id="archive-h" className="stencil">Archive</h2>
          <p>Robots and flying things from six years of olympiads. Drag to turn them over.</p>
        </div>

        <div className="archive-grid">
          <div className="turntable" ref={stage}>
            <div className="turntable-print" aria-hidden="true" />
            {near && optIn ? (
              <Suspense fallback={<p className="turntable-msg">Loading viewer…</p>}>
                <ModelViewer item={item} />
              </Suspense>
            ) : (
              <div className="turntable-msg">
                {!optIn ? (
                  <button type="button" className="btn signal" onClick={() => setOptIn(true)}>
                    Load 3D model (~1 MB)
                  </button>
                ) : (
                  <span>Setting up the turntable…</span>
                )}
              </div>
            )}
            <span className="turntable-label label-tape">{item.part}</span>
          </div>

          <Reveal className="spec paper" rotate={1.2}>
            <span className="tape kapton" style={{ top: -12, right: 30, transform: 'rotate(6deg)', width: 90 }} />
            <h3 className="spec-title">{item.name}</h3>
            <dl className="spec-table">
              <div><dt>Part no.</dt><dd>{item.part}</dd></div>
              <div><dt>Year</dt><dd>{item.year}</dd></div>
              <div><dt>Built for</dt><dd>{item.event}</dd></div>
              <div><dt>My role</dt><dd>{item.role}</dd></div>
            </dl>
            <p className="spec-notes">
              Lorem ipsum notes about how this one was built: the drivetrain, the controller, what broke the night before
              competition, and what I would change on the next revision.
            </p>
            {item.placeholder && <p className="placeholder-note">Placeholder details. Real write-up coming soon.</p>}
          </Reveal>
        </div>

        <div className="drawers" role="tablist" aria-label="Choose a model">
          {archive.map((a, i) => (
            <button
              key={a.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`drawer ${i === active ? 'is-open' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="drawer-card">
                <span className="drawer-part">{a.part}</span>
                <span className="drawer-name">{a.name}</span>
              </span>
              <span className="drawer-pull" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
