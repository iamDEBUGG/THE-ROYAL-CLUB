import React, { useState } from 'react';
import { useLive } from '../../context/LiveContext';
import LivePosterModal from './LivePosterModal';
import './CeoDashboard.css';

export default function CeoDashboard() {
  const {
    ceo,
    members,
    isLive,
    currentLive,
    endLive,
    schedules,
    addSchedule,
    removeSchedule,
    archives,
    addArchive,
    removeArchive
  } = useLive();

  // Combined list: CEO + Members (for dropdowns)
  const allHostOptions = [ceo, ...members];

  const [selectedMemberForLive, setSelectedMemberForLive] = useState(null);

  // New schedule form state
  const [schMember, setSchMember] = useState(members[0]?.name || '');
  const [schDate, setSchDate] = useState('');
  const [schTime, setSchTime] = useState('');
  const [schTopic, setSchTopic] = useState('');

  // New archive moment form state
  const [arcTitle, setArcTitle] = useState('');
  const [arcMember, setArcMember] = useState(members[0]?.name || '');
  const [arcDate, setArcDate] = useState('');
  const [arcUrl, setArcUrl] = useState('');
  const [arcMediaFiles, setArcMediaFiles] = useState([]);
  const [arcMediaPreviews, setArcMediaPreviews] = useState([]);

  const handleAddSchedule = e => {
    e.preventDefault();
    if (!schDate || !schTime || !schTopic) return;
    const memberObj = allHostOptions.find(m => m.name === schMember) || members[0];
    addSchedule({
      memberName: memberObj.name,
      memberState: memberObj.state,
      memberImage: memberObj.image,
      date: schDate,
      time: schTime,
      topic: schTopic,
      status: 'Upcoming'
    });
    setSchTopic('');
    setSchDate('');
    setSchTime('');
  };

  const handleMediaSelect = e => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = [];
    const newFiles = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const mediaItem = {
          url: ev.target.result,
          type: file.type.startsWith('video') ? 'video' : 'image',
          name: file.name
        };
        newPreviews.push(mediaItem);
        newFiles.push(mediaItem);

        if (newPreviews.length === files.length) {
          setArcMediaPreviews(prev => [...prev, ...newPreviews]);
          setArcMediaFiles(prev => [...prev, ...newFiles]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMediaPreview = index => {
    setArcMediaPreviews(prev => prev.filter((_, i) => i !== index));
    setArcMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddArchive = e => {
    e.preventDefault();
    if (!arcTitle || !arcDate) return;
    const memberObj = allHostOptions.find(m => m.name === arcMember) || members[0];
    // Use first uploaded image as thumbnail, fallback to member image
    const thumbnail = arcMediaFiles.find(f => f.type === 'image')?.url || memberObj.image;
    addArchive({
      title: arcTitle,
      memberName: memberObj.name,
      date: arcDate,
      videoUrl: arcUrl || 'https://www.facebook.com',
      thumbnail: thumbnail,
      media: arcMediaFiles.length > 0 ? arcMediaFiles : undefined,
      views: 'Session Highlights'
    });
    setArcTitle('');
    setArcDate('');
    setArcUrl('');
    setArcMediaFiles([]);
    setArcMediaPreviews([]);
  };

  return (
    <div className="ceo-dash">
      {/* Top Status Bar */}
      <div className="dash-top-bar">
        <div className="dash-status-indicator">
          <span className={`dash-status-dot ${isLive ? 'active' : ''}`} />
          <div>
            <h3 className="dash-status-title">
              {isLive
                ? `LIVE NOW: ${currentLive?.memberName}`
                : 'Broadcast Status: Offline (Ready)'}
            </h3>
            <p className="dash-status-subtitle">
              {isLive
                ? `${currentLive?.title} — Broadcasting on Facebook Live`
                : 'Select any member below to initiate a Live Session with pre-made poster'}
            </p>
          </div>
        </div>

        <div className="dash-top-actions">
          {isLive && (
            <button className="btn-end-live" onClick={endLive}>
              End Live Broadcast
            </button>
          )}
        </div>
      </div>

      {/* ── CEO Personal Live Session ── */}
      <section className="dash-section">
        <div className="dash-section-header">
          <h2 className="dash-section-title"> CEO Live Session</h2>
          <p className="dash-section-desc">
            Go live yourself as the CEO. This will broadcast your personal session across the entire site.
          </p>
        </div>

        <div className="ceo-personal-live-card">
          <div className="ceo-personal-live-left">
            <div className="ceo-personal-live-avatar">
              <img src={ceo.image} alt={ceo.name} />
            </div>
            <div className="ceo-personal-live-info">
              <h3 className="ceo-personal-live-name">{ceo.name}</h3>
              <p className="ceo-personal-live-role">{ceo.role} • {ceo.state}</p>
            </div>
          </div>
          <button
            className="btn-ceo-go-live"
            onClick={() => setSelectedMemberForLive(ceo)}
            disabled={isLive}
          >
            {isLive && currentLive?.memberId === 'ceo'
              ? <><span className="poster-live-dot" /> Broadcasting Live...</>
              : <><span>🔴</span> Go Live as CEO</>}
          </button>
        </div>
      </section>

      {/* ── Section 1: Member Live Manager ── */}
      <section className="dash-section">
        <div className="dash-section-header">
          <h2 className="dash-section-title">1. Member Live Session Dispatcher</h2>
          <p className="dash-section-desc">
            Choose which member is hosting today's Facebook Live. Clicking "Live Now" pops up their customized royal poster.
          </p>
        </div>

        <div className="dash-members-grid">
          {members.map(member => (
            <div key={member.id} className="dash-member-card">
              <div className="dash-member-thumb">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="dash-member-info">
                <h4 className="dash-member-name">{member.name}</h4>
                <p className="dash-member-state">{member.state}</p>
              </div>
              <button
                className="btn-trigger-live"
                onClick={() => setSelectedMemberForLive(member)}
              >
                <span>🔴</span> Live Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 2: Live Schedule Planner ── */}
      <section className="dash-section">
        <div className="dash-section-header">
          <h2 className="dash-section-title">2. Schedule Live Sessions</h2>
          <p className="dash-section-desc">
            Set upcoming daily session hosts, timings, and discussion topics. Updates the Homepage & Broadcast Schedule automatically.
          </p>
        </div>

        <div className="dash-form-box">
          <form onSubmit={handleAddSchedule}>
            <div className="dash-form-grid">
              <select
                className="dash-select"
                value={schMember}
                onChange={e => setSchMember(e.target.value)}
              >
                <option key={ceo.id} value={ceo.name} style={{ fontWeight: 'bold' }}>
                  {ceo.name} (CEO — {ceo.state})
                </option>
                <option disabled>──────────────</option>
                {members.map(m => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.state})
                  </option>
                ))}
              </select>

              <input
                type="text"
                className="dash-input"
                placeholder="Day / Date (e.g. Today / Sep 5)"
                value={schDate}
                onChange={e => setSchDate(e.target.value)}
                required
              />

              <input
                type="text"
                className="dash-input"
                placeholder="Timing (e.g. 08:00 PM IST)"
                value={schTime}
                onChange={e => setSchTime(e.target.value)}
                required
              />

              <input
                type="text"
                className="dash-input"
                placeholder="Topic / Discussion Title"
                value={schTopic}
                onChange={e => setSchTopic(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-dash-add">
              + Publish Schedule Slot
            </button>
          </form>
        </div>

        <div>
          {schedules.length > 0 ? (
            schedules.map(item => (
              <div key={item.id} className="dash-list-item">
                <div>
                  <h4 className="dash-list-item-title">{item.topic}</h4>
                  <p className="dash-list-item-sub">
                    Host: <strong style={{ color: '#F5F0E6' }}>{item.memberName}</strong> ({item.memberState}) &bull; {item.date} at {item.time}
                  </p>
                </div>
                <button
                  className="btn-item-delete"
                  onClick={() => removeSchedule(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: 'rgba(245, 240, 230, 0.5)', fontSize: '0.9rem', fontStyle: 'italic', margin: '0.8rem 0' }}>
              No scheduled sessions published yet. Use the form above to schedule a live broadcast.
            </p>
          )}
        </div>
      </section>

      {/* ── Section 3: Moments & Archives Manager ── */}
      <section className="dash-section">
        <div className="dash-section-header">
          <h2 className="dash-section-title">3. Post Past Live Moments & Archives</h2>
          <p className="dash-section-desc">
            Add recordings of completed live sessions and moments so community members can watch them in Broadcast &rarr; Archives.
          </p>
        </div>

        <div className="dash-form-box">
          <form onSubmit={handleAddArchive}>
            <div className="dash-form-grid">
              <input
                type="text"
                className="dash-input"
                placeholder="Session Recording Title"
                value={arcTitle}
                onChange={e => setArcTitle(e.target.value)}
                required
              />

              <select
                className="dash-select"
                value={arcMember}
                onChange={e => setArcMember(e.target.value)}
              >
                <option key={ceo.id} value={ceo.name} style={{ fontWeight: 'bold' }}>
                  {ceo.name} (CEO)
                </option>
                <option disabled>──────────────</option>
                {members.map(m => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className="dash-input"
                placeholder="Date (e.g. Sep 1, 2026)"
                value={arcDate}
                onChange={e => setArcDate(e.target.value)}
                required
              />

              <input
                type="url"
                className="dash-input"
                placeholder="Facebook Video URL / Link"
                value={arcUrl}
                onChange={e => setArcUrl(e.target.value)}
              />
            </div>

            {/* Media Upload Section */}
            <div className="dash-media-upload">
              <label className="dash-media-label">
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaSelect}
                  style={{ display: 'none' }}
                />
                <span className="dash-media-btn">
                  <span>📷</span> Add Photos & Videos from Device
                </span>
              </label>
              <p className="dash-media-hint">Supports JPG, PNG, MP4, MOV — multiple files allowed</p>
            </div>

            {/* Media Previews */}
            {arcMediaPreviews.length > 0 && (
              <div className="dash-media-previews">
                {arcMediaPreviews.map((media, index) => (
                  <div key={index} className="dash-media-preview-item">
                    {media.type === 'image' ? (
                      <img src={media.url} alt={media.name} />
                    ) : (
                      <video src={media.url} muted />
                    )}
                    <div className="dash-media-preview-tag">
                      {media.type === 'video' ? '🎬 Video' : '🖼️ Image'}
                    </div>
                    <button
                      type="button"
                      className="dash-media-remove"
                      onClick={() => removeMediaPreview(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button type="submit" className="btn-dash-add">
              + Post to Archives
            </button>
          </form>
        </div>

        <div>
          {archives.length > 0 ? (
            archives.map(item => (
              <div key={item.id} className="dash-list-item">
                <div>
                  <h4 className="dash-list-item-title">{item.title}</h4>
                  <p className="dash-list-item-sub">
                    Featuring: {item.memberName} &bull; {item.date}
                  </p>
                </div>
                <button
                  className="btn-item-delete"
                  onClick={() => removeArchive(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: 'rgba(245, 240, 230, 0.5)', fontSize: '0.9rem', fontStyle: 'italic', margin: '0.8rem 0' }}>
              No archives or moments posted yet. Use the form above to post recordings and highlights.
            </p>
          )}
        </div>
      </section>

      {/* Live Poster Modal */}
      {selectedMemberForLive && (
        <LivePosterModal
          member={selectedMemberForLive}
          onClose={() => setSelectedMemberForLive(null)}
        />
      )}
    </div>
  );
}
