import axios from 'axios';
import environments from '../environments';

const PI_API_BASE_URL = 'https://api.minepi.com/v2';

const headers = {
  Authorization: `Key ${environments.pi.apiKey}`,
  'Content-Type': 'application/json',
};

/**
 * Create a new payment using the Pi Network platform API.
 */
async function createPayment(data: {
  amount: number;
  memo: string;
  metadata: object;
  uid: string;
}) {
  const response = await axios.post(`${PI_API_BASE_URL}/payments`, data, { headers });
  return response.data;
}

/**
 * Submit a transaction ID to confirm the payment.
 */
async function submitTxId(paymentId: string, txid: string) {
  const response = await axios.post(`${PI_API_BASE_URL}/payments/${paymentId}/submit`, { txid }, { headers });
  return response.data;
}

/**
 * Check the status of a payment.
 */
async function getPayment(paymentId: string) {
  const response = await axios.get(`${PI_API_BASE_URL}/payments/${paymentId}`, { headers });
  return response.data;
}

export default {
  createPayment,
  submitTxId,
  getPayment,
};
