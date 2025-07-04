import { GetAllUsersParams, Post, Project, Rating, User } from "types";
import { api, handleRequest } from "./apiClient";
import { ENDPOINTS } from "./apiEndpoint";


export const getAllProjectsAnalytic = async (
    page = 0,
    size = 1000
): Promise<Project[]> =>
    handleRequest(() =>
        api.get<{ data: { content: Project[] } }>(ENDPOINTS.GET_ALL_PROJECTS, { params: { page, size } })
    ).then(responseData => responseData.data.content);;

export const getAllUserAnalytic = async ({
    page = 0,
    size = 10000
}: GetAllUsersParams = {}): Promise<User[]> =>
    handleRequest(() =>
        api.get<{ data: { content: User[] } }>(ENDPOINTS.GET_ALL_USERS, {
            params: {
                page,
                size
            }
        })
    ).then(responseData => responseData.data.content);

export const getAllPostAnalytic = async (
    page = 0,
    size = 10000
): Promise<Post[]> =>
    handleRequest(() =>
        api.get<{ data: { content: Post[] } }>(ENDPOINTS.GET_ALL_POSTS, { params: { page, size } })
    ).then(responseData => responseData.data.content);

export const getAllRatingAnalytic = async (
    page = 0,
    size = 10000
): Promise<Rating[]> =>
    handleRequest(() =>
        api.get<{ data: { content: Rating[] } }>(ENDPOINTS.GET_ALL_RATINGS, { params: { page, size } })
    ).then(responseData => responseData.data.content);

// export const getAllRating = async (
//     page = 0,
//     size = 10
// ): Promise<Rating[]> =>
//     handleRequest(() =>
//         api.get<{ data: { content: Rating[] } }>(ENDPOINTS.GET_ALL_RATINGS, { params: { page, size } })
//     ).then(responseData => responseData.data.content);




