<template>
  <header>
    <div class="image-container">
      <img src="../assets/images/22.JPG" alt="ДН" class="img border" />
      <img src="../assets/images/2.JPG" alt="ДН" class="img border" />
      <img src="../assets/images/5.JPG" alt="ДН" class="img border" />
    </div>
  </header>
  <main>
    <section class="info">
      <h1 class="info-header">{{ textStoreMainPage.theMainHeader }}</h1>
      <p class="info-hedaer_text">{{ textStoreMainPage.guestsWelcoming }}</p>
      <h2 class="info-header">{{ textStoreMainPage.mainHeader }}</h2>
      <p class="info-hedaer_text">{{ textStoreMainPage.description }}</p>
    </section>
    <section class="wedding">
      <h2 class="wedding-title">{{ textStoreMainPage.weddingTitle }}</h2>
      <div class="wedding-wrapper">
        <div class="wedding-group">
          <h3>{{ textStoreMainPage.when }}</h3>
          <p>{{ textStoreMainPage.marriageTime }}</p>
          <p>{{ textStoreMainPage.banquetTime }}</p>
        </div>
        <v-divider :thickness="3" class="border-opacity-100" color="info" vertical></v-divider>
        <div class="wedding-group">
          <h3>{{ textStoreMainPage.where }}</h3>
          <p>{{ textStoreMainPage.marriagePlace.name }}</p>
          <span>{{ textStoreMainPage.marriagePlace.adress }}</span>
          <p>{{ textStoreMainPage.banquetPlace.name }}</p>
          <span>{{ textStoreMainPage.banquetPlace.adress }}</span>
        </div>
      </div>
    </section>
    <section class="map">
      <Map class="border" />
    </section>
  </main>
  <footer class="footer">
    <h3>{{ textStoreMainPage.footer.title }}</h3>
    <p>{{ textStoreMainPage.footer.firstParagraph }}</p>
    <p>{{ textStoreMainPage.footer.secondParagraph }}</p>
    <div class="contacts">
      <span>
        <a class="link" href="https://t.me/nsmeenov" target="_blank">{{ textStoreMainPage.footer.contacts.nikita }}</a>
      </span>
      <span>
        <a class="link" href="https://t.me/Dasha_mlt" target="_blank">{{ textStoreMainPage.footer.contacts.dasha }}</a>
      </span>
      <span>
        <a class="link" href="https://t.me/+p2GLCjk_fx00YTJk" target="_blank">{{ textStoreMainPage.footer.contacts.telegramGroup }}</a>
      </span>
    </div>
    <div class="copyright">
      <span @click="showButton = true" class="lol">{{ textStoreMainPage.footer.contacts.copyright }}</span>
      <SecretDialog :show.sync="showButton" />
    </div>
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
.image-container {
  display: flex;
  gap: 15px;
  margin-top: 50px;

  .img {
    height: 350px;
    width: 300px;
  }
}

.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  .info-header:nth-child(3) {
    margin-top: 50px;
  }

  p {
    margin-top: 50px;
    width: 600px;
    text-align: center;
    font-size: 18px;
  }
}

.wedding {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-wrapper {
    display: flex;
    gap: 50px;
    justify-content: center;
    width: 700px;

    .wedding-group {
      width: 50%;
      text-align: center;
      display: flex;
      flex-direction: column;

      &:nth-child(1) {
        p:nth-child(2) {
          margin-top: 20px;
        }

        p:nth-child(3) {
          margin-top: 33px;
        }
      }

      &:nth-child(3) {
        p {
          font-size: 16px;
          font-weight: 500;
        }

        p:nth-child(2) {
          margin-top: 15px;
        }

        p:nth-child(4) {
          margin-top: 20px;
        }

        span {
          font-size: 12px;
        }
      }
    }
  }

  &-title {
    margin-bottom: 50px;
  }
}

.map {
  margin: 70px auto 40px;
}

.lol {
  cursor: pointer;
}

.footer {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  width: 100%;

  .contacts {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  .copyright {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    height: 56px;
  }

  .link {
    text-decoration: none;
    color: rgb(var(--v-theme-info)) !important;
  }
}
</style>
