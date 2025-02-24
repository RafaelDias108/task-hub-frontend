<template>
    <v-container :fluid="true">
        <div>
            <h2 class="text-h4">Olá, <strong>{{ GetUserFullName }}</strong></h2>
            <p class="font-weight-light text-grey-darken-1">{{ dataFormatada }}</p>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore()
const dataAtual = ref(new Date());
const diasDaSemana = ref(["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]);
const meses = ref(["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]);

const GetUserFullName = computed(() => {
    return authStore.user ? `${authStore.user.firstname_user} ${authStore.user.lastname_user}` : 'Visitante';
})

const dataFormatada = computed(() => {
    const diaSemana = diasDaSemana.value[dataAtual.value.getDay()];
    const dia = dataAtual.value.getDate();
    const mes = meses.value[dataAtual.value.getMonth()];
    const ano = dataAtual.value.getFullYear();
    return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
});

</script>

<style lang="scss" scoped></style>