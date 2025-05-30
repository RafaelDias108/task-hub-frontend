<template>
    <v-container fluid>
        <CardView title="Categorias" :subtitle="ComputedTotalCategory" :is-loading="categoriesStore.isLoading" btn-label="Nova Categoria">
            <template #content>
                <v-row class="d-flex flex-column justify-center align-center py-10" v-if="categoriesStore.isLoading">
                    <v-col class="text-center" cols="12" lg="6">
                        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column justify-center align-center py-3 px-10" v-else-if="categoriesStore.categories.length > 0 && !categoriesStore.isLoading">
                    <v-col cols="12">
                        <ListCategories :categories="categoriesStore.categories"  />
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column justify-center align-center py-10" v-else>
                    <v-col class="text-center" cols="6">
                        <v-icon icon="mdi-view-dashboard-outline mb-2" size="72" color="grey-lighten-1"></v-icon>
                        <p class="font-weight-bold text-h6">Ainda não há categorias...</p>
                        <p class="text-bolder">Por favor, clique no botão acima para adicionar uma nova categoria.</p>
                    </v-col>
                </v-row>
            </template>
        </CardView>
    </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import CardView from '../../components/CardView.vue';
import { useCategoriesStore } from '../../stores/categories';
import ListCategories from '../../components/ListCategories.vue';

const categoriesStore = useCategoriesStore()

const ComputedTotalCategory = computed(() => {
    if(categoriesStore.categories.length == 1){
        return `${categoriesStore.categories.length} Categoria`
    }else{
        return `${categoriesStore.categories.length} Categorias`
    }
})

onMounted( async () => {
    await categoriesStore.GetAllCategories()
})
</script>

<style scoped></style>