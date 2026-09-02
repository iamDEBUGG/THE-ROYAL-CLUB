import React, { createContext, useContext, useState, useEffect } from 'react';

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
    views: '1.4k Views'
  },
  {
    id: 'arc-2',
    title: 'Monthly Donation Drive & Helping Families in Need',
    memberName: 'Amit Kumar & Team',
    date: 'August 20, 2026',
    videoUrl: 'https://www.facebook.com',
    thumbnail: '/about-photo/IMG_20260831_121847.png',
    views: '2.1k Views'
  },
  {
    id: 'arc-3',
    title: 'Humanity & Community Outreach Across Borders',
    memberName: 'Sudama Ojha & Samri Priya Rai',
    date: 'August 14, 2026',
    videoUrl: 'https://www.facebook.com',
    thumbnail: '/about-photo/IMG_20260901_135351.jpg',
    views: '980 Views'
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

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('ROYAL_LIVE_STATE', JSON.stringify(liveState));
    } catch (e) {
      console.error('Error saving live state:', e);
    }
  }, [liveState]);

  useEffect(() => {
    try {
      localStorage.setItem('ROYAL_SCHEDULES_STATE', JSON.stringify(schedules));
    } catch (e) {
      console.error('Error saving schedules:', e);
    }
  }, [schedules]);

  useEffect(() => {
    try {
      localStorage.setItem('ROYAL_ARCHIVES_STATE', JSON.stringify(archives));
    } catch (e) {
      console.error('Error saving archives:', e);
    }
  }, [archives]);

  // Actions
  const startLive = ({ member, facebookUrl, title, timing }) => {
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
  };

  const endLive = () => {
    // Automatically add to archives if desired
    if (liveState.currentLive) {
      const newArchiveItem = {
        id: `arc-${Date.now()}`,
        title: liveState.currentLive.title,
        memberName: liveState.currentLive.memberName,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        videoUrl: liveState.currentLive.facebookUrl,
        thumbnail: liveState.currentLive.memberImage,
        views: 'Live Recording'
      };
      setArchives(prev => [newArchiveItem, ...prev]);
    }
    setLiveState({ isLive: false, currentLive: null });
  };

  const addSchedule = newSchedule => {
    setSchedules(prev => [
      { ...newSchedule, id: `sch-${Date.now()}` },
      ...prev
    ]);
  };

  const removeSchedule = id => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  const addArchive = newArchive => {
    setArchives(prev => [
      { ...newArchive, id: `arc-${Date.now()}` },
      ...prev
    ]);
  };

  const removeArchive = id => {
    setArchives(prev => prev.filter(a => a.id !== id));
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
