import { Job, JobUpdateRequest } from "types";
import { api, handleRequest } from "./apiClient";
import { ENDPOINTS } from "./apiEndpoint";

export const getAllJobs = async (
    page = 0,
    size = 10,
    filters?: {
        department?: string;
        type?: string;
        level?: string;
        status?: string;
    }
): Promise<Job[]> => {
    // Filter out empty/undefined/null values from filters
    const cleanFilters = filters ? Object.entries(filters).reduce((acc, [key, value]) => {
        if (value && value.trim() !== '') {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, string>) : {};

    const params = {
        page,
        size,
        ...cleanFilters
    };

    return handleRequest(() => api.get<Job[]>(ENDPOINTS.GET_ALL_JOBS, { params }));
};

export const createJob = async (
    data: Job
): Promise<Job> =>
    handleRequest(() => api.post<Job>(ENDPOINTS.CREATE_JOB, data));

export const updateJob = async (
    jobId: string,
    data: JobUpdateRequest
): Promise<Job> =>
    handleRequest(() => api.put<Job>(ENDPOINTS.UPDATE_JOB(jobId), data));

export const deleteJob = async (jobId: string): Promise<void> =>
    handleRequest(() => api.delete<void>(ENDPOINTS.DELETE_JOB(jobId)));

// export const getAllApplications = async (
//     page = 0,
//     size = 10,
//     filters?: {
//         user_id?: string;
//         job_id?: string;
//         status?: string;
//         university?: string;
//         country?: string;
//         state?: string;
//         city?: string;
//     }
// ): Promise<ApplicationRequest[]> =>
//     handleRequest(() => api.get<ApplicationRequest[]>(ENDPOINTS.GET_ALL_APPLICATIONS, { params: { page, size, ...filters } }));

// export const getApplicationById = async (applicationId: string): Promise<ApplicationRequest> =>
//     handleRequest(() => api.get<ApplicationRequest>(ENDPOINTS.GET_APPLICATION_BY_ID(applicationId)));

// export const createApplication = async (
//     data: ApplicationRequest
// ): Promise<ApplicationRequest> =>
//     handleRequest(() => api.post<Application>(ENDPOINTS.CREATE_APPLICATION, data));

// export const updateApplication = async (
//     applicationId: string,
//     data: ApplicationUpdateRequest
// ): Promise<Application> =>
//     handleRequest(() => api.put<Application>(ENDPOINTS.UPDATE_APPLICATION(applicationId), data));

// export const deleteApplication = async (applicationId: string): Promise<void> =>
//     handleRequest(() => api.delete<void>(ENDPOINTS.DELETE_APPLICATION(applicationId)));

// export const applyToJob = async (
//     data: UserApplyJobRequest
// ): Promise<ApplicationRequest> =>
//     handleRequest(() => api.post<Application>(ENDPOINTS.APPLY_TO_JOB, data));