<template>
    <v-responsive>
        <v-app :theme="themeStore.GetTheme">
            <Navbar v-model:theme="themeStore.GetTheme" />
            <v-main class="mt-5" :class="computedTheme">
                <v-container :fluid="true">
                    <RouterView />
                </v-container>
            </v-main>
        </v-app>
    </v-responsive>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Navbar from '../components/Navbar.vue';
import { useThemeStore } from '../stores/theme';

const themeStore = useThemeStore();

const computedTheme = computed(() => {

    if(themeStore.GetTheme == 'dark'){
        return ''
    }else {
        return 'bg-indigo-lighten-5'
    }
})
</script>

<style scoped></style>