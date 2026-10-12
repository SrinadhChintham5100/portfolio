/*
 * Stats.jsx — a row of big numbers.
 * `.map()` turns the array from data.js into a list of elements.
 * The index `i` drives a staggered reveal delay.
 */
import { stats } from '../data.js';
import Reveal from './Reveal.jsx';

export default function Stats() {
  return (
    <div className="container">
      <div className="stats">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="stat">
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
