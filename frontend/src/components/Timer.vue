<template>
  <p class="remaining-date">{{ textStoreTimer.left }} {{ days }} {{ textStoreTimer.days }} | {{ hours }} {{ writingHoursProperly(hours) }} | {{ minutes }} {{ textStoreTimer.minutes }} | {{ seconds }} {{ textStoreTimer.seconds }}</p>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useTextStore } from '../store/textStore';

const textStore = useTextStore();
const textStoreTimer = textStore.textData.timer;

const targetDate = new Date('2025-06-14T00:00:00');
let intervalId: any;

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const hoursWriting = ref('');

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

const writingHoursProperly = (num: number) => {
  hours.value = num;
  if (num === 1) {
    return (hoursWriting.value = 'час');
  }
  if (num < 5 && num !== 0) {
    return (hoursWriting.value = 'часа');
  }
  return (hoursWriting.value = 'часов');
};

onMounted(() => {
  calculateTimeRemaining();
  intervalId = setInterval(calculateTimeRemaining, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
.remaining-date {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}

@media (max-width: 900px) {
  .remaining-date {
    font-size: 15px;
    margin-top: 40px;
  }
}

@media (max-width: 395px) {
  .remaining-date {
    font-size: 13px;
    margin-top: 30px;
  }
}
</style>
