/*
 * Section.jsx — every section shares the same frame: an anchor id
 * (so the nav can link to #experience etc.), a small label, and a title.
 * Writing it once here keeps all sections consistent (DRY principle).
 */
import Reveal from './Reveal.jsx';

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
