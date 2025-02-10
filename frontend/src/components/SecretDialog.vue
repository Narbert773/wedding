<template>
  <div v-if="internalShow" class="pa-4 text-center">
    <v-btn :text="textStoreSecret.first.title" @click="dialog = true" size="s"></v-btn
    ><v-dialog v-model="dialog" max-width="680">
      <v-card title="">
        <template v-slot:text>
          <v-btn class="my-2" :text="textStoreSecret.second.title" @click="dialog2 = true"></v-btn>
        </template>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :text="textStoreSecret.second.text" variant="text" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" max-width="440">
      <v-card title="">
        <template v-slot:text>
          <v-btn class="my-2" :text="textStoreSecret.third.title" @click="dialog3 = !dialog3"></v-btn>
        </template>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :text="textStoreSecret.third.text" variant="text" @click="dialog2 = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog3" width="330">
      <v-card :title="textStoreSecret.last.header">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-text-field class="input" :label="textStoreSecret.last.label" variant="underlined" v-model="password"></v-text-field>
          <v-btn :text="textStoreSecret.last.confirm" variant="text" @click="checkPassword"></v-btn>
          <v-btn :text="textStoreSecret.last.text" variant="text" @click="dialog3 = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <Spinner :isVisible="isLoading" />
  <SnackBar :message="snackbarMessage" :color="snackbarColor" />
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { PASSWORD } from '../variables';
import SnackBar from './SnackBar.vue';
import Spinner from './Spinner.vue';
import { useTextStore } from '../store/textStore';

const props = defineProps({
  show: { type: Boolean, required: true },
});

const router = useRouter();

const textStore = useTextStore();
const textStoreSecret = textStore.textData.secret;

const dialog = ref(false);
const dialog2 = ref(false);
const dialog3 = ref(false);

const snackbarMessage = ref('');
const snackbarColor = ref('');
const password = ref('');
const isLoading = ref(false);
const internalShow = ref(false);

function checkPassword() {
  isLoading.value = false;

  if (password.value !== PASSWORD) {
    snackbarMessage.value = 'Неверный пароль';
    snackbarColor.value = 'red';
    return;
  }

  isLoading.value = true;
  snackbarMessage.value = 'Пароль принят';
  snackbarColor.value = 'green';

  localStorage.setItem('accessGranted', 'true');

  setTimeout(() => {
    isLoading.value = false;
    router.push('/guests');
  }, 300);
}

watch(
  () => props.show,
  (newValue) => {
    internalShow.value = newValue;
  }
);
</script>
