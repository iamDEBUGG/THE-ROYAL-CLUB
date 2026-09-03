import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

const LiveContext = createContext(null);

const DEFAULT_MEMBERS = [
  { id: '1', name: 'Amit Kumar', state: 'Bihar', image: '/members/Amit-Kumar-Bihar.jpg' },
  { id: '2', name: 'Brij Kishore', state: 'Uttrakhand', image: '/members/Brij-Kishore-Uttrakhand.jpg' },
  { id: '3', name: 'Diwakar Mishra', state: 'Bihar', image: '/members/Diwakar-Mishra-Bihar.jpg' },
  { id: '4', name: 'Guddi Baghel', state: 'Uttrakhand', image: '/members/Guddi-Baghel-Uttrakhand.jpg' },
  { id: '5', name: 'Narayan Pandey', state: 'Uttar Pradesh', image: '/members/Narayan-Pandey-Uttar-Pradesh.jpg' },
  { id: '6', name: 'Pankaj Sharma', state: 'West Bengal', image: '/members/Pankaj-Sharma-West-Bengal.jpg' },
  { id: '7', name: 'Roshan Chhetri', state: 'West Bengal', image: '/members/Roshan-Chhetri-West-Bengal.jpg' },
  { id: '8', name: 'Samri Priya Rai', state: 'Uttrakhand', image: '/members/Samri-Priya-Rai-Uttrakhand.jpg' },
  { id: '9', name: 'Sangita Tamang', state: 'Sikkim', image: '/members/Sangita-tamang-Sikkim.jpg' },
  { id: '10', name: 'Sarojani Sharma', state: 'Madhya Pradesh', image: '/members/Sarojani-Sharma-Madhya-Pradesh.jpg' },
  { id: '11', name: 'Subash Chandra', state: 'Uttrakhand', image: '/members/Subash-Chandra-Uttrakhand.jpg' },
  { id: '12', name: 'Sudama Ojha', state: 'Bihar', image: '/members/Sudama-Ojha-Bihar.jpg' },
];

const CEO_PROFILE = {
  id: 'ceo',
  name: 'Rajendra Singh Papola',
  state: 'Uttrakhand',
  image: '/CEO-Photo/Rajendra-Singh-Papola-Uttrakhand.jpg',
  role: 'Founder & CEO'
};

const INITIAL_SCHEDULES = [
  {
    id: 'sch-1',
    memberName: 'Diwakar Mishra',
    memberState: 'Bihar',
    memberImage: '/members/Diwakar-Mishra-Bihar.jpg',
    date: 'Today',
    time: '08:00 PM IST',
    topic: 'Unity & Collective Growth in Modern India',
    status: 'Upcoming'
  },
  {
    id: 'sch-2',
    memberName: 'Guddi Baghel',
    memberState: 'Uttrakhand',
    memberImage: '/members/Guddi-Baghel-Uttrakhand.jpg',
    date: 'Tomorrow',
    time: '07:30 PM IST',
    topic: 'Empowering Women Leadership Across States',
    status: 'Upcoming'
  },
  {
    id: 'sch-3',
    memberName: 'Pankaj Sharma',
    memberState: 'West Bengal',
    memberImage: '/members/Pankaj-Sharma-West-Bengal.jpg',
    date: 'Thursday',
    time: '08:00 PM IST',
    topic: 'Social Responsibility & Monthly Charity Drives',
    status: 'Upcoming'
  }
];

const INITIAL_ARCHIVES = [
  {
    id: 'arc-1',
    title: 'The Vision of The Royal Club & Pan-India Movement',
    memberName: 'Rajendra Singh Papola (CEO)',
    date: 'August 28, 2026',
    videoUrl: 'https://www.facebook.com',
    thumbnail: '/about-photo/IMG_20260901_142236.jpg',
    views: '1.4k Views',
    media: []
  },
  {
    id: 'arc-2',
    title: 'Monthly Donation Drive & Helping Families in Need',
    memberName: 'Amit Kumar & Team',
    date: 'August 20, 2026',
    videoUrl: 'https://www.facebook.com',
    thumbnail: '/about-photo/IMG_20260831_121847.png',
    views: '2.1k Views',
    media: []
  },
  {
    id: 'arc-3',
    title: 'Humanity & Community Outreach Across Borders',
    memberName: 'Sudama Ojha & Samri Priya Rai',
    date: 'August 14, 2026',
    videoUrl: 'https://www.facebook.com',
    thumbnail: '/about-photo/IMG_20260901_135351.jpg',
    views: '980 Views',
    media: []
  }
];

export function LiveProvider({ children }) {
  // Live session state
  const [liveState, setLiveState] = useState(() => {
    try {
      const saved = localStorage.getItem('ROYAL_LIVE_STATE');
      return saved ? JSON.parse(saved) : { isLive: false, currentLive: null };
    } catch {
      return { isLive: false, currentLive: null };
    }
  });

  // Upcoming schedules
  const [schedules, setSchedules] = useState(() => {
    try {
      const saved = localStorage.getItem('ROYAL_SCHEDULES_STATE');
      return saved ? JSON.parse(saved) : INITIAL_SCHEDULES;
    } catch {
      return INITIAL_SCHEDULES;
    }
  });

  // Session archives
  const [archives, setArchives] = useState(() => {
    try {
      const saved = localStorage.getItem('ROYAL_ARCHIVES_STATE');
      return saved ? JSON.parse(saved) : INITIAL_ARCHIVES;
    } catch {
      return INITIAL_ARCHIVES;
    }
  });

  const channelRef = useRef(null);

  // Sync to localStorage as fast client-side cache
  useEffect(() => {
    try {
      localStorage.setItem('ROYAL_LIVE_STATE', JSON.stringify(liveState));
    } catch (e) {
      console.error('Error caching live state:', e);
    }
  }, [liveState]);

  useEffect(() => {
    try {
      localStorage.setItem('ROYAL_SCHEDULES_STATE', JSON.stringify(schedules));
    } catch (e) {
      console.error('Error caching schedules:', e);
    }
  }, [schedules]);

  useEffect(() => {
    try {
      localStorage.setItem('ROYAL_ARCHIVES_STATE', JSON.stringify(archives));
    } catch (e) {
      console.error('Error caching archives:', e);
    }
  }, [archives]);

  // Helper functions to query Supabase
  const fetchSchedulesFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        if (data.length > 0) {
          setSchedules(
            data.map(s => ({
              id: s.id,
              memberName: s.member_name,
              memberState: s.member_state,
              memberImage: s.member_image,
              date: s.date,
              time: s.time,
              topic: s.topic,
              status: s.status || 'Upcoming'
            }))
          );
        }
      }
    } catch (err) {
      console.warn('Error fetching schedules from Supabase:', err);
    }
  };

  const fetchArchivesFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('archives')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        if (data.length > 0) {
          setArchives(
            data.map(a => ({
              id: a.id,
              title: a.title,
              memberName: a.member_name,
              date: a.date,
              videoUrl: a.video_url || 'https://www.facebook.com',
              thumbnail: a.thumbnail,
              views: a.views || 'Session Highlights',
              media: Array.isArray(a.media) ? a.media : []
            }))
          );
        }
      }
    } catch (err) {
      console.warn('Error fetching archives from Supabase:', err);
    }
  };

  const fetchLiveStateFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('live_state')
        .select('*')
        .eq('id', 'singleton')
        .maybeSingle();

      if (!error && data) {
        setLiveState({
          isLive: Boolean(data.is_live),
          currentLive: data.current_live || null
        });
      }
    } catch (err) {
      console.warn('Error fetching live state from Supabase:', err);
    }
  };

  // Seed default items if Supabase tables are freshly created and empty
  const seedInitialDataIfEmpty = async () => {
    try {
      // Check schedules
      const { data: schData } = await supabase.from('schedules').select('id').limit(1);
      if (Array.isArray(schData) && schData.length === 0) {
        for (const sch of INITIAL_SCHEDULES) {
          await supabase.from('schedules').insert({
            id: sch.id,
            member_name: sch.memberName,
            member_state: sch.memberState,
            member_image: sch.memberImage,
            date: sch.date,
            time: sch.time,
            topic: sch.topic,
            status: sch.status
          });
        }
      }

      // Check archives
      const { data: arcData } = await supabase.from('archives').select('id').limit(1);
      if (Array.isArray(arcData) && arcData.length === 0) {
        for (const arc of INITIAL_ARCHIVES) {
          await supabase.from('archives').insert({
            id: arc.id,
            title: arc.title,
            member_name: arc.memberName,
            date: arc.date,
            video_url: arc.videoUrl,
            thumbnail: arc.thumbnail,
            views: arc.views,
            media: arc.media || []
          });
        }
      }
    } catch (err) {
      // Silently catch if tables not yet created
    }
  };

  // Initialize Supabase & Real-time channel
  useEffect(() => {
    fetchLiveStateFromSupabase();
    fetchSchedulesFromSupabase();
    fetchArchivesFromSupabase();
    seedInitialDataIfEmpty();

    const channel = supabase
      .channel('royal-live-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'live_state' },
        payload => {
          if (payload.new) {
            setLiveState({
              isLive: Boolean(payload.new.is_live),
              currentLive: payload.new.current_live || null
            });
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'schedules' },
        () => {
          fetchSchedulesFromSupabase();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'archives' },
        () => {
          fetchArchivesFromSupabase();
        }
      )
      .on('broadcast', { event: 'LIVE_STATE_CHANGE' }, ({ payload }) => {
        if (payload) setLiveState(payload);
      })
      .on('broadcast', { event: 'SCHEDULE_CHANGE' }, () => {
        fetchSchedulesFromSupabase();
      })
      .on('broadcast', { event: 'ARCHIVE_CHANGE' }, () => {
        fetchArchivesFromSupabase();
      })
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Actions
  const startLive = async ({ member, facebookUrl, title, timing }) => {
    const newLive = {
      isLive: true,
      currentLive: {
        memberId: member.id || member.name,
        memberName: member.name,
        memberState: member.state,
        memberImage: member.image,
        facebookUrl: facebookUrl || 'https://www.facebook.com',
        title: title || `${member.name} — Live on Facebook`,
        timing: timing || 'Happening Now',
        startedAt: new Date().toISOString()
      }
    };
    setLiveState(newLive);

    try {
      await supabase.from('live_state').upsert({
        id: 'singleton',
        is_live: true,
        current_live: newLive.currentLive,
        updated_at: new Date().toISOString()
      });

      channelRef.current?.send({
        type: 'broadcast',
        event: 'LIVE_STATE_CHANGE',
        payload: newLive
      });
    } catch (e) {
      console.warn('Supabase live state sync warning:', e);
    }
  };

  const endLive = async () => {
    if (liveState.currentLive) {
      const newArchiveItem = {
        id: `arc-${Date.now()}`,
        title: liveState.currentLive.title,
        memberName: liveState.currentLive.memberName,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        videoUrl: liveState.currentLive.facebookUrl,
        thumbnail: liveState.currentLive.memberImage,
        views: 'Live Recording',
        media: []
      };
      addArchive(newArchiveItem);
    }

    const offlineState = { isLive: false, currentLive: null };
    setLiveState(offlineState);

    try {
      await supabase.from('live_state').upsert({
        id: 'singleton',
        is_live: false,
        current_live: null,
        updated_at: new Date().toISOString()
      });

      channelRef.current?.send({
        type: 'broadcast',
        event: 'LIVE_STATE_CHANGE',
        payload: offlineState
      });
    } catch (e) {
      console.warn('Supabase end live sync warning:', e);
    }
  };

  const addSchedule = async newSchedule => {
    const scheduleId = `sch-${Date.now()}`;
    const item = { ...newSchedule, id: scheduleId };
    setSchedules(prev => [item, ...prev]);

    try {
      await supabase.from('schedules').insert({
        id: scheduleId,
        member_name: item.memberName,
        member_state: item.memberState,
        member_image: item.memberImage,
        date: item.date,
        time: item.time,
        topic: item.topic,
        status: item.status || 'Upcoming'
      });

      channelRef.current?.send({
        type: 'broadcast',
        event: 'SCHEDULE_CHANGE',
        payload: item
      });
    } catch (e) {
      console.warn('Supabase add schedule warning:', e);
    }
  };

  const removeSchedule = async id => {
    setSchedules(prev => prev.filter(s => s.id !== id));

    try {
      await supabase.from('schedules').delete().eq('id', id);

      channelRef.current?.send({
        type: 'broadcast',
        event: 'SCHEDULE_CHANGE',
        payload: { id, deleted: true }
      });
    } catch (e) {
      console.warn('Supabase delete schedule warning:', e);
    }
  };

  const addArchive = async newArchive => {
    const archiveId = newArchive.id || `arc-${Date.now()}`;
    const item = { ...newArchive, id: archiveId };
    setArchives(prev => [item, ...prev]);

    try {
      await supabase.from('archives').insert({
        id: archiveId,
        title: item.title,
        member_name: item.memberName,
        date: item.date,
        video_url: item.videoUrl || 'https://www.facebook.com',
        thumbnail: item.thumbnail,
        views: item.views || 'Session Highlights',
        media: item.media || []
      });

      channelRef.current?.send({
        type: 'broadcast',
        event: 'ARCHIVE_CHANGE',
        payload: item
      });
    } catch (e) {
      console.warn('Supabase add archive warning:', e);
    }
  };

  const removeArchive = async id => {
    setArchives(prev => prev.filter(a => a.id !== id));

    try {
      await supabase.from('archives').delete().eq('id', id);

      channelRef.current?.send({
        type: 'broadcast',
        event: 'ARCHIVE_CHANGE',
        payload: { id, deleted: true }
      });
    } catch (e) {
      console.warn('Supabase delete archive warning:', e);
    }
  };

  return (
    <LiveContext.Provider
      value={{
        ceo: CEO_PROFILE,
        members: DEFAULT_MEMBERS,
        isLive: liveState.isLive,
        currentLive: liveState.currentLive,
        schedules,
        archives,
        startLive,
        endLive,
        addSchedule,
        removeSchedule,
        addArchive,
        removeArchive
      }}
    >
      {children}
    </LiveContext.Provider>
  );
}

export function useLive() {
  const context = useContext(LiveContext);
  if (!context) {
    throw new Error('useLive must be used within a LiveProvider');
  }
  return context;
}
