<template>
  <v-sheet class="mx-auto" width="300">
    <v-form @submit.prevent>
      <v-text-field v-model="firstName" :rules="firstNameRules" label="Имя"></v-text-field>
      <v-text-field v-model="secondName" :rules="secondNameRules" label="Фамилия"></v-text-field>
      <v-btn class="mt-2" type="submit" block>Добавить</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const firstName = ref('');
const secondName = ref('');

const firstNameRules = [
  (value: string) => {
    if (value) return true;
    return 'Необходимо внести имя';
  },
];

const secondNameRules = [
  (value: string) => {
    if (value) return true;
    return 'Необходимо внести фамилию';
  },
];
</script>

<style scoped lang="scss">
.mx-auto {
  margin-top: 100px;
}
</style>
