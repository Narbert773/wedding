<template>
  <div class="form-border">
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="submitForm" :disabled="isFormSubmitted">
        <v-text-field v-model="guest.firstName" :rules="firstNameRules" label="Имя"></v-text-field>
        <v-text-field v-model="guest.lastName" :rules="lastNameRules" label="Фамилия"></v-text-field>
        <v-btn class="mt-2" type="submit" block :disabled="isDisabled">{{ textStoreButton.submit }}</v-btn>
      </v-form>
    </v-sheet>
    <SnackBar :message="snackbarMessage" :color="snackbarColor" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Guest } from '../interfaces/guest.interface';
import SnackBar from './SnackBar.vue';
import { addGuest } from '../services/guestService';
import { useTextStore } from '../store/textStore';

const textStore = useTextStore();
const textStoreButton = textStore.textData.button;

const guest = ref<Guest>({
  id: 0,
  firstName: '',
  lastName: '',
});

const isDisabled = ref(true);
const isFormSubmitted = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');

const props = defineProps<{ index?: number }>();
const emit = defineEmits(['formSubmitted']);

const firstNameRules = [
  (value: string) => {
    if (value) return true;
    return 'Необходимо внести имя';
  },
];

const lastNameRules = [
  (value: string) => {
    if (value) return true;
    return 'Необходимо внести фамилию';
  },
];

watch(
  () => guest.value,
  () => {
    isDisabled.value = guest.value.firstName.trim().length === 0 || guest.value.lastName.trim().length === 0;
  },
  { deep: true }
);

async function submitForm(): Promise<void> {
  try {
    const newGuest = {
      firstName: guest.value.firstName.trim(),
      lastName: guest.value.lastName.trim(),
    };

    await addGuest(newGuest);

    snackbarMessage.value = `Гость ${guest.value.firstName} ${guest.value.lastName} успешно добавлен`;
    snackbarColor.value = 'success';
    isFormSubmitted.value = true;
    isDisabled.value = true;
    emit('formSubmitted', props.index);
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    snackbarMessage.value = 'Ошибка при отправке данных!';
    snackbarColor.value = 'red';
  }
}
</script>

<style scoped lang="scss">
.mx-auto {
  border-radius: 5px;
}

.form-border {
  border: 5px solid white;
  padding: 10px;
}
</style>
