<template>
  <div class="guests-container">
    <Spinner :isVisible="isLoading" />
    <div class="guest-quantity">
      <p>Общее кол-во гостей: {{ countAllGuests() }}</p>
    </div>
    <v-table class="styled-table" v-if="guests.length !== 0 || kids.length !== 0">
      <thead>
        <tr>
          <th class="text-left">Взрослые:</th>
          <th class="text-left">Дети:</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="guest in guests" :key="'guest-' + guest.id">
          <td class="guest-cell">
            <span> {{ guest.firstName }} {{ guest.lastName }} </span>
            <v-icon class="delete-icon" icon="mdi-delete" start @click="deleteGuest(guest)"></v-icon>
          </td>
          <td></td>
        </tr>
        <tr v-for="kid in kids" :key="'kid-' + kid.id">
          <td></td>
          <td class="kid-cell">
            <span> {{ kid.firstName }} {{ kid.lastName }} </span>
            <v-icon class="delete-icon" icon="mdi-delete" start @click="deleteKid(kid)"></v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div v-else class="empty-container">
      <h2>Гостей пока нет</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Guest } from '../interfaces/guest.interface';
import { Kid } from '../interfaces/kid.interface';
import Spinner from '../components/Spinner.vue';
import { fetchAllGuests, removeGuest } from '../services/guestService';
import { fetchAllKids, removeKid } from '../services/kidService';

const guests = ref<Guest[]>([]);
const kids = ref<Kid[]>([]);
const allGuests = ref(0);

const isLoading = ref(false);

function countAllGuests(): number {
  return (allGuests.value = guests.value.length + kids.value.length);
}

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

async function deleteGuest(guest: Guest): Promise<void> {
  try {
    if (!guest || typeof guest.id !== 'number') {
      console.error('Некорректный объект гостя:', guest);
      return;
    }
    await removeGuest(guest);
    guests.value = guests.value.filter((g) => g.id !== guest.id);
  } catch (error) {
    console.error('Не удалось удалить гостя:', error);
  }
}

async function deleteKid(kid: Kid): Promise<void> {
  try {
    if (!kid || typeof kid.id !== 'number') {
      console.error('Некорректный объект ребенка:', kid);
      return;
    }
    await removeKid(kid);
  } catch (error) {
    console.error('Не удалось удалить ребенка:', error);
  }
}

onMounted(() => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    getAllGuests();
  }, 1000);
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

  .styled-table {
    width: 80%;
    border-collapse: collapse;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    margin-top: 50px;

    thead {
      th {
        padding: 12px 16px;
        font-weight: 700;
        text-align: left;
        font-size: 19px;
        border-bottom: none;
      }
    }

    tbody {
      tr {
        td {
          padding: 12px 16px;
          border-bottom: none !important;
        }

        .guest-cell {
          font-weight: 500;
          display: flex;
        }
      }

      .delete-icon {
        cursor: pointer;
      }
    }
  }

  .empty-container {
    margin-top: 100px;
  }
}
</style>
