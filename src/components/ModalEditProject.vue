<template>
    <div>
        <!-- mdi-window-closel  -->
        <v-dialog v-model="dialog" width="auto">
            <v-card min-width="500" title="Editar projeto">
                <template v-slot:append>
                    <v-btn icon="mdi-close" variant="text" @click="Close()"></v-btn>
                </template>
                <template v-slot:text>
                    <v-row class="mx-2 my-2">
                        <v-col cols="12">
                            <v-text-field label="Nome do projeto" required clearable v-model="props.project.name_project" :disabled="props.isLoading" :error="!!errors.name_project" :error-messages="errors.name_project"></v-text-field>
                            <v-text-field type="date" label="data do projeto" required clearable v-model="props.project.date_project" :disabled="props.isLoading"></v-text-field>
                            <v-select clearable v-model="props.project.categories" :items="categories" item-title="name_category" item-value="uuid_category" label="Categorias" chips multiple :disabled="props.isLoading" :loading="isLoading" />
                            <v-btn class="mt-2" :loading="props.isLoading" color="primary" title="Salvar Projeto" text="Salvar Projeto" block size="large" @click="Submit()" />
                        </v-col>
                    </v-row>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { ProjectSchema } from '../validations/NewProjectValidation';
import { EditProject } from '../types/projectInterface';
import * as yup from 'yup';
import { Notification } from '../plugins/notifications';
import { Backend } from '../services/api';
import { Category } from '../types/Category';

const dialog = defineModel('dialog', { type: Boolean, required: true });
const emit = defineEmits(['close', 'submit']);
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: () => true
    },
    project: {
        type: Object,
        required: true
    }
});
const errors = ref<Partial<Record<keyof EditProject, string>>>({})
const formEditProject = reactive<EditProject>({
    name_project: "",
    date_project: null,
    categories: []
});
const isLoading = ref(false)
const categories = ref<Category[]>([])

async function validateForm() {
    try {
        errors.value = {};
        await ProjectSchema.validate(formEditProject, { abortEarly: false })
        return true;
    } catch (validationError) {
        if (validationError instanceof yup.ValidationError) {
            validationError.inner.forEach(error => {
                if (error.path) {
                    errors.value[error.path as keyof EditProject] = error.message;
                }
            });
        }
        return false;
    }
}

function Close() {
    errors.value = {}
    formEditProject.name_project = "";
    formEditProject.date_project = "";
    formEditProject.categories = [];
    emit('close')
}

async function Submit() {

    formEditProject.uuid = props.project.uuid
    formEditProject.name_project = props.project.name_project
    formEditProject.date_project = props.project.date_project
    formEditProject.categories = props.project.categories
    console.log(formEditProject);
    
    try {
        if (await validateForm()) {
            emit('submit', formEditProject)
        }
    } catch (error: any) {
        Notification.error(error.message)
    } 
}

async function Allcategories() {
    isLoading.value = true
    try {
        const response = await Backend.GetAllCategories()
        if(response.status == "success"){
            categories.value = response.data
        }
    } catch (error) {
        
    }finally{
        isLoading.value = false
    }
}

onMounted(() => {
    Allcategories()
})

</script>

<style scoped></style>