import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="royal-footer" role="contentinfo">
      <div className="royal-footer-container">
        {/* Brand & Vision Section */}
        <div className="royal-footer-brand">
          <div className="royal-footer-logo">
            <span className="royal-footer-crest">⚜️</span>
            <span className="royal-footer-title">THE ROYAL CLUB</span>
          </div>
          <p className="royal-footer-motto">
            Connect &bull; Grow &bull; Stay Aware &bull; Give Back
          </p>
          <p className="royal-footer-desc">
            A prestigious pan-India community of 13 visionaries hosting daily Facebook Live sessions and empowering positive social change through monthly donations.
          </p>
        </div>

        {/* Directory Links */}
        <div className="royal-footer-nav-col">
          <h4 className="royal-footer-heading">The Club</h4>
          <ul className="royal-footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us &amp; Impact</Link></li>
            <li><Link to="/members">Our 12 Members</Link></li>
            <li><Link to="/ceo">The CEO Board</Link></li>
          </ul>
        </div>

        {/* Broadcast & Live Links */}
        <div className="royal-footer-nav-col">
          <h4 className="royal-footer-heading">Broadcast</h4>
          <ul className="royal-footer-links">
            <li><Link to="/live">Live Now Stream</Link></li>
            <li><Link to="/schedule">Broadcast Schedule</Link></li>
            <li><Link to="/archives">Session Archives</Link></li>
            <li><Link to="/admin">CEO Command Center</Link></li>
          </ul>
        </div>

        {/* Community & Connect */}
        <div className="royal-footer-nav-col">
          <h4 className="royal-footer-heading">Community</h4>
          <p className="royal-footer-meta">
            Daily Live broadcasts streamed across India on Facebook.
          </p>
          <div className="royal-footer-badges">
            <span className="royal-footer-pill">🇮🇳 Pan-India</span>
            <span className="royal-footer-pill">🎙️ Daily Live</span>
            <span className="royal-footer-pill">🤝 Monthly Giving</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="royal-footer-bottom">
        <div className="royal-footer-bottom-inner">
          <p className="royal-footer-copy">
            &copy; {currentYear} <strong>THE ROYAL CLUB</strong>. All rights reserved. Unity in Diversity.
          </p>
          <div className="royal-footer-bottom-links">
            <span>Uttrakhand &bull; Bihar &bull; UP &bull; Bengal &bull; MP &bull; Sikkim</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
