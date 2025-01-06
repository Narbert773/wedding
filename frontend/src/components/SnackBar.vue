<template>
  <v-snackbar v-model="isVisible" timeout="3000" :color="color" top class="snackbar">
    {{ message }}
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="isVisible = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'success',
  },
});

const emit = defineEmits();

const isVisible = ref(false);

function showSnackbar() {
  isVisible.value = true;
}

watch(
  () => props.message,
  () => {
    if (props.message) {
      showSnackbar();
    }
  }
);
</script>

<style scoped lang="scss">
.snackbar {
  position: fixed !important;
  bottom: 16px;
  z-index: 9999;
  width: auto;
  max-width: 400px;
  min-width: 200px;
  border-radius: 8px;
}
</style>
