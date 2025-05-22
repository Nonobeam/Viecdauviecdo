import { LoginRequest, TokenResponse } from 'types';
import { api, handleRequest } from './apiClient';
import { ENDPOINTS } from './apiEndpoint';
export const login = async (
  credentials: LoginRequest
): Promise<TokenResponse> =>
  handleRequest(() => api.post<TokenResponse>(ENDPOINTS.LOGIN, credentials));
