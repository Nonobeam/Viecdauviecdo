import { JobRequest, JobUpdateRequest } from "types";
import { api, handleRequest } from "./apiClient";
import { ENDPOINTS } from "./apiEndpoint";

export const getAllJobs = async (
    page = 0,
    size = 10,
    filters?: {
        company_id?: string;
        department?: string;
        type?: string;
        level?: string;
        country?: string;
        state?: string;
        city?: string;
        status?: string;
    }
): Promise<JobRequest[]> =>
    handleRequest(() => api.get<JobRequest[]>(ENDPOINTS.GET_ALL_JOBS, { params: { page, size, ...filters } }));

export const createJob = async (
    data: JobRequest
): Promise<JobRequest> =>
    handleRequest(() => api.post<JobRequest>(ENDPOINTS.CREATE_JOB, data));

export const updateJob = async (
    jobId: string,
    data: JobUpdateRequest
): Promise<JobRequest> =>
    handleRequest(() => api.put<JobRequest>(ENDPOINTS.UPDATE_JOB(jobId), data));

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