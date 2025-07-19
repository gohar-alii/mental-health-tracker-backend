import express from 'express';
import {
  createLogEntry,
  getUserLogs,
  getSingleLog,
  updateLogEntry
} from '../controllers/logController.js';
import passport from 'passport';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createLogEntry
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  updateLogEntry
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  getUserLogs
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  getSingleLog
);

export default router;