import { useState } from 'react';
import Silk from '../backgrounds/Silk';
import AccordionGallery from '../gallery/AccordionGallery';
import './AboutPage.css';

/* ── Gallery items — photos from public/about-photo/ ── */
const galleryItems = [
  { image: '/about-photo/IMG_20260831_121847.png', label: 'Donations & Social Cause' },
  { image: '/about-photo/IMG_20260901_135334.jpg', label: 'Community Support' },
  { image: '/about-photo/IMG_20260901_135351.jpg', label: 'Humanity' },
  { image: '/about-photo/IMG_20260901_135401.jpg', label: 'Helping Hands' },
  { image: '/about-photo/IMG_20260901_142236.jpg', label: 'Live Session' },
];

export default function AboutPage() {
  const [lang, setLang] = useState('en');

  return (
    <main className="about-page">
      {/* Animated Silk background */}
      <div className="about-bg">
        <Silk
          speed={5}
          scale={1}
          color="#094c36"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Content */}
      <div className="about-content">
        {/* Language toggle */}
        <div className="about-lang-toggle">
          <button
            className={`about-lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLang('en')}
          >
            English
          </button>
          <button
            className={`about-lang-btn ${lang === 'hi' ? 'active' : ''}`}
            onClick={() => setLang('hi')}
          >
            हिन्दी
          </button>
        </div>

        {lang === 'en' ? <EnglishContent /> : <HindiContent />}

        {/* Accordion Gallery — Our Impact */}
        <div className="about-gallery-section about-fade-in">
          <h2 className="about-gallery-title">
            {lang === 'en' ? 'Our Impact' : 'हमारा प्रभाव'}
          </h2>
          <p className="about-gallery-subtitle">
            {lang === 'en'
              ? 'Donations, live sessions, and the lives we\'ve touched.'
              : 'दान, लाइव सत्र, और जिन जीवन को हमने छुआ है।'}
          </p>
          <AccordionGallery
            items={galleryItems}
            defaultIndex={2}
            accentColor="#C9A227"
            overlayColor="#0F2E26"
            textColor="#F5F0E6"
            height={460}
            gap={8}
            radius={14}
            expandRatio={0.52}
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={8}
            showLabels
            grayscale
          />
        </div>
      </div>
    </main>
  );
}

function EnglishContent() {
  return (
    <div key="en">
      <h1 className="about-title about-fade-in">THE ROYAL CLUB</h1>
      <hr className="about-divider about-fade-in" />

      <div className="about-body about-fade-in">
        <p>
          <strong>The Royal Club</strong> is a growing community connecting people from different states of India with a shared vision of <strong>growth, connection, awareness, and social responsibility</strong>.
        </p>
        <p>
          We help our members <strong>expand their reach, build meaningful connections, discover opportunities, and grow together</strong>. The group also provides a platform to discuss <strong>current happenings, trending topics, social issues, and important developments across India</strong>, encouraging people to stay informed and share their perspectives.
        </p>
        <p>
          But our purpose goes beyond conversations and networking. Every month, <strong>The Royal Club contributes donations to people in need</strong>, turning our community into a force for positive change.
        </p>
      </div>

      <p className="about-tagline about-fade-in">
        Connect &bull; Grow &bull; Stay Aware &bull; Give Back
      </p>
      <p className="about-closer about-fade-in">
        The Royal Club — Where People Connect, Grow &amp; Make a Difference.
      </p>
    </div>
  );
}

function HindiContent() {
  return (
    <div key="hi">
      <h1 className="about-title about-fade-in">द रॉयल क्लब</h1>
      <hr className="about-divider about-fade-in" />

      <div className="about-body hindi about-fade-in">
        <p>
          <strong>द रॉयल क्लब</strong> भारत के अलग-अलग राज्यों से लोगों को एक साथ जोड़ने वाला एक बढ़ता हुआ समुदाय है, जिसका उद्देश्य <strong>विकास, जुड़ाव, जागरूकता और सामाजिक जिम्मेदारी</strong> को बढ़ावा देना है।
        </p>
        <p>
          हम अपने सदस्यों को <strong>अपनी पहुंच बढ़ाने, नए और उपयोगी संबंध बनाने, नए अवसरों से जुड़ने और एक-दूसरे के साथ आगे बढ़ने</strong> में मदद करते हैं। यह समूह <strong>भारत में हो रही वर्तमान घटनाओं, महत्वपूर्ण मुद्दों, सामाजिक विषयों और चर्चित विषयों</strong> पर विचार साझा करने और चर्चा करने का एक मंच भी है, जिससे सदस्य देश और समाज से जुड़े महत्वपूर्ण विषयों के प्रति जागरूक रह सकें।
        </p>
        <p>
          हमारा उद्देश्य केवल बातचीत और नेटवर्किंग तक सीमित नहीं है। <strong>द रॉयल क्लब हर महीने जरूरतमंद लोगों की सहायता के लिए दान करता है</strong>, ताकि हमारा समुदाय समाज में सकारात्मक बदलाव लाने में भी योगदान दे सके।
        </p>
      </div>

      <p className="about-tagline about-fade-in">
        जुड़ें &bull; बढ़ें &bull; जागरूक रहें &bull; सहयोग करें
      </p>
      <p className="about-closer about-fade-in">
        द रॉयल क्लब — जहां लोग जुड़ते हैं, आगे बढ़ते हैं और बदलाव लाते हैं।
      </p>
    </div>
  );
}
