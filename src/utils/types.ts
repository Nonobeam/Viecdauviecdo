declare module 'types' {

  export interface Location {
    country?: string;
    state?: string;
    city?: string;
  }

  export interface GetAllUsersParams {
    page?: number;
    size?: number;
    city?: string[];
    state?: string[];
    country?: string[];
    dateOfBirth?: string; // Format: 'YYYY-MM-DD'
    skill?: string[];
    certification?: string[];
  }

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
    title?: string;
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

  export type Project = {
    id: string;
    name: string;
    description?: string;
    tags?: string[];
    image_url?: string;
    created_at: string;
    system_status: string;
    title?: string;
  };

  export interface CreateProjectRequest {
    name: string,
    description: string,
    summary: string,
    start_at: string,
    external_link: string,
    user_id: string,
    tags: string[]
  }

  export type AddProjectMemRequest = {
    user_id: string;
    project_id: string;
    project_role: string;
  }

  export interface Job {
    id: string,
    company_id: string,
    title?: string,
    department?: string,
    type?: string,
    level?: string,
    working_time?: string,
    salary?: string,
    description?: string,
    requirements?: string,
    benefits?: string[],
    status?: string,
    posted: string,
    deadline: string
  }

  export interface UserApplyJobRequest {
    user_id: string;
    job_id: string;
    year_experience: number;
    university: string;
  }

  export interface JobUpdateRequest {
    title?: string;
    department?: string;
    type?: string;
    level?: string;
    location?: Location;
    working_time?: string;
    salary?: string;
    description?: string;
    requirements?: string;
    benefits?: string;
    status?: string;
    posted?: string;
    deadline?: string;
  }

  export interface Application {
    id: string;
    university: string;
    notes: string;
    year_experience: number;
    status: string;
    created_at: string;
    user_full_name: string;
    user_email: string;
    skills: string[];
    certifications: string[];
  }


  export interface ApplicationUpdateRequest {
    university?: string;
    notes?: string;
    year_experience?: number;
    user_id?: string;
    country?: string;
    state?: string;
    city?: string;
    status?: string;
    created_at?: string;
  }

  export interface ApplicationRequest {
    university: string;
    notes?: string;
    year_experience: number;
    user_id: string;
    country: string;
    state: string;
    city: string;
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
    job_title?: string,
    about_me?: string,
    country?: string,
    state?: string,
    city?: string,
    phone?: string
  }

  export interface CVItem {
    type: string;
    url: string;
  }

  export interface LoginRequest {
    username: string;
    password: string;
  }

  export interface TokenResponse {
    token: string;
  }

  export interface TransactionRequest {
    order_code: number;
    amount: number;
    holder_id: string;
    description?: string;
    buyer_name?: string;
    buyer_email?: string;
    buyer_phone?: string;
    buyer_address?: string;
    items: TransactionItem[];
    cancel_url?: string;
    return_url?: string;
    expired_at?: number;
    signature?: string;
  }

  export interface TransactionItem {
    name: string;
    quantity: number;
    price: number;
  }

  export interface TransactionData {
    amount: number;
    description: string;
    reference: string;
    currency: string;
    orderCode: number;
    accountNumber: string;
    transactionDateTime: string;
    paymentLinkId: string;
    counterAccountBankId: string;
    counterAccountBankName: string;
    counterAccountName: string;
    counterAccountNumber: string;
    virtualAccountName: string;
    virtualAccountNumber: string;
  }

  export interface PayOSWebhook {
    code: string;
    desc: string;
    success: boolean;
    data: TransactionData;
  }

}