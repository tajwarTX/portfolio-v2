import { useState } from 'react';
import { gallery16, timeline } from '../data/content';
import Lightbox from '../components/Lightbox';
import Reveal from '../components/Reveal';

const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5, -1, 2.5];

export default function FieldNotes() {
  const [zoom, setZoom] = useState(null);
  const first = timeline[0].year;
  const span = timeline[timeline.length - 1].year - first;

  return (
    <section id="notes" className="section notes" aria-labelledby="notes-h">
      <div className="section-inner">
        <div className="section-head">
          <h2 id="notes-h" className="stencil">Field notes</h2>
          <p>Competition floors, pit tables and test flights, 2020 to 2025.</p>
        </div>

        <div className="tape-measure" aria-label="Timeline">
          <div className="tm-case" aria-hidden="true">
            <span className="tm-case-ring" />
          </div>
          <div className="tm-blade">
            <div className="tm-ticks" aria-hidden="true" />
            <ol className="tm-stops">
              {timeline.map((t) => (
                <li key={t.year} style={{ '--pos': (t.year - first) / span }}>
                  <span className="tm-year">{t.year}</span>
                  <span className="tm-text">{t.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ul className="contact-sheet">
          {gallery16.map((g, i) => (
            <Reveal as="li" key={g.thumb} rotate={TILTS[i % TILTS.length]} delay={(i % 4) * 0.05}>
              <button type="button" className="print" onClick={() => setZoom(g)} aria-label={`Enlarge photo: ${g.caption}`}>
                {i % 3 === 0 && <span className="tape" style={{ top: -12, left: '30%', width: 70, height: 24, transform: 'rotate(-6deg)' }} />}
                <img src={g.thumb} alt="" loading="lazy" width="600" height="400" />
                <span className="print-caption">{g.caption}</span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
      <Lightbox src={zoom?.full} alt={zoom?.caption || ''} onClose={() => setZoom(null)} />
    </section>
  );
}
