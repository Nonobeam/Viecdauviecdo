import { Project, ProjectRequest } from "types";
import { api, handleRequest } from "./apiClient";
import { ENDPOINTS } from "./apiEndpoint";

export const getAllProjects = async (
  page = 0,
  size = 10
): Promise<Project[]> =>
  handleRequest(() => api.get<Project[]>(ENDPOINTS.GET_ALL_PROJECTS, { params: { page, size } }));

export const getProjectById = async (companyId: string): Promise<Project> =>
  handleRequest(() => api.get<Project>(ENDPOINTS.GET_COMPANY_BY_ID(companyId)));

export const createProject = async (
  data: ProjectRequest
): Promise<Project> =>
  handleRequest(() => api.post<Project>(ENDPOINTS.CREATE_COMPANY, data));

export const updateProject = async (
  data: ProjectRequest
): Promise<Project> =>
  handleRequest(() => api.put<Project>(ENDPOINTS.UPDATE_COMPANY, data));

export const deleteProject = async (companyId: string): Promise<void> =>
  handleRequest(() => api.delete<void>(ENDPOINTS.DELETE_COMPANY(companyId)));

export const uploadProjectImage = async (
  projectId: string,
  file: File
): Promise<void> => {
  const formData = new FormData();
  formData.append('avatar', file);
  return handleRequest(() =>
    api.post(ENDPOINTS.UPLOAD_PROJECT_IMAGE(projectId), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  );
};

