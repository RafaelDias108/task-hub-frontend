<template>
    <div>
        <h1>Categorias</h1>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Login } from '../../types/loginInterface';


const formLogin = ref<Login>({
    email: '',
    password: '',
})
</script>

<style scoped></style>