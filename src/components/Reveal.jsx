/*
 * Reveal.jsx — a reusable "fade up when scrolled into view" wrapper.
 * ------------------------------------------------------------------
 * Wrap anything: <Reveal><h2>Hi</h2></Reveal>
 * framer-motion watches when the element enters the viewport
 * (whileInView) and animates opacity + position once.
 *
 * `delay` lets a list stagger: item 0 at 0s, item 1 at 0.06s, ...
 */
import { motion, useReducedMotion } from 'framer-motion';

export default function Reveal({ children, delay = 0, as = 'div', className }) {
  // Respect the OS "reduce motion" accessibility setting.
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} // trigger slightly before fully visible
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
