// services/socketService.js
import { Server } from 'socket.io';
import passport from 'passport';

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ["GET", "POST"],
      credentials: true
    },
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000,
    cookie: false
  });

  // Socket.IO Authentication Middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }
    
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        return next(new Error('Authentication error'));
      }
      socket.user = user;
      next();
    })({ headers: { authorization: `Bearer ${token}` } });
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.id} connected with ID: ${socket.id}`);

    // Handle log subscriptions
    socket.on('subscribe', ({ userId }, callback) => {
      try {
        if (socket.user.id !== userId) {
          throw new Error('Unauthorized subscription');
        }
        socket.join(`user-${userId}`);
        console.log(`User ${userId} subscribed to updates`);
        callback({ status: 'success' });
      } catch (error) {
        console.error('Subscription error:', error);
        callback({ error: error.message });
      }
    });

    socket.on('disconnect', (reason) => {
      console.log(`User ${socket.user.id} disconnected (${reason})`);
    });

    socket.on('error', (error) => {
      console.error(`Socket error for user ${socket.user.id}:`, error);
    });
  });

  return io;
};

export const broadcastLogUpdate = (userId, logData) => {
  if (io) {
    io.to(`user-${userId}`).emit('logUpdate', logData);
    console.log(`Broadcast update to user ${userId}`);
  }
};