import express from 'express';
import sessionsApi from './sessions.js';
const router = express.Router();
router.use('/sessions', sessionsApi);
export default router;
