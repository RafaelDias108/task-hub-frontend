<template>
    <v-card class="bg-cardCustom" title="Projeto 1">
        <template v-slot:prepend>
            <v-avatar color="primary">
                <v-icon icon="mdi-notebook-outline" size="large"></v-icon>
            </v-avatar>
        </template>

        <template v-slot:text>
            content
        </template>

        <template v-slot:append>
            menu
        </template>
    </v-card>
</template>

<script setup lang="ts">
</script>

<style scoped></style>