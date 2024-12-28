<template>
  <div :class="['app', theme]">
    <Toolbar class="toolbar" />
    <h1 class="h1">Приглашение на свадьбу 14 июня 2025 | суббота</h1>
    <h2 class="h2">Никита & Даша</h2>
    <Timer />
    <div class="theme-container">
      <v-icon v-if="theme === 'light'" class="theme-icon" icon="mdi-brightness-4" start @click="toggleTheme"></v-icon>
      <v-icon v-if="theme === 'dark'" class="theme-icon" icon="mdi-brightness-6" start @click="toggleTheme"></v-icon>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Timer from './components/Timer.vue';
import Toolbar from './components/Toolbar.vue';

import { onMounted, ref } from 'vue';

const theme = ref('light');

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme.value);
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  theme.value = savedTheme || 'light';
});
</script>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out;

  .h2 {
    margin-top: 10px;
    font-size: 40px;
  }

  .theme-container {
    position: absolute;
    top: 1.5%;
    right: 5%;
    transform: translate(-50%, -50%);

    .theme-icon {
      font-size: 30px;
    }
  }
}
</style>
