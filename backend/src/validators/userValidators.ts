import { body } from 'express-validator';

export const createUserValidator = [
  body('uid')
    .trim()
    .notEmpty().withMessage('User ID (uid) is required.')
    .isAlphanumeric().withMessage('User ID must be alphanumeric.'),

  body('username')
    .trim()
    .notEmpty().withMessage('Username is required.')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),

  body('walletAddress')
    .optional() // Wallet address may be attached later
    .matches(/^Pi[a-zA-Z0-9]{20,}$/).withMessage('Invalid Pi wallet address format.'),
];
