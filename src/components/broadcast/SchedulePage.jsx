import React from 'react';
import { useLive } from '../../context/LiveContext';
import './BroadcastPages.css';

export default function SchedulePage() {
  const { schedules } = useLive();

  return (
    <main className="broadcast-page">
      <div className="broadcast-container">
        <header className="broadcast-header">
          <h1 className="broadcast-title">Live Broadcast Schedule</h1>
          <p className="broadcast-subtitle">
            Explore all scheduled daily sessions. Join our 12 distinguished members live on Facebook.
          </p>
        </header>

        <div className="schedule-list">
          {schedules.map(item => (
            <div key={item.id} className="schedule-item-card">
              <div className="schedule-item-left">
                <div className="schedule-item-thumb">
                  <img src={item.memberImage} alt={item.memberName} />
                </div>
                <div>
                  <h3 className="schedule-item-topic">{item.topic}</h3>
                  <p className="schedule-item-host">
                    Host: <strong>{item.memberName}</strong> &bull; {item.memberState}
                  </p>
                </div>
              </div>

              <div className="schedule-time-tag">
                🗓️ {item.date} &bull; ⏰ {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
