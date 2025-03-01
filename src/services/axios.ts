import axios from "axios";
import { useAuthStore } from "../stores/auth";
import router from "../routes";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': ' multipart/form-data'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        if (authStore.access_token) {
            config.headers.Authorization = `Bearer ${authStore.access_token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Modify the response data here
        return response;
    },
    (error) => {
        const authStore = useAuthStore();
        if (error.response.status === 401) {
            try {
                authStore.refreshToken();
                return api.request(error.config);
            } catch (error) {
                delete api.defaults.headers.common["Authorization"];
                authStore.logout();
                router.push('/login')
            }
        }

        

        return Promise.reject(error.response.data);
    }
);

export default api;