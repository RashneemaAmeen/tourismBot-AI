import React, { useState } from 'react';
import { Bookmark, Trash2, Printer, Compass } from 'lucide-react';
import type { Itinerary } from './BuilderTab';

interface SavedTabProps {
  savedItineraries: Itinerary[];
  onDeleteItinerary: (id: string) => void;
}

const SavedTab: React.FC<SavedTabProps> = ({ savedItineraries, onDeleteItinerary }) => {
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(
    savedItineraries.length > 0 ? savedItineraries[0] : null
  );

  // If selected itinerary is deleted, auto-select another one or null
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this saved trip?")) {
      onDeleteItinerary(id);
      if (selectedItinerary?.id === id) {
        const remaining = savedItineraries.filter(item => item.id !== id);
        setSelectedItinerary(remaining.length > 0 ? remaining[0] : null);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tab-panel">
      {savedItineraries.length === 0 ? (
        <div className="builder-empty glass-card" style={{ height: 'calc(100vh - 12rem)' }}>
          <Bookmark size={48} />
          <h3>No Saved Itineraries Yet</h3>
          <p>Go to the <strong>Itinerary Builder</strong> tab to create and save your personalized travel plans.</p>
        </div>
      ) : (
        <div className="builder-split">
          {/* Saved Trips List */}
          <div className="builder-sidebar" style={{ gap: '0.75rem' }}>
            <h2 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '0.5rem' }}>My Saved Trips</h2>
            {savedItineraries.map((item) => (
              <div
                key={item.id}
                className={`nav-item ${selectedItinerary?.id === item.id ? 'active' : ''}`}
                onClick={() => setSelectedItinerary(item)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '1rem',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>{item.title}</span>
                  <button
                    className="icon-btn delete"
                    onClick={(e) => handleDelete(item.id, e)}
                    style={{ width: '28px', height: '28px' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>📍 {item.destination}</span>
                  <span>📅 {item.duration} Days</span>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Itinerary Viewer */}
          <div className="builder-output">
            {selectedItinerary ? (
              <div className="print-area">
                <div className="itinerary-header">
                  <div>
                    <h2 style={{ fontSize: '1.75rem', color: 'white', marginBottom: '0.25rem' }}>{selectedItinerary.title}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {selectedItinerary.destination} • {selectedItinerary.duration} Days • {selectedItinerary.budget} Budget • {selectedItinerary.interests}
                    </p>
                  </div>
                  <div className="itinerary-actions no-print">
                    <button className="action-btn" onClick={handlePrint}>
                      <Printer size={16} />
                      Print / Save PDF
                    </button>
                  </div>
                </div>

                {/* Timeline Rendering */}
                <div className="timeline">
                  {selectedItinerary.days.map((dayPlan) => (
                    <div key={dayPlan.day} className="timeline-item">
                      <div className="timeline-node">
                        Day {dayPlan.day}
                      </div>
                      <div className="timeline-content">
                        <h3>{dayPlan.theme}</h3>
                        <div className="timeline-events">
                          {dayPlan.activities.map((act, index) => (
                            <div key={index} className="timeline-event">
                              <span className="event-time">{act.time}</span>
                              <span className="event-desc">{act.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="builder-empty">
                <Compass />
                <h3>Select a Trip</h3>
                <p>Select an itinerary from the sidebar to view details, timelines, and print schedules.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedTab;
