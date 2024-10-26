import express from 'express';
import { createChatSession, submitQuery } from '../controllers/chatController.js';

const router = express.Router();

router.post('/session', async (req, res) => {
  try {
    const { externalUserId } = req.body;
    const apiKey = process.env.API_KEY;
    const sessionId = await createChatSession(apiKey, externalUserId);
    res.json({ sessionId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/query', async (req, res) => {
  try {
    const { sessionId, query } = req.body;
    const apiKey = process.env.API_KEY;
    const response = await submitQuery(apiKey, sessionId, query);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
    });

export default router;