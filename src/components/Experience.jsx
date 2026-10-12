/*
 * Experience.jsx — a vertical timeline.
 * ------------------------------------------------------------------
 * Long job descriptions overwhelm visitors, so each role shows its
 * first 3 points and a "Show more" button reveals the rest.
 * That open/closed flag is per-card state (useState inside the card).
 */
import { useState } from 'react';
import { experience } from '../data.js';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';

const PREVIEW = 3;

function Role({ job }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? job.points : job.points.slice(0, PREVIEW);
  const hidden = job.points.length - PREVIEW;

  return (
    <div className="role">
      <span className="role__dot" aria-hidden="true" />
      <div className="card role__card">
        <div className="role__head">
          <div>
            <h3>{job.role}</h3>
            <p className="role__company">
              {job.company} <span>· {job.place}</span>
            </p>
          </div>
          <span className="role__period">{job.period}</span>
        </div>

        <ul className="role__points">
          {visible.map((p) => <li key={p}>{p}</li>)}
        </ul>

        {hidden > 0 && (
          <button className="link-btn" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
            {expanded ? 'Show less' : `Show ${hidden} more`}
          </button>
        )}

        <ul className="chips" aria-label="Stack">
          {job.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="A decade across government, telecom and aerospace">
      <div className="timeline">
        {experience.map((job) => (
          <Reveal key={job.company + job.period}>
            <Role job={job} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
