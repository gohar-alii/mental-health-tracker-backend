import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import db from './models/index.js';
import errorHandler from './utils/errorHandler.js';
import { createServer } from 'http';
import { initializeSocket } from './services/websocketService.js';
import routes from './routes/index.js';
import './config/passport.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(passport.initialize());

// Add db to request
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Database connection
try {
  await db.sequelize.authenticate();
  console.log('Database connected');
  await db.sequelize.sync();
  console.log('Models synchronized');
} catch (err) {
  console.error('Database connection error:', err);
}

// Routes
app.use('/api', routes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = createServer(app);

// Initialize Socket.IO
initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});