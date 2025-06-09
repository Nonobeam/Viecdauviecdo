import { AddProjectMemRequest, CreateProjectRequest, Project, User } from "types";
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
    data: CreateProjectRequest
): Promise<Project> =>
    handleRequest(() => api.post<Project>(ENDPOINTS.CREATE_PROJECT, data));

export const updateProject = async (
    projectId: string,
    data: CreateProjectRequest,
    imageFile?: File
): Promise<Project> => {
    const formData = new FormData();

    // Create a proper JSON blob for the project part
    formData.append(
        "project",
        new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    if (imageFile) {
        formData.append("image", imageFile);
    }
    return handleRequest(() =>
        api.put<Project>(ENDPOINTS.UPDATE_PROJECT(projectId), formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Let browser set multipart/form-data automatically
            }
        })
    )
};

export const deleteProject = async (projectId: string): Promise<void> =>
    handleRequest(() => api.delete<void>(ENDPOINTS.DELETE_PROJECT(projectId)));

export const uploadProjectImage = async (
    projectId: string,
    file: File
): Promise<void> => {
    const formData = new FormData();
    formData.append('image', file);
    return handleRequest(() =>
        api.post(ENDPOINTS.UPLOAD_PROJECT_IMAGE(projectId), formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    );
};

export const addProjectMember = async (
    data: AddProjectMemRequest): Promise<void> =>
    handleRequest(() => api.post<void>(ENDPOINTS.ADD_PROJECT_MEMBER, data));

export const getProjectMembers = async (
    id: string,
    page = 0,
    size = 10
): Promise<User[]> =>
    handleRequest(() => api.get<User[]>(ENDPOINTS.GET_PROJECT_MEMBERS(id), { params: { page, size } }));

export const getProjectByUserId = async (
    id: string,
    projectRole: string,
    page = 0,
    size = 10
): Promise<Project[]> =>
    handleRequest(() => api.get<Project[]>(ENDPOINTS.GET_USER_PROJECTS(id), { params: { projectRole, page, size } }));

