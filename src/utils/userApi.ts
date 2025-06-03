import { CreateUserRequest, EditUserInformationRequest, GetAllUsersParams, User } from 'types';
import { api, handleRequest } from './apiClient';
import { ENDPOINTS } from './apiEndpoint';

export const getAllUsers = async ({
  page = 0,
  size = 10,
  city,
  state,
  country,
  dateOfBirth,
  skill,
  certification,
}: GetAllUsersParams = {}): Promise<User[]> =>
  handleRequest(() =>
    api.get<User[]>(ENDPOINTS.GET_ALL_USERS, {
      params: {
        page,
        size,
        city,
        state,
        country,
        dateOfBirth,
        skill,
        certification,
      },
      paramsSerializer: params => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            if (value.length > 0) {
              value.forEach(val => searchParams.append(key, val));
            } else {
              searchParams.append(key, '');
            }
          } else if (value !== undefined && value !== null) {
            searchParams.append(key, value.toString());
          } else {
            searchParams.append(key, '');
          }
        });
        return searchParams.toString();
      },
    })
  );

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

export const changeUserInformation = async (
  userId: string,
  data: EditUserInformationRequest
): Promise<void> => {
  return handleRequest(() =>
    api.post<void>(ENDPOINTS.CHANGE_INFORMATION(userId), data)
  );
};

export const uploadDocument = async (
  userId: string,
  file: File
): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);

  return handleRequest(() =>
    api.post<void>(ENDPOINTS.UPLOAD_DOCUMENT(userId), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  );
};