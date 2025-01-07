import { defineStore } from 'pinia';
import { fetchText } from '../services/textService';

export const useTextStore = defineStore('textStore', {
  state: () => ({
    textData: null as Record<string, any> | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTextData() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetchText();
        this.textData = response;
      } catch (err) {
        this.error = 'Ошибка загрузки данных';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
