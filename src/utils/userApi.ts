import { CreateUserRequest, User } from 'types';
import { api, handleRequest } from './apiClient';

export const getAllUsers = async (
  page = 0,
  size = 10
): Promise<User[]> =>
  handleRequest(() => api.get<User[]>('/api/users', { params: { page, size } }));

export const getUserById = async (userId: string): Promise<User> =>
  handleRequest(() => api.get<User>(`/api/users/${userId}`));

export const createUser = async (
  data: CreateUserRequest
): Promise<User> =>
  handleRequest(() => api.post<User>('/api/users', data));

export const uploadAvatar = async (
  userId: string,
  file: File
): Promise<void> => {
  const formData = new FormData();
  formData.append('avatar', file);
  return handleRequest(() =>
    api.post(`/api/users/${userId}/ava`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  );
};