export const ENDPOINTS = {
  // Posts
  GET_POST_BY_ID: (id: string) => `/api/posts/${id}`,
  UPDATE_POST: (id: string) => `/api/posts/${id}`,
  DELETE_POST: (id: string) => `/api/posts/${id}`,
  GET_ALL_POSTS: '/api/posts',
  CREATE_POST: '/api/posts',
  SHARE_POST: (id: string) => `/api/posts/${id}/shares`,
  LIKE_POST: (id: string) => `/api/posts/${id}/likes`,
  COMMENT_ON_POST: (id: string) => `/api/posts/${id}/comments`,
  GET_USER_POSTS: (userId: string) => `/api/posts/${userId}/posts`,

  // Companies
  GET_ALL_COMPANIES: '/api/companies',
  GET_COMPANY_BY_ID: (id: string) => `/api/companies/${id}`,
  CREATE_COMPANY: '/api/companies',
  UPDATE_COMPANY: '/api/companies',
  DELETE_COMPANY: (id: string) => `/api/projects/${id}`,
  UPLOAD_COMPANY_BACKGROUND: (id: string) => `/api/companies/${id}/bg`,

  // Projects
  GET_ALL_PROJECTS: '/api/projects',
  GET_PROJECT_BY_ID: (id: string) => `/api/projects/${id}`,
  CREATE_PROJECT: '/api/projects',
  UPLOAD_PROJECT_IMAGE: (id: string) => `/api/projects/${id}/image`,
  UPDATE_PROJECT: (id: string) => `/api/projects/${id}`,
  DELETE_PROJECT: (id: string) => `/api/projects/${id}`,
  ADD_PROJECT_MEMBER: `/api/projects/mem`,
  GET_USER_PROJECTS: (id: string) => `/api/projects/users/${id}`,
  GET_PROJECT_MEMBERS: (id: string) => `/api/projects/${id}/members`,
  LEAVE_PROJECT: '/api/users/project/leave',


  // Users
  GET_ALL_USERS: '/api/users',
  GET_USER_BY_ID: (id: string) => `/api/users/${id}`,
  CREATE_USER: '/api/users',
  UPLOAD_AVATAR: (id: string) => `/api/users/${id}/ava`,
  CHANGE_INFORMATION: (id: string) => `/api/users/${id}/change-information`,
  UPLOAD_DOCUMENT: (userId: string) => `/api/users/${userId}/upload-document`,
  GET_CVS: `/api/users/cv`,
  DELETE_CV: (linkId: string) => `/api/users/cv/${linkId}`,

  // Auth
  LOGIN: '/api/auth/login',
RESET_PASSWORD: '/api/auth',
FORGOT_PASSWORD: '/api/auth/forgot-password',

  //transactions
  GET_TRANSACTION: `/api/transactions`,
  POST_TRANSACTION: `/api/transactions`,
  SEND_WEBHOOK_TRANSACTION: `/api/transactions/webhook`,
  GET_TRANSACTION_BY_ID: (id: string) => `/api/transactions/${id}`,

  // User Information Skills
GET_USER_SKILLS: (userInfoId: string) => `/api/user-info/${userInfoId}/skills`,
ADD_USER_SKILL: (userInfoId: string) => `/api/user-info/${userInfoId}/skills`,
UPDATE_USER_SKILL: (userInfoId: string) => `/api/user-info/${userInfoId}/skills`,
DELETE_USER_SKILL: (userInfoId: string) => `/api/user-info/${userInfoId}/skills`,

// Jobs
GET_ALL_JOBS: '/api/jobs',
GET_JOB_BY_ID: (id: string) => `/api/jobs/${id}`,
CREATE_JOB: '/api/jobs',
UPDATE_JOB: (id: string) => `/api/jobs/${id}`,
DELETE_JOB: (id: string) => `/api/jobs/${id}`,

// Applications
GET_ALL_APPLICATIONS: '/api/applications',
GET_APPLICATION_BY_ID: (id: string) => `/api/applications/${id}`,
CREATE_APPLICATION: '/api/applications',
UPDATE_APPLICATION: (id: string) => `/api/applications/${id}`,
DELETE_APPLICATION: (id: string) => `/api/applications/${id}`,
APPLY_TO_JOB: '/api/applications/apply',
};
