import React from 'react';
import { Link } from 'react-router-dom';
import { useLive } from '../../context/LiveContext';
import './LiveScheduleSection.css';

export default function LiveScheduleSection() {
  const { isLive, currentLive, schedules } = useLive();

  // Get the next 2 upcoming sessions
  const nextTwoSchedules = schedules.slice(0, 2);

  return (
    <section className="home-live-section">
      <div className="home-live-container">
        <header className="home-live-header">
          <h2 className="home-live-title">Live Broadcast Schedule</h2>
          <p className="home-live-subtitle">
            Daily Facebook Live sessions hosted by our distinguished members across India. Join the conversation live!
          </p>
        </header>

        {/* ── LIVE NOW BANNER (If a session is active) ── */}
        {isLive && currentLive && (
          <div className="home-live-active-card">
            <div className="home-live-badge-pulse">
              <span className="poster-live-dot" /> LIVE NOW
            </div>

            <div className="home-live-active-thumb">
              <img
                src={currentLive.memberImage}
                alt={`${currentLive.memberName} - Live Broadcaster`}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="home-live-active-info">
              <h3 className="home-live-active-title">{currentLive.title}</h3>
              <div className="home-live-active-host">
                Hosted by <strong>{currentLive.memberName}</strong> ({currentLive.memberState})
              </div>
              <p className="home-live-active-desc">
                Currently streaming live on Facebook. Tune in to ask questions and participate in today's discussion.
              </p>
              <a
                href={currentLive.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-watch-live-fb"
              >
                <span>📺</span> Watch Facebook Live Stream
              </a>
            </div>
          </div>
        )}

        {/* ── NEXT 2 UPCOMING SESSIONS ── */}
        <div className="home-upcoming-block">
          <div className="home-upcoming-head">
            <h3 className="home-upcoming-title">
              {isLive ? 'Next Upcoming Sessions' : 'Next Sessions Ahead'}
            </h3>
            {nextTwoSchedules.length > 0 && (
              <Link
                to="/schedule"
                style={{
                  color: '#C9A227',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                View Full Schedule &rarr;
              </Link>
            )}
          </div>

          {nextTwoSchedules.length > 0 ? (
            <div className="home-upcoming-grid">
              {nextTwoSchedules.map(sch => (
                <div key={sch.id} className="home-schedule-card">
                  <div className="home-schedule-thumb">
                    <img
                      src={sch.memberImage}
                      alt={`${sch.memberName} (${sch.memberState})`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="home-schedule-info">
                    <h4 className="home-schedule-topic">{sch.topic}</h4>
                    <div className="home-schedule-host">
                      {sch.memberName} &bull; {sch.memberState}
                    </div>
                    <div className="home-schedule-time">
                      {sch.date} &bull;  {sch.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                background: 'rgba(15, 46, 38, 0.4)',
                borderRadius: '16px',
                border: '1px dashed rgba(201, 162, 39, 0.25)',
                color: 'rgba(245, 240, 230, 0.75)'
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🗓️</div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#F5F0E6' }}>
                No upcoming sessions scheduled currently.
              </p>
              <small style={{ color: 'rgba(245,240,230,0.6)' }}>
                New live broadcast timings will appear here once published.
              </small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
