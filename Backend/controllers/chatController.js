import axios from 'axios';

export async function createChatSession(apiKey, externalUserId) {
  const response = await axios.post('https://api.on-demand.io/chat/v1/sessions', {
    pluginIds: [],
    externalUserId: externalUserId
  }, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    }
  });

  return response.data.data.id;
}

export async function submitQuery(apiKey, sessionId, query) {
  const response = await axios.post(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
    endpointId: 'predefined-openai-gpt4o',
    query: query,
    pluginIds: ['plugin-1712327325', 'plugin-1713962163', 'plugin-1729868173'],
    responseMode: 'sync'
  }, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    }
  });

  return response.data;
}