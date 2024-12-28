<template>
  <div class="form-border">
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="submitForm" :disabled="isFormSubmitted">
        <v-text-field v-model="kidsName" :rules="kidsFirstNameRules" label="Имя"></v-text-field>
        <v-text-field v-model="kidsLastName" :rules="kidsLastNameRules" label="Фамилия"></v-text-field>
        <v-text-field v-model="kidsAge" :rules="kidsAgeRules" label="Возраст"></v-text-field>
        <v-btn class="mt-2" type="submit" block :disabled="isDisabled">Добавить</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const kidsName = ref('');
const kidsLastName = ref('');
const kidsAge = ref('');
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

watch([kidsName, kidsLastName, kidsAge, rulesText], () => {
  isDisabled.value = kidsName.value.trim().length === 0 || kidsLastName.value.trim().length === 0 || kidsAge.value.length === 0 || rulesText.value.length !== 0;
});

async function submitForm() {
  const formData = {
    kidsFirstName: kidsName.value,
    kidsLastName: kidsLastName.value,
  };
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    alert(`${kidsName.value} ${kidsLastName.value} успешно добавлен`);
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
