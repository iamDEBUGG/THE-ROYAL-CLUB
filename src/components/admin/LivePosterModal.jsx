import React, { useState } from 'react';
import { useLive } from '../../context/LiveContext';
import './LivePosterModal.css';

export default function LivePosterModal({ member, onClose, onSuccess }) {
  const { startLive } = useLive();
  const [facebookUrl, setFacebookUrl] = useState('');
  const [title, setTitle] = useState(`${member.name} — Live Discussion`);
  const [timing, setTiming] = useState('Broadcasting Live Now');

  if (!member) return null;

  const handleSubmit = e => {
    e.preventDefault();
    startLive({
      member,
      facebookUrl: facebookUrl.trim() || 'https://www.facebook.com',
      title: title.trim(),
      timing: timing.trim()
    });
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="poster-modal-overlay" onClick={onClose}>
      <div className="poster-modal-card" onClick={e => e.stopPropagation()}>
        <button className="poster-modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {/* Left Side: Pre-made Visual Live Poster */}
        <div className="poster-preview-side">
          <div>
            <div className="poster-watermark">THE ROYAL CLUB</div>
            <div className="poster-live-tag">
              <span className="poster-live-dot" /> LIVE SESSION
            </div>
          </div>

          <div className="poster-image-frame">
            <img src={member.image} alt={member.name} />
          </div>

          <div>
            <h3 className="poster-member-title">{member.name}</h3>
            <div className="poster-member-state">{member.state}</div>
            <div className="poster-time-badge">{timing}</div>
          </div>
        </div>

        {/* Right Side: Form / Broadcast Controls */}
        <div className="poster-controls-side">
          <div>
            <h2 className="poster-controls-title">Go Live on Facebook</h2>
            <p className="poster-controls-sub">
              Paste the Facebook Live stream link for <strong>{member.name}</strong>. This will instantly update the Homepage Live banner and Broadcast room for all visitors.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="poster-form-group">
                <label className="poster-form-label">Facebook Live URL</label>
                <input
                  type="url"
                  className="poster-form-input"
                  placeholder="https://facebook.com/your-live-link..."
                  value={facebookUrl}
                  onChange={e => setFacebookUrl(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="poster-form-group">
                <label className="poster-form-label">Session Topic / Title</label>
                <input
                  type="text"
                  className="poster-form-input"
                  placeholder="e.g. Daily Inspiration & State Highlights"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div className="poster-form-group">
                <label className="poster-form-label">Timing Badge</label>
                <input
                  type="text"
                  className="poster-form-input"
                  value={timing}
                  onChange={e => setTiming(e.target.value)}
                />
              </div>

              <div className="poster-actions">
                <button type="button" className="btn-cancel-modal" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-broadcast-live">
                  <span>🔴</span> Launch Live Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
