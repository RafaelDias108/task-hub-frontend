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
                            {{ props.title }}
                        </div>
                    </template>

                    <template v-if="props.subtitle.length > 0" v-slot:title>
                        <div class="text-h6">
                            {{ props.subtitle }}
                        </div>
                    </template>

                    <template v-slot:text>
                        <div class="mt-8 d-flex flex-wrap justify-center ga-3">
                            <v-btn @click="showDialog = false" :text="props.cancelButtonLabel" variant="tonal"/>
                            <v-btn @click="emit('delete')" :text="props.confirmButtonLabel" color="red-darken-2" variant="flat" :loading="isLoading"/>
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
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        default: () => ""
    },
    confirmButtonLabel: {
        type: String,
        default: () => 'Deletar'
    },
    cancelButtonLabel: {
        type: String,
        default: () => 'Cancelar'
    },
})
</script>

<style scoped></style>