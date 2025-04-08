<template>
    <v-dialog v-model="showModal" width="auto">
        <v-card min-width="500" :title="TitleModal">
            <!-- {{ task }} -->
            <template v-slot:append>
                <v-btn icon="mdi-close" variant="text" @click="showModal = false"></v-btn>
            </template>
            <template v-slot:text>
                <v-form>
                    <v-row class="mx-2 my-2">
                        <v-col cols="12">
                            <v-text-field label="Tarefa" required clearable v-model="task.title_task"
                                :disabled="props.isLoading"></v-text-field>
                            <v-text-field label="Descrição da tarefa" required clearable
                                v-model="task.description_task" :disabled="props.isLoading"></v-text-field>
                            <v-text-field type="date" label="Data da tarefa" required clearable
                                v-model="task.date_task" :disabled="props.isLoading"></v-text-field>
                            <v-text-field type="time" label="Hora da tarefa" required clearable
                                v-model="task.time_task" :disabled="props.isLoading"></v-text-field>
                            <v-btn class="mt-2 text-none" :loading="props.isLoading" color="primary" text="Salvar Tarefa" block
                                size="large" @click="Submit()" />
                        </v-col>
                    </v-row>
                </v-form>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['close', 'submit']);
const showModal = defineModel('showModal', { type: Boolean, required: true })
const task = defineModel('task', { type: Object, required: true })
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: () => false
    },
});

// const formTask = reactive({
//     uuid_task: null,
//     fk_id_project: null,
//     title_task: null,
//     description_task: null,
//     date_task: null,
//     time_task: null,
// })

function Submit() {

}

const TitleModal = computed(() => {    
    return task.value.uuid_task ? 'Editar tarefa' : 'Criar tarefa'
})
</script>

<style scoped></style>