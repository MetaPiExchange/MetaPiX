import { Request, Response } from 'express';
import axios from 'axios';
import environments from './environments';

// Simulated in-memory store (replace with DB logic as needed)
const transactions: { [paymentId: string]: any } = {};

// Called by Pi servers to confirm the user has approved the payment
export const onReadyForServerApproval = async (req: Request, res: Response) => {
  const { paymentId, txid } = req.body;

  if (!paymentId || !txid) {
    return res.status(400).json({ error: 'Missing paymentId or txid' });
  }

  // Simulate approving transaction
  transactions[paymentId] = { status: 'approved', txid };
  console.log(`Payment ${paymentId} approved with txid ${txid}`);
  return res.json({ success: true });
};

// Called after the transaction is confirmed on-chain
export const onReadyForServerCompletion = async (req: Request, res: Response) => {
  const { paymentId } = req.body;

  if (!transactions[paymentId] || transactions[paymentId].status !== 'approved') {
    return res.status(400).json({ error: 'Payment not found or not approved yet' });
  }

  // Simulate completing transaction
  transactions[paymentId].status = 'completed';
  console.log(`Payment ${paymentId} marked as completed.`);
  return res.json({ success: true });
};

// Called if the payment fails or gets canceled
export const onCancel = async (req: Request, res: Response) => {
  const { paymentId } = req.body;
  transactions[paymentId] = { status: 'cancelled' };
  console.log(`Payment ${paymentId} was cancelled.`);
  return res.json({ success: true });
};

// Optional: endpoint to fetch transaction status (for testing/debug)
export const getTransactionStatus = (req: Request, res: Response) => {
  const { paymentId } = req.params;
  const data = transactions[paymentId];
  if (!data) return res.status(404).json({ error: 'Transaction not found' });
  return res.json(data);
};
