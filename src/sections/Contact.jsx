import { useEffect, useState } from 'react';
import { socials, person } from '../data/content';
import Reveal from '../components/Reveal';

const ENDPOINT = 'https://formspree.io/f/mvzddpak'; // same form as v1

export default function Contact() {
  const [wantResume, setWantResume] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  // "Resume" links point at #resume: tick the box and jump to the form.
  useEffect(() => {
    const check = () => {
      if (window.location.hash === '#resume') {
        setWantResume(true);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('c-name')?.focus({ preventScroll: true });
      }
    };
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('resume_requested', wantResume ? 'yes' : 'no');
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
      setWantResume(false);
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-h">
      <span id="resume" className="anchor" aria-hidden="true" />
      <div className="section-inner">
        <div className="section-head">
          <h2 id="contact-h" className="stencil">Contact</h2>
          <p>Internships, co-ops, team-ups for the next hackathon, or just questions about a robot. Send it over.</p>
        </div>

        <div className="contact-grid">
          <Reveal className="ship paper" rotate={-1}>
            <span className="tape" style={{ top: -14, left: -18, transform: 'rotate(-35deg)' }} />
            <span className="tape" style={{ bottom: -14, right: -18, transform: 'rotate(-35deg)' }} />
            <div className="ship-top">
              <div>
                <span className="ship-k">Ship to</span>
                <strong className="ship-to">{person.name.toUpperCase()}</strong>
                <span>Rochester, NY · USA</span>
              </div>
              <div className="ship-class" aria-hidden="true">
                <span>PRIORITY</span>
                <strong>1</strong>
              </div>
            </div>
            <div className="barcode" aria-hidden="true" />

            {status === 'sent' ? (
              <div className="ship-done" role="status">
                <strong>Sent. Thanks!</strong>
                <span>I usually reply within a couple of days{wantResume ? ', with the resume attached' : ''}.</span>
                <button type="button" className="btn" onClick={() => setStatus('idle')}>Send another</button>
              </div>
            ) : (
              <form className="ship-form" onSubmit={onSubmit}>
                <span className="ship-k">From</span>
                <label htmlFor="c-name">Your name</label>
                <input id="c-name" name="name" autoComplete="name" required />
                <label htmlFor="c-email">Your email</label>
                <input id="c-email" name="email" type="email" autoComplete="email" required />
                <label htmlFor="c-msg">Message</label>
                <textarea id="c-msg" name="message" rows={4} placeholder="What are you working on?" />
                <label className="ship-check">
                  <input type="checkbox" checked={wantResume} onChange={(e) => setWantResume(e.target.checked)} />
                  <span>Send me the resume PDF too</span>
                </label>
                <div className="ship-actions">
                  <button type="submit" className="btn signal" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : wantResume ? 'Send & request resume' : 'Send message'}
                  </button>
                  {status === 'error' && (
                    <span className="ship-error" role="alert">
                      That didn&rsquo;t go through. Check your connection and try again, or message me on LinkedIn.
                    </span>
                  )}
                </div>
              </form>
            )}
          </Reveal>

          <div className="contact-side">
            <h3 className="mini-h">Elsewhere</h3>
            <ul className="socials">
              {socials.map((s, i) => (
                <li key={s.href} style={{ transform: `rotate(${[-2, 1.5, -1, 2][i % 4]}deg)` }}>
                  <a className="label-tape" href={s.href} target="_blank" rel="noreferrer">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <footer className="foot">
        <span>Laid out on a cutting mat · Rochester, NY</span>
        <span>© {new Date().getFullYear()} {person.name}</span>
      </footer>
    </section>
  );
}
