<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useThemeStore } from './stores/theme';

const themeStore = useThemeStore();

// Função para reagir à mudança do tema do sistema
const handleSystemThemeChange = (MediaQueryListEvent: any) => {
  if (themeStore.followSystemTheme) {
    themeStore.syncWithSystemTheme();
  }
};

// Sincronizar tema no carregamento
onMounted(() => {
  themeStore.syncWithSystemTheme();

  // Escutar mudanças no tema do sistema
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', handleSystemThemeChange);

  // Remover o listener ao desmontar o componente
  return () => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange);
  };
});
</script>

<style scoped></style>