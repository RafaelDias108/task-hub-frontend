import { defineStore } from 'pinia';
import { Auth } from '../interfaces/authInterface';

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

        },
        async refreshTokens() {

        },
        logout() {
            this.access_token = null;
            this.refresh_token = null;
            this.user = null;
        }
    },
    persist: {
        storage: sessionStorage,
    },
})