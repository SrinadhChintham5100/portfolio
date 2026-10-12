/*
 * About.jsx — your story on the left, "what I do" cards on the right.
 */
import { about, focusAreas } from '../data.js';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Engineer for the parts where systems meet">
      <div className="about">
        <Reveal className="about__story">
          {about.map((para) => (
            <p key={para.slice(0, 20)}>{para}</p>
          ))}
        </Reveal>

        <div className="focus">
          {focusAreas.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05} className="card focus__card">
              <span className="focus__icon"><Icon name={f.icon} /></span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
