<template>
  <header class="header">
    <h1>{{ textStoreMainPage.mainHeader }}</h1>
    <p>{{ textStoreMainPage.description }}</p>
  </header>
  <main>
    <section class="wedding">
      <h2 class="wedding-title">Свадьба</h2>
      <div class="wedding-wrapper">
        <div class="wedding-group">
          <p>{{ textStoreMainPage.when }}</p>
          <p>{{ textStoreMainPage.marriageTime }}</p>
          <p>{{ textStoreMainPage.banquetTime }}</p>
        </div>
        <v-divider :thickness="3" class="border-opacity-100" color="info" vertical></v-divider>
        <div class="wedding-group">
          <p>{{ textStoreMainPage.where }}</p>
          <p>{{ textStoreMainPage.marriagePlace.name }}</p>
          <span>{{ textStoreMainPage.marriagePlace.adress }}</span>
          <p>{{ textStoreMainPage.banquetPlace.name }}</p>
          <span>{{ textStoreMainPage.banquetPlace.adress }}</span>
        </div>
      </div>
    </section>
    <section class="map">
      <Map />
    </section>
  </main>
  <footer>
    <h3>{{ textStoreMainPage.footer.title }}</h3>
    <p>{{ textStoreMainPage.footer.firstParagraph }}</p>
    <p>{{ textStoreMainPage.footer.secondParagraph }}</p>
    <div class="contacts">
      <span>
        <a href="https://t.me/nsmeenov" target="_blank">{{ textStoreMainPage.footer.contacts.nikita }}</a>
      </span>
      <span>
        <a href="https://t.me/Dasha_mlt" target="_blank">{{ textStoreMainPage.footer.contacts.dasha }}</a>
      </span>
      <span>{{ textStoreMainPage.footer.contacts.telegramGroup }}</span>
      <span @click="showButton = true" class="lol">{{ textStoreMainPage.footer.contacts.copyright }}</span>
    </div>
    <SecretDialog :show.sync="showButton" />
  </footer>
</template>

<script setup lang="ts">
import Map from '../components/Map.vue';
import { useTextStore } from '../store/textStore';
import SecretDialog from '../components/SecretDialog.vue';

import { ref } from 'vue';

const textStore = useTextStore();
const textStoreMainPage = textStore.textData.mainPage;

const showButton = ref(false);
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;

  p {
    margin-top: 50px;
    width: 600px;
  }
}

.wedding {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-wrapper {
    display: flex;
    gap: 50px;
    justify-content: space-between;
    width: 700px;
  }

  &-title {
    margin-bottom: 50px;
  }
}

.map {
  margin: 40px auto 40px;
}

.lol {
  cursor: pointer;
}
</style>
