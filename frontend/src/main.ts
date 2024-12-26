import { createApp } from 'vue';
import router from './router/router';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(router).mount('#app');
