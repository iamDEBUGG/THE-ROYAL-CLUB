import React, { useState } from 'react';
import { useLive } from '../../context/LiveContext';
import SEO from '../common/SEO';
import Footer from '../common/Footer';
import './BroadcastPages.css';

export default function ArchivesPage() {
  const { archives } = useLive();
  const [lightbox, setLightbox] = useState(null);

  const archivesSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://the-royal-club.vercel.app/archives/#webpage',
    'url': 'https://the-royal-club.vercel.app/archives',
    'name': 'The Royal Club Broadcast Archives & Moments',
    'description': 'Revisit past Facebook Live broadcasts, moments of inspiration, and community highlights from The Royal Club.',
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
          'name': 'Archives',
          'item': 'https://the-royal-club.vercel.app/archives'
        }
      ]
    },
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': archives.length,
      'itemListElement': archives.map((item, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'item': {
          '@type': 'VideoObject',
          'name': item.title,
          'description': `Broadcast by ${item.memberName} on ${item.date}`,
          'thumbnailUrl': item.thumbnail,
          'uploadDate': item.date,
          'contentUrl': item.videoUrl
        }
      }))
    }
  };

  return (
    <>
      <SEO
        title="Session Archives & Moments"
        description="Revisit past Facebook Live broadcasts, inspirational discussions, and community highlights from The Royal Club."
        canonical="/archives"
        keywords="The Royal Club Archives, Facebook Live Recordings, Community Highlights, Inspiration Videos"
        schema={archivesSchema}
      />
      <main className="broadcast-page">
        <div className="broadcast-container">
          <header className="broadcast-header">
            <h1 className="broadcast-title">Session Archives &amp; Moments</h1>
            <p className="broadcast-subtitle">
              Revisit past Facebook Live broadcasts, moments of inspiration, and community highlights.
            </p>
          </header>

          {archives.length > 0 ? (
            <div className="archives-grid">
              {archives.map(item => (
                <div key={item.id} className="archive-card">
                  <div className="archive-thumb">
                    <img
                      src={item.thumbnail}
                      alt={`${item.title} - Session Thumbnail`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="archive-body">
                    <h2 className="archive-title">{item.title}</h2>
                    <div className="archive-meta">
                      {item.memberName} &bull; {item.date}
                    </div>

                    {/* Media Gallery - Images & Videos */}
                    {item.media && item.media.length > 0 && (
                      <div className="archive-media-gallery">
                        {item.media.map((media, idx) => (
                          <div
                            key={idx}
                            className="archive-media-item"
                            onClick={() => setLightbox(media)}
                          >
                            {media.type === 'image' ? (
                              <img
                                src={media.url}
                                alt={media.name || 'Moment snapshot'}
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <div className="archive-media-video-wrap">
                                <video src={media.url} muted preload="metadata" />
                                <span className="archive-media-play">▶</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="archive-btn"
                    >
                      Watch Recording &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '3.5rem 1.5rem',
                background: 'rgba(15, 46, 38, 0.45)',
                border: '1px dashed rgba(201, 162, 39, 0.3)',
                borderRadius: '16px',
                color: '#F5F0E6',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎬</div>
              <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.35rem', marginBottom: '0.4rem', color: '#F5F0E6' }}>
                No Moments or Archives Posted Yet
              </h2>
              <p style={{ color: 'rgba(245, 240, 230, 0.7)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                Recordings and highlight moments will appear here once published by the CEO.
              </p>
            </div>
          )}
        </div>

        {/* Lightbox Modal for full-size media view */}
        {lightbox && (
          <div className="archive-lightbox" onClick={() => setLightbox(null)}>
            <div className="archive-lightbox-inner" onClick={e => e.stopPropagation()}>
              <button className="archive-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close modal">✕</button>
              {lightbox.type === 'image' ? (
                <img src={lightbox.url} alt={lightbox.name || 'Media'} />
              ) : (
                <video src={lightbox.url} controls autoPlay />
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

