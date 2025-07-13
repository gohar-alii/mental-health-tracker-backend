import passport from 'passport';
import { generateToken, findOrCreateUser } from '../services/authService.js';

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

export const googleAuthCallback = passport.authenticate('google', {
  session: false,
  failureRedirect: '/login',
});

export const googleAuthCallbackHandler = async (req, res) => {
  try {
    const token = generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/auth/failure`);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
};