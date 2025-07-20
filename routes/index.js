import express from 'express';
import logRoutes from './logRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/logs', logRoutes);

export default router;