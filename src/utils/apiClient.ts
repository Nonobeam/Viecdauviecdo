import axios, { AxiosResponse } from 'axios';

// Create an axios instance with default base URL
export const api = axios.create({
  baseURL: 'https://pog-internal.threemusketeer.click',
  headers: { 'Content-Type': 'application/json' },
});

// Generic helper to handle requests
export async function handleRequest<T>(
  requestFn: () => Promise<AxiosResponse<T>>
): Promise<T> {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
