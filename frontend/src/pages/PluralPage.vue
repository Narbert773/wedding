<template>
  <div class="forms-container">
    <Spinner :isVisible="isLoading" />
    <div class="forms-container__group">
      <h3>Кол-во человек:</h3>
      <v-text-field class="input" label="" variant="underlined" v-model="guestQuantity" :rules="rules"></v-text-field>
    </div>
    <v-btn variant="outlined" class="confirm-btn" :disabled="isDisabled" @click="generateGuestForms">Подтвердить</v-btn>
    <div class="guest-form__wrapper">
      <transition-group name="fade" tag="div" class="guest-form__transition-wrapper">
        <div v-for="index in guests" :key="index" class="guest-form">
          <p class="guest-number">Гость № {{ index + 1 }}</p>
          <EntryForm class="entry-form" :index="index" @formSubmitted="handleFormSubmitted" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import EntryForm from '../components/EntryForm.vue';
import Spinner from '../components/Spinner.vue';

import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const guestQuantity = ref('');
const rulesText = ref('');
const isDisabled = ref(true);
const isLoading = ref(false);

const router = useRouter();

const guests = ref<number[]>([]);
const formSubmittedStates = ref<boolean[]>([]);

const rules = [
  (value: string) => {
    const numericValue = Number(value);

    if (isNaN(numericValue) || !Number.isInteger(numericValue)) {
      return (rulesText.value = 'Необходимо ввести число');
    } else if (numericValue > 4) {
      return (rulesText.value = 'Максимум 4');
    } else if (numericValue < 2) {
      return (rulesText.value = 'Не менее 2 человека');
    }
    rulesText.value = '';
    return true;
  },
];

watch([guestQuantity, rulesText], () => {
  isDisabled.value = guestQuantity.value.trim().length === 0 || rulesText.value.length !== 0;
});

function generateGuestForms() {
  const count = Number(guestQuantity.value);

  guests.value = Array.from({ length: count }, (_, i) => i);
  formSubmittedStates.value = Array(count).fill(false);
}

function handleFormSubmitted(index: number) {
  formSubmittedStates.value[index] = true;

  const allSubmitted = formSubmittedStates.value.every((state) => state);
  if (allSubmitted) {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = true;
      router.push('/main');
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
.forms-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  gap: 10px;

  &__group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    .input {
      width: 200px;
    }
  }

  .confirm-btn {
    margin-top: 20px;
  }

  .guest-form__wrapper {
    display: flex;
    gap: 40px;
    margin-top: 50px;

    .guest-form {
      display: flex;
      flex-direction: column;
      height: fit-content;

      .guest-number {
        margin: auto;
      }

      .entry-form {
        margin-top: 25px;
      }
    }
  }

  .guest-form__transition-wrapper {
    display: flex;
    gap: 40px;
    margin-top: 50px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease, transform 1s ease;
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateY(-20px);
  }

  .fade-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
