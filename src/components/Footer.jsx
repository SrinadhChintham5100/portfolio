import { profile } from '../data.js';

export default function Footer() {
  // new Date().getFullYear() keeps the copyright year current automatically
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="muted">Built with React, Three.js and Vite · Hosted on Netlify</p>
      </div>
    </footer>
  );
}
