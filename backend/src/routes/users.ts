import express from 'express';
import { validationResult } from 'express-validator';
import { createUserValidator, setWalletAddressValidator } from '../validators/userValidator';
import { findOrCreateUser, setWalletAddress, getWalletAddress } from '../handlers/users';

const router = express.Router();

/**
 * POST /api/users
 * Creates or finds a user and optionally sets wallet address
 */
router.post('/users', createUserValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { uid, username, walletAddress } = req.body;

  const user = findOrCreateUser(uid, username);

  if (walletAddress) {
    setWalletAddress(uid, walletAddress);
  }

  res.status(200).json({
    message: 'User created or updated successfully.',
    user,
  });
});

/**
 * POST /api/users/wallet
 * Attaches or updates wallet address for an existing user
 */
router.post('/users/wallet', setWalletAddressValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { uid, walletAddress } = req.body;
  setWalletAddress(uid, walletAddress);

  res.status(200).json({
    message: 'Wallet address updated successfully.',
    uid,
    walletAddress,
  });
});

/**
 * GET /api/users/:uid
 * Retrieves user and wallet info
 */
router.get('/users/:uid', (req, res) => {
  const { uid } = req.params;
  const walletAddress = getWalletAddress(uid);

  if (!walletAddress) {
    return res.status(404).json({
      error: 'User or wallet address not found.',
    });
  }

  res.status(200).json({
    uid,
    walletAddress,
  });
});

export default router;
