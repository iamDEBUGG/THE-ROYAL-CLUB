import React from 'react';
import { useLive } from '../../context/LiveContext';
import SEO from '../common/SEO';
import Footer from '../common/Footer';
import './BroadcastPages.css';

export default function SchedulePage() {
  const { schedules } = useLive();

  const scheduleSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://the-royal-club.vercel.app/schedule/#webpage',
    'url': 'https://the-royal-club.vercel.app/schedule',
    'name': 'The Royal Club Live Broadcast Schedule',
    'description': 'Upcoming schedule for daily Facebook Live broadcasts hosted by 12 pan-India community leaders.',
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
          'name': 'Schedule',
          'item': 'https://the-royal-club.vercel.app/schedule'
        }
      ]
    },
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': schedules.length,
      'itemListElement': schedules.map((item, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'item': {
          '@type': 'Event',
          'name': item.topic,
          'description': `Live session on "${item.topic}" hosted by ${item.memberName} (${item.memberState})`,
          'eventStatus': 'https://schema.org/EventScheduled',
          'eventAttendanceMode': 'https://schema.org/OnlineEventAttendanceMode',
          'organizer': {
            '@type': 'Organization',
            'name': 'The Royal Club',
            'url': 'https://the-royal-club.vercel.app/'
          },
          'performer': {
            '@type': 'Person',
            'name': item.memberName
          }
        }
      }))
    }
  };

  return (
    <>
      <SEO
        title="Live Broadcast Schedule — Daily Sessions"
        description="Explore the complete schedule for daily Facebook Live sessions by The Royal Club. Connect with visionaries across Indian states."
        canonical="/schedule"
        keywords="The Royal Club Schedule, Facebook Live Timings, Live Broadcast Calendar, Daily Sessions"
        schema={scheduleSchema}
      />
      <main className="broadcast-page">
        <div className="broadcast-container">
          <header className="broadcast-header">
            <h1 className="broadcast-title">Live Broadcast Schedule</h1>
            <p className="broadcast-subtitle">
              Explore all scheduled daily sessions. Join our 12 distinguished members live on Facebook.
            </p>
          </header>

          <section className="schedule-list" aria-label="Broadcast Schedule List">
            {schedules.map(item => (
              <div key={item.id} className="schedule-item-card">
                <div className="schedule-item-left">
                  <div className="schedule-item-thumb">
                    <img
                      src={item.memberImage}
                      alt={`${item.memberName} (${item.memberState})`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <h2 className="schedule-item-topic">{item.topic}</h2>
                    <p className="schedule-item-host">
                      Host: <strong>{item.memberName}</strong> &bull; {item.memberState}
                    </p>
                  </div>
                </div>

                <div className="schedule-time-tag">
                  {item.date} &bull;  {item.time}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

