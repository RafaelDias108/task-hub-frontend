<template>
    <div>
        <!-- mdi-window-closel  -->
        <v-dialog v-model="dialog" width="auto">
            <v-card min-width="500" title="Adicionar um novo projeto">
                <template v-slot:append>
                    <v-btn icon="mdi-close" variant="text" @click="Close()"></v-btn>
                </template>
                <template v-slot:text>
                    <v-row class="mx-2 my-2">
                        <v-col cols="12">
                            <v-text-field label="Nome do projeto" required clearable v-model="formNewProject.name_project" :disabled="props.isLoading" :error="!!errors.name_project" :error-messages="errors.name_project"></v-text-field>
                            <v-text-field type="date" label="data do projeto" required clearable v-model="formNewProject.date_project" :disabled="props.isLoading"></v-text-field>
                            <v-select clearable v-model="formNewProject.categories" :items="categories" item-title="name_category" item-value="uuid_category" label="Categorias" chips multiple :disabled="props.isLoading"></v-select>
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
import { NewProject } from '../types/projectInterface';
import * as yup from 'yup';
import { Notification } from '../plugins/notifications';
import { Category } from '../types/Category';
import { Backend } from '../services/api';

const dialog = defineModel('dialog', { type: Boolean, required: true });
const emit = defineEmits(['close', 'submit']);
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: () => true
    }
});
const isLoading = ref(false)
const errors = ref<Partial<Record<keyof NewProject, string>>>({})
const formNewProject = reactive<NewProject>({
    name_project: "",
    date_project: null,
    categories: []
});

const categories = ref<Category[]>([])

async function validateForm() {
    try {
        errors.value = {};
        await ProjectSchema.validate(formNewProject, { abortEarly: false })
        return true;
    } catch (validationError) {
        if (validationError instanceof yup.ValidationError) {
            validationError.inner.forEach(error => {
                if (error.path) {
                    errors.value[error.path as keyof NewProject] = error.message;
                }
            });
        }
        return false;
    }
}

function Close() {
    errors.value = {}
    formNewProject.name_project = "";
    formNewProject.date_project = "";
    formNewProject.categories = [];
    emit('close')
}

async function Submit() {

    try {
        if (await validateForm()) {
            emit('submit', formNewProject)
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