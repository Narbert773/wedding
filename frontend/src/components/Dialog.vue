<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" max-width="450" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" class="invite-btn"> Я приду! </v-btn>
      </template>

      <v-card prepend-icon="mdi-map-marker" text="Необходимо выбрать опцию снизу для подсчета всех гостей и чтобы за один раз заполнить всех сразу" title="С кем вы планируете прийти?">
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <router-link to="/single" class="link"><v-btn @click="dialog = false"> Один </v-btn></router-link>

          <router-link to="/plural" class="link"><v-btn @click="dialog = false"> Несколько человек </v-btn></router-link>

          <router-link to="/kids" class="link"><v-btn @click="dialog = false">с детьми</v-btn></router-link>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
