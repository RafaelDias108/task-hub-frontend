import { EditProject } from "../types/projectInterface";
import api from "./axios"

export const LoginApi = async (email: string, password: string) => {
    const response = await api.post('/auth', { email: email, password: password })
    return response.data;
}

// export const RefreshTokenApi = async (refreshToken: string | null) => {
//     const response = await api.post('/auth/refreshTokens', { refresh_token: refreshToken})
//     return response.data;
// }

export const RefreshTokenApi = async () => {
    const response = await api.post('/auth/refreshToken')
    return response.data;
}

// Projects
export const GetAllProjectsApi = async () => {
    const response = await api.get('/projects')
    return response.data;
}
export const NewProjectApi = async (data: object) => {
    const response = await api.post('/projects', data)
    return response.data;
}
export const UpdateProjectApi = async (data: EditProject) => {
    try {
        const response = await api.put(`/projects/${data.uuid}`, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
        return response.data
    } catch (error) {       
        throw new Error(error.message);
    }
}

// Categories
export class Backend {

    static async GetAllCategories() {

        const response = await api.get('/categories')
        return response.data
    }
}