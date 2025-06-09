import { body } from 'express-validator';

export const initiatePaymentValidator = [
  body('amount')
    .notEmpty().withMessage('Amount is required.')
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than zero.'),

  body('memo')
    .trim()
    .notEmpty().withMessage('Memo is required.')
    .isLength({ max: 256 }).withMessage('Memo must be less than 256 characters.'),

  body('uid')
    .notEmpty().withMessage('User ID is required.')
];

export const confirmPaymentValidator = [
  body('paymentId')
    .notEmpty().withMessage('Payment ID is required.'),

  body('txid')
    .notEmpty().withMessage('Transaction ID is required.')
];
