<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
}
</style>
