import { LoginRequest, resetPasswordRequest, TokenResponse } from 'types';
import { api, handleRequest } from './apiClient';
import { ENDPOINTS } from './apiEndpoint';
export const login = async (
  credentials: LoginRequest
): Promise<TokenResponse> =>
  handleRequest(() => api.post<TokenResponse>(ENDPOINTS.LOGIN, credentials));

  
export const resetPassword = async (
  data: resetPasswordRequest
): Promise<string> =>
  handleRequest(() => api.post<string>(ENDPOINTS.FORGOT_PASSWORD, data));
