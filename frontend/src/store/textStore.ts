import { defineStore } from 'pinia';
import axios from 'axios';
import { BASE_URL } from '../variables';

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
        const response = await axios.get(`${BASE_URL}/text`);
        this.textData = response.data;
      } catch (err) {
        this.error = 'Ошибка загрузки данных';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
});
