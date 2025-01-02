<template>
  <div class="form-border">
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="submitForm" :disabled="isFormSubmitted">
        <v-text-field v-model="kid.firstName" :rules="kidsFirstNameRules" label="Имя"></v-text-field>
        <v-text-field v-model="kid.lastName" :rules="kidsLastNameRules" label="Фамилия"></v-text-field>
        <v-text-field v-model="kid.age" :rules="kidsAgeRules" label="Возраст"></v-text-field>
        <v-btn class="mt-2" type="submit" block :disabled="isDisabled">Добавить</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Kid } from '../interfaces/kid.interface';
import axios from 'axios';
import { BASE_URL } from '../variables';

const kid = ref<Kid>({
  id: 0,
  firstName: '',
  lastName: '',
  age: '',
});

const isDisabled = ref(true);
const isFormSubmitted = ref(false);
const rulesText = ref('');

const kidsFirstNameRules = [requiredFieldRule('Необходимо внести имя')];
const kidsLastNameRules = [requiredFieldRule('Необходимо внести фамилию')];

const props = defineProps<{ index?: number }>();
const emit = defineEmits(['formSubmitted']);

function requiredFieldRule(errorMessage: string) {
  return (value: string) => {
    if (value) {
      rulesText.value = '';
      return true;
    }
    rulesText.value = errorMessage;
    return errorMessage;
  };
}

const kidsAgeRules = [
  (value: string) => {
    const numericValue = Number(value);

    if (isNaN(numericValue) || !Number.isInteger(numericValue)) {
      return (rulesText.value = 'Необходимо ввести число');
    } else if (numericValue > 13) {
      return (rulesText.value = 'Это уже не ребенок :)');
    }
    rulesText.value = '';
    return true;
  },
];

watch(
  () => kid.value,
  () => {
    isDisabled.value = kid.value.firstName.trim().length === 0 || kid.value.lastName.trim().length === 0 || kid.value.age === 0;
  },
  { deep: true }
);

async function submitForm() {
  try {
    const newKid = {
      firstName: kid.value.firstName.trim(),
      lastName: kid.value.lastName.trim(),
      age: kid.value.age,
    };

    await axios.post(`${BASE_URL}/kids`, newKid);

    alert(`${kid.value.firstName} ${kid.value.lastName} успешно добавлен`);
    isFormSubmitted.value = true;
    isDisabled.value = true;
    emit('formSubmitted', props.index);
  } catch (error) {
    if (props.index !== undefined) {
      console.error(`Ошибка при отправке данных для №${props.index + 1}:`, error);
    }
    alert('Ошибка при отправке данных!');
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
