import {
  Comment,
  CreatePostRequest,
  Post,
  UpdatePostRequest,
} from 'types';
import { api, handleRequest } from './apiClient';
import { ENDPOINTS } from './apiEndpoint';

export const getPostById = async (postId: string): Promise<Post> =>
  handleRequest(() => api.get<Post>(ENDPOINTS.GET_POST_BY_ID(postId)));

export const updatePost = async (
  postId: string,
  data: UpdatePostRequest
): Promise<Post> =>
  handleRequest(() => api.put<Post>(ENDPOINTS.UPDATE_POST(postId), data));

export const deletePost = async (postId: string): Promise<void> =>
  handleRequest(() => api.delete<void>(ENDPOINTS.DELETE_POST(postId)));

export const getAllPosts = async (
  page = 0,
  size = 10
): Promise<Post[]> =>
  handleRequest(() =>
    api.get<{ data: { content: Post[] } }>(ENDPOINTS.GET_ALL_POSTS, { params: { page, size } })
  ).then(responseData => responseData.data.content);

export const createPost = async (
  data: CreatePostRequest
): Promise<Post> =>
  handleRequest(() => api.post<Post>(ENDPOINTS.CREATE_POST, data));

export const sharePost = async (postId: string): Promise<void> =>
  handleRequest(() => api.post<void>(ENDPOINTS.SHARE_POST(postId)));

export const likePost = async (postId: string): Promise<void> =>
  handleRequest(() => api.post<void>(ENDPOINTS.LIKE_POST(postId)));

export const commentOnPost = async (
  postId: string,
  data: { user_id: string; content: string }
): Promise<Comment> =>
  handleRequest(() => api.post<Comment>(ENDPOINTS.COMMENT_ON_POST(postId), data));

export const getUserPosts = (userId: string): Promise<Post[]> =>
  handleRequest(() =>
    api.get<{ data: { content: Post[] } }>(ENDPOINTS.GET_USER_POSTS(userId))
  ).then(responseData => responseData.data.content);