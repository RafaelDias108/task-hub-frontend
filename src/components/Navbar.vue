<template>
    <v-app-bar class="px-3">
        <v-app-bar-nav-icon :icon="drawer ? 'mdi-close' : 'mdi-menu'" variant="text" v-if="width < 900"
            @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img max-width="130px" src="/Logo.png" v-if="width > 900" />

        <v-spacer></v-spacer>

        <v-sheet v-if="width > 900">
            <v-tabs align-tabs="center">
                <v-tab prepend-icon="mdi-speedometer" to="dashboard">DASHBOARD</v-tab>
                <v-tab prepend-icon="mdi-chart-box-outline" to="projects">PROJETOS</v-tab>
                <v-tab prepend-icon="mdi-collage" to="categories">CATEGORIAS</v-tab>
            </v-tabs>
        </v-sheet>

        <v-container class="d-flex justify-center" v-else>
            <v-img max-width="130px" src="/Logo.png" />
        </v-container>

        <v-spacer></v-spacer>

        <template #append>
            <v-btn class="ms-1" icon>
                <v-icon>{{ toggleThemeIcon }}</v-icon>
                <v-menu activator="parent" origin="top">
                    <v-list density="compact" slim>
                        <v-list-item @click="changeTheme('light')" :active="toggleTheme == 'light'" title="Tema Claro"
                            prepend-icon="mdi-weather-sunny" />
                        <v-list-item @click="changeTheme('dark')" :active="toggleTheme == 'dark'" title="Tema Escuro"
                            prepend-icon="mdi-weather-night" />
                        <v-list-item @click="changeTheme('system')" :active="toggleTheme == 'system'"
                            title="Padrão do dispositivo" prepend-icon="mdi-brightness-6" />
                    </v-list>
                </v-menu>
            </v-btn>
            <v-btn class="ms-1" icon>
                <v-avatar color="brown">
                    <span class="text-body-1">{{ userAuth.initials }}</span>
                </v-avatar>
                <v-menu activator="parent" origin="top">
                    <v-list>
                        <v-list-item class="mb-3">
                            <v-list-item-title class="font-weight-bold">{{ userAuth.fullName }}</v-list-item-title>
                            <v-list-item-subtitle>{{ userAuth.email }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item slim link title="Perfil" prepend-icon="mdi-account-outline" />
                        <v-list-item slim link title="Configurações" prepend-icon="mdi-cog-outline" />
                        <v-list-item slim link title="Sair" prepend-icon="mdi-logout" />
                    </v-list>
                </v-menu>
            </v-btn>
        </template>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
        <v-list class="mt-5" nav>
            <v-list-item prepend-icon="mdi-speedometer" title="Dashboard" value="Dashboard" link
                to="dashboard"></v-list-item>
            <v-list-item prepend-icon="mdi-chart-box-outline" title="Projetos" value="Projetos" link
                to="projects"></v-list-item>
            <v-list-item prepend-icon="mdi-collage" title="Categorias" value="Categorias" link
                to="categories"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useDisplay } from 'vuetify'

const { width } = useDisplay()
const theme = defineModel('theme', { required: true })
const toggleTheme = ref(theme.value)
const drawer = ref<boolean>(false)
const userAuth = reactive({
    initials: 'RD',
    fullName: 'Rafael Dias',
    email: 'rafaelsd70@gmail.com'
})
const toggleThemeIcon = computed(() => {
    let icon = '';

    switch (toggleTheme.value) {
        case 'light':
            icon = 'mdi-weather-sunny'
            break;

        case 'dark':
            icon = 'mdi-weather-night'
            break;

        default:
            icon = 'mdi-brightness-6'
            break;
    }

    return icon;
})

function changeTheme(oTheme: string) {

    switch (oTheme) {
        case 'light':
            theme.value = 'light'
            toggleTheme.value = 'light'
            break;

        case 'dark':
            theme.value = 'dark'
            toggleTheme.value = 'dark'
            break;

        default:
            const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

            if (prefersColorScheme.matches) {
                theme.value = 'dark'
            } else {
                theme.value = 'light'
            }
            toggleTheme.value = 'system'
            break;
    }
}
</script>

<style scoped></style>