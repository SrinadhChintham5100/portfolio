/*
 * Hero.jsx — the first screen visitors see.
 * ------------------------------------------------------------------
 * PERFORMANCE TRICK: React.lazy + Suspense.
 * The 3D libraries are ~250 KB gzipped. Instead of making visitors wait
 * for them before seeing ANY text, we load them in a separate file
 * after the page appears. Until then, Suspense shows `fallback`
 * (a soft gradient glow), so the layout never jumps.
 */
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data.js';
import Icon from './Icon.jsx';

const Scene3D = lazy(() => import('./Scene3D.jsx'));

// Small helper: each line of the hero fades up a little after the previous one.
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  // IntersectionObserver tells us whether the hero is on screen.
  // When it isn't, we pause the 3D render loop — no point drawing what nobody sees.
  const ref = useRef(null);
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__text">
          <motion.p className="hero__status" {...fadeUp(0.05)}>
            <span className="dot" /> Open to senior full stack roles
          </motion.p>

          <motion.h1 {...fadeUp(0.15)}>
            Hi, I’m {profile.name}.
            <span className="hero__title">{profile.title}</span>
          </motion.h1>

          <motion.p className="hero__tagline" {...fadeUp(0.25)}>
            {profile.tagline}
          </motion.p>

          <motion.div className="hero__actions" {...fadeUp(0.35)}>
            <a className="btn" href="#work">
              See my work <Icon name="arrow" size={18} />
            </a>
            <a className="btn btn--ghost" href="#contact">
              Get in touch
            </a>
          </motion.div>

          <motion.p className="hero__meta" {...fadeUp(0.45)}>
            <Icon name="pin" size={16} /> {profile.location}
          </motion.p>
        </div>

        {/* aria-hidden: the 3D art is decoration; screen readers skip it */}
        <div className="hero__canvas" aria-hidden="true">
          <Suspense fallback={<div className="hero__fallback" />}>
            <Scene3D active={onScreen} />
          </Suspense>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span />
      </a>
    </section>
  );
}
