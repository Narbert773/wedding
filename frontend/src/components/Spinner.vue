<template>
  <div v-if="isVisible" class="spinner">
    <v-progress-circular indeterminate color="primary" class="spinner-img"></v-progress-circular>
  </div>
</template>

<script setup lang="ts">
defineProps<{ isVisible: boolean }>();
</script>

<style scoped lang="scss">
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(53, 46, 46, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  .spinner-img {
    width: 70px;
    height: 50px;
  }
}
</style>
