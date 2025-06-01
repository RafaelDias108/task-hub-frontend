<template>
    <v-dialog v-model="showModal" width="auto">
        <v-card min-width="500" :title="TitleModal">
            <template v-slot:append>
                <v-btn icon="mdi-close" variant="text" @click="showModal = false"></v-btn>
            </template>
            <template v-slot:text>
                <v-form>
                    <v-row class="mx-2 my-2">
                        <v-col cols="12">
                            <v-text-field label="Nome da Categoria" required clearable v-model="category.name_category"
                                :disabled="props.isLoading"></v-text-field>
                            <v-btn class="mt-2 text-none" :loading="props.isLoading" color="primary" text="Salvar Categoria" block
                                size="large" @click="emit('saveCategory', category)" />
                        </v-col>
                    </v-row>
                </v-form>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Category } from '../types/Category';

const emit = defineEmits(['close', 'saveCategory']);
const showModal = defineModel('showModal', { type: Boolean, required: true })
const category = defineModel<Category>('category', {type: Object, required: true})
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: () => false
    },
});

const TitleModal = computed(() => {    
    return category.value.uuid ? 'Editar categoria' : 'Criar categoria'
})
</script>

<style scoped></style>