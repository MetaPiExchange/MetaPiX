import express from 'express';
import { findOrCreateUser, setWalletAddress, getWalletAddress } from '../handlers/users';

const router = express.Router();

router.post('/users', findOrCreateUser);
router.post('/users/wallet', setWalletAddress);
router.get('/users/:uid/wallet', getWalletAddress);

export default router;
