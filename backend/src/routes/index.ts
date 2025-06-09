import express from 'express';
import userRoutes from './userRoutes';
import nftRoutes from './nftRoutes';

const router = express.Router();

// Base health check route
router.get('/', (req, res) => {
  res.status(200).json({ message: 'MetaPiX API is up and running.' });
});

// User-related routes
router.use('/api/users', userRoutes);

// NFT-related routes
router.use('/api', nftRoutes);

export default router;
