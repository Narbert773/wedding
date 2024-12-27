<template>
  <h3 class="h3">Представтесь пожалуйста</h3>
  <Spinner :isVisible="isLoading" />
  <EntryForm @formSubmitted="handleFormSubmitted" />
</template>

<script setup lang="ts">
import EntryForm from '../components/EntryForm.vue';
import Spinner from '../components/Spinner.vue';

import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const isLoading = ref(false);

function handleFormSubmitted() {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    router.push('/main');
  }, 1000);
}
</script>

<style scoped lang="scss"></style>
