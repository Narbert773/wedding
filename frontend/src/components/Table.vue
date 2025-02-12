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
              <div v-if="isEditingGuest && editingGuest?.id === guest.id" class="edit-group">
                <v-text-field v-model="editingGuestFullName" variant="underlined" label="" class="input"></v-text-field>
                <v-icon class="save-icon" icon="mdi-check-bold" start @click="saveGuestChanges"></v-icon>
              </div>
              <div v-else class="edit-group">
                <span class="span"> {{ guest.firstName }} {{ guest.lastName }} </span>
                <div class="icon-container">
                  <v-icon class="edit-icon" icon="mdi-pencil" start @click="editGuest(guest)"></v-icon>
                  <v-icon class="delete-icon" icon="mdi-delete" start @click="deleteGuest(guest)"></v-icon>
                </div>
              </div>
            </div>
          </transition-group>
        </td>
        <td class="kid-column">
          <transition-group name="fade" tag="div">
            <div v-for="kid in kids" :key="'kid-' + kid.id" class="kid-cell cell">
              <div v-if="isEditingKid && editingKid?.id === kid.id" class="edit-group">
                <v-text-field v-model="editingKidFullName" variant="underlined" label="" class="input"></v-text-field>
                <v-icon class="save-icon" icon="mdi-check-bold" start @click="saveKidChanges"></v-icon>
              </div>
              <div v-else class="edit-group">
                <span class="span"> {{ kid.firstName }} {{ kid.lastName }} </span>
                <div class="icon-container">
                  <v-icon class="edit-icon" icon="mdi-pencil" start @click="editKid(kid)"></v-icon>
                  <v-icon class="delete-icon" icon="mdi-delete" start @click="deleteKid(kid)"></v-icon>
                </div>
              </div>
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

const isEditingGuest = ref(false);
const isEditingKid = ref(false);

const editingGuest = ref<Guest | null>(null);
const editingGuestFullName = ref('');
const editingKid = ref<Kid | null>(null);
const editingKidFullName = ref('');

function editGuest(guest: Guest): void {
  isEditingGuest.value = true;
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

    const hasGuestChanged = updatedData.firstName !== editingGuest.value.firstName || updatedData.lastName !== editingGuest.value.lastName;

    if (!hasGuestChanged) {
      snackbarMessage.value = 'Гость остался без изменений';
      snackbarColor.value = 'blue';
      isEditingGuest.value = false;
      return;
    }

    await changeGuest(updatedData);

    emit('update-guests', JSON.parse(JSON.stringify(updatedData)));

    snackbarMessage.value = 'Гость успешно отредактирован';
    snackbarColor.value = 'green';
    isEditingGuest.value = false;
    editingGuest.value = null;
    editingGuestFullName.value = '';
  } catch (error) {
    console.error('Не удалось сохранить изменения гостя:', error);
    snackbarMessage.value = 'Ошибка при редактировании гостя';
    snackbarColor.value = 'red';
    isEditingGuest.value = false;
  }
}

function editKid(kid: Kid): void {
  isEditingKid.value = true;
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

    const hasKidChanged = updatedData.firstName !== editingKid.value.firstName || updatedData.lastName !== editingKid.value.lastName;

    if (!hasKidChanged) {
      snackbarMessage.value = 'Ребенок остался без изменений';
      snackbarColor.value = 'blue';
      isEditingKid.value = false;
      return;
    }

    await changeKid(updatedData);

    emit('update-kids', updatedData);

    snackbarMessage.value = 'Ребенок успешно отредактирован';
    snackbarColor.value = 'green';
    isEditingKid.value = false;
    editingKid.value = null;
    editingKidFullName.value = '';
  } catch (error) {
    console.error('Не удалось сохранить изменения ребенка:', error);
    snackbarMessage.value = 'Ошибка при редактировании ребенка';
    snackbarColor.value = 'red';
    isEditingKid.value = false;
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
  width: 900px;
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
      width: 50%;
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
      align-items: center;
      min-height: 45px;
      max-height: 45px;
      width: 100%;

      .span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .icon-container {
        display: flex;
        gap: 15px;
        margin-right: 25%;
        margin-left: auto;

        .edit-icon {
          cursor: pointer;
          margin-right: 0;
        }

        .delete-icon {
          cursor: pointer;
          margin-right: 0;
        }
      }
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

.custom-font-size .v-input__control {
  font-size: 10px !important;
}

@media (max-width: 1000px) {
  .styled-table {
    width: 900px;
  }
}

@media (max-width: 950px) {
  .styled-table {
    width: 850px;
  }
}

@media (max-width: 880px) {
  .styled-table {
    width: 800px;
  }
}

@media (max-width: 830px) {
  .styled-table {
    width: 750px;
  }
}

@media (max-width: 780px) {
  .styled-table {
    width: 730px;
  }
}

@media (max-width: 750px) {
  .styled-table {
    width: 700px;
  }

  .edit-group {
    .span {
      font-size: 12px;
    }

    .edit-icon,
    .delete-icon,
    .save-icon {
      font-size: 17px;
    }
  }
}

@media (max-width: 720px) {
  .styled-table {
    width: 660px;
  }
}

@media (max-width: 700px) {
  .styled-table {
    width: 630px;
  }
}

@media (max-width: 670px) {
  .styled-table {
    width: 600px;
  }
}

@media (max-width: 640px) {
  .styled-table {
    width: 550px;
  }
}

@media (max-width: 600px) {
  .styled-table {
    max-width: 500px;
  }
}

@media (max-width: 520px) {
  .styled-table {
    max-width: 470px;
  }
  .edit-group {
    .icon-container {
      gap: 5px !important;
    }
  }
}

@media (max-width: 485px) {
  .styled-table {
    max-width: 420px;
  }
  .edit-group {
    .span {
      font-size: 10px;
    }

    .edit-icon,
    .delete-icon,
    .save-icon {
      font-size: 14px;
    }
  }
}

@media (max-width: 430px) {
  .styled-table {
    max-width: 385px;
  }
}

@media (max-width: 400px) {
  .styled-table {
    max-width: 365px;
  }
}

@media (max-width: 380px) {
  .styled-table {
    max-width: 350px;
  }
}

@media (max-width: 360px) {
  .styled-table {
    max-width: 320px;
  }
}
</style>
