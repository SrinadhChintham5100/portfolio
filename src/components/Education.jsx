import { education } from '../data.js';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Where the foundation came from">
      <div className="edu">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.08} className="card edu__card">
            <span className="edu__year">{e.year}</span>
            <h3>{e.degree}</h3>
            <p>{e.school}</p>
            <p className="muted">{e.place}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
