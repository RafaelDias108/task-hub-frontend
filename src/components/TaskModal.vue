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
                            :model-value="ConvertToPercentage(tasks.length, CountTasksCompleted)"
                            :rotate="360" :size="80" :width="8" color="white">
                            <template v-slot:default>
                                <div class="d-flex flex-column">
                                    <span class="font-weight-bold" style="font-size: 1rem;">{{
                                        ConvertToPercentage(tasks.length, CountTasksCompleted) }}%</span>
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
                    <v-btn class="text-none my-5" color="primary" text="Nova Tarefa" @click="SetTaskCreate()" v-if="tasks.length > 0" />
                </div>
                <div class="d-flex align-center justify-end">
                    <span class="pb-3 pr-3 text-subtitle-1">Ordenar por:</span>
                    <v-select class="text-primary font-weight-bold" max-width="120" v-model="orderData"
                        variant="underlined" single-line density="compact"
                        :items="[{ title: 'Nome', value: 'nome' }, { title: 'Data', value: 'data' }]"></v-select>
                </div>
            </v-card-title>
            <v-card-text>
                <v-row class="d-flex flex-column justify-center align-center py-3" v-if="isLoading">
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
                        <v-btn class="text-none my-5" color="primary" text="Nova Tarefa" @click="SetTaskCreate()" />
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column justify-center align-center py-3" v-else>
                    <v-col cols="12">
                        <v-list class="d-flex flex-column ga-8">
                            <v-list-item class="bg-cardCustom py-4" v-for="(task, index) in tasks" :key="index">
                                <template #title>
                                    <v-checkbox density="compact" v-model="task.is_completed" @change="ToggleCompleteTask(task)" true-value="1" false-value="0">
                                        <template #label>
                                            <del class="ml-3" v-if="task.is_completed == 1">{{ task.title_task }}</del>
                                            <h4 class="ml-3" v-else>{{ task.title_task }}</h4>
                                        </template>
                                    </v-checkbox>
                                </template>
                                <template #subtitle>
                                    <!-- <v-chip label>Média</v-chip> -->
                                     {{ task.description_task }}
                                </template>
                                <template v-slot:append>
                                    <v-menu>
                                        <template v-slot:activator="{ props }">
                                            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                                        </template>

                                        <v-list>
                                            <v-list-item class="v-list-item-custom mx-2" link density="compact"
                                                title="Editar" prepend-icon="mdi-pencil-box-multiple-outline"
                                                @click="SetTaskEdit(task)" />
                                            <v-list-item class="v-list-item-custom mx-2" link density="compact"
                                                title="Deletar" prepend-icon="mdi-delete" @click="showModalDeleteTask = true" />
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
    <ModalHandleTask v-model:show-modal="ShowModalHandleTask" :task="task ?? {}" :v-model:task="task" :is-loading="isLoadingModalTask" @save-task="HandleSaveTask"/>
    <ModalDeleteTask v-model:is-loading="isLoadingModalDeleteTask" v-model:show-dialog="showModalDeleteTask"/>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { ConvertToPercentage } from '../helpers/functions';
import { Backend, CreateTaskByProject, EditTaskByProject, ToggleCompleteTaskByProject } from '../services/api';
import { Notification } from '../plugins/notifications';
import ModalHandleTask from './ModalHandleTask.vue';
import { Task } from '../types/tasks';
import ModalDeleteTask from './ModalDeleteTask.vue';

const emit = defineEmits(['updateProjects'])
const showDialogTask = defineModel('showDialogTask', { type: Boolean, required: true })
const props = defineProps({
    project: {
        type: Object,
        required: true
    }
})
const showModalDeleteTask = ref(false)
const orderData = ref({ title: 'Nome', value: 'nome' })
const isLoading = ref(false)
const isLoadingModalTask = ref(false)
const isLoadingModalDeleteTask = ref(false)
const tasks = ref<Task[]>([])
const task = reactive<Task>({
    uuid_task: null,
    uuid_project: null,
    title_task: null,
    description_task: null,
    date_task: null,
    time_task: null,
    is_completed: false
})
const ShowModalHandleTask = ref(false)

async function FecthTasks() {
    try {

        const response = await Backend.GetAllTasksByProject(props.project.uuid_project)
        if (response.status == 200) {
            tasks.value = response.data.data
        }

    } catch (error: any) {
        if (error.status !== 404) {
            Notification.error(error.data.message)
        }
    }
}

function SetTaskEdit(item: any){

    task.uuid_task = item.uuid_task
    task.title_task = item.title_task
    task.description_task = item.description_task
    task.date_task = item.date_task
    task.time_task = item.time_task
    task.uuid_project = props.project.uuid_project

    ShowModalHandleTask.value = true 
}

function SetTaskCreate(){

    task.uuid_task = null
    task.title_task = null
    task.description_task = null
    task.date_task = null
    task.time_task = null
    task.uuid_project = props.project.uuid_project

    ShowModalHandleTask.value = true 
}

async function HandleSaveTask(task: Task) {

    try {
        isLoadingModalTask.value = true
        
        const response = !task.uuid_task ? await CreateTaskByProject(task) : await EditTaskByProject(task)
        console.log(response)
        if (response.status == 'success') {
            await FecthTasks()
        }
        Notification.success('Tarefa salva com sucesso')
        ShowModalHandleTask.value = false
    } catch (error: any) {
        console.log(error)
        Notification.error(`Não foi possível ${task.uuid_task ? 'atualizar' : 'criar'} a tarefa`)
    } finally {
        isLoadingModalTask.value = false
    }
}

async function ToggleCompleteTask(task: Task) {
    try {
        if (task.uuid_task){
            const response = await ToggleCompleteTaskByProject(task.uuid_task, task.is_completed == '1' ? true : false)
            if (response.status == 'success') {
                await FecthTasks()
                emit('updateProjects')
                Notification.success('Status da tarefa atualizada com sucesso')
            }
        }
    } catch (error) {
        console.log(error)
        Notification.error('Não foi possível atualizar o status da tarefa')
    }
}

const CountTasks = computed(() => {
    return `${tasks.value.length} ${tasks.value.length > 1 ? 'Tarefas' : 'Tarefa'}`
})

const CountTasksCompleted = computed(() => {
    let count = 0

    tasks.value.map((task: Task) => {
        if (task.is_completed == '1') {
            count++
        }
    })

    return count
})

onMounted(async () => {
    isLoading.value = true
    await FecthTasks()
    isLoading.value = false
})


</script>

<style scoped>
.v-list-item-custom:hover {
    background-color: #1976D2;
    color: #fff;
}
</style>