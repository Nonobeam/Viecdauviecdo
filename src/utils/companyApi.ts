import { Company, CompanyRequest } from 'types';
import { api, handleRequest } from './apiClient';
import { ENDPOINTS } from './apiEndpoint';

export const getAllCompanies = async (
  page = 0,
  size = 10
): Promise<Company[]> =>
  handleRequest(() => api.get<Company[]>(ENDPOINTS.GET_ALL_COMPANIES, { params: { page, size } }));

export const getCompanyById = async (companyId: string): Promise<Company> =>
  handleRequest(() => api.get<Company>(ENDPOINTS.GET_COMPANY_BY_ID(companyId)));

export const createCompany = async (
  data: CompanyRequest
): Promise<Company> =>
  handleRequest(() => api.post<Company>(ENDPOINTS.CREATE_COMPANY, data));

export const updateCompany = async (
  data: CompanyRequest
): Promise<Company> =>
  handleRequest(() => api.put<Company>(ENDPOINTS.UPDATE_COMPANY, data));

export const deleteCompany = async (companyId: string): Promise<void> =>
  handleRequest(() => api.delete<void>(ENDPOINTS.DELETE_COMPANY(companyId)));
