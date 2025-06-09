import express from 'express';
import { validationResult } from 'express-validator';
import { initiatePaymentValidator, confirmPaymentValidator } from '../validators/paymentValidator';
import { initiatePayment, confirmPayment } from '../handlers/payments';

const router = express.Router();

/**
 * POST /api/payments/initiate
 * Initiates a new Pi payment.
 */
router.post('/payments/initiate', initiatePaymentValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const paymentData = await initiatePayment(req.body);
    return res.status(200).json(paymentData);
  } catch (err) {
    console.error('❌ Error initiating payment:', err);
    return res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

/**
 * POST /api/payments/confirm
 * Confirms a completed Pi payment.
 */
router.post('/payments/confirm', confirmPaymentValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const confirmationResult = await confirmPayment(req.body);
    return res.status(200).json(confirmationResult);
  } catch (err) {
    console.error('❌ Error confirming payment:', err);
    return res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

export default router;
