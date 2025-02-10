<template>
  <Spinner :isVisible="isLoading" />
  <SnackBar :message="snackbarMessage" :color="snackbarColor" />
  <v-table v-if="guests.length !== 0 || kids.length !== 0" class="styled-table">
    <thead>
      <tr>
        <th class="text-left">{{ textStoreGuest.adults }}</th>
        <th class="text-left">{{ textStoreGuest.kids }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="guest-column">
          <transition-group name="fade" tag="div">
            <div v-for="guest in guests" :key="'guest-' + guest.id" class="guest-cell cell">
              <div v-if="isEditing && editingGuest?.id === guest.id" class="edit-group">
                <v-text-field v-model="editingGuestFullName" variant="underlined" label="" class="input"></v-text-field>
                <v-icon class="save-icon" icon="mdi-check-bold" start @click="saveGuestChanges"></v-icon>
              </div>
              <div v-else class="edit-group">
                <span class="span"> {{ guest.firstName }} {{ guest.lastName }} </span>
                <v-icon class="edit-icon" icon="mdi-pencil" start @click="editGuest(guest)"></v-icon>
              </div>
              <v-icon class="delete-icon" icon="mdi-delete" start @click="deleteGuest(guest)"></v-icon>
            </div>
          </transition-group>
        </td>
        <td class="kid-column">
          <transition-group name="fade" tag="div">
            <div v-for="kid in kids" :key="'kid-' + kid.id" class="kid-cell cell">
              <div v-if="isEditing && editingKid?.id === kid.id">
                <v-text-field v-model="editingKidFullName" variant="underlined" label="" class="input"></v-text-field>
                <v-icon class="save-icon" icon="mdi-check-bold" start @click="saveKidChanges"></v-icon>
              </div>
              <div v-else class="edit-group">
                <span> {{ kid.firstName }} {{ kid.lastName }} </span>
                <v-icon class="edit-icon" icon="mdi-pencil" start @click="editKid(kid)"></v-icon>
              </div>
              <v-icon class="delete-icon" icon="mdi-delete" start @click="deleteKid(kid)"></v-icon>
            </div>
          </transition-group>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div v-else class="empty-container">
    <h2>{{ textStoreGuest.noGuests }}</h2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTextStore } from '../store/textStore';
import { Guest } from '../interfaces/guest.interface';
import { Kid } from '../interfaces/kid.interface';
import { changeGuest, removeGuest } from '../services/guestService';
import { changeKid, removeKid } from '../services/kidService';
import Spinner from './Spinner.vue';
import SnackBar from './SnackBar.vue';

defineProps({
  guests: {
    type: Array as () => Guest[],
    required: true,
  },
  kids: {
    type: Array as () => Kid[],
    required: true,
  },
  totalGuests: {
    type: Number,
    required: false,
  },
});

const emit = defineEmits(['remove-guests', 'update-guests', 'remove-kids', 'update-kids']);

const textStore = useTextStore();
const textStoreGuest = textStore.textData.guest;

const isLoading = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');

const isEditing = ref(false);
const editingGuest = ref<Guest | null>(null);
const editingGuestFullName = ref('');
const editingKid = ref<Kid | null>(null);
const editingKidFullName = ref('');

function editGuest(guest: Guest): void {
  isEditing.value = true;
  editingGuest.value = { ...guest };
  editingGuestFullName.value = `${guest.firstName} ${guest.lastName}`;
}

async function saveGuestChanges(): Promise<void> {
  if (!editingGuest.value) return;

  const [firstName, ...lastNameParts] = editingGuestFullName.value.split(' ');
  const lastName = lastNameParts.join(' ');

  try {
    const updatedData = {
      ...editingGuest.value,
      firstName: firstName || editingGuest.value.firstName,
      lastName: lastName || editingGuest.value.lastName,
    };

    await changeGuest(updatedData);

    emit('update-guests', JSON.parse(JSON.stringify(updatedData)));

    snackbarMessage.value = 'Гость успешно отредактирован';
    snackbarColor.value = 'green';
    isEditing.value = false;
    editingGuest.value = null;
    editingGuestFullName.value = '';
  } catch (error) {
    console.error('Не удалось сохранить изменения гостя:', error);
    snackbarMessage.value = 'Ошибка при редактировании гостя';
    snackbarColor.value = 'red';
    isEditing.value = false;
  }
}

function editKid(kid: Kid): void {
  isEditing.value = true;
  editingKid.value = { ...kid };
  editingKidFullName.value = `${kid.firstName} ${kid.lastName}`;
}

async function saveKidChanges(): Promise<void> {
  if (!editingKid.value) return;

  const [firstName, ...lastNameParts] = editingKidFullName.value.split(' ');
  const lastName = lastNameParts.join(' ');

  try {
    const updatedData = {
      ...editingKid.value,
      firstName: firstName || editingKid.value.firstName,
      lastName: lastName || editingKid.value.lastName,
    };

    await changeKid(updatedData);

    emit('update-kids', updatedData);

    snackbarMessage.value = 'Ребенок успешно отредактирован';
    snackbarColor.value = 'green';
    isEditing.value = false;
    editingKid.value = null;
    editingKidFullName.value = '';
  } catch (error) {
    console.error('Не удалось сохранить изменения ребенка:', error);
    snackbarMessage.value = 'Ошибка при редактировании ребенка';
    snackbarColor.value = 'red';
    isEditing.value = false;
  }
}

async function deleteGuest(guest: Guest): Promise<void> {
  try {
    if (!guest || typeof guest.id !== 'number') {
      console.error('Некорректный объект гостя:', guest);
      return;
    }
    await removeGuest(guest);
    emit('remove-guests', guest.id);
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
    emit('remove-kids', kid.id);
  } catch (error) {
    console.error('Не удалось удалить ребенка:', error);
  }
}
</script>

<style scoped lang="scss">
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
        vertical-align: top;
      }

      .cell {
        display: flex;
        justify-content: space-between;
        margin-top: 0;
        margin-bottom: 10px;
      }

      .guest-cell {
        font-weight: 500;
        display: flex;
      }
    }

    .edit-group {
      display: flex;
      gap: 40px;
      justify-content: space-between;
      align-items: center;

      .span {
        min-width: 200px;
      }

      .input {
        min-width: 200px;
      }
    }

    .edit-icon {
      cursor: pointer;
      margin-right: 15px;
      margin-left: auto;
    }

    .delete-icon {
      cursor: pointer;
      margin-right: 35%;
    }
  }
}

.empty-container {
  margin-top: 100px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
