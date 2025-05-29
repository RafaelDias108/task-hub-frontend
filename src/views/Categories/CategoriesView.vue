<template>
    <v-container fluid>
        <CardView title="Categorias" btn-label="Nova Categoria">
            <template #content>
                <v-row class="d-flex flex-column justify-center align-center py-10">
                    <v-col class="text-center" cols="6">
                        <v-icon icon="mdi-chart-box-plus-outline mb-2" size="72" color="grey-lighten-1"></v-icon>
                        <p class="font-weight-bold text-h6">Ainda não há categorias...</p>
                        <p class="text-bolder">Por favor, clique no botão acima para adicionar uma nova categoria.</p>
                    </v-col>
                </v-row>
            </template>
        </CardView>
    </v-container>
</template>

<script setup lang="ts">
import CardView from '../../components/CardView.vue';

</script>

<style scoped></style>