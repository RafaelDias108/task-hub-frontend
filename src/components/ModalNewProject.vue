<template>
    <div>
        <!-- mdi-window-closel  -->
        <v-dialog v-model="dialog" width="auto">
            <v-card min-width="500" title="Adicionar um novo projeto">
                <template v-slot:append>
                    <v-btn icon="mdi-close" variant="text" @click="() => emit('close')"></v-btn>
                </template>
                <template v-slot:text>
                    <v-row class="mx-2 my-2">
                        <v-col cols="12">
                            <v-text-field label="Nome do projeto" required clearable v-model="formNewProject.name" :disabled="props.isLoading"></v-text-field>
                            <v-text-field type="date" label="data do projeto" required clearable v-model="formNewProject.date" :disabled="props.isLoading"></v-text-field>
                            <v-select clearable v-model="formNewProject.categories" :items="categories" label="Categorias" chips multiple :disabled="props.isLoading"></v-select>
                            <v-btn class="mt-2" :loading="props.isLoading" color="primary" block size="large" @click="() => emit('submit', formNewProject)">Adicionar Projeto</v-btn>
                        </v-col>
                    </v-row>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const dialog = defineModel('dialog', { type: Boolean, required: true });
const emit = defineEmits(['close', 'submit']);
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: () => true
    }
});
const formNewProject = reactive({
    name: "",
    date: "",
    categories: []
});

const categories = ref([
    {
        value: 1,
        title: 'Desenvolvimento'
    },
    {
        value: 2,
        title: 'Pessoal'
    },
    {
        value: 3,
        title: 'Trabalho'
    }
])

</script>

<style scoped></style>