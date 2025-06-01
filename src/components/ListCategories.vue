<template>
    <v-list class="d-flex flex-column ga-8">
        <v-list-item class="bg-cardCustom py-4" v-for="(category, index) in props.categories" :key="index">
            <template #title>
                <h4 class="ml-3">{{ category.name_category }}</h4>
            </template>
            <!-- <template #subtitle>
                {{ task.description_task }}
            </template> -->
            <template v-slot:append>
                <v-menu>
                    <template v-slot:activator="{ props: props_menu }">
                        <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props_menu"></v-btn>
                    </template>

                    <v-list>
                        <v-list-item class="v-list-item-custom mx-2" link density="compact" title="Editar"
                            prepend-icon="mdi-pencil-box-multiple-outline" @click="emit('edit', category)" />
                        <v-list-item class="v-list-item-custom mx-2" link density="compact" title="Deletar"
                            prepend-icon="mdi-delete" @click="emit('delete', category.uuid)" />
                    </v-list>
                </v-menu>
            </template>
        </v-list-item>
    </v-list>
</template>

<script setup lang="ts">
import { Category } from '../types/Category';

const emit = defineEmits(['delete', 'edit'])
const props = defineProps<{
    categories: Category[]
}>()

</script>

<style scoped></style>