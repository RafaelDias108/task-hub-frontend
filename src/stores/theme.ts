import { defineStore } from 'pinia';
import { Theme } from '../interfaces/themeInterfaces';

export const useThemeStore = defineStore('themeStore', {

    state: (): Theme => ({
        isDarkMode: false,
        followSystemTheme: false
    }),
    getters: {
        GetTheme(state) {
            if (state.isDarkMode) {
                return 'dark'
            } else {
                return 'light'
            }
        }
    },
    actions: {
        toggleTheme() {
            this.followSystemTheme = false; // Desativa o tema do sistema
            this.isDarkMode = !this.isDarkMode;
        },
        setTheme(isDark: boolean) {
            this.followSystemTheme = false; // Desativa o tema do sistema
            this.isDarkMode = isDark;
        },
        enableSystemTheme() {
            this.followSystemTheme = true; // Habilita o tema do sistema
            this.syncWithSystemTheme();
        },
        syncWithSystemTheme() {
            if (this.followSystemTheme) {
                const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.isDarkMode = isSystemDark;
            }
        },
    },
    persist: {
        storage: localStorage, // Persistir no localStorage
    },
})

