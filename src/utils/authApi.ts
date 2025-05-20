import { LoginRequest, TokenResponse } from 'types';
import { api, handleRequest } from './apiClient';

export const login = async (
  credentials: LoginRequest
): Promise<TokenResponse> =>
  handleRequest(() => api.post<TokenResponse>('/api/auth/login', credentials));
