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
  <footer></footer>
</template>

<script setup lang="ts">
import Map from '../components/Map.vue';
import { useTextStore } from '../store/textStore';

const textStore = useTextStore();
const textStoreMainPage = textStore.textData.mainPage;
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
</style>
