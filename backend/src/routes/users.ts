import express from 'express';
import { validationResult } from 'express-validator';
import { createUserValidator, setWalletAddressValidator } from '../validators/userValidator';
import { findOrCreateUser, setWalletAddress } from '../handlers/users';

const router = express.Router();

/**
 * POST /api/users
 * Creates or finds a user and links a wallet (optional).
 */
router.post('/users', createUserValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { uid, username, walletAddress } = req.body;

  try {
    const user = findOrCreateUser(uid, username);

    if (walletAddress) {
      setWalletAddress(uid, walletAddress);
      user.walletAddress = walletAddress;
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error('❌ Error creating user:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/users/wallet
 * Attaches a wallet address to an existing user.
 */
router.post('/users/wallet', setWalletAddressValidator, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { uid, walletAddress } = req.body;

  try {
    setWalletAddress(uid, walletAddress);
    return res.status(200).json({ message: 'Wallet address updated successfully.' });
  } catch (err) {
    console.error('❌ Error updating wallet address:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
  
