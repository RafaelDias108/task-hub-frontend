<template>
    <v-dialog v-model="showDialogTask" max-width="1300">
        <v-card>
            <v-toolbar class="py-3 px-10" color="primary" height="120">
                <template #prepend>
                    <v-avatar class="mr-3" color="white" size="large">
                        <v-icon icon="mdi-notebook-outline" size="large" color="primary"></v-icon>
                    </v-avatar>
                </template>
                <template #title>
                    <h3>Nome do projeto</h3>
                    <p class="text-subtitle-1 text-grey-lighten-2">0 tarefas</p>
                </template>
                <template #append>
                    <div class="text-center">
                        <v-progress-circular :model-value="50" :rotate="360" :size="80" :width="8" color="white">
                            <template v-slot:default>
                                <div class="d-flex flex-column">
                                    <span class="font-weight-bold" style="font-size: 1rem;">50%</span>
                                    <span style="font-size: .7rem;">Completo</span>
                                </div>
                            </template>
                        </v-progress-circular>
                    </div>
                </template>
                <v-fab location="top right" absolute :offset="true" variant="text" icon="mdi-close" density="compact" style="position: fixed; top: 20px; right: 10px;" @click="showDialogTask = false" />
            </v-toolbar>
            <v-card-title class="d-flex justify-space-between mt-8 px-10">
                <h3>Tarefas</h3>
                <div class="d-flex align-center justify-end">
                    <span class="pb-3 pr-3 text-subtitle-1">Ordenar por:</span>
                    <v-select class="text-primary font-weight-bold" max-width="120" v-model="orderData"
                        variant="underlined" single-line density="compact"
                        :items="[{ title: 'Nome', value: 'nome' }, { title: 'Data', value: 'data' }]"></v-select>
                </div>
            </v-card-title>
            <v-card-text>
                <v-row class="d-flex flex-column justify-center align-center py-10" v-if="!haveTasks && !isLoading">
                    <v-col class="text-center" cols="12" lg="6">
                        <v-icon icon="mdi-chart-box-plus-outline mb-2" size="72" color="grey-lighten-1"></v-icon>
                        <p class="font-weight-bold text-h6">Ainda não há tarefas...</p>
                        <p class="text-bolder">Por favor, clique abaixo para adicionar uma nova tarefa.</p>
                        <v-btn class="text-none my-5" color="primary" text="Nova Tarefa" />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showDialogTask = defineModel('showDialogTask', { type: Boolean, required: true })

const orderData = ref({ title: 'Nome', value: 'nome' })
const haveTasks = ref(false)
const isLoading = ref(false)
</script>

<style scoped></style>