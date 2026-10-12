/*
 * Skills.jsx — grouped skill chips with a filter bar.
 * ------------------------------------------------------------------
 * `active` holds the selected group ('All' by default).
 * We DERIVE what to show from state rather than storing a second
 * filtered copy — a core React habit: keep state minimal.
 */
import { useState } from 'react';
import { skills } from '../data.js';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';

export default function Skills() {
  const [active, setActive] = useState('All');
  const groups = ['All', ...skills.map((s) => s.group)];
  const shown = active === 'All' ? skills : skills.filter((s) => s.group === active);

  return (
    <Section id="skills" eyebrow="Toolkit" title="Technologies I work with every day">
      <Reveal>
        <div className="filters" role="tablist" aria-label="Filter skills">
          {groups.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={active === g}
              className={`filter ${active === g ? 'is-active' : ''}`}
              onClick={() => setActive(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="skills">
        {shown.map((s) => (
          // key includes `active` so the cards re-animate when the filter changes
          <Reveal key={s.group + active} className="card skills__group">
            <h3>{s.group}</h3>
            <ul className="chips chips--lg">
              {s.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
