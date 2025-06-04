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

    // Projects
  GET_ALL_PROJECTS: '/api/projects',
  GET_PROJECT_BY_ID: (id: string) => `/api/projects/${id}`,
  CREATE_PROJECT: '/api/projects',
  UPLOAD_PROJECT_IMAGE: (id: string) => `/api/projects/${id}/image`,
  UPDATE_PROJECT: '/api/projects',
  DELETE_PROJECT: (id: string) => `/api/projects/${id}`,
  ADD_PROJECT_MEMBER: `/api/projects/mem`,

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

  //transactions
  GET_TRANSACTION: `/api/transactions`,
  POST_TRANSACTION: `/api/transactions`,
  SEND_WEBHOOK_TRANSACTION: `/api/transactions/webhook`,
  GET_TRANSACTION_BY_ID: (id: string) => `/api/transactions/${id}`
};
