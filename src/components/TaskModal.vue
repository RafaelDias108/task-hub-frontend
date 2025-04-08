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
                    <v-skeleton-loader class="m-0 my-3" color="primary" type="subtitle" width="50%" v-if="isLoading" />
                    <h3 v-else>{{ props.project.name_project }}</h3>
                    <v-skeleton-loader class="m-0 my-3" color="primary" type="subtitle" width="15%" v-if="isLoading" />
                    <p class="text-subtitle-1 text-grey-lighten-2" v-else>{{ CountTasks }}</p>
                </template>
                <template #append>
                    <div class="text-center">
                        <v-progress-circular
                            :model-value="ConvertToPercentage(props.project.total_tasks, props.project.total_tasks_completed)"
                            :rotate="360" :size="80" :width="8" color="white">
                            <template v-slot:default>
                                <div class="d-flex flex-column">
                                    <span class="font-weight-bold" style="font-size: 1rem;">{{
                                        ConvertToPercentage(props.project.total_tasks,
                                            props.project.total_tasks_completed) }}</span>
                                    <span style="font-size: .7rem;">Completo</span>
                                </div>
                            </template>
                        </v-progress-circular>
                    </div>
                </template>
                <v-fab location="top right" absolute :offset="true" variant="text" icon="mdi-close" density="compact"
                    style="position: fixed; top: 20px; right: 10px;" @click="showDialogTask = false" />
            </v-toolbar>
            <v-card-title class="d-flex justify-space-between align-center mt-8 px-10">
                <div class="d-flex align-center flex-wrap ga-8">
                    <h3>Tarefas</h3>
                    <v-btn class="text-none my-5" color="primary" text="Nova Tarefa" @click="ShowModalHandleTask = true" v-if="tasks.length > 0" />
                </div>
                <div class="d-flex align-center justify-end">
                    <span class="pb-3 pr-3 text-subtitle-1">Ordenar por:</span>
                    <v-select class="text-primary font-weight-bold" max-width="120" v-model="orderData"
                        variant="underlined" single-line density="compact"
                        :items="[{ title: 'Nome', value: 'nome' }, { title: 'Data', value: 'data' }]"></v-select>
                </div>
            </v-card-title>
            <v-card-text>
                <v-row class="d-flex flex-column justify-center align-center py-5" v-if="isLoading">
                    <v-col class="text-center" cols="12" lg="6">
                        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column justify-center align-center py-5"
                    v-else-if="tasks.length == 0 && !isLoading">
                    <v-col class="text-center" cols="12" lg="6">
                        <v-icon icon="mdi-chart-box-plus-outline mb-2" size="72" color="grey-lighten-1"></v-icon>
                        <p class="font-weight-bold text-h6">Ainda não há tarefas...</p>
                        <p class="text-bolder">Por favor, clique abaixo para adicionar uma nova tarefa.</p>
                        <v-btn class="text-none my-5" color="primary" text="Nova Tarefa" @click="ShowModalHandleTask = true" />
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column justify-center align-center py-5" v-else>
                    <v-col cols="12">
                        <v-list>
                            <v-list-item class="bg-cardCustom py-4" v-for="task in tasks" :key="task.uuid_task">
                                <template #title>
                                    <v-checkbox density="compact" v-model="taskIsCompleted">
                                        <template #label>
                                            <h4 class="ml-3">{{ task.title_task }}</h4>
                                        </template>
                                    </v-checkbox>
                                </template>
                                <template #subtitle>
                                    <v-chip label>Média</v-chip>
                                </template>
                                <template v-slot:append>
                                    <v-menu>
                                        <template v-slot:activator="{ props }">
                                            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                                        </template>

                                        <v-list>
                                            <v-list-item class="v-list-item-custom mx-2" link density="compact"
                                                title="Editar" prepend-icon="mdi-pencil-box-multiple-outline"
                                                @click="ShowModalHandleTask = true" />
                                            <v-list-item class="v-list-item-custom mx-2" link density="compact"
                                                title="Deletar" prepend-icon="mdi-delete" @click="" />
                                        </v-list>
                                    </v-menu>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
    <ModalHandleTask v-model:show-modal="ShowModalHandleTask"/>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ConvertToPercentage } from '../helpers/functions';
import { Backend } from '../services/api';
import { Notification } from '../plugins/notifications';
import ModalHandleTask from './ModalHandleTask.vue';

const showDialogTask = defineModel('showDialogTask', { type: Boolean, required: true })
const props = defineProps({
    project: {
        type: Object,
        required: true
    }
})

const orderData = ref({ title: 'Nome', value: 'nome' })
const taskIsCompleted = ref(false)
const isLoading = ref(false)
const tasks = ref([])
const ShowModalHandleTask = ref(false)
async function FecthTasks() {
    try {
        isLoading.value = true

        const response = await Backend.GetAllTasksByProject(props.project.uuid_project)
        if (response.status == 200) {
            tasks.value = response.data.data
        }

    } catch (error: any) {
        if (error.status !== 404) {
            Notification.error(error.data.message)
        }
    } finally {
        isLoading.value = false
    }
}

const CountTasks = computed(() => {
    return `${tasks.value.length} ${tasks.value.length > 1 ? 'Tarefas' : 'Tarefa'}`
})

onMounted(async () => {
    await FecthTasks()
})


</script>

<style scoped>
.v-list-item-custom:hover {
    background-color: #1976D2;
    color: #fff;
}
</style>