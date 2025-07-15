import express from 'express';
import {
  googleAuth,
  googleAuthCallback,
  googleAuthCallbackHandler,
  getCurrentUser
} from '../controllers/authController.js';
import passport from 'passport';

const router = express.Router();

router.get('/google', googleAuth);
router.get(
  '/google/callback',
  googleAuthCallback,
  googleAuthCallbackHandler
);

router.get('/me', passport.authenticate('jwt', { session: false }), getCurrentUser);

export default router;