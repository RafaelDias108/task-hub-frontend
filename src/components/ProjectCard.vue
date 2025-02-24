<template>
    <v-card class="bg-cardCustom" :title="props.title"  >
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
                <span class="text-subtitle-2">{{ props.totalTaskDone }}/{{ props.totalTask }}</span>
            </div>
            <v-progress-linear color="blue-darken-3" :model-value="props.totalTaskDonePercent"
                :height="5"></v-progress-linear>
            <div class="mt-10" v-if="props.categories.length > 0">
                <v-chip class="ma-1" label size="small" color="primary" variant="flat"
                    v-for="categorie in props.categories">
                    {{ categorie.title }}
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
                    <v-list-item class="v-list-item-custom mx-2" link density="compact" v-for="(item, i) in items"
                        :key="i" :title="item.title" :prepend-icon="item.props.prependIcon">
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({

    title: {
        type: String,
        required: true
    },
    totalTask: {
        type: Number,
        required: true,
        default: () => 0
    },
    totalTaskDone: {
        type: Number,
        required: true,
        default: () => 0
    },
    totalTaskDonePercent: {
        type: Number,
        required: true,
        default: () => 0
    },
    categories: {
        type: Object,
        default: () => {}
    }

})

const items = ref([
    {
        title: 'Editar',
        value: 1,

        props: {
            prependIcon: 'mdi-pencil-box-multiple-outline',
        }
    },
    {
        title: 'Deletar',
        value: 2,
        props: {
            prependIcon: 'mdi-delete',
        }
    },
])
</script>

<style scoped>
.v-list-item-custom:hover {
    background-color: #1976D2;
    color: #fff;
}
</style>