<template>
  <div :class="['app', theme]" v-if="!textStore.loading">
    <Toolbar class="toolbar" />
    <h1 class="h1">{{ textStore.textData.mainModule.mainHeader }}<br />{{ textStore.textData.mainModule.date }}</h1>
    <h2 class="h2">{{ textStore.textData.mainModule.nikita }}<img src='./assets/images/ring.png' alt='Кольца' class='ring'></img>{{ textStore.textData.mainModule.dasha }}</h2>
    <Timer />
    <div class="theme-container">
      <v-icon v-if="theme === 'light'" class="theme-icon" icon="mdi-brightness-4" start @click="toggleTheme"></v-icon>
      <v-icon v-if="theme === 'dark'" class="theme-icon" icon="mdi-brightness-6" start @click="toggleTheme"></v-icon>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Timer from './components/Timer.vue';
import Toolbar from './components/Toolbar.vue';
import { useTextStore } from './store/textStore';

import { onBeforeMount, onMounted, ref } from 'vue';

const textStore = useTextStore();

const theme = ref('light');

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme.value);
};

onBeforeMount(async () => {
  await textStore.fetchTextData();
});

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  theme.value = savedTheme || 'light';
});
</script>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out;
  margin: 0;
  

  .ring{
    height: 30px;
    width: 35px;
    margin: auto 6px;
  }

  .h1 {
    text-align: center;
    margin-bottom: 30px;
  }

  .h2 {
    margin-top: 10px;
    font-size: 40px;
  }

  .theme-container {
    position: absolute;
    top: 23px;
    right: 3%;
    transform: translate(-50%, -50%);

    .theme-icon {
      font-size: 30px;
    }
  }
}

@media (max-width: 900px) {
  .app {
    flex-direction: column;
    text-align: center;
    padding: 10px;
    padding-bottom: 30px;
  }

  .h1 {
    font-size: 27px;
    margin-top: 0;
    margin-bottom: 30px;
  }

  .h2 {
    font-size: 27px !important;
    margin-bottom: 40px;
  }

  .theme-container {
    top: 27px !important;
    right: 1% !important;
  }
}

@media (max-width: 700px) {
  .h1 {
    font-size: 23px;
  }

  .h2 {
    font-size: 23px !important;
  }
}

@media (max-width: 600px) {
  .h1 {
    font-size: 20px;
  }

  .h2 {
    font-size: 20px !important;
  }
}

@media (max-width: 526px) {
  .h1 {
    font-size: 18px;
  }
}

@media (max-width: 478px) {
  .h1 {
    font-size: 15px;
  }
}

@media (max-width: 399px) {
  .h1 {
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 30px;
  }

  .h2 {
    font-size: 20px !important;
    margin-bottom: 40px;
  }
}
</style>
