<template>
  <v-carousel cycle hide-delimiters :show-arrows="false" :interval="3000" class="image-container">
    <v-carousel-item v-for="image in images" :key="image.id" :src="image.src" :alt="image.alt" class="img" cover></v-carousel-item>
  </v-carousel>
</template>

<script setup lang="ts">
import { Image } from '../interfaces/image.interface';

import { ref } from 'vue';
import { useTextStore } from '../store/textStore';

const textStore = useTextStore();
const textStoreCarousel = textStore.textData.carousel;

const images = ref<Image[]>([
  { id: 0, src: new URL(`${textStoreCarousel.first}`, import.meta.url).href, alt: `${textStoreCarousel.alt}` },
  { id: 1, src: new URL(`${textStoreCarousel.second}`, import.meta.url).href, alt: `${textStoreCarousel.alt}` },
  { id: 2, src: new URL(`${textStoreCarousel.third}`, import.meta.url).href, alt: `${textStoreCarousel.alt}` },
  { id: 4, src: new URL(`${textStoreCarousel.fourth}`, import.meta.url).href, alt: `${textStoreCarousel.alt}` },
]);
</script>

<style scoped lang="scss">
.image-container {
  display: flex;
  gap: 15px;
  margin-top: 50px;
  max-height: 350px;
  justify-content: center;

  .img {
    min-height: 450px;
    width: 500px;
  }
}

@media (max-width: 500px) {
  .image-container {
    border-radius: 50% !important;
  }
}
</style>
