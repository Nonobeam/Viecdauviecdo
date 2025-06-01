import { PayOSWebhook, TransactionData, TransactionRequest } from "types";
import { api, handleRequest } from "./apiClient"; // Adjust path if needed
import { ENDPOINTS } from "./apiEndpoint";

// Get all transactions with pagination
export const getAllTransactions = async (
  page = 0,
  size = 10
): Promise<TransactionData[]> =>
  handleRequest(() =>
    api.get<TransactionData[]>(ENDPOINTS.GET_TRANSACTION, {
      params: { page, size },
    })
  );

// Create a new transaction
export const createTransaction = async (
  payload: TransactionRequest
): Promise<TransactionData> => {
  const response = await handleRequest(() =>
    api.post<{ data: TransactionData }>(ENDPOINTS.POST_TRANSACTION, payload)
  );

  return response.data;
};

// Send webhook payload
export const sendTransactionWebhook = async (
  payload: PayOSWebhook
): Promise<any> =>
  handleRequest(() =>
    api.post(ENDPOINTS.SEND_WEBHOOK_TRANSACTION, payload)
  );

// Get transaction by ID
export const getTransactionById = async (
  id: string
): Promise<TransactionData> =>
  handleRequest(() =>
    api.get<TransactionData>(ENDPOINTS.GET_TRANSACTION_BY_ID(id))
  );