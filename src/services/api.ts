import api from "./axios"

export const LoginApi = async (email: string, password: string) => {
    const response = await api.post('/auth', { email: email, password: password })
    return response.data;
}

export const RefreshTokenApi = async (refreshToken: string | null) => {
    const response = await api.post('/auth/refreshTokens', { refresh_token: refreshToken})
    return response.data;
}

// Projects
export const GetAllProjectsApi = async () => {
    const response = await api.get('/projects')
    return response.data;
}