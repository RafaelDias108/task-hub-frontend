import { defineStore } from "pinia";
import { ref } from "vue";
import { Category } from "../types/Category";
import { Backend } from "../services/api";

export const useCategoriesStore = defineStore('categories', () => {

    const categories = ref<Category[]>([])
    const isLoading = ref(false)
    const error = ref<String | Boolean>(false)
    const ultimaAtualizacao = ref<number | null>(null)

    async function GetAllCategories(forceReload = false) {
        
        const agora = Date.now()
        const timeout = 5 * 60 * 1000
        if(!forceReload && ultimaAtualizacao.value && (agora - ultimaAtualizacao.value < timeout)){
            return
        }

        isLoading.value = true
        error.value = false

        try {
            const response = await Backend.GetAllCategories()
            if(response.status == "success"){
                categories.value = response.data
                ultimaAtualizacao.value = agora
            }
        } catch (e: any) {
            error.value = `Não foi possível buscar as categorias: ${e.message}`
        }finally{
            isLoading.value = false
        }
    }

    return {
        categories,
        isLoading,
        error,
        ultimaAtualizacao,
        GetAllCategories
    }
})