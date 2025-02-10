<template>
  <v-toolbar density="compact" class="toolbar">
    <v-btn v-if="showBackButton" class="back-btn" @click="clearLocalStorage"
      ><v-toolbar-title class="toolbar-title"
        ><router-link to="/" class="link"><v-icon icon="mdi-arrow-left" start></v-icon>{{ textStoreButton.return }}</router-link></v-toolbar-title
      >
    </v-btn>
  </v-toolbar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTextStore } from '../store/textStore';

const textStore = useTextStore();
const textStoreButton = textStore.textData.button;

const route = useRoute();

const showBackButton = computed(() => route.path !== '/');

function clearLocalStorage(): void {
  localStorage.removeItem('accessGranted');
}
</script>

<style scoped lang="scss">
.toolbar {
  margin-bottom: 100px;
}
</style>
