declare module 'types' {
  export interface Post {
    id: string;
    userId: string;
    content: string;
    imageUrl?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
  }

  export interface CreatePostRequest {
    user_id: string;
    title: string;
    content: string;
    image_url?: string;
    tags?: string[];
  }

  export interface UpdatePostRequest {
    content?: string;
    imageUrl?: string;
    tags?: string[];
  }

  export interface Comment {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
  }

  export interface Company {
    id: string;
    name: string;
    tagline?: string;
    about?: string;
    industry?: string;
    companySize?: string;
    location?: string;
    founded?: number;
    address?: string;
    phone?: string;
    email?: string;
    status: 'ACT' | 'ARC' | 'INA';
    socialLinks?: CompanySocialRequest[];
  }

  export interface CompanyRequest {
    id?: string;
    name: string;
    tagline?: string;
    about?: string;
    industry?: string;
    companySize?: string;
    location?: string;
    founded?: number;
    address?: string;
    phone?: string;
    email?: string;
    status: 'ACT' | 'ARC' | 'INA';
    socialLinks?: CompanySocialRequest[];
  }

  export interface CompanySocialRequest {
    websiteUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
  }

  export interface User {
    id: string;
    email: string;
    roleName: string;
    image?: string;
    createdAt: string;
  }

  export interface CreateUserRequest {
    email: string;
    full_name: string;
    password: string;
    role_name: string;
    image?: string;
  }

  export interface EditUserInformationRequest {
    full_name?: string,
    job_tittle?: string,
    about_me?: string,
    location?: string,
    phone?: string
  }

  export interface LoginRequest {
    username: string;
    password: string;
  }

  export interface TokenResponse {
    token: string;
  }
}