<template>
  <v-sheet class="mx-auto" width="300">
    <v-form @submit.prevent="submitForm" :disabled="isFormSubmitted">
      <v-text-field v-model="firstName" :rules="firstNameRules" label="Имя"></v-text-field>
      <v-text-field v-model="lastName" :rules="lastNameRules" label="Фамилия"></v-text-field>
      <v-btn class="mt-2" type="submit" block :disabled="isDisabled">Добавить</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const firstName = ref('');
const lastName = ref('');
const isDisabled = ref(true);
const isFormSubmitted = ref(false);

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

watch([firstName, lastName], () => {
  isDisabled.value = firstName.value.trim().length === 0 || lastName.value.trim().length === 0;
});

async function submitForm() {
  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
  };
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    alert(`Гость ${firstName.value} ${lastName.value} успешно добавлен`);
    isFormSubmitted.value = true;
    isDisabled.value = true;
    emit('formSubmitted', props.index);
  } catch (error) {
    if (props.index !== undefined) {
      console.error(`Ошибка при отправке данных для гостя №${props.index + 1}:`, error);
    }
    alert('Ошибка при отправке данных!');
  }
}
</script>

<style scoped lang="scss">
.mx-auto {
  margin-top: 100px;
}
</style>
