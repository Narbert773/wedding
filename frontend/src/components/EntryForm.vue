<template>
  <div class="form-border">
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="submitForm" :disabled="isFormSubmitted">
        <v-text-field v-model="guest.name" :rules="firstNameRules" label="Имя"></v-text-field>
        <v-text-field v-model="guest.lastName" :rules="lastNameRules" label="Фамилия"></v-text-field>
        <v-btn class="mt-2" type="submit" block :disabled="isDisabled">Добавить</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Guest } from '../interfaces/guest.interface.ts';

const guest = ref<Guest>({
  id: 0,
  name: '',
  lastName: '',
});

const isDisabled = ref(true);
const isFormSubmitted = ref(false);

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
    isDisabled.value = guest.value.name.trim().length === 0 || guest.value.lastName.trim().length === 0;
  },
  { deep: true }
);

async function submitForm() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    alert(`Гость ${guest.value.name} ${guest.value.lastName} успешно добавлен`);
    isFormSubmitted.value = true;
    isDisabled.value = true;
    emit('formSubmitted', guest.value.id);
  } catch (error) {
    if (guest.value.id !== undefined) {
      console.error(`Ошибка при отправке данных для гостя №${guest.value.id + 1}:`, error);
    }
    alert('Ошибка при отправке данных!');
  }
}
</script>

<style scoped lang="scss">
.mx-auto {
  margin-top: 100px;
  border-radius: 10px;
}

.form-border {
  border: 5px solid white;
  padding: 10px;
}
</style>
