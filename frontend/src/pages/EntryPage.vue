<template>
  <div class="form-container">
    <Spinner :isVisible="isLoading" />
    <Dialog />
    <h2 v-if="formCompleted" class="go-to-main-btn" @click="transferToMainPage">На главную<v-icon class="icon" icon="mdi-arrow-right" start></v-icon></h2>
  </div>
</template>

<script setup lang="ts">
import Dialog from '../components/Dialog.vue';
import Spinner from '../components/Spinner.vue';

import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();

const formCompleted = ref(false);
const isLoading = ref(false);

function transferToMainPage() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    localStorage.setItem('formCompleted', 'true');
    router.push('/main');
  }, 1000);
}

onMounted(() => {
  formCompleted.value = localStorage.getItem('formCompleted') === 'true';
});
</script>

<style scoped lang="scss">
.form-container {
  margin-top: 150px;

  .go-to-main-btn {
    text-align: center;
    margin-top: 70px;
    cursor: pointer;
  }

  .icon {
    font-size: 25px;
    margin-left: 5px;
  }
}
</style>
