<template>
  <v-toolbar density="compact" class="toolbar">
    <v-btn v-if="showBackButton" class="back-btn"
      ><v-toolbar-title class="title"><router-link to="/" class="link">Назад</router-link></v-toolbar-title>
    </v-btn>
  </v-toolbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const showBackButton = computed(() => route.path !== '/');
</script>

<style scoped lang="scss">
.toolbar {
  margin-bottom: 100px;

  .title {
    border-bottom: 3px solid red;
  }
}
</style>
