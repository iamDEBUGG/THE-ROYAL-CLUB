import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LiveProvider } from './context/LiveContext';
import CardNav from './components/common/CardNav';
import SEO from './components/common/SEO';
import Footer from './components/common/Footer';
import HeroScrollCanvas from './components/hero/HeroScrollCanvas';
import CircularGallery from './components/gallery/CircularGallery';
import MembersPage from './components/members/MembersPage';
import AboutPage from './components/about/AboutPage';
import CeoBoardPage from './components/ceo/CeoBoardPage';
import LiveScheduleSection from './components/home/LiveScheduleSection';
import LiveNowPage from './components/broadcast/LiveNowPage';
import SchedulePage from './components/broadcast/SchedulePage';
import ArchivesPage from './components/broadcast/ArchivesPage';

gsap.registerPlugin(ScrollTrigger);

/* ── Member gallery items ── */
const memberItems = [
  { image: '/members/Amit-Kumar-Bihar.jpg', text: 'Amit Kumar' },
  { image: '/members/Brij-Kishore-Uttrakhand.jpg', text: 'Brij Kishore' },
  { image: '/members/Diwakar-Mishra-Bihar.jpg', text: 'Diwakar Mishra' },
  { image: '/members/Guddi-Baghel-Uttrakhand.jpg', text: 'Guddi Baghel' },
  { image: '/members/Narayan-Pandey-Uttar-Pradesh.jpg', text: 'Narayan Pandey' },
  { image: '/members/Pankaj-Sharma-West-Bengal.jpg', text: 'Pankaj Sharma' },
  { image: '/members/Roshan-Chhetri-West-Bengal.jpg', text: 'Roshan Chhetri' },
  { image: '/members/Samri-Priya-Rai-Uttrakhand.jpg', text: 'Samri Priya Rai' },
  { image: '/members/Sangita-tamang-Sikkim.jpg', text: 'Sangita Tamang' },
  { image: '/members/Sarojani-Sharma-Madhya-Pradesh.jpg', text: 'Sarojani Sharma' },
  { image: '/members/Subash-Chandra-Uttrakhand.jpg', text: 'Subash Chandra' },
  { image: '/members/Sudama-Ojha-Bihar.jpg', text: 'Sudama Ojha' },
];

/* ── Home Page Component ── */
const HomePage = () => (
  <>
    <SEO
      title="Unity in Diversity | Pan-India Visionaries"
      description="THE ROYAL CLUB — A prestigious pan-India community of 13 visionary leaders hosting daily interactive Facebook Live sessions, fostering collective growth, and driving monthly social impact."
      canonical="/"
      keywords="The Royal Club, Royal Club India, Facebook Live, Daily Live Sessions, Social Impact, Rajendra Singh Papola, Pan India Community, Inspiration, Awareness"
    />
    <main>
      {/* Primary Accessible SEO Heading */}
      <h1 className="sr-only">
        THE ROYAL CLUB — Pan-India Community &amp; Daily Facebook Live Sessions
      </h1>

      <HeroScrollCanvas />

      {/* Sections below the scroll animation */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden" aria-label="Welcome Section">
        {/* Background image */}
        <img
          src="/welcome-bg.jpg"
          alt="The Royal Club Luxury Welcome Banner"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(15, 46, 38, 0.55)', zIndex: 1 }}
        />
        <div className="relative max-w-3xl text-center" style={{ zIndex: 2 }}>
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
            Welcome to The Royal Club
          </h2>
          <p className="font-body text-lg text-cream/70 leading-relaxed">
            A premium community of 13 visionaries united by purpose, hosting daily Facebook Live sessions
            that inspire, educate, and transform.
          </p>
        </div>
      </section>

      <section className="min-h-screen flex flex-col px-6 py-16" style={{ background: 'var(--color-royal-green)' }} aria-label="Members Showcase">
        <div className="max-w-3xl text-center mx-auto mb-8">
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
            Our Members
          </h2>
          <p className="font-body text-lg text-cream/70 leading-relaxed">
            12 distinguished members and a visionary CEO — each bringing their unique voice to the community.
          </p>
        </div>
        {/* CircularGallery – members showcase */}
        <div className="flex-1 relative" style={{ minHeight: '500px' }}>
          <CircularGallery
            items={memberItems}
            bend={0}
            textColor="#F5F0E6"
            borderRadius={0.11}
            scrollEase={0.05}
            font="bold 24px 'Playfair Display'"
            fontUrl="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
            scrollSpeed={2}
          />
        </div>
        <div className="max-w-3xl text-center mx-auto mt-10 pb-4">
          <blockquote className="font-display text-2xl md:text-3xl text-cream/90 italic leading-relaxed" style={{ fontStyle: 'italic' }}>
            "A team is not a group of people who work together. A team is a group of people who trust each other."
          </blockquote>
        </div>
      </section>

      {/* Dynamic Live Schedule Section */}
      <LiveScheduleSection />
    </main>
    <Footer />
  </>
);

const LoginPage = () => (
  <>
    <SEO title="Member Login" canonical="/login" />
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--color-dark-green)' }}>
      <div className="glass rounded-card p-8 max-w-md w-full text-center">
        <h1 className="font-display text-3xl text-cream mb-4">Member Login</h1>
        <p className="font-body text-cream/60">Login page — coming soon.</p>
      </div>
    </main>
    <Footer />
  </>
);

const RegisterPage = () => (
  <>
    <SEO title="Join The Club" canonical="/register" />
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--color-dark-green)' }}>
      <div className="glass rounded-card p-8 max-w-md w-full text-center">
        <h1 className="font-display text-3xl text-cream mb-4">Join The Club</h1>
        <p className="font-body text-cream/60">Registration is invite-only.</p>
      </div>
    </main>
    <Footer />
  </>
);

/* ── Navigation Items for CardNav ── */
const navItems = [
  {
    label: 'The Club',
    bgColor: '#0F2E26',
    textColor: '#F5F0E6',
    links: [
      { label: 'Home', ariaLabel: 'Go to Home', href: '/' },
      { label: 'About', ariaLabel: 'About The Royal Club', href: '/about' },
    ],
  },
  {
    label: 'Directory',
    bgColor: '#0F2E26',
    textColor: '#F5F0E6',
    links: [
      { label: 'Members', ariaLabel: 'View Members', href: '/members' },
      { label: 'CEO Board', ariaLabel: 'CEO Board', href: '/admin' },
    ],
  },
  {
    label: 'Broadcast',
    bgColor: '#0F2E26',
    textColor: '#F5F0E6',
    links: [
      { label: 'Live Now', ariaLabel: 'Watch Live Session', href: '/live' },
      { label: 'Full Schedule', ariaLabel: 'Full Schedule', href: '/schedule' },
      { label: 'Archives', ariaLabel: 'Session Archives', href: '/archives' },
    ],
  },
];

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    /* ── Initialize Lenis smooth scroll ── */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    /* Sync Lenis scroll with ScrollTrigger */
    lenis.on('scroll', ScrollTrigger.update);

    /* Use GSAP ticker to drive Lenis's raf loop */
    const update = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <LiveProvider>
      <BrowserRouter>
        <CardNav
          logoText="THE ROYAL CLUB"
          logoAlt="The Royal Club Logo"
          items={navItems}
          baseColor="#1B4D3E"
          menuColor="#F5F0E6"
          buttonBgColor="#C9A227"
          buttonTextColor="#0F2E26"
          ease="power3.out"
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<CeoBoardPage />} />
          <Route path="/ceo" element={<CeoBoardPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/live" element={<LiveNowPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/archives" element={<ArchivesPage />} />
        </Routes>
      </BrowserRouter>
    </LiveProvider>
  );
}

export default App;
