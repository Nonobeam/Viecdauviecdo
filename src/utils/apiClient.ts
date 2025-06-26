import axios, { AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: 'https://backend.matchlent.xyz',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

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