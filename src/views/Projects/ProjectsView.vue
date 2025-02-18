<template>
    <v-container :fluid="true">
        <v-card>
            <template v-slot:prepend>
                <div class="mr-14">
                    <h1 class="font-weight-black">Projetos</h1>
                    <p class="text-subtitle-1 text-grey-darken-1">6 Projetos</p>
                </div>
            </template>

            <template v-slot:append>
                <v-btn color="primary" @click="dialog = true">Novo Projeto</v-btn>
            </template>
            <v-card-text>
                <div class="d-flex align-center justify-end">
                    <span class="pb-3 pr-3">Ordenar por:</span>
                    <v-select class="text-primary font-weight-bold" max-width="120" v-model="orderData"
                        variant="underlined" single-line density="compact"
                        :items="[{ title: 'Nome', value: 'nome' }, { title: 'Data', value: 'data' }]"></v-select>
                </div>
                <v-row class="px-10 py-5" v-if="isLoading">
                    <v-col cols="12" md="4">
                        <v-skeleton-loader class="mx-auto" elevation="1" type="list-item-avatar, list-item-two-line, chip, chip"></v-skeleton-loader>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-skeleton-loader class="mx-auto" elevation="1" type="list-item-avatar, list-item-two-line, chip, chip"></v-skeleton-loader>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-skeleton-loader class="mx-auto" elevation="1" type="list-item-avatar, list-item-two-line, chip, chip"></v-skeleton-loader>
                    </v-col>
                </v-row>
                <v-row class="px-10 py-5" v-else>
                    <v-col cols="12" md="4">
                        <ProjectCard title="Projeto 1" :total-task="10" :total-task-done="5"
                            :total-task-done-percent="50" :categories="categoriesFake"></ProjectCard>
                    </v-col>
                </v-row>
                <v-row class="py-5" justify="center">
                    <v-btn color="primary" variant="tonal">Ver mais</v-btn>
                </v-row>
            </v-card-text>
        </v-card>
        <ModalNewProject v-model:dialog="dialog" @close="dialog = false"></ModalNewProject>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProjectCard from '../../components/ProjectCard.vue';
import ModalNewProject from '../../components/ModalNewProject.vue';
import { GetAllProjectsApi } from '../../services/api';

const isLoading = ref(false);
const orderData = ref({ title: 'Nome', value: 'nome' })
const categoriesFake = [
    {
        id: 1,
        title: 'Desenvolvimento'
    },
    {
        id: 2,
        title: 'Trabalho'
    },
    {
        id: 3,
        title: 'Mobile'
    },
]
const dialog = ref(false);
const allProjects = ref({});

async function GetAllProjects() {

    try {
        isLoading.value = true;
        const response = await GetAllProjectsApi();

        if(response.status == "success"){
            if(response.data.length > 0){
                allProjects.value = response.data;
            }
        }
        
    } catch (error) {
        
    }finally{
        isLoading.value = false;
    }
}

onMounted(() => {
    GetAllProjects();
})
</script>

<style scoped></style>