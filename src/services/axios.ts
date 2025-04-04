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
    }
);

let isRefreshing = false;

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Modify the response data here
        return response;
    },
    async (error) => {
        const authStore = useAuthStore();
        const originalRequest = error.config

        if (originalRequest.url.includes('/auth')) {
            return Promise.reject(error.response.data);
        }

        if (originalRequest.url.includes('/auth/refresh-token')) {
            delete api.defaults.headers.common["Authorization"];
            authStore.logout();
            router.push('/login')
            return Promise.reject(error.response.data);
        }

        if (error.response.status === 401) {
            if (!isRefreshing){

                try {
                    isRefreshing = true
                    await authStore.refreshToken();
                    // Refaz a requisição original com o novo token
                    return api.request(error.config);
                } catch (error) {
                    delete api.defaults.headers.common["Authorization"];
                    authStore.logout();
                    router.push('/login')
                    return Promise.reject(error);
                }
            }else{
                delete api.defaults.headers.common["Authorization"];
                authStore.logout();
                router.push('/login')
            }
        }



        return Promise.reject(error.response);
    }
);

export default api;