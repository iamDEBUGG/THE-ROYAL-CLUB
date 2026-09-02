import React, { useState } from 'react';
import { useLive } from '../../context/LiveContext';
import './BroadcastPages.css';

export default function ArchivesPage() {
  const { archives } = useLive();
  const [lightbox, setLightbox] = useState(null);

  return (
    <main className="broadcast-page">
      <div className="broadcast-container">
        <header className="broadcast-header">
          <h1 className="broadcast-title">Session Archives &amp; Moments</h1>
          <p className="broadcast-subtitle">
            Revisit past Facebook Live broadcasts, moments of inspiration, and community highlights.
          </p>
        </header>

        <div className="archives-grid">
          {archives.map(item => (
            <div key={item.id} className="archive-card">
              <div className="archive-thumb">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="archive-body">
                <h3 className="archive-title">{item.title}</h3>
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
                          <img src={media.url} alt={media.name || 'Media'} />
                        ) : (
                          <div className="archive-media-video-wrap">
                            <video src={media.url} muted />
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
      </div>

      {/* Lightbox Modal for full-size media view */}
      {lightbox && (
        <div className="archive-lightbox" onClick={() => setLightbox(null)}>
          <div className="archive-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="archive-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            {lightbox.type === 'image' ? (
              <img src={lightbox.url} alt={lightbox.name || 'Media'} />
            ) : (
              <video src={lightbox.url} controls autoPlay />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
