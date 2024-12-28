<template>
  <h3 class="h3">Представьтесь пожалуйста</h3>
  <Spinner :isVisible="isLoading" />
  <transition name="fade">
    <EntryForm v-if="isFormVisible" @formSubmitted="handleFormSubmitted" />
  </transition>
</template>

<script setup lang="ts">
import EntryForm from '../components/EntryForm.vue';
import Spinner from '../components/Spinner.vue';

import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();

const isLoading = ref(false);
const isFormVisible = ref(false);

function handleFormSubmitted() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    router.push('/main');
  }, 1000);
}

onMounted(() => {
  setTimeout(() => {
    isFormVisible.value = true;
  }, 400);
});
</script>

<style scoped lang="scss">
.h3 {
  margin-bottom: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
