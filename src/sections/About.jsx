import { person, roles } from '../data/content';
import { PaperClip } from '../components/Props';
import Reveal from '../components/Reveal';

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-h">
      <div className="section-inner">
        <div className="section-head">
          <h2 id="about-h" className="stencil">About</h2>
          <p>Engineer by training, builder by habit.</p>
        </div>

        <div className="about-grid">
          <Reveal className="polaroid" rotate={-4}>
            <span className="tape" style={{ top: -14, left: 22, transform: 'rotate(-8deg)' }} />
            <span className="tape" style={{ bottom: -12, right: 18, transform: 'rotate(-4deg)', width: 80 }} />
            <img src={person.photo} alt="Portrait of Mahir Tajwar Chowdhury" width="600" height="600" loading="lazy" />
            <span className="polaroid-caption">me, probably holding a soldering iron</span>
          </Reveal>

          <Reveal className="drawing paper" rotate={1} delay={0.08}>
            <PaperClip className="drawing-clip" height={78} />
            <div className="drawing-body">
              {person.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="placeholder-note">Placeholder bio. Swap in your own words in src/data/content.js.</p>
            </div>
            <table className="title-block">
              <caption className="sr-only">Drawing title block</caption>
              <tbody>
                {person.titleBlock.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>

        <div className="about-lower">
          <div className="skills" aria-label="Skills">
            <h3 className="mini-h">On the bench</h3>
            <ul>
              {person.skills.map((s, i) => (
                <li key={s} className="label-tape" style={{ transform: `rotate(${((i * 37) % 7) - 3}deg)` }}>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="roles">
            <h3 className="mini-h">Roles</h3>
            {roles.map((r, i) => (
              <Reveal key={r.org} className="index-card" rotate={i % 2 ? 2 : -1.5} delay={i * 0.08}>
                <span className="pin" aria-hidden="true" />
                <strong>{r.what}</strong>
                <span>{r.org}</span>
                <span className="index-when">{r.when}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
