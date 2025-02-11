<template>
  <v-list lines="three" class="v-list">
    <v-list-item v-for="item in dayPlanItems" :key="item.id">
      <v-list-item-title class="v-title">
        {{ item.purpose }} <span v-if="item.place">| {{ item.place }}</span>
      </v-list-item-title>
      <v-list-item-subtitle class="v-subtitle">
        {{ item.date }} <span v-if="item.address">| {{ item.address }}</span>
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { Plan } from '../interfaces/plan.interface';

import { ref } from 'vue';
import { useTextStore } from '../store/textStore';

const textStore = useTextStore();
const textStorePlan = textStore.textData.dayPlan;

const dayPlanItems = ref<Plan[]>([
  { id: 0, date: `${textStorePlan.first.date}`, place: `${textStorePlan.first.place}`, purpose: `${textStorePlan.first.purpose}`, address: `${textStorePlan.first.address}` },
  { id: 1, date: `${textStorePlan.second.date}`, purpose: `${textStorePlan.second.purpose}` },
  { id: 2, date: `${textStorePlan.third.date}`, place: `${textStorePlan.third.place}`, purpose: `${textStorePlan.third.purpose}`, address: `${textStorePlan.third.address}` },
  { id: 3, date: `${textStorePlan.fourth.date}`, purpose: `${textStorePlan.fourth.purpose}` },
  { id: 4, date: `${textStorePlan.fifth.date}`, purpose: `${textStorePlan.fifth.purpose}` },
]);
</script>

<style scoped lang="scss">
.v-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media (max-width: 429px) {
  .v-title {
    font-size: 13px;
  }
}
</style>
