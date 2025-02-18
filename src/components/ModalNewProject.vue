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
                            <v-text-field label="Nome do projeto" required clearable v-model="formNewProject.name"></v-text-field>
                            <v-select clearable v-model="formNewProject.categories" :items="categories" label="Categorias" chips multiple></v-select>
                            <v-btn class="mt-2" :loading="false" color="primary" block size="large">Adicionar Projeto</v-btn>
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
const formNewProject = reactive({
    name: "",
    categories: []
});
const categories = ref(['Desenvolcimento', 'Pessoal', 'Trabalho'])

</script>

<style scoped></style>