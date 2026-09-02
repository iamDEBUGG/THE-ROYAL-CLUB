import React from 'react';
import { Link } from 'react-router-dom';
import { Show, SignInButton, UserButton, useUser } from '@clerk/react';
import { useLive } from '../../context/LiveContext';
import ProfileCard from '../cards/ProfileCard';
import CeoDashboard from '../admin/CeoDashboard';
import './CeoBoardPage.css';

export default function CeoBoardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { isLive, currentLive } = useLive();

  const isCeoAuthenticated = isSignedIn;

  return (
    <main className="ceo-page">
      <div className="ceo-container">
        {/* Top Portal Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
          <Show when="signed-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(27,77,62,0.5)', padding: '0.4rem 0.9rem', borderRadius: '999px', border: '1px solid rgba(201,162,39,0.3)' }}>
              <span style={{ fontSize: '0.8rem', color: '#C9A227', fontWeight: 600 }}>CEO Logged In</span>
              <UserButton afterSignOutUrl="/admin" />
            </div>
          </Show>

          <Show when="signed-out">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SignInButton mode="modal">
                <button
                  style={{
                    background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.2) 0%, rgba(201, 162, 39, 0.1) 100%)',
                    border: '1px solid rgba(201, 162, 39, 0.4)',
                    color: '#F5F0E6',
                    padding: '0.45rem 1.1rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <span></span> CEO Portal Login
                </button>
              </SignInButton>
            </div>
          </Show>
        </div>

        {/* If CEO is Authenticated -> Show CEO Dashboard */}
        {isCeoAuthenticated ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="ceo-badge">
                <span></span> CEO Command Center
              </div>
              <h1 className="ceo-title">Broadcast &amp; Live Dispatcher</h1>
              <p className="ceo-subtitle">
                Welcome, Rajendra Singh Papola. Manage live broadcasts, dispatch member sessions with pre-made posters, adjust schedules, and post moments.
              </p>
            </div>

            <CeoDashboard />
          </div>
        ) : (
          /* Public Visitor View */
          <div>
            {/* Header */}
            <header className="ceo-header">
              <div className="ceo-badge">
                The Royal Club Leadership
              </div>
              <h1 className="ceo-title">The CEO Board</h1>
              <p className="ceo-subtitle">
                Meet the visionary leader guiding The Royal Club — uniting voices from every state of India, fostering collective growth, and driving monthly social impact.
              </p>
            </header>

            {/* Showcase Grid */}
            <div className="ceo-showcase">
              {/* Profile Card Side */}
              <div className="ceo-card-side">
                <div className="ceo-card-glow-wrap">
                  <ProfileCard
                    name="Rajendra Singh Papola"
                    title="Founder & CEO"
                    status="Uttrakhand, India"
                    avatarUrl="/CEO-Photo/Rajendra-Singh-Papola-Uttrakhand.jpg"
                    miniAvatarUrl="/CEO-Photo/Rajendra-Singh-Papola-Uttrakhand.jpg"
                    showUserInfo={false}
                    enableTilt={true}
                    enableMobileTilt={false}
                    behindGlowColor="rgba(201, 162, 39, 0.65)"
                    behindGlowEnabled={true}
                    innerGradient="linear-gradient(145deg, rgba(27, 77, 62, 0.6) 0%, rgba(201, 162, 39, 0.25) 100%)"
                  />
                </div>
              </div>

              {/* Bio & Vision Side */}
              <div className="ceo-info-side">
                <div className="ceo-lead-block">
                  <span className="ceo-tag-origin">Uttrakhand, India</span>
                  <h2 className="ceo-lead-name">Rajendra Singh Papola</h2>
                  <div className="ceo-lead-role">Founder &amp; Chief Executive Officer</div>
                </div>

                <div className="ceo-vision-card">
                  <div className="ceo-quote-mark">&ldquo;</div>
                  <p className="ceo-quote-text">
                    The Royal Club was founded with a singular conviction: that real strength lies in unity and purposeful action. Bringing together dynamic leaders from every corner of India, we are not just hosting daily live broadcasts — we are building connections, inspiring awareness, and giving back to society every single month.
                  </p>
                  <p className="ceo-vision-desc">
                    Under the leadership of Rajendra Singh Papola, The Royal Club has blossomed into a thriving pan-India family where 12 distinguished member voices share daily wisdom, uplift communities, and provide monthly donations to those in need.
                  </p>
                </div>

                {/* Core Leadership Pillars */}
                <div className="ceo-pillars-grid">
                  <div className="ceo-pillar-item">
                    <span className="ceo-pillar-icon"></span>
                    <h3 className="ceo-pillar-title">Pan-India Unity</h3>
                    <p className="ceo-pillar-text">Connecting leaders across different Indian states into one united family.</p>
                  </div>
                  <div className="ceo-pillar-item">
                    <span className="ceo-pillar-icon"></span>
                    <h3 className="ceo-pillar-title">Daily Live Broadcasts</h3>
                    <p className="ceo-pillar-text">Regular Facebook Live sessions on trending topics, awareness, and growth.</p>
                  </div>
                  <div className="ceo-pillar-item">
                    <span className="ceo-pillar-icon"></span>
                    <h3 className="ceo-pillar-title">Monthly Giving</h3>
                    <p className="ceo-pillar-text">Dedicated monthly charity initiatives supporting people in need.</p>
                  </div>
                  <div className="ceo-pillar-item">
                    <span className="ceo-pillar-icon"></span>
                    <h3 className="ceo-pillar-title">Empowerment</h3>
                    <p className="ceo-pillar-text">Enabling every member to expand their reach, share perspective, and excel.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CEO Live Button */}
            <div className="ceo-live-section">
              {isLive && currentLive ? (
                <Link to="/live" className="ceo-live-btn ceo-live-btn--active">
                  <span className="ceo-live-pulse" />
                  <span className="ceo-live-btn-icon">🔴</span>
                  <span className="ceo-live-btn-text">
                    <strong>CEO is LIVE Now!</strong>
                    <small>{currentLive.title}</small>
                  </span>
                  <span className="ceo-live-btn-arrow">→</span>
                </Link>
              ) : (
                <div className="ceo-live-btn ceo-live-btn--offline">
                  <span className="ceo-live-btn-icon">🎙️</span>
                  <span className="ceo-live-btn-text">
                    <strong>CEO Live Broadcast</strong>
                    <small>Next session coming soon — stay tuned!</small>
                  </span>
                </div>
              )}
            </div>

            {/* Motto Banner */}
            <div className="ceo-motto-banner">
              <h3 className="ceo-motto-title">Connect &bull; Grow &bull; Stay Aware &bull; Give Back</h3>
              <p className="ceo-motto-sub">The Royal Club — Where People Connect, Grow &amp; Make a Difference.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
