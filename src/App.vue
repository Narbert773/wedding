<template>
  <header class="header">
    <h1>Приглашение на свадьбу 17 мая 2025 | суббота</h1>
    <h2>Никита & Даша</h2>
    <div>
      <p class="remaining-date">{{ days }} дней | {{ hours }} часов | {{ minutes }} минут | {{ seconds }} секунд</p>
    </div>
  </header>
  <main>
    <section class="memo-guests"></section>
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const targetDate = new Date('2025-05-17T00:00:00');

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const calculateTimeRemaining = () => {
  const now = new Date();
  const timeDifference = targetDate.getTime() - now.getTime();

  if (timeDifference > 0) {
    days.value = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    minutes.value = Math.floor((timeDifference / 1000 / 60) % 60);
    seconds.value = Math.floor((timeDifference / 1000) % 60);
  } else {
    days.value = hours.value = minutes.value = seconds.value = 0;
  }
};

let intervalId: any;

onMounted(() => {
  calculateTimeRemaining();
  intervalId = setInterval(calculateTimeRemaining, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.remaining-date {
  font-size: 20px;
  font-weight: bold;
}
</style>
