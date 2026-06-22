import { Router } from 'express';
import mongoose from 'mongoose';
import authRoutes from './auth.routes.js';
import projectRoutes from './projects.routes.js';
import skillRoutes from './skills.routes.js';
import experienceRoutes from './experience.routes.js';
import messageRoutes from './messages.routes.js';
import contactRoutes from './contact.routes.js';

const router = Router();

// Health check — no auth needed
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'API running',
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// Resource routers
router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);
router.use('/messages', messageRoutes);
router.use('/contact', contactRoutes);

export default router;
