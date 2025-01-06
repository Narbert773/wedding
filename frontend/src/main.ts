import { createApp } from 'vue';
import router from './router/router';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { createYmaps } from 'vue-yandex-maps';
import './assets/main.scss';
import { createPinia } from 'pinia';
import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const pinia = createPinia();

createApp(App)
  .use(vuetify)
  .use(createYmaps({ apikey: '17e6a81b-5b2a-4a20-861c-692640a8f042', lang: 'ru_RU' }))
  .use(router)
  .use(pinia)
  .mount('#app');
