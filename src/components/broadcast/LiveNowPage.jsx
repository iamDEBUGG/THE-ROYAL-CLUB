import React from 'react';
import { useLive } from '../../context/LiveContext';
import SEO from '../common/SEO';
import Footer from '../common/Footer';
import './BroadcastPages.css';

export default function LiveNowPage() {
  const { isLive, currentLive, schedules } = useLive();
  const nextUp = schedules[0];

  const liveSchema = {
    '@context': 'https://schema.org',
    '@type': 'BroadcastEvent',
    '@id': 'https://the-royal-club.vercel.app/live/#broadcastevent',
    'url': 'https://the-royal-club.vercel.app/live',
    'name': isLive && currentLive ? currentLive.title : 'The Royal Club Daily Live Broadcast',
    'description': isLive && currentLive
      ? `Live broadcast hosted by ${currentLive.memberName} from ${currentLive.memberState}.`
      : 'Daily interactive Facebook Live broadcasts hosted by 12 distinguished members.',
    'isLiveBroadcast': !!(isLive && currentLive),
    'organizer': {
      '@type': 'Organization',
      'name': 'The Royal Club',
      'url': 'https://the-royal-club.vercel.app/'
    },
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
          'name': 'Live Now',
          'item': 'https://the-royal-club.vercel.app/live'
        }
      ]
    }
  };

  return (
    <>
      <SEO
        title={isLive && currentLive ? `🔴 LIVE: ${currentLive.title}` : 'Watch Facebook Live Broadcasts'}
        description="Watch The Royal Club daily live streams on Facebook. Join interactive discussions on community, growth, and awareness hosted by pan-India members."
        canonical="/live"
        keywords="Facebook Live Stream, The Royal Club Live, Pan India Live Broadcast, Daily Discussions"
        schema={liveSchema}
      />
      <main className="broadcast-page">
        <div className="broadcast-container">
          <header className="broadcast-header">
            <h1 className="broadcast-title">Facebook Live Broadcast</h1>
            <p className="broadcast-subtitle">
              Experience our daily interactive sessions streamed live directly on Facebook.
            </p>
          </header>

          {isLive && currentLive ? (
            <div className="live-room-box">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#E53E3E', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '0.35rem 1rem', borderRadius: '999px', marginBottom: '1.5rem' }}>
                <span className="poster-live-dot" /> STREAMING LIVE NOW
              </div>

              <div className="live-room-avatar">
                <img
                  src={currentLive.memberImage}
                  alt={`${currentLive.memberName} - Live Broadcaster`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h2 className="live-room-topic">{currentLive.title}</h2>
              <p className="live-room-host">
                Broadcaster: {currentLive.memberName} ({currentLive.memberState})
              </p>

              <a
                href={currentLive.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-watch-live-fb"
                style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', margin: '0 auto' }}
              >
                <span>📺</span> Open Facebook Live Stream
              </a>
            </div>
          ) : (
            <div className="live-room-box">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎙️</div>
              <h2 className="live-room-topic">No Live Stream Currently Active</h2>
              <p className="broadcast-subtitle" style={{ marginBottom: '2rem' }}>
                Our daily live session will broadcast soon. Check the upcoming schedule below to catch the next session!
              </p>

              {nextUp && (
                <div style={{ background: 'rgba(15, 46, 38, 0.7)', border: '1px solid rgba(201, 162, 39, 0.3)', borderRadius: '14px', padding: '1.25rem', maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
                  <div style={{ color: '#C9A227', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Next Session Up
                  </div>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', color: '#F5F0E6', marginBottom: '0.2rem' }}>
                    {nextUp.topic}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(245,240,230,0.8)' }}>
                    {nextUp.memberName} ({nextUp.memberState}) &bull; {nextUp.date} at {nextUp.time}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

