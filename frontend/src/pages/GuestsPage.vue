<template>
  <div class="guests-container">
    <SnackBar :message="snackbarMessage" :color="snackbarColor" />
    <div class="guest-quantity">
      <p>{{ textStoreGuest.common }} {{ totalGuests }}</p>
    </div>
    <Table :guests="guests" :kids="kids" :totalGuests="totalGuests" @update-guests="updateGuest" @update-kids="updateKid" @remove-kids="deleteKid" @remove-guests="deleteGuest" />
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

function updateGuest(updatedGuest: Guest) {
  const index = guests.value.findIndex((g) => g.id === updatedGuest.id);
  if (index !== -1) {
    guests.value[index] = updatedGuest;
  } else {
    console.warn('Гость с таким ID не найден:', updatedGuest.id);
  }
}

function updateKid(updatedKid: Kid) {
  const index = kids.value.findIndex((k) => k.id === updatedKid.id);
  if (index !== -1) {
    kids.value[index] = updatedKid;
  } else {
    console.warn('Ребенок с таким ID не найден:', updatedKid.id);
  }
}

function deleteGuest(guestId: number) {
  guests.value = guests.value.filter((g) => g.id !== guestId);
}

function deleteKid(kidId: number) {
  kids.value = kids.value.filter((k) => k.id !== kidId);
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
  min-width: 100%;
  flex-direction: column;
  overflow: hidden;

  .guest-quantity {
    margin-top: 50px;

    p {
      font-size: large;
    }
  }
}
</style>
