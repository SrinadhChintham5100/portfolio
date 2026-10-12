/*
 * Contact.jsx — email, LinkedIn, and (later) GitHub.
 * ------------------------------------------------------------------
 * The links list is BUILT from data.js and `.filter(Boolean)` drops
 * any entry that is empty. So when you add your GitHub URL to
 * data.js, the GitHub button appears automatically — no code change.
 *
 * Security note: target="_blank" opens a new tab; rel="noopener noreferrer"
 * stops the new page from controlling yours (a real-world best practice).
 */
import { useState } from 'react';
import { profile } from '../data.js';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`; // fallback
    }
  };

  const links = [
    { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    profile.linkedin && { icon: 'linkedin', label: 'LinkedIn', value: 'Connect with me', href: profile.linkedin, external: true },
    profile.github && { icon: 'github', label: 'GitHub', value: 'See my code', href: profile.github, external: true },
  ].filter(Boolean);

  return (
    <Section id="contact" eyebrow="Contact" title="Let’s build something together">
      <Reveal className="contact">
        <p className="contact__lead">
          I’m open to senior full stack and backend roles, especially at product companies
          building at scale. The fastest way to reach me is email.
        </p>

        <div className="contact__links">
          {links.map((l) => (
            <a
              key={l.label}
              className="card contact__link"
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="focus__icon"><Icon name={l.icon} /></span>
              <span>
                <strong>{l.label}</strong>
                <span className="muted">{l.value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="contact__actions">
          <button className="btn" onClick={copyEmail}>
            {copied ? 'Copied ✓' : 'Copy email address'}
          </button>
          <a className="btn btn--ghost" href={profile.resumeFile} download>
            <Icon name="download" size={18} /> Download résumé
          </a>
        </div>
        {/* aria-live announces the "Copied" change to screen-reader users */}
        <p className="sr-only" aria-live="polite">{copied ? 'Email copied' : ''}</p>
      </Reveal>
    </Section>
  );
}
