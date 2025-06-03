import axios from "axios";
import environments from "./environments";

// Pi Network API base
const API_BASE_URL = "https://api.minepi.com";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Key ${environments.PI_API_KEY}`,
    "Content-Type": "application/json",
  },
});

/**
 * Verify the user access token with Pi servers
 */
export async function verifyAccessToken(accessToken: string) {
  try {
    const response = await axiosInstance.get("/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to verify access token:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Submit a payment (app server -> Pi server)
 */
export async function submitPayment(paymentData: any) {
  try {
    const response = await axiosInstance.post("/v2/payments", paymentData);
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to submit payment:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Complete a payment
 */
export async function completePayment(paymentId: string, txid: string) {
  try {
    const response = await axiosInstance.post(`/v2/payments/${paymentId}/complete`, { txid });
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to complete payment:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Cancel a payment
 */
export async function cancelPayment(paymentId: string) {
  try {
    const response = await axiosInstance.post(`/v2/payments/${paymentId}/cancel`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to cancel payment:", error.response?.data || error.message);
    throw error;
  }
}
