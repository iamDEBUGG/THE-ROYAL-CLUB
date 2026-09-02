import TiltedCard from '../cards/TiltedCard';
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
  return (
    <main className="members-page">
      <div className="members-header">
        <h1>Our Members</h1>
        <p>
          12 distinguished members — each bringing their unique voice to the community.
        </p>
      </div>

      <div className="members-grid">
        {members.map((member) => (
          <div className="member-card-wrapper" key={member.name}>
            <TiltedCard
              imageSrc={member.image}
              altText={`${member.name} from ${member.state}`}
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
              <h3>{member.name}</h3>
              <span>{member.state}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
