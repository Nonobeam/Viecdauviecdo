import { CreateUserRequest, CVItem, EditUserInformationRequest, GetAllUsersParams, RatingRequest, Skill, SkillRequest, User } from 'types';
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

// Get CVs by user ID with pagination
export const getCVs = async (
  user_id: string,
  page = 0,
  size = 10
): Promise<CVItem[]> =>
  handleRequest(() =>
    api.get(ENDPOINTS.GET_CVS, {
      params: { user_id, page, size },
    })
  );

// Delete a CV by linkId and userId
export const deleteCV = async (
  userId: string,
  linkId: string
): Promise<any> =>
  handleRequest(() =>
    api.delete(ENDPOINTS.DELETE_CV(linkId), {
      params: { userId },
    })
  );

export const getSkills = async (
  userId: string
): Promise<Skill> =>
  handleRequest(() => api.get<Skill>(ENDPOINTS.GET_USER_SKILLS(userId)));

export const addSkill = async (
  userId: string,
  data: SkillRequest
): Promise<void> =>
  handleRequest(() => api.post<void>(ENDPOINTS.ADD_USER_SKILL(userId), data));

export const updateSkill = async (
  userId: string,
  oldSkill: string,
  newSkill: string
): Promise<void> =>
  handleRequest(() =>
    api.put<void>(
      ENDPOINTS.UPDATE_USER_SKILL(userId), // URL with userId in path
      {}, // no request body
      {
        params: { oldSkill, newSkill } // query params go here
      }
    )
  );

export const deleteSkill = async (
  userId: string,
  skillName: string
): Promise<void> =>
  handleRequest(() =>
    api.delete<void>(ENDPOINTS.DELETE_USER_SKILL(userId), {
      data: skillName,
      headers: {
        "Content-Type": "application/json"
      }
    })
  );

export const addRating = async (
  data: RatingRequest
): Promise<void> =>
  handleRequest(() => api.post<void>(ENDPOINTS.CREATE_RATING, data));
