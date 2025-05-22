import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// Create an axios instance with default base URL
export const api = axios.create({
  baseURL: 'https://pog-internal.threemusketeer.click',
  headers: { 'Content-Type': 'application/json' },
});

// Add interceptor to include Authorization header from cookies
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
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