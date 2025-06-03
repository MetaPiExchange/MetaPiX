import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { validateUserInput } from '../validators/userValidator';

export const findOrCreateUser = async (req: Request, res: Response) => {
  const { uid, username } = req.body;

  if (!uid || !username) {
    return res.status(400).json({ success: false, message: 'UID and username are required.' });
  }

  try {
    let user = await UserModel.findOne({ uid });

    if (!user) {
      user = new UserModel({ uid, username });
      await user.save();
      console.log(`✅ Created new user: ${username} (${uid})`);
    } else {
      console.log(`👤 Found existing user: ${username} (${uid})`);
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('User lookup/create error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const setWalletAddress = async (req: Request, res: Response) => {
  const { uid, walletAddress } = req.body;

  if (!uid || !walletAddress) {
    return res.status(400).json({ success: false, message: 'UID and walletAddress are required.' });
  }

  try {
    const user = await UserModel.findOneAndUpdate(
      { uid },
      { walletAddress },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log(`🔗 Wallet address for user ${uid} set to ${walletAddress}`);
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Wallet update error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getWalletAddress = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const user = await UserModel.findOne({ uid });

    if (!user || !user.walletAddress) {
      return res.status(404).json({ success: false, message: 'Wallet address not found' });
    }

    res.status(200).json({ success: true, walletAddress: user.walletAddress });
  } catch (err) {
    console.error('Get wallet error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
