<template>
    <v-responsive>
        <v-app :theme="themeStore.GetTheme">
            <Navbar v-model:theme="themeStore.GetTheme" />
            <v-main>
                <v-container :fluid="true">
                    <RouterView />
                </v-container>
            </v-main>
        </v-app>
    </v-responsive>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import { useThemeStore } from '../stores/theme';

const themeStore = useThemeStore();
</script>

<style scoped></style>