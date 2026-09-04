import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLive } from '../../context/LiveContext';
import ProfileCard from '../cards/ProfileCard';
import CeoDashboard from '../admin/CeoDashboard';
import SEO from '../common/SEO';
import Footer from '../common/Footer';
import './CeoBoardPage.css';

export default function CeoBoardPage() {
  const { isCeoAuthenticated, isLoading, signIn, signOut, user } = useAuth();
  const { isLive, currentLive } = useLive();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'public'

  const ceoSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://the-royal-club.vercel.app/ceo/#webpage',
    'url': 'https://the-royal-club.vercel.app/ceo',
    'name': 'The Royal Club CEO Board — Rajendra Singh Papola',
    'description': 'Meet Rajendra Singh Papola, Founder & CEO of The Royal Club, uniting 13 visionary leaders across Indian states.',
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://the-royal-club.vercel.app/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'CEO Board',
          'item': 'https://the-royal-club.vercel.app/ceo'
        }
      ]
    },
    'mainEntity': {
      '@type': 'Person',
      'name': 'Rajendra Singh Papola',
      'jobTitle': 'Founder & Chief Executive Officer',
      'worksFor': {
        '@type': 'Organization',
        'name': 'The Royal Club',
        'url': 'https://the-royal-club.vercel.app/'
      },
      'image': 'https://the-royal-club.vercel.app/CEO-Photo/Rajendra-Singh-Papola-Uttrakhand.jpg',
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': 'Uttrakhand',
        'addressCountry': 'IN'
      }
    }
  };

  const handleOpenLogin = () => {
    setLoginError('');
    setIsLoginModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginModalOpen(false);
    setLoginError('');
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }
    try {
      setIsSubmitting(true);
      setLoginError('');
      await signIn(email, password);
      setIsLoginModalOpen(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Login error:', err);
      setLoginError(err.message || 'Invalid login credentials. Please verify in Supabase.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="The CEO Board — Rajendra Singh Papola"
        description="Meet Rajendra Singh Papola, Founder & CEO of The Royal Club. Discover the vision behind uniting 13 pan-India leaders and driving monthly community donations."
        canonical="/ceo"
        keywords="Rajendra Singh Papola, CEO The Royal Club, Founder, Uttrakhand, Pan-India Leadership, Social Responsibility"
        schema={ceoSchema}
      />
      <main className="ceo-page">
        <div className="ceo-container">
          {/* Top Portal Bar */}
          <div className="ceo-top-portal-bar">
            {isCeoAuthenticated ? (
              <div className="ceo-auth-toolbar">
                <div className="ceo-auth-badge">
                  <span className="ceo-status-dot-active" />
                  <span className="ceo-auth-badge-text">
                    CEO Logged In {user?.email ? `(${user.email})` : ''}
                  </span>
                </div>

                {/* View Switcher: Command Center vs Public Board */}
                <div className="ceo-view-switcher">
                  <button
                    type="button"
                    className={`ceo-switch-btn ${activeView === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveView('dashboard')}
                  >
                    <span>🎙️</span> Command Center
                  </button>
                  <button
                    type="button"
                    className={`ceo-switch-btn ${activeView === 'public' ? 'active' : ''}`}
                    onClick={() => setActiveView('public')}
                  >
                    <span>👥</span> Public Board
                  </button>
                </div>

                <button
                  type="button"
                  className="ceo-btn-logout"
                  onClick={signOut}
                  title="Lock CEO Portal"
                >
                  <span>🔒</span> Lock Portal
                </button>
              </div>
            ) : (
              <div className="ceo-guest-toolbar">
                <button
                  type="button"
                  className="ceo-btn-open-login"
                  onClick={handleOpenLogin}
                >
                  <span>🔐</span> CEO Portal Login
                </button>
              </div>
            )}
          </div>

          {/* If CEO is Authenticated and Active View is 'dashboard' -> Show CEO Dashboard */}
          {isCeoAuthenticated && activeView === 'dashboard' ? (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div className="ceo-badge">
                  <span>⚡</span> CEO Command Center
                </div>
                <h1 className="ceo-title">Broadcast &amp; Live Dispatcher</h1>
                <p className="ceo-subtitle">
                  Welcome, Rajendra Singh Papola. Manage live broadcasts, dispatch member sessions with pre-made posters, adjust schedules, and post moments.
                </p>
              </div>

              <CeoDashboard />
            </div>
          ) : (
            /* Public Visitor View (or CEO previewing public view) */
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
              <section className="ceo-showcase" aria-label="CEO Profile">
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
                      avatarObjectPosition="25% 30%"
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
                    <blockquote className="ceo-quote-text">
                      The Royal Club was founded with a singular conviction: that real strength lies in unity and purposeful action. Bringing together dynamic leaders from every corner of India, we are not just hosting daily live broadcasts — we are building connections, inspiring awareness, and giving back to society every single month.
                    </blockquote>
                    <p className="ceo-vision-desc">
                      Under the leadership of Rajendra Singh Papola, The Royal Club has blossomed into a thriving pan-India family where 12 distinguished member voices share daily wisdom, uplift communities, and provide monthly donations to those in need.
                    </p>
                  </div>

                  {/* Core Leadership Pillars */}
                  <div className="ceo-pillars-grid">
                    <div className="ceo-pillar-item">
                      <span className="ceo-pillar-icon">🇮🇳</span>
                      <h3 className="ceo-pillar-title">Pan-India Unity</h3>
                      <p className="ceo-pillar-text">Connecting leaders across different Indian states into one united family.</p>
                    </div>
                    <div className="ceo-pillar-item">
                      <span className="ceo-pillar-icon">🎙️</span>
                      <h3 className="ceo-pillar-title">Daily Live Broadcasts</h3>
                      <p className="ceo-pillar-text">Regular Facebook Live sessions on trending topics, awareness, and growth.</p>
                    </div>
                    <div className="ceo-pillar-item">
                      <span className="ceo-pillar-icon">🤝</span>
                      <h3 className="ceo-pillar-title">Monthly Giving</h3>
                      <p className="ceo-pillar-text">Dedicated monthly charity initiatives supporting people in need.</p>
                    </div>
                    <div className="ceo-pillar-item">
                      <span className="ceo-pillar-icon">🌟</span>
                      <h3 className="ceo-pillar-title">Empowerment</h3>
                      <p className="ceo-pillar-text">Enabling every member to expand their reach, share perspective, and excel.</p>
                    </div>
                  </div>
                </div>
              </section>

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
              <aside className="ceo-motto-banner" aria-label="Club Motto">
                <h3 className="ceo-motto-title">Connect &bull; Grow &bull; Stay Aware &bull; Give Back</h3>
                <p className="ceo-motto-sub">The Royal Club — Where People Connect, Grow &amp; Make a Difference.</p>
              </aside>
            </div>
          )}
        </div>

        {/* CEO Login Modal (Supabase Auth) */}
        {isLoginModalOpen && (
          <div className="ceo-login-modal-overlay" onClick={handleCloseLogin}>
            <div
              className="ceo-login-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="ceo-login-modal-close"
                onClick={handleCloseLogin}
                aria-label="Close modal"
              >
                &times;
              </button>

              <div className="ceo-login-modal-header">
                <div className="ceo-login-badge">
                  <span>⚜️</span> The Royal Club
                </div>
                <h2 className="ceo-login-title">CEO Portal Access</h2>
                <p className="ceo-login-desc">
                  Sign in with your Supabase CEO credentials to access the Broadcast Command Center.
                </p>
              </div>

              {loginError && (
                <div className="ceo-login-error-box">
                  <span>⚠️</span> {loginError}
                </div>
              )}

              <form onSubmit={handleSubmitLogin} className="ceo-login-form">
                <div className="ceo-login-field">
                  <label className="ceo-login-label">CEO Email</label>
                  <input
                    type="email"
                    className="ceo-login-input"
                    placeholder="e.g. ceo@theroyalclub.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="ceo-login-field">
                  <label className="ceo-login-label">Password</label>
                  <input
                    type="password"
                    className="ceo-login-input"
                    placeholder="Enter your secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="ceo-login-actions">
                  <button
                    type="button"
                    className="ceo-login-btn-cancel"
                    onClick={handleCloseLogin}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ceo-login-btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="ceo-login-spinner" /> Authenticating...
                      </>
                    ) : (
                      <>
                        <span>🔓</span> Unlock Portal
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

