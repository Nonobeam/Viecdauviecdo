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