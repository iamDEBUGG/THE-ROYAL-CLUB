import TiltedCard from '../cards/TiltedCard';
import SEO from '../common/SEO';
import Footer from '../common/Footer';
import './MembersPage.css';

const members = [
  { image: '/members/Amit-Kumar-Bihar.jpg', name: 'Amit Kumar', state: 'Bihar' },
  { image: '/members/Brij-Kishore-Uttrakhand.jpg', name: 'Brij Kishore', state: 'Uttrakhand' },
  { image: '/members/Diwakar-Mishra-Bihar.jpg', name: 'Diwakar Mishra', state: 'Bihar' },
  { image: '/members/Guddi-Baghel-Uttrakhand.jpg', name: 'Guddi Baghel', state: 'Uttrakhand' },
  { image: '/members/Narayan-Pandey-Uttar-Pradesh.jpg', name: 'Narayan Pandey', state: 'Uttar Pradesh' },
  { image: '/members/Pankaj-Sharma-West-Bengal.jpg', name: 'Pankaj Sharma', state: 'West Bengal' },
  { image: '/members/Roshan-Chhetri-West-Bengal.jpg', name: 'Roshan Chhetri', state: 'West Bengal' },
  { image: '/members/Samri-Priya-Rai-Uttrakhand.jpg', name: 'Samri Priya Rai', state: 'Uttrakhand' },
  { image: '/members/Sangita-tamang-Sikkim.jpg', name: 'Sangita Tamang', state: 'Sikkim' },
  { image: '/members/Sarojani-Sharma-Madhya-Pradesh.jpg', name: 'Sarojani Sharma', state: 'Madhya Pradesh' },
  { image: '/members/Subash-Chandra-Uttrakhand.jpg', name: 'Subash Chandra', state: 'Uttrakhand' },
  { image: '/members/Sudama-Ojha-Bihar.jpg', name: 'Sudama Ojha', state: 'Bihar' },
];

export default function MembersPage() {
  const membersSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://the-royal-club.vercel.app/members/#webpage',
    'url': 'https://the-royal-club.vercel.app/members',
    'name': 'The Royal Club Members Directory',
    'description': 'Meet the 12 distinguished members of The Royal Club across Bihar, Uttrakhand, UP, West Bengal, Madhya Pradesh, and Sikkim.',
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
          'name': 'Members',
          'item': 'https://the-royal-club.vercel.app/members'
        }
      ]
    },
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': members.length,
      'itemListElement': members.map((member, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'item': {
          '@type': 'Person',
          'name': member.name,
          'jobTitle': 'Community Member & Live Broadcaster',
          'address': {
            '@type': 'PostalAddress',
            'addressRegion': member.state,
            'addressCountry': 'IN'
          },
          'image': `https://the-royal-club.vercel.app${member.image}`
        }
      }))
    }
  };

  return (
    <>
      <SEO
        title="Our 12 Members — Pan-India Community Voices"
        description="Meet the 12 distinguished members of The Royal Club representing Bihar, Uttrakhand, Uttar Pradesh, West Bengal, Sikkim, and Madhya Pradesh."
        canonical="/members"
        keywords="The Royal Club Members, Amit Kumar Bihar, Brij Kishore Uttrakhand, Diwakar Mishra, Narayan Pandey, Pankaj Sharma, Roshan Chhetri, Samri Priya Rai, Sangita Tamang, Sarojani Sharma, Subash Chandra, Sudama Ojha, Guddi Baghel"
        schema={membersSchema}
      />
      <main className="members-page">
        <header className="members-header">
          <h1>Our Members</h1>
          <p>
            12 distinguished members — each bringing their unique voice and perspective to the community.
          </p>
        </header>

        <section className="members-grid" aria-label="Members Directory">
          {members.map((member) => (
            <div className="member-card-wrapper" key={member.name}>
              <TiltedCard
                imageSrc={member.image}
                altText={`${member.name} - Member from ${member.state}`}
                captionText={`${member.name} — ${member.state}`}
                containerHeight="340px"
                containerWidth="280px"
                imageHeight="340px"
                imageWidth="280px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip
                displayOverlayContent={false}
              />
              <div className="member-info">
                <h2>{member.name}</h2>
                <span>{member.state}</span>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

