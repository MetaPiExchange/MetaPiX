import express from 'express';
import { validationResult } from 'express-validator';
import { createUserValidator, setWalletAddressValidator } from '../validators/userValidator';
import { findOrCreateUser, setWalletAddress } from '../handlers/users';

const router = express.Router();

/**
 * POST /api/users
 * Creates or finds a user
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
    user.walletAddress = walletAddress;
  }

  res.status(200).json({ user });
});

/**
 * POST /api/users/wallet
 * Attach a wallet address to an existing user
 */
router.post('/users/wallet', setWalletAddressValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { uid, walletAddress } = req.body;
  setWalletAddress(uid, walletAddress);

  res.status(200).json({ message: 'Wallet address updated successfully.' });
});

export default router;
