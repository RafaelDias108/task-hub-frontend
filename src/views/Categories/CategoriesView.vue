<template>
    <v-container fluid>
        <CardView title="Categorias" :subtitle="ComputedTotalCategory" :is-loading="categoriesStore.isLoading" btn-label="Nova Categoria" @btn-action="SetModalNewCategory()">
            <template #content>
                <v-row class="d-flex flex-column justify-center align-center py-10" v-if="categoriesStore.isLoading">
                    <v-col class="text-center" cols="12" lg="6">
                        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column justify-center align-center py-3 px-10" v-else-if="categoriesStore.categories.length > 0 && !categoriesStore.isLoading">
                    <v-col cols="12">
                        <ListCategories :categories="categoriesStore.categories"  @Edit="SetModalEditCategory"/>
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
        <ModalHandleCategory v-model:show-modal="showModalCategory" v-model:category="category"/>
        <!-- <ModalDeleteConfirm title="Deseja excluir a categoria ?" subtitle="Você não será capaz de reverter isso"/> -->
    </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import CardView from '../../components/CardView.vue';
import { useCategoriesStore } from '../../stores/categories';
import ListCategories from '../../components/ListCategories.vue';
import ModalHandleCategory from '../../components/ModalHandleCategory.vue';
import { Category } from '../../types/Category';
// import ModalDeleteConfirm from '../../components/ModalDeleteConfirm.vue';

const categoriesStore = useCategoriesStore()

const showModalCategory = ref(false)
const category = ref<Category>({
    name_category: null
})

const ComputedTotalCategory = computed(() => {
    if(categoriesStore.categories.length == 1){
        return `${categoriesStore.categories.length} Categoria`
    }else{
        return `${categoriesStore.categories.length} Categorias`
    }
})

function SetModalNewCategory() {

    category.value.uuid = null
    category.value.name_category = null
    category.value.created_at = null

    showModalCategory.value = true
}

function SetModalEditCategory(data: Category) {
    category.value.uuid = data.uuid
    category.value.name_category = data.name_category

    showModalCategory.value = true
}

onMounted( async () => {
    await categoriesStore.GetAllCategories()
})
</script>

<style scoped></style>