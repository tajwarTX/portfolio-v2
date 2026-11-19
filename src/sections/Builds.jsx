import { builds } from '../data/content';
import { BinderClip } from '../components/Props';
import Reveal from '../components/Reveal';

function PhotoPlaceholder({ label }) {
  return (
    <div className="photo-ph" role="img" aria-label={`${label}: photo coming soon`}>
      <svg viewBox="0 0 40 30" width="40" height="30" aria-hidden="true">
        <rect x="1" y="5" width="38" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="20" cy="17" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13" y="1" width="12" height="5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span>Photo coming soon</span>
    </div>
  );
}

function Folder({ b, i }) {
  return (
    <Reveal as="article" className="folder" rotate={i % 2 ? 1.2 : -1.2} delay={i * 0.1} aria-labelledby={`b-${b.id}`}>
      <div className="folder-tab">
        <span className="label-tape">{b.event}</span>
      </div>
      <div className="folder-body">
        <div className="folder-sheet paper">
          <header className="folder-head">
            <h3 id={`b-${b.id}`} className="folder-title">{b.name}</h3>
            <p className="folder-meta">
              {b.duration} · {b.team}
            </p>
          </header>

          <ul className="prize-list" aria-label="Prizes">
            {b.prizes.map((p) => (
              <li key={p} className="prize-tag">
                <span className="prize-hole" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>

          <p className="folder-summary">{b.summary}</p>
          <p>{b.did}</p>

          <div className="bom">
            <h4>Bill of materials</h4>
            <ul>
              {b.bom.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="folder-links">
            {b.links.map((l) => (
              <a key={l.href} className="btn" href={l.href} target="_blank" rel="noreferrer">
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="folder-photo">
          <BinderClip className="folder-clip" />
          <PhotoPlaceholder label={b.name} />
        </div>

        <aside className="sticky-note" aria-label="Hardest part">
          <strong>Hardest part</strong>
          {b.hurdle}
        </aside>
      </div>
    </Reveal>
  );
}

export default function Builds() {
  return (
    <section id="builds" className="section builds" aria-labelledby="builds-h">
      <div className="section-inner">
        <div className="section-head">
          <h2 id="builds-h" className="stencil">Builds</h2>
          <p>Two hackathons in 2026, three prizes. Both built from bare components against the clock.</p>
        </div>
        <div className="folders">
          {builds.map((b, i) => (
            <Folder key={b.id} b={b} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
