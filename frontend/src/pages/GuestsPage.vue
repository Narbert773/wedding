<template>
  <div class="guests-container">
    <v-card v-for="guest in guests" :key="guest.id" class="guest-list mx-auto" max-width="300">
      <v-list> {{ guest.firstName }} {{ guest.lastName }}</v-list>
    </v-card>
    <v-list v-for="kid in kids" :key="kid.id" class="kid-list"> {{ kid.firstName }} {{ kid.lastName }}</v-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Guest } from '../interfaces/guest.interface';
import axios from 'axios';
import { BASE_URL } from '../variables';
import { Kid } from '../interfaces/kid.interface';

const guests = ref<Guest[]>([]);
const kids = ref<Kid[]>([]);

async function getAllGuests(): Promise<void> {
  try {
    const guestResponse = await axios.get(`${BASE_URL}/guests`);
    const kidResponse = await axios.get(`${BASE_URL}/kids`);
    guests.value = guestResponse.data;
    kids.value = kidResponse.data;
  } catch (err) {
    console.error('Не удалось получить список гостей:', err);
  }
}

onMounted(() => {
  getAllGuests();
});
</script>

<style scoped lang="scss">
.guests-container {
  display: flex;

  .guest-list {
  }

  .kid-list {
  }
}
</style>
