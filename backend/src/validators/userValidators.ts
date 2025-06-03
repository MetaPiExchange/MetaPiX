import { body } from 'express-validator';

export const createUserValidator = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required.')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),

  body('walletAddress')
    .notEmpty().withMessage('Wallet address is required.')
    .matches(/^Pi[a-zA-Z0-9]{20,}$/).withMessage('Invalid Pi wallet address format.'),
];
