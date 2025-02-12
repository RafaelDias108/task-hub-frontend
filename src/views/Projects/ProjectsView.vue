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
                <v-btn color="primary">Novo Projeto</v-btn>
            </template>
            <v-card-text>
                <div class="d-flex align-center justify-end">
                    <span class="pb-3 pr-3">Ordenar por:</span>
                    <v-select class="text-primary font-weight-bold" max-width="120" v-model="orderData"
                        variant="underlined" single-line density="compact"
                        :items="[{ title: 'Nome', value: 'nome' }, { title: 'Data', value: 'data' }]"></v-select>
                </div>
                <v-row class="px-10 py-5">
                    <v-col cols="12" md="4">
                        <ProjectCard title="Projeto 1" :total-task="10" :total-task-done="5"
                            :total-task-done-percent="50" :categories="categoriesFake"></ProjectCard>
                    </v-col>
                    <v-col cols="12" md="4">
                        <ProjectCard title="Projeto 2" :total-task="10" :total-task-done="3"
                            :total-task-done-percent="30" :categories="categoriesFake"></ProjectCard>
                    </v-col>
                    <v-col cols="12" md="4">
                        <ProjectCard title="Projeto 3" :total-task="10" :total-task-done="1"
                            :total-task-done-percent="10" :categories="categoriesFake"></ProjectCard>
                    </v-col>
                    <v-col cols="12" md="4">
                        <ProjectCard title="Projeto para cliente 1" :total-task="5" :total-task-done="4"
                            :total-task-done-percent="90" :categories="categoriesFake"></ProjectCard>
                    </v-col>
                    <v-col cols="12" md="4">
                        <ProjectCard title="Projeto 1" :total-task="3" :total-task-done="0"
                            :total-task-done-percent="0" :categories="categoriesFake"></ProjectCard>
                    </v-col>
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
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProjectCard from '../../components/ProjectCard.vue';

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
</script>

<style scoped></style>