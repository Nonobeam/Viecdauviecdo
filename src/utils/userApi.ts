import { CreateUserRequest, User } from 'types';
import { api, handleRequest } from './apiClient';
import { ENDPOINTS } from './apiEndpoint';

export const getAllUsers = async (
  page = 0,
  size = 10
): Promise<User[]> =>
  handleRequest(() => api.get<User[]>(ENDPOINTS.GET_ALL_USERS, { params: { page, size } }));

export const getUserById = async (userId: string): Promise<User> =>
  handleRequest(() => api.get<User>(ENDPOINTS.GET_USER_BY_ID(userId)));

export const createUser = async (
  data: CreateUserRequest
): Promise<User> =>
  handleRequest(() => api.post<User>(ENDPOINTS.CREATE_USER, data));

export const uploadAvatar = async (
  userId: string,
  file: File
): Promise<void> => {
  const formData = new FormData();
  formData.append('avatar', file);
  return handleRequest(() =>
    api.post(ENDPOINTS.UPLOAD_AVATAR(userId), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  );
};