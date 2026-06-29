import { useState, useRef, useEffect } from 'react';
import { Send, Compass } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatTabProps {
  prefilledPrompt: string;
  onClearPrefilledPrompt: () => void;
}

const ChatTab: React.FC<ChatTabProps> = ({ prefilledPrompt, onClearPrefilledPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "🗺️ Recommend a 3-day itinerary for Kyoto",
    "🍕 Best local street food spots in Rome",
    "❄️ Tips for Iceland road trips in winter",
    "🗼 Affordable hotels near Tokyo Tower"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (prefilledPrompt) {
      handleSendMessage(prefilledPrompt);
      onClearPrefilledPrompt();
    }
  }, [prefilledPrompt]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "I'm sorry, I couldn't process that response. Please try again."
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: error?.message || 'Failed to fetch response. Please try again.'
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <div className="tab-panel">
      <div className="chat-window">
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <div className="welcome-icon">
                <Compass />
              </div>
              <div>
                <h2 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.75rem' }}>
                  Explore the World with VoyageAI
                </h2>
                <p style={{ color: 'var(--text-muted)' }}>
                  Ask me anything about destinations, local cuisines, customs, flight tips, or request custom itineraries!
                </p>
              </div>
              <div className="welcome-suggestions">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    className="suggestion-chip"
                    onClick={() => handleSendMessage(suggestion.slice(3))}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`message-wrapper ${msg.role}`}>
                <div className="message-content">
                  <div className="message-avatar">
                    {msg.role === 'user' ? 'U' : 'AI'}
                  </div>
                  <div className="message-bubble">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="message-wrapper assistant">
              <div className="message-content">
                <div className="message-avatar">AI</div>
                <div className="message-bubble" style={{ padding: '0.5rem 1rem' }}>
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            placeholder="Ask about a place, restaurant, custom, itinerary..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button
            className="send-button"
            onClick={() => handleSendMessage(input)}
            disabled={isLoading || !input.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;