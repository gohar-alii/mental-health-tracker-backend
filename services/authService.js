import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import db from '../models/index.js'

export const generateToken = (user) => {
  return jwt.sign({ id: user.id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export const findOrCreateUser = async (profile) => {
  let user = await db.User.findOne({ where: { googleId: profile.id } });

  if (!user) {
    user = await db.User.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      profilePicture: profile.photos[0].value,
    });
  }

  return user;
};