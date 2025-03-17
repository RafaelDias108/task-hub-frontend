<template>
    <v-card class="bg-cardCustom" :title="props.project?.name_project"  >
        <template v-slot:prepend>
            <v-avatar class="mr-3" color="primary">
                <v-icon icon="mdi-notebook-outline" size="large"></v-icon>
            </v-avatar>
        </template>

        <template v-slot:text>
            <div class="d-flex justify-space-between mt-3 mb-2">
                <div class="d-flex ga-3">
                    <v-icon icon="mdi-chart-timeline"></v-icon>
                    <span class="text-subtitle-2">Progresso</span>
                </div>
                <span class="text-subtitle-2">{{ props.project?.total_tasks_completed }}/{{ props.project?.total_tasks }}</span>
            </div>
            <v-progress-linear color="blue-darken-3" :model-value="ConvertToPercentage(props.project.total_tasks, props.project.total_tasks_completed)"
                :height="5"></v-progress-linear>
            <div class="mt-10" v-if="props.project?.categories.length > 0">
                <v-chip class="ma-1" label size="small" color="primary" variant="flat"
                    v-for="categorie in props.project?.categories">
                    {{ categorie.name_category }}
                </v-chip>
            </div>
            <div class="mt-10" v-else>
                <p>Não há categorias</p>
            </div>
        </template>

        <template v-slot:append>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
                </template>

                <v-list>
                    <v-list-item class="v-list-item-custom mx-2" link density="compact" title="Editar" prepend-icon="mdi-pencil-box-multiple-outline" @click="emit('edit', props.project)" />
                    <v-list-item class="v-list-item-custom mx-2" link density="compact" title="Deletar" prepend-icon="mdi-delete" @click="emit('delete', props.project.uuid_project)" />
                </v-list>
            </v-menu>
        </template>
    </v-card>
</template>

<script setup lang="ts">
import { ConvertToPercentage } from '../helpers/functions';
const emit = defineEmits(['edit', 'delete'])
const props = defineProps({
    project : {
        type: Object,
        required: true
    }
})

</script>

<style scoped>
.v-list-item-custom:hover {
    background-color: #1976D2;
    color: #fff;
}
</style>