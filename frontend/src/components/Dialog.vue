<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" max-width="450" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" class="invite-btn"> {{ textStoreDialog.mainButton }} </v-btn>
      </template>

      <v-card prepend-icon="mdi-map-marker" :text="textStoreDialog.buttonOptions.text" :title="textStoreDialog.buttonOptions.title">
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <router-link to="/single" class="link"
            ><v-btn @click="dialog = false"> {{ textStoreDialog.buttonOptions.firstOption }} </v-btn></router-link
          >

          <router-link to="/plural" class="link"
            ><v-btn @click="dialog = false"> {{ textStoreDialog.buttonOptions.secondOption }} </v-btn></router-link
          >

          <router-link to="/kids" class="link"
            ><v-btn @click="dialog = false">{{ textStoreDialog.buttonOptions.thirdOption }}</v-btn></router-link
          >
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
</style>
