<template>
    <v-container :fluid="true">
        <v-card>
            <template v-slot:prepend>
                <div class="mr-14">
                    <h1 class="font-weight-black">Projetos</h1>
                    <v-skeleton-loader type="list-item"  v-if="isLoading"></v-skeleton-loader>
                    <p class="text-subtitle-1 text-grey-darken-1" v-else>{{ ComputedTotalProjects }}</p>
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
                <v-row class="px-10 py-5" v-else-if="haveProjects">
                    <v-col cols="12" md="4" v-for="project in allProjects">
                        <ProjectCard :project="project" @edit="EditProjeto" @delete="HandleDeleteProject" @show-tasks="HandleDialogTasks"/>
                    </v-col>
                </v-row>
                <v-row class="py-5" justify="center" v-if="haveProjects">
                    <v-btn color="primary" variant="tonal">Ver mais</v-btn>
                </v-row>
                <v-row class="d-flex flex-column justify-center align-center py-10" v-if="!haveProjects && !isLoading">
                    <v-col class="text-center" cols="6">
                        <v-icon icon="mdi-chart-box-plus-outline mb-2" size="72" color="grey-lighten-1"></v-icon>
                        <p class="font-weight-bold text-h6">Ainda não há Projetos...</p>
                        <p class="text-bolder">Por favor, clique no botão acima para adicionar um novo projeto.</p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <ModalNewProject v-if="dialog" v-model:dialog="dialog" :is-loading="isLoadingNewProject" @close="dialog = false" @submit="HandleSubmitNewProject"></ModalNewProject>
        <ModalEditProject v-if="dialogEditProject" v-model:dialog="dialogEditProject" :project="editProject" :is-loading="isLoadingEditProject" @close="dialogEditProject = false" @submit="HandleSubmitEditProject" />
        <ModalDeleteProject v-model:show-dialog="dialogDeleteProject" @delete="DeleteProject" v-model:is-loading="isLoadingDeleteProject" />
        <TaskModal v-model:show-dialog-task="showDialogTasks" />
    </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ProjectCard from '../../components/ProjectCard.vue';
import ModalNewProject from '../../components/ModalNewProject.vue';
import ModalEditProject from '../../components/ModalEditProject.vue'
import ModalDeleteProject from '../../components/ModalDeleteProject.vue';
import { DeleteProjectApi, GetAllProjectsApi, NewProjectApi, UpdateProjectApi } from '../../services/api';
import { EditProject, Project } from '../../types/projectInterface';
import { Notification } from '../../plugins/notifications';
import TaskModal from '../../components/TaskModal.vue';

const isLoading = ref(false);
const isLoadingNewProject = ref(false);
const isLoadingEditProject = ref(false);
const isLoadingDeleteProject = ref(false);
const haveProjects = ref(false);
const orderData = ref({ title: 'Nome', value: 'nome' })
const dialog = ref(false);
const dialogEditProject = ref(false);
const dialogDeleteProject = ref(false);
const showDialogTasks = ref(false)
const allProjects = ref<Project[]>([]);
const editProject = ref<EditProject>({
    uuid: '',
    name_project: '',
    date_project: '',
    categories: []
})
const uuid_project = ref<String | null >(null)

async function GetAllProjects() {

    try {
        isLoading.value = true;
        const response = await GetAllProjectsApi();

        if(response.status == "success"){
            if(response.data.length > 0){
                allProjects.value = response.data;
                haveProjects.value = true;               
            }else{
                haveProjects.value = false;
            }
        }
        
    } catch (error) {
        haveProjects.value = false;
    }finally{
        isLoading.value = false;
    }
}

const ComputedTotalProjects = computed(() => {
    if(allProjects.value.length == 1){
        return `${allProjects.value.length} Projeto`
    }else{
        return `${allProjects.value.length} Projetos`
    }
})

async function HandleSubmitNewProject(data: any) {
    
    try {

        const formData = {
            name_project: data.name_project,
            date_project: data.date_project,
            categories: data.categories
        }

        isLoadingNewProject.value = true;
        const response = await NewProjectApi(formData)
        if(response.status == "success"){
            GetAllProjects();
            Notification.success("Projeto criado com sucesso")
        }
        
    } catch (error: any) {
        
        if(error.data.hasOwnProperty('errors')){
            for (const value of Object.entries(error.data.errors)) {
                Notification.error(`Não foi possível criar o projeto: ${value}`)
            }
        }
    }finally{
        isLoadingNewProject.value = false;
        dialog.value = false;
    }
}

function EditProjeto(project: Project) {
    dialogEditProject.value = true
    editProject.value.uuid = project.uuid_project
    editProject.value.name_project = project.name_project
    editProject.value.date_project = project.date_project ?? null
    editProject.value.categories = project.categories
}

async function HandleSubmitEditProject(project: EditProject) {
    isLoadingEditProject.value = true
    try {
        const response = await UpdateProjectApi(project)
        if(response.status == 'success'){
            dialogEditProject.value = false
            GetAllProjects();
            Notification.success("Projeto atualizado com sucesso")
        }
    } catch (error: any) {
        Notification.error(`Não foi possível atualizar o projeto: ${error.message}`)
    }finally{
        isLoadingEditProject.value = false
    }
}

function HandleDeleteProject(uuid: string) {
    console.log(uuid);
    uuid_project.value = uuid
    dialogDeleteProject.value = true
}

async function DeleteProject() {
    
    if(uuid_project.value){
        isLoadingDeleteProject.value = true
        try {
            const response = await DeleteProjectApi(uuid_project.value)
            if(response.status == 'success'){
                Notification.success("Projeto excluído com sucesso.")
                GetAllProjects()
            }
        } catch (error: any) {
            Notification.error("Não foi possível excluir o projeto: "+error.message)
        }finally{
            dialogDeleteProject.value = false
            isLoadingDeleteProject.value = false
        }
    }
}

function HandleDialogTasks(project: Project) {
    console.log(project);
    showDialogTasks.value = true
}

onMounted(() => {
    GetAllProjects();
})
</script>

<style scoped></style>