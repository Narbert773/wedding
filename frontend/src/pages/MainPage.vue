<template>
  <header></header>
  <Carousel />
  <main>
    <section class="info">
      <h1 class="info-header">{{ textStoreMainPage.theMainHeader }}</h1>
      <p class="info-hedaer_text">{{ textStoreMainPage.guestsWelcoming }}</p>
    </section>
    <section class="wedding">
      <h2 class="wedding-title">{{ textStoreMainPage.mainHeader }}</h2>
      <List class="list" />
    </section>
    <section class="map">
      <Map class="border" />
    </section>
    <section class="wishes">
      <h2 class="wishes-title">{{ textStoreMainPage.wishesTitle }}</h2>
      <p class="wishes-text">{{ textStoreMainPage.wishesDescriptionFirst }}</p>
      <p class="wishes-text">{{ textStoreMainPage.wishesDescriptionSecond }}</p>
      <p class="wishes-text">{{ textStoreMainPage.wishesDescriptionThird }}</p>
    </section>
  </main>
  <footer class="footer">
    <h3>{{ textStoreMainPage.footer.title }}</h3>
    <p>{{ textStoreMainPage.footer.secondParagraph }}</p>
    <div class="contacts">
      <span>
        <a class="link link-text" href="https://t.me/+p2GLCjk_fx00YTJk" target="_blank">{{ textStoreMainPage.footer.contacts.telegramGroup }}</a>
      </span>
      <span>
        <a class="link link-text" href="https://t.me/Dasha_mlt" target="_blank">{{ textStoreMainPage.footer.contacts.dasha }}</a>
      </span>
      <span>
        <a class="link link-text" href="https://t.me/nsmeenov" target="_blank">{{ textStoreMainPage.footer.contacts.nikita }}</a>
      </span>
    </div>
    <div class="copyright">
      <span @click="showButton = true" class="pointer">{{ textStoreMainPage.footer.contacts.copyright }}</span>
      <SecretDialog :show.sync="showButton" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import Map from '../components/Map.vue';
import SecretDialog from '../components/SecretDialog.vue';
import Carousel from '../components/Carousel.vue';
import List from '../components/List.vue';

import { useTextStore } from '../store/textStore';
import { ref } from 'vue';

const textStore = useTextStore();
const textStoreMainPage = textStore.textData.mainPage;

const showButton = ref(false);
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: center;
  align-items: center;
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

.list {
  margin-top: -25px;
}

.wedding {
  margin-top: 60px;
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

.wishes-text {
}

.map {
  margin: 30px auto 40px;
  width: 600px;
}

.wishes {
  margin: 40px auto 50px;
  width: 40%;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 30px;
}

.pointer {
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
    gap: 25px;
  }

  .copyright {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    height: 56px;
    margin-bottom: -25px;
  }

  .link {
    text-decoration: none;
    color: rgb(var(--v-theme-info)) !important;
    font-size: 18px;
  }
}

@media (max-width: 700px) {
  .wishes {
    width: 80%;
  }

  .info-hedaer_text {
    width: 80% !important;
  }
}

@media (max-width: 625px) {
  .map {
    width: 450px;
  }
}

@media (max-width: 550px) {
  .wishes {
    width: 60%;
  }

  .info-hedaer_text {
    font-size: 16px;
  }

  .wishes-text,
  .link-text,
  .copyright {
    font-size: 14px !important;
  }

  .map {
    width: 400px;
  }

  .contacts {
    gap: 15px !important;
  }
}

@media (max-width: 425px) {
  .map {
    width: 350px;
  }

  .contacts {
    gap: 7px !important;
    flex-direction: column;
  }
}

@media (max-width: 375px) {
  .map {
    width: 320px;
  }

  .contacts {
    gap: 3px !important;
    margin-left: 10px;
  }
}
</style>
