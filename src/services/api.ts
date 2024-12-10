import api from "./axios"

export const LoginApi = async (email: string, password: string) => {
    const response = await api.post('/auth', { email: email, password: password })
    return response.data
}