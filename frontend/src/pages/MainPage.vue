<template>
  <header class="header">
    <h1>Приглашение на свадьбу 14 июня 2025 | суббота</h1>
    <h2>Никита & Даша</h2>
    <div>
      <Timer />
    </div>
  </header>
  <main>
    <section class="memo-guests"></section>
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import Timer from '../components/Timer.vue';
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
