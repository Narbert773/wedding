<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" max-width="450" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" class="invite-btn"> {{ textStoreDialog.mainButton }}</v-btn>
      </template>

      <v-card prepend-icon="mdi-map-marker" :text="textStoreDialog.buttonOptions.text">
        <template v-slot:title>
          <span class="card-title">{{ textStoreDialog.buttonOptions.title }}</span>
        </template>
        <template v-slot:text>
          <p class="card-text">{{ textStoreDialog.buttonOptions.text }}</p>
        </template>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <div class="btn-container">
            <router-link to="/single" class="link"
              ><v-btn @click="dialog = false" class="option"> {{ textStoreDialog.buttonOptions.firstOption }} </v-btn></router-link
            >
            <router-link to="/plural" class="link"
              ><v-btn @click="dialog = false" class="option"> {{ textStoreDialog.buttonOptions.secondOption }} </v-btn></router-link
            >
            <router-link to="/kids" class="link"
              ><v-btn @click="dialog = false" class="option">{{ textStoreDialog.buttonOptions.thirdOption }}</v-btn></router-link
            >
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTextStore } from '../store/textStore';

const textStore = useTextStore();
const textStoreDialog = textStore.textData.dialog;

const dialog = ref(false);
</script>

<style scoped lang="scss">
.invite-btn {
  background-color: rgb(6, 53, 85);
  color: white;
  width: 400px;
  height: 45px;
}

.btn-container {
  display: flex;
  gap: 30px;
  margin-right: 10px;
}

@media (max-width: 900px) {
  .btn-container {
    gap: 5px;
    font-size: 10px;
  }

  .invite-btn {
    width: 300px;
  }

  .option {
    font-size: 12px;
  }

  .card-title,
  .card-text {
    font-size: 14px;
  }
}

@media (max-width: 395px) {
  .btn-container {
    gap: 0;
    font-size: 10px;
  }

  .invite-btn {
    width: 300px;
  }

  .option {
    font-size: 10px;
  }

  .card-title,
  .card-text {
    font-size: 12px;
  }
}
</style>
