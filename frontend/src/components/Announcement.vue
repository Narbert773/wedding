<template>
  <p class="announcement">{{ textStoreAnnouncement.text }}</p>
</template>

<script setup lang="ts">
import { useTextStore } from '../store/textStore';

const textStore = useTextStore();
const textStoreAnnouncement = textStore.textData.announcement;
</script>

<style scoped lang="scss">
.announcement {
  font-size: 14px;
  margin-top: 50px;
  margin-bottom: -125px;
}
</style>
