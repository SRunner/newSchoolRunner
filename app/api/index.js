import express from 'express';
import usersApi from './user.js';
import sessionsApi from './sessions.js';
const router = express.Router();
router.use('/sessions', sessionsApi);
console.log("---------usersApi---------------")
router.use('/users', usersApi);
export default router;
