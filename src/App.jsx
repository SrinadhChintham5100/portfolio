/*
 * App.jsx — the page layout.
 * ------------------------------------------------------------------
 * A React "component" is just a function that returns UI (JSX).
 * App composes all the section components top to bottom, like
 * assembling beans in a Spring configuration.
 */
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import About from './components/About.jsx';
import Highlights from './components/Highlights.jsx';
import Experience from './components/Experience.jsx';
import Skills from './components/Skills.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      {/* "Skip link": lets keyboard / screen-reader users jump past the nav. */}
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Highlights />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
