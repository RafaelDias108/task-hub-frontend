import axios from "axios";
import { useAuthStore } from "../stores/auth";

const api = axios.create({
    baseURL: "http://todo-list-backend.test:8080/api",
});

api.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.access_token) {
        config.headers.Authorization = `Bearer ${authStore.access_token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const authStore = useAuthStore();
        if (error.response?.status === 401 && authStore.refresh_token) {
            try {
                await authStore.refreshTokens();
                return api.request(error.config);
            } catch (refreshError) {
                authStore.logout();
                delete api.defaults.headers.common["Authorization"];
                throw refreshError;
            }
        }
        throw error;
    }
);

export default api;