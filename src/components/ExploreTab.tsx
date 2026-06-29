import React from 'react';
import { Compass, Calendar, MessageSquare } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  bestTime: string;
  rating: string;
  vibe: string;
  image: string;
  chatPrompt: string;
}

interface ExploreTabProps {
  onSelectPrompt: (prompt: string) => void;
  onSelectBuild: (destinationName: string) => void;
}

const ExploreTab: React.FC<ExploreTabProps> = ({ onSelectPrompt, onSelectBuild }) => {
  const destinations: Destination[] = [
    {
      id: 'kyoto',
      name: 'Kyoto',
      country: 'Japan',
      description: 'The cultural heart of Japan, famous for its thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.',
      bestTime: 'Spring (Mar - May)',
      rating: '4.9 ★',
      vibe: 'Culture & Zen',
      image: '/destinations/kyoto.png',
      chatPrompt: 'Can you recommend a full travel guide for Kyoto? I want to know about temples, tea ceremonies, and local etiquettes.'
    },
    {
      id: 'rome',
      name: 'Rome',
      country: 'Italy',
      description: 'A potent blend of haunting ruins, awe-inspiring art, and vibrant street life. Italy\'s capital is one of the world\'s most romantic and inspiring cities.',
      bestTime: 'Autumn (Sep - Nov)',
      rating: '4.8 ★',
      vibe: 'History & Pasta',
      image: '/destinations/rome.png',
      chatPrompt: 'Tell me about the best food spots in Rome and the historical sites I should visit outside the Colosseum.'
    },
    {
      id: 'reykjavik',
      name: 'Reykjavík & Beyond',
      country: 'Iceland',
      description: 'A gateway to a land of spectacular natural wonders, with bubbling hot springs, dramatic black-sand beaches, cascading waterfalls, and active volcanoes.',
      bestTime: 'Winter (Nov - Feb) for Auroras',
      rating: '4.7 ★',
      vibe: 'Adventure & Nature',
      image: '/destinations/reykjavik.png',
      chatPrompt: 'How can I plan a road trip around Iceland\'s Ring Road? What safety precautions and packing items do you suggest?'
    },
    {
      id: 'capetown',
      name: 'Cape Town',
      country: 'South Africa',
      description: 'A stunning port city dominated by the magnificent Table Mountain. Known for its gorgeous harbor, white sandy beaches, wine estates, and rich history.',
      bestTime: 'Summer (Nov - Feb)',
      rating: '4.8 ★',
      vibe: 'Scenic & Wildlife',
      image: '/destinations/capetown.png',
      chatPrompt: 'What are the top things to do in Cape Town for a first-timer? I\'m interested in both nature hikes and cultural history.'
    }
  ];

  return (
    <div className="tab-panel">
      <div className="explore-grid">
        {destinations.map((dest) => (
          <div key={dest.id} className="explore-card">
            <div className="explore-img-container">
              <img src={dest.image} alt={dest.name} className="explore-img" />
              <div className="explore-badge">{dest.vibe}</div>
            </div>
            
            <div className="explore-info">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h3>{dest.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600 }}>{dest.rating}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.75rem', fontWeight: 500 }}>
                {dest.country}
              </p>
              
              <p className="explore-desc">{dest.description}</p>
              
              <div className="explore-stats">
                <div className="explore-stat-item">
                  <Calendar size={13} style={{ color: 'var(--text-dim)' }} />
                  <span>Best Time: {dest.bestTime}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="explore-btn" 
                  onClick={() => onSelectPrompt(dest.chatPrompt)}
                  style={{ flexGrow: 1 }}
                >
                  <MessageSquare size={14} />
                  Ask AI
                </button>
                <button 
                  className="explore-btn" 
                  onClick={() => onSelectBuild(dest.name)}
                  style={{ flexGrow: 1, borderColor: 'var(--primary)', background: 'rgba(79, 70, 229, 0.05)' }}
                >
                  <Compass size={14} style={{ color: 'var(--primary-hover)' }} />
                  Plan Itinerary
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreTab;
