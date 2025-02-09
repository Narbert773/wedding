<template>
  <div class="guests-container">
    <SnackBar :message="snackbarMessage" :color="snackbarColor" />
    <div class="guest-quantity">
      <p>{{ textStoreGuest.common }} {{ totalGuests }}</p>
    </div>
    <Table :guests="guests" :kids="kids" :totalGuests="totalGuests" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Guest } from '../interfaces/guest.interface';
import { Kid } from '../interfaces/kid.interface';
import { useTextStore } from '../store/textStore';
import SnackBar from '../components/SnackBar.vue';
import Table from '../components/Table.vue';
import { fetchAllGuests } from '../services/guestService';
import { fetchAllKids } from '../services/kidService';

const textStore = useTextStore();
const textStoreGuest = textStore.textData.guest;

const guests = ref<Guest[]>([]);
const kids = ref<Kid[]>([]);

const snackbarMessage = ref('');
const snackbarColor = ref('');

const totalGuests = computed(() => guests.value.length + kids.value.length);

async function getAllGuests(): Promise<void> {
  try {
    const guestResponse = await fetchAllGuests();
    const kidResponse = await fetchAllKids();
    guests.value = guestResponse;
    kids.value = kidResponse;
  } catch (error) {
    console.error('Не удалось получить список гостей:', error);
  }
}

onMounted(() => {
  getAllGuests();
});
</script>

<style scoped lang="scss">
.guests-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 1000px;
  flex-direction: column;

  .guest-quantity {
    margin-top: 50px;

    p {
      font-size: large;
    }
  }
}
</style>
