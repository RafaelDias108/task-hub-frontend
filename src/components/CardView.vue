<template>
    <v-card>
        <template v-slot:prepend>
            <div class="mr-14">
                <h1 class="font-weight-black">{{ props.title }}</h1>
                <v-skeleton-loader type="list-item" v-if="props.isLoading"></v-skeleton-loader>
                <p class="text-subtitle-1 text-grey-darken-1" v-else>{{ props.qtd + ' ' + props.title }}</p>
            </div>
        </template>
        <template v-slot:append>
            <v-btn class="text-none" color="primary" @click="emit('btnAction')">{{ props.btnLabel }}</v-btn>
        </template>
        <v-card-text>
            <slot name="content" />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">

const emit = defineEmits(['btnAction'])

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: () => false
    },
    title: {
        type: String,
        required: true
    },
    qtd: {
        type: Number,
        default: () => 0
    },
    btnLabel: {
        type: String,
        required: true
    }
})

</script>

<style scoped></style>