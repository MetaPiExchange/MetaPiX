import { v4 as uuidv4 } from 'uuid';
import platformApiClient from '../services/platformAPIClient';

type InitiatePaymentInput = {
  amount: number;
  memo: string;
  uid: string;
};

type ConfirmPaymentInput = {
  paymentId: string;
  txid: string;
};

/**
 * Initiates a payment request using the Pi Network platform API client.
 */
export async function initiatePayment({ amount, memo, uid }: InitiatePaymentInput) {
  const paymentData = {
    amount,
    memo,
    metadata: { uid },
    uid,
  };

  // Create payment via Pi platform SDK
  const payment = await platformApiClient.createPayment(paymentData);
  console.log('✅ Payment initiated:', payment);
  return payment;
}

/**
 * Confirms a completed payment by verifying it with the platform and finalizing it.
 */
export async function confirmPayment({ paymentId, txid }: ConfirmPaymentInput) {
  // Confirm the payment with the Pi Platform SDK
  const confirmed = await platformApiClient.submitTxId(paymentId, txid);
  console.log('✅ Payment confirmed:', confirmed);

  return { success: true, paymentId, txid };
}
