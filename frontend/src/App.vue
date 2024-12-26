<template>
  <div class="app">
    <Toolbar />
    <h1 class="h1">Приглашение на свадьбу 14 июня 2025 | суббота</h1>
    <h2 class="h2">Никита & Даша</h2>
    <Timer />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Timer from './components/Timer.vue';
import Toolbar from './components/Toolbar.vue';
</script>

<style scoped lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  .h2 {
    margin-top: 10px;
    font-size: 40px;
  }
}
</style>
