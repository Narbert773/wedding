<template>
  <Announcement />
  <div class="forms-container">
    <div class="kids">
      <div class="forms-container__group">
        <h3>{{ textStoreKid.kidsQuantity }}</h3>
        <v-text-field class="input" label="" variant="underlined" v-model="kidsQuantity" :rules="kidRules"></v-text-field>
        <v-btn variant="outlined" class="confirm-btn" :disabled="isDisabledKidsBtn" @click="generateKidsForms">{{ textStoreButton.confirm }}</v-btn>
      </div>
      <div class="guest-form__wrapper">
        <transition-group name="fade" tag="div" class="guest-form__transition-wrapper">
          <div v-for="index in kids" :key="'kid-' + index" class="guest-form">
            <p class="guest-number">{{ textStoreKid.kidsNumber }} {{ index + 1 }}</p>
            <KidsForm class="entry-form" :index="index" @formSubmitted="handleKidFormSubmitted" />
          </div>
        </transition-group>
      </div>
    </div>
    <div class="adults">
      <div class="forms-container__group">
        <h3>Кол-во взрослых:</h3>
        <v-text-field class="input" label="" variant="underlined" v-model="adultsQuantity" :rules="adultRules"></v-text-field>
        <v-btn variant="outlined" class="confirm-btn" :disabled="isDisabledAdultssBtn" @click="generateAdultsForms">{{ textStoreButton.confirm }}</v-btn>
      </div>
      <div class="guest-form__wrapper">
        <transition-group name="fade" tag="div" class="guest-form__transition-wrapper">
          <div v-for="index in adults" :key="'adult-' + index" class="guest-form">
            <p class="guest-number">{{ textStoreKid.guestNumber }} {{ index + 1 }}</p>
            <EntryForm class="entry-form" :index="index" @formSubmitted="handleAdultFormSubmitted" />
          </div>
        </transition-group>
      </div>
    </div>
    <Spinner :isVisible="isLoading" />
  </div>
</template>

<script setup lang="ts">
import EntryForm from '../components/EntryForm.vue';
import KidsForm from '../components/KidsForm.vue';
import Spinner from '../components/Spinner.vue';
import Announcement from '../components/Announcement.vue';

import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useTextStore } from '../store/textStore';

const textStore = useTextStore();
const textStoreKid = textStore.textData.kidsPage;
const textStoreButton = textStore.textData.button;

const adultsQuantity = ref('');
const kidsQuantity = ref('');
const kids = ref<number[]>([]);
const adults = ref<number[]>([]);
const kidsFormStates = ref<boolean[]>([]);
const adultsFormStates = ref<boolean[]>([]);

const kidsRulesText = ref('');
const adultsRulesText = ref('');
const isDisabledKidsBtn = ref(true);
const isDisabledAdultssBtn = ref(true);

const isLoading = ref(false);

const router = useRouter();

const adultRules = [
  (value: string) => {
    const numericValue = Number(value);

    if (isNaN(numericValue) || !Number.isInteger(numericValue)) {
      return (adultsRulesText.value = 'Необходимо ввести число');
    } else if (numericValue > 4) {
      return (adultsRulesText.value = 'Максимум 4');
    } else if (numericValue < 2) {
      return (adultsRulesText.value = 'Не менее 2 человека');
    }
    adultsRulesText.value = '';
    return true;
  },
];

const kidRules = [
  (value: string) => {
    const numericValue = Number(value);

    if (isNaN(numericValue) || !Number.isInteger(numericValue)) {
      return (kidsRulesText.value = 'Необходимо ввести число');
    } else if (numericValue > 2) {
      return (kidsRulesText.value = 'Максимум 2');
    } else if (numericValue < 1) {
      return (kidsRulesText.value = 'Не менее 1 ребенок');
    }
    kidsRulesText.value = '';
    return true;
  },
];

watch([adultsQuantity, kidsQuantity, adultsRulesText, kidsRulesText], () => {
  isDisabledKidsBtn.value = kidsQuantity.value.trim().length === 0 || kidsRulesText.value.length !== 0;
  isDisabledAdultssBtn.value = adultsQuantity.value.trim().length === 0 || adultsRulesText.value.length !== 0;
});

function generateKidsForms() {
  const count = Number(kidsQuantity.value);

  kids.value = Array.from({ length: count }, (_, i) => i);
  kidsFormStates.value = Array(count).fill(false);
}

function generateAdultsForms() {
  const count = Number(adultsQuantity.value);

  adults.value = Array.from({ length: count }, (_, i) => i);
  adultsFormStates.value = Array(count).fill(false);
}

function handleKidFormSubmitted(index: number) {
  kidsFormStates.value[index] = true;
  checkCompletion();
}

function handleAdultFormSubmitted(index: number) {
  adultsFormStates.value[index] = true;
  checkCompletion();
}

function checkCompletion() {
  const allKidsSubmitted = kidsFormStates.value.every((state) => state);
  const allAdultsSubmitted = adultsFormStates.value.every((state) => state);

  if (kids.value.length > 0 && adults.value.length > 0 && allKidsSubmitted && allAdultsSubmitted) {
    isLoading.value = true;
    setTimeout(() => {
      isLoading.value = false;
      localStorage.setItem('formCompleted', 'true');
      router.push('/main');
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
.forms-container {
  display: flex;
  justify-content: center;
  margin-top: 150px;
  width: 100%;
  gap: 150px;

  .guest-number {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }

  .forms-container__group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    gap: 10px;

    .input {
      width: 200px;
    }
  }

  .kids {
    display: flex;
    flex-direction: column;
    height: 100%;

    .guest-form__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 100%;
      margin: auto;
      width: 700px;
    }
  }

  .adults {
    display: flex;
    flex-direction: column;
    height: 100%;

    .guest-form__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 100%;
      margin: auto;
      width: 700px;
    }

    .guest-form__transition-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      max-width: 800px;
    }

    .guest-form {
      flex: 0 1 calc(50% - 100px);
      box-sizing: border-box;
      max-width: 400px;
    }
  }

  .confirm-btn {
    margin-top: 20px;
    width: 100%;
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

@media (max-width: 1420px) {
  .forms-container {
    flex-direction: column;
    gap: 50px;

    .guest-form__transition-wrapper {
      display: flex;
      flex-direction: column;
    }
  }
}

@media (max-width: 415px) {
  .forms-container__group {
    h3 {
      font-size: 16px;
    }
  }
}
</style>
