/*
 * Nav.jsx — sticky top navigation.
 * ------------------------------------------------------------------
 * New React concepts here:
 *  - useState: a variable that, when changed, re-renders the component.
 *  - useEffect: run code after render (here: listen to page scroll).
 *    The function we return from useEffect is the "cleanup" — React
 *    calls it when the component goes away, so we don't leak listeners.
 */
import { useEffect, useState } from 'react';
import { profile } from '../data.js';

const links = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false); // adds a background once you scroll
  const [open, setOpen] = useState(false); // mobile menu open/closed

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll); // cleanup
  }, []); // [] = run once, on first render

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo" aria-label="Back to top">
          {profile.initials}
        </a>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Menu</span>
          <span className={`burger ${open ? 'burger--open' : ''}`} />
        </button>

        <nav id="nav-menu" className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            // `key` helps React track list items efficiently between renders
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="btn btn--small" href={`mailto:${profile.email}`}>
            Hire me
          </a>
        </nav>
      </div>
    </header>
  );
}
