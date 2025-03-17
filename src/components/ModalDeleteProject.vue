<template>
    <v-dialog v-model="showDialog" width="auto" persistent>
        <v-card>
            <template #text>
                <v-empty-state>
                    <template v-slot:media>
                        <v-icon icon="mdi-alert-circle-outline" color="orange-lighten-1"></v-icon>
                    </template>

                    <template v-slot:headline>
                        <div class="text-h4">
                            Deseja excluir o projeto ?
                        </div>
                    </template>

                    <template v-slot:title>
                        <div class="text-h6">
                            Você não será capaz de reverter isso
                        </div>
                    </template>

                    <template v-slot:text>
                        <div class="text-medium-emphasis text-caption">
                            Obs.: Ao excluir o projeto, as tarefas vinculadas também serão excluídas.
                        </div>
                        <div class="mt-8 d-flex flex-wrap justify-center ga-3">
                            <v-btn @click="showDialog = false" text="Cancelar" variant="tonal"/>
                            <v-btn @click="emit('delete')" text="Deletar" color="red-darken-2" variant="flat" :loading="isLoading"/>
                        </div>
                    </template>
                </v-empty-state>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const showDialog = defineModel('showDialog', {type: Boolean, required: true})
const isLoading = defineModel('isLoading', {type: Boolean})
const emit = defineEmits(['delete'])
</script>

<style scoped></style>