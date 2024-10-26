import React, { useState } from 'react';

function App() {
  const [sessionId, setSessionId] = useState('');
  const [response, setResponse] = useState('');

  const createSession = async () => {
    const res = await fetch('http://localhost:3000/api/chat/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ externalUserId: 'user123' })
    });
    const data = await res.json();
    setSessionId(data.sessionId);
    console.log("hogya");

  };

  const submitQuery = async (query) => {
    const res = await fetch('http://localhost:3000/api/chat/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, query })
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <button onClick={createSession}>Create Chat Session</button>
      <button onClick={() => submitQuery('what is Gigमित्र')}>Submit Query</button>
      <p>Response: {response ? JSON.stringify(response) : 'No response yet'}</p>
    </div>
  );
}

export default App;
