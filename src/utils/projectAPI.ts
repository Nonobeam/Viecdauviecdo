import { AddProjectMemRequest, Project, ProjectRequest } from "types";
import { api, handleRequest } from "./apiClient";
import { ENDPOINTS } from "./apiEndpoint";

export const getAllProjects = async (
    page = 0,
    size = 10
): Promise<Project[]> =>
    handleRequest(() => api.get<Project[]>(ENDPOINTS.GET_ALL_PROJECTS, { params: { page, size } }));

export const getProjectById = async (projectId: string): Promise<Project> =>
    handleRequest(() => api.get<Project>(ENDPOINTS.GET_PROJECT_BY_ID(projectId)));

export const createProject = async (
    data: ProjectRequest
): Promise<Project> =>
    handleRequest(() => api.post<Project>(ENDPOINTS.CREATE_PROJECT, data));

export const updateProject = async (
    data: ProjectRequest
): Promise<Project> =>
    handleRequest(() => api.put<Project>(ENDPOINTS.UPDATE_PROJECT, data));

export const deleteProject = async (projectId: string): Promise<void> =>
    handleRequest(() => api.delete<void>(ENDPOINTS.DELETE_PROJECT(projectId)));

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

export const addProjectMember = async (
  data: AddProjectMemRequest): Promise<void> =>
  handleRequest(() =>  api.post<void>(ENDPOINTS.ADD_PROJECT_MEMBER, data));
