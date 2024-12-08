<template>
    <v-responsive>
        <v-app :theme="theme">
            <Navbar v-model:theme="theme" />
            <v-main>
                <v-container :fluid="true">
                    <RouterView />
                </v-container>
            </v-main>
        </v-app>
    </v-responsive>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';

const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
prefersColorScheme.addListener((event) => {
    if (event.matches) {
        // O tema é o dark
        theme.value = 'dark'
    } else {
        // O tema é o light
        theme.value = 'light'
    }
});
const theme = ref<string>('light')
</script>

<style scoped></style>