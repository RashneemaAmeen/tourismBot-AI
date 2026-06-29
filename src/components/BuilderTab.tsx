import { useState, useEffect } from 'react';
import { Plane, Compass, Save, Printer, RefreshCw, AlertCircle } from 'lucide-react';


export interface Activity {
  time: string;
  desc: string;
}

export interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  duration: number;
  budget: string;
  interests: string;
  days: DayPlan[];
}

interface BuilderTabProps {
 
  onSaveItinerary: (itinerary: Itinerary) => void;
  savedItineraries: Itinerary[];
  prefilledDestination: string;
  onClearPrefilledDestination: () => void;
}

const BuilderTab: React.FC<BuilderTabProps> = ({ 

  onSaveItinerary, 
  savedItineraries,
  prefilledDestination,
  onClearPrefilledDestination
}) => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(3);
  const [budget, setBudget] = useState('Mid-range');
  const [interests, setInterests] = useState('Culture & Sights');
  const [notes, setNotes] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Pre-fill destination when passed from parent
  useEffect(() => {
    if (prefilledDestination) {
      setDestination(prefilledDestination);
      onClearPrefilledDestination();
    }
  }, [prefilledDestination]);

 

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setIsSaved(false);

    try {
    /*  const prompt = `
        Generate a detailed travel itinerary in JSON format for a trip to "${destination}".
        Duration: ${duration} days.
        Budget Level: ${budget}.
        Travel Style/Interests: ${interests}.
        Additional requests/notes: ${notes || 'None'}.

        You MUST respond ONLY with a JSON object. Do not include markdown code block formatting (like \`\`\`json) or any preamble, just return the raw JSON object.
        
        The JSON object must follow this typescript interface structure exactly:
        {
          "title": "A string describing the trip title (e.g. 'Gourmet Paris Escapade')",
          "days": [
            {
              "day": 1,
              "theme": "A short description of this day's focus (e.g. 'Historic Core & Seine')",
              "activities": [
                {
                  "time": "e.g. '09:00 AM' or 'Morning'",
                  "desc": "Detail of the activity including location and tips"
                }
              ]
            }
          ]
        }
        Provide realistic timings (e.g., Morning, Afternoon, Evening or specific hours) and detailed local descriptions for 3 to 4 activities per day.
      `;*/

      const response = await fetch('/api/itinerary', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    destination,
    duration,
    budget,
    interests,
    notes,
  }),
});

const responseText = await response.text();

if (!responseText) {
  throw new Error('No response from /api/itinerary. Are you running with vercel dev?');
}

const parsedData = JSON.parse(responseText);

if (!response.ok) {
  throw new Error(parsedData.error || 'Failed to generate itinerary');
}  
    

      if (!parsedData.title || !parsedData.days || !Array.isArray(parsedData.days)) {
        throw new Error("Invalid structure returned by AI model.");
      }

      const generatedItinerary: Itinerary = {
        id: Date.now().toString(),
        title: parsedData.title,
        destination,
        duration,
        budget,
        interests,
        days: parsedData.days
      };

      setItinerary(generatedItinerary);
    } catch (err: any) {
      console.error("Itinerary Builder Error:", err);
      let errMsg = err?.message || "Failed to generate itinerary. Please try again.";
      if (err?.status === 429 || errMsg.includes('quota') || errMsg.includes('429')) {
        errMsg = "OpenAI API Quota Exceeded (429): The active key is out of credits. Please check your OpenAI plan/billing, or paste a new, working OpenAI API Key in the Sidebar Settings on the left!";
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!itinerary) return;
    // Check if already saved
    const exists = savedItineraries.some(item => item.destination.toLowerCase() === itinerary.destination.toLowerCase() && item.duration === itinerary.duration);
    if (!exists) {
      onSaveItinerary(itinerary);
      setIsSaved(true);
    } else {
      alert("This itinerary is already saved!");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="tab-panel">
      <div className="builder-split">
        {/* Left Form Panel */}
        <form onSubmit={handleGenerate} className="builder-sidebar">
          <h2 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '0.5rem' }}>Trip Customizer</h2>
          
          <div className="form-group">
            <label>Where to?</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Bali, Paris, Tokyo..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Days</label>
              <input
                type="number"
                min="1"
                max="10"
                required
                className="form-input"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="form-group">
              <label>Budget</label>
              <select className="form-select" value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="Economy">Economy $</option>
                <option value="Mid-range">Mid-range $$</option>
                <option value="Luxury">Luxury $$$</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Travel Vibe</label>
            <select className="form-select" value={interests} onChange={(e) => setInterests(e.target.value)}>
              <option value="Culture & Sights">🏛️ Culture & Sights</option>
              <option value="Food & Dining">🍜 Food & Dining</option>
              <option value="Adventure & Nature">🌋 Adventure & Nature</option>
              <option value="Relaxation & Spa">🌴 Relaxation & Spa</option>
              <option value="Shopping & Urban">🛍️ Shopping & Urban</option>
            </select>
          </div>

          <div className="form-group">
            <label>Preferences / Notes</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="e.g., Vegetarian dining, fast-paced, child-friendly, wheelchair-accessible..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="spinner" size={16} style={{ borderTopColor: 'white' }} />
                Crafting Plan...
              </>
            ) : (
              <>
                <Plane size={16} />
                Generate Plan
              </>
            )}
          </button>
        </form>

        {/* Right Output Panel */}
        <div className="builder-output">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <p style={{ color: 'white', fontWeight: 600 }}>Drafting your custom adventure...</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>VoyageAI is mapping out the best local spots and schedules...</p>
            </div>
          )}

          {error && (
            <div className="builder-empty" style={{ color: 'var(--accent)' }}>
              <AlertCircle size={48} />
              <h3>Generation Failed</h3>
              <p>{error}</p>
            </div>
          )}

          {!itinerary && !isLoading && !error && (
            <div className="builder-empty">
              <Compass />
              <h3>Your Custom Itinerary Awaits</h3>
              <p>Fill out the travel form on the left to generate a personalized day-by-day plan crafted by AI.</p>
            </div>
          )}

          {itinerary && (
            <div className="print-area">
              <div className="itinerary-header">
                <div>
                  <h2 style={{ fontSize: '1.75rem', color: 'white', marginBottom: '0.25rem' }}>{itinerary.title}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {itinerary.destination} • {itinerary.duration} Days • {itinerary.budget} Budget • {itinerary.interests}
                  </p>
                </div>
                <div className="itinerary-actions no-print">
                  <button className={`action-btn ${isSaved ? 'primary-action' : ''}`} onClick={handleSave} disabled={isSaved}>
                    <Save size={16} />
                    {isSaved ? 'Saved' : 'Save Itinerary'}
                  </button>
                  <button className="action-btn" onClick={handlePrint}>
                    <Printer size={16} />
                    Print
                  </button>
                </div>
              </div>

              {/* Timeline Rendering */}
              <div className="timeline">
                {itinerary.days.map((dayPlan) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderTab;
