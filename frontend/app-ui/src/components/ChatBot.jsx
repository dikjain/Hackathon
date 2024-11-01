import React, { useState, useEffect } from 'react';
import './Chatbot.css'; // Assuming you'll create a CSS file for styling

function Chatbot() {
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      createSession();
    }
  }, [isVisible]);

  const createSession = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ externalUserId: 'user123' })
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      setMessages([{ type: 'bot', content: 'Hello! How can I assist you today?' }]);
    } catch (error) {
      console.error('Error creating session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitQuery = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { type: 'userz', content: inputMessage }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/chat/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, query: inputMessage })
      });
      const data = await res.json();
      if (data.data && data.data.answer) {
        setMessages(prev => [...prev, { type: 'bot', content: data.data.answer }]);
      } else {
        console.error('Unexpected response format:', data);
        setMessages(prev => [...prev, { type: 'bot', content: 'Sorry, I received an unexpected response. Please try again.' }]);
      }
    } catch (error) {
      console.error('Error submitting query:', error);
      setMessages(prev => [...prev, { type: 'bot', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <>
{      <button className='chatbot-toggle' onClick={toggleVisibility}>
        {isVisible ? 'Hide Chatbot' : 'Show Chatbot'}
      </button>}
      {isVisible && (
        <div className="chatbot-container">
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.content}
              </div>
            ))}
            {isLoading && <div className="message bot">Thinking...</div>}
          </div>
          <form onSubmit={submitQuery} className="chatbot-input-form">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>Send</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;