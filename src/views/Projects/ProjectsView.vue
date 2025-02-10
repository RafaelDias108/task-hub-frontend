<template>
    <v-container :fluid="true">
        <v-card>
            <template v-slot:prepend>
                <div class="mr-14">
                    <h1 class="font-weight-black">Projetos</h1>
                    <p class="text-subtitle-1 text-grey-darken-1">9 Projetos</p>
                </div>
            </template>

            <template v-slot:append>
                <v-btn color="primary">Novo Projeto</v-btn>
            </template>
            <v-card-text>
                <div class="d-flex align-center justify-end">
                    <span class="pb-3 pr-3">Ordenar por:</span>
                    <v-select class="text-primary font-weight-bold" max-width="120" v-model="orderData" variant="underlined" single-line density="compact"
                        :items="[{ title: 'Nome', value: 'nome' }, { title: 'Data', value: 'data' }]"></v-select>
                </div>
                <v-row class="px-10 py-5">
                    <v-col cols="12" md="4">
                        <ProjectCard></ProjectCard>
                    </v-col>
                    <v-col cols="12" md="4">
                        <ProjectCard></ProjectCard>
                    </v-col>
                    <v-col cols="12" md="4">
                        <ProjectCard></ProjectCard>
                    </v-col>
                    <v-col cols="12" md="4">
                        <ProjectCard></ProjectCard>
                    </v-col>
                    <v-col cols="12" md="4">
                        <ProjectCard></ProjectCard>
                    </v-col>
                    <v-col cols="12" md="4">
                        <ProjectCard></ProjectCard>
                    </v-col>
                </v-row>
                <v-row class="py-5" justify="center">
                    <v-btn color="primary" variant="text">Ver mais</v-btn>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProjectCard from '../../components/ProjectCard.vue';

const orderData = ref({title: 'Nome', value: 'nome'})
</script>

<style scoped></style>