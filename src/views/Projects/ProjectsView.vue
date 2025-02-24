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
                <v-row class="px-10 py-5" v-else-if="haveProjects" v-for="project in allProjects">
                    <v-col cols="12" md="4">
                        <ProjectCard :title="project.name_project" :total-task="project.total_tasks" :total-task-done="project.total_tasks_completed"
                            :total-task-done-percent="ConvertToPercentage(project.total_tasks, project.total_tasks_completed)" :categories="project.categories"></ProjectCard>
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
        <ModalNewProject v-model:dialog="dialog" :is-loading="isLoadingNewProject" @close="dialog = false" @submit="HandleSubmitNewProject"></ModalNewProject>
    </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ProjectCard from '../../components/ProjectCard.vue';
import ModalNewProject from '../../components/ModalNewProject.vue';
import { GetAllProjectsApi, NewProjectApi } from '../../services/api';
import { Project } from '../../types/projectInterface';
import { ConvertToPercentage } from '../../helpers/functions';

const isLoading = ref(false);
const isLoadingNewProject = ref(false);
const haveProjects = ref(false);
const orderData = ref({ title: 'Nome', value: 'nome' })
const dialog = ref(false);
const allProjects = ref<Project[]>([]);

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
            name_project: data.name,
            date_project: data.date,
            categories: data.categories
        }
        
        isLoadingNewProject.value = true;
        const response = await NewProjectApi(formData)
        if(response.status == "success"){
            GetAllProjects();

        }
        
    } catch (error) {
        console.log(error);

    }finally{
        isLoadingNewProject.value = false;
        dialog.value = false;
    }
}

onMounted(() => {
    GetAllProjects();
})
</script>

<style scoped></style>