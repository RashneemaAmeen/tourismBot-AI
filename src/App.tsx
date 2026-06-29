import { useState, useEffect } from 'react';
import { Compass, MessageSquare, Map, Bookmark, Sparkles } from 'lucide-react';
import ChatTab from './components/ChatTab';
import BuilderTab from './components/BuilderTab';
import type { Itinerary } from './components/BuilderTab';
import ExploreTab from './components/ExploreTab';
import SavedTab from './components/SavedTab';

type Tab = 'explore' | 'chat' | 'builder' | 'saved';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('explore');
  const [savedItineraries, setSavedItineraries] = useState<Itinerary[]>([]);
  const [prefilledChatPrompt, setPrefilledChatPrompt] = useState<string>('');
  const [prefilledDestination, setPrefilledDestination] = useState<string>('');
 

 

 
  // Load saved itineraries from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('voyageai_itineraries');
      if (stored) {
        setSavedItineraries(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load saved itineraries", e);
    }
  }, []);

  // Save itinerary to state & localStorage
  const handleSaveItinerary = (newItinerary: Itinerary) => {
    const updated = [newItinerary, ...savedItineraries];
    setSavedItineraries(updated);
    localStorage.setItem('voyageai_itineraries', JSON.stringify(updated));
  };

  // Delete saved itinerary
  const handleDeleteItinerary = (id: string) => {
    const updated = savedItineraries.filter(item => item.id !== id);
    setSavedItineraries(updated);
    localStorage.setItem('voyageai_itineraries', JSON.stringify(updated));
  };

  // Triggered when user selects a prompt from Explore tab to talk to AI
  const handleSelectExplorePrompt = (prompt: string) => {
    setPrefilledChatPrompt(prompt);
    setActiveTab('chat');
  };

  // Triggered when user clicks "Plan Itinerary" on an explore card
  const handleSelectBuildDestination = (destName: string) => {
    setPrefilledDestination(destName);
    setActiveTab('builder');
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar no-print">
        <div className="logo-container">
          <div className="logo-icon">
            <Sparkles size={22} />
          </div>
          <span className="logo-text">VoyageAI</span>
        </div>

        <nav style={{ flexGrow: 1 }}>
          <ul className="nav-list">
            <li>
              <button
                className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`}
                onClick={() => setActiveTab('explore')}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <Compass />
                <span>Explore</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
                onClick={() => setActiveTab('chat')}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <MessageSquare />
                <span>AI Travel Guide</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'builder' ? 'active' : ''}`}
                onClick={() => setActiveTab('builder')}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <Map />
                <span>Itinerary Builder</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`}
                onClick={() => setActiveTab('saved')}
                style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              >
                <Bookmark />
                <span>My Saved Trips</span>
              </button>
            </li>
          </ul>
        </nav>

      

        <div className="sidebar-footer">
          <p>© 2026 VoyageAI. All rights reserved.</p>
          <p style={{ marginTop: '0.25rem', fontSize: '0.7rem' }}>Powered by GPT-4o-mini</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="header-container no-print">
          <div className="header-title">
            <h1>
              {activeTab === 'explore' && 'Discover Destinations'}
              {activeTab === 'chat' && 'AI Travel Specialist'}
              {activeTab === 'builder' && 'AI Itinerary Engineer'}
              {activeTab === 'saved' && 'Saved Travel Schedules'}
            </h1>
            <p>
              {activeTab === 'explore' && 'Get inspired for your next travel gateway with curated sights.'}
              {activeTab === 'chat' && 'Ask questions, learn local phrases, search dining, and chat with AI.'}
              {activeTab === 'builder' && 'Input details and get a tailored day-by-day itinerary instantly.'}
              {activeTab === 'saved' && 'Manage your saved trips, print agendas, or download travel schedules.'}
            </p>
          </div>
        </div>

        {/* Tab Renderers */}
        {activeTab === 'explore' && (
          <ExploreTab
            onSelectPrompt={handleSelectExplorePrompt}
            onSelectBuild={handleSelectBuildDestination}
          />
        )}

        {activeTab === 'chat' && (
          <ChatTab
  prefilledPrompt={prefilledChatPrompt}
  onClearPrefilledPrompt={() => setPrefilledChatPrompt('')}
/>
        )}

        {activeTab === 'builder' && (
          <BuilderTab
  onSaveItinerary={handleSaveItinerary}
  savedItineraries={savedItineraries}
  prefilledDestination={prefilledDestination}
  onClearPrefilledDestination={() => setPrefilledDestination('')}
/>
        )}

        {activeTab === 'saved' && (
          <SavedTab
            savedItineraries={savedItineraries}
            onDeleteItinerary={handleDeleteItinerary}
          />
        )}
      </main>
    </div>
  );
}

export default App;
