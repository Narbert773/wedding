<template>
  <div class="forms-container">
    <h3>Введите кол-во гостей:</h3>
    <v-text-field class="input" label="" variant="underlined" v-model="guestQuantity" :rules="rules"></v-text-field>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const guestQuantity = ref(0);

const rules = [
  (value: number) => {
    if (typeof value === 'number' && !isNaN(value)) return true;
    return 'Необходимо внести число';
  },
];
</script>

<style scoped lang="scss">
.forms-container {
  display: flex;
  align-items: center;
  margin-top: 150px;
  gap: 10px;

  .input {
    width: 200px;
  }
}
</style>
