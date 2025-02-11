<template>
  <div class="form-border">
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent="submitForm" :disabled="isFormSubmitted">
        <v-text-field v-model="kid.firstName" :rules="kidsFirstNameRules" label="Имя"></v-text-field>
        <v-text-field v-model="kid.lastName" :rules="kidsLastNameRules" label="Фамилия"></v-text-field>
        <v-text-field v-model="kid.age" :rules="kidsAgeRules" label="Возраст"></v-text-field>
        <v-btn class="mt-2" type="submit" block :disabled="isDisabled">{{ textStoreButton.submit }}</v-btn>
      </v-form>
    </v-sheet>
    <SnackBar :message="snackbarMessage" :color="snackbarColor" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Kid } from '../interfaces/kid.interface';
import SnackBar from './SnackBar.vue';
import { addKid } from '../services/kidService';
import { useTextStore } from '../store/textStore';

const textStore = useTextStore();
const textStoreButton = textStore.textData.button;

const kid = ref<Kid>({
  id: 0,
  firstName: '',
  lastName: '',
  age: '',
});

const isDisabled = ref(true);
const isFormSubmitted = ref(false);
const rulesText = ref('');
const isAgeValid = ref(true);

const snackbarMessage = ref('');
const snackbarColor = ref('');

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
    if (!value.trim()) {
      isAgeValid.value = false;
      return (rulesText.value = 'Необходимо ввести возраст');
    }

    const numericValue = Number(value);

    if (isNaN(numericValue) || !Number.isInteger(numericValue)) {
      isAgeValid.value = false;
      return (rulesText.value = 'Необходимо ввести число');
    } else if (numericValue > 13) {
      isAgeValid.value = false;
      return (rulesText.value = 'Это уже не ребенок :)');
    }

    isAgeValid.value = true;
    rulesText.value = '';
    return true;
  },
];

watch(
  () => kid.value,
  () => {
    const isFirstNameValid = kid.value.firstName.trim().length > 0;
    const isLastNameValid = kid.value.lastName.trim().length > 0;

    const ageValidationResult = kidsAgeRules.every((rule) => rule(String(kid.value.age)) === true);

    isAgeValid.value = ageValidationResult;

    isDisabled.value = !(isFirstNameValid && isLastNameValid && ageValidationResult);
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

    await addKid(newKid);

    snackbarMessage.value = `${kid.value.firstName} ${kid.value.lastName} успешно добавлен`;
    snackbarColor.value = 'success';
    isFormSubmitted.value = true;
    isDisabled.value = true;
    emit('formSubmitted', props.index);
  } catch (error) {
    if (props.index !== undefined) {
      console.error(`Ошибка при отправке данных для №${props.index + 1}:`, error);
    }
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

@media (max-width: 400px) {
  .mx-auto {
    width: 200px !important;
  }
}
</style>
