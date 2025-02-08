import { defineStore } from 'pinia';
import { Auth } from '../types/authInterface';
import { LoginApi, RefreshTokenApi } from '../services/api';

export const useAuthStore = defineStore('auth', {

    state: (): Auth => ({
        user: null,
        refresh_token: null,
        access_token: null
    }),
    getters: {
        isAuthenticated: (state) => !!state.access_token
    },
    actions: {
        async login(email: string, password: string) {
            const response = await LoginApi(email, password)
            this.user = response.data.user;
            this.refresh_token = response.data.refresh_token;
            this.access_token = response.data.access_token;
        },
        async refreshToken() {
            try {
                const response = await RefreshTokenApi(this.refresh_token);
                console.log("refreshToken", response);
                
            } catch (error) {
                console.log("refreshToken", error);
            }
        },
        logout() {
            this.access_token = null;
            this.refresh_token = null;
            this.user = null;
        }
    },
    persist: {
        storage: localStorage,
        pick: ['user', 'access_token'],
    },
})