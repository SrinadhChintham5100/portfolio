/*
 * Highlights.jsx — featured work, as cards with a subtle 3D tilt on hover.
 * ------------------------------------------------------------------
 * The tilt is CSS 3D (perspective + rotateX/rotateY), not WebGL — it's
 * cheap and smooth. We read the mouse position inside the card and
 * write it into CSS variables (--rx, --ry); styles.css does the rest.
 * Writing to CSS variables (instead of React state) avoids re-rendering
 * React 60 times a second.
 */
import { highlights } from '../data.js';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';

function TiltCard({ item }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 8).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`); // for the light sheen
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
  };
  const onLeave = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <article className="card work__card" onMouseMove={onMove} onMouseLeave={onLeave}>
      <span className="tag">{item.tag}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <ul className="chips" aria-label="Technologies">
        {item.tech.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </article>
  );
}

export default function Highlights() {
  return (
    <Section id="work" eyebrow="Selected work" title="Things I’ve built that I’m proud of">
      <div className="work">
        {highlights.map((h, i) => (
          <Reveal key={h.title} delay={(i % 3) * 0.07}>
            <TiltCard item={h} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
