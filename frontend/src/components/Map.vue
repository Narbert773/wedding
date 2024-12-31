<template>
  <yandex-map
    v-model="map"
    :settings="{
      location: {
        center: [37.617644, 55.755819],
        zoom: 9.5,
      },
      showScaleInCopyrights: true,
      theme: 'light',
    }"
    width="100%"
    height="500px"
  >
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />

    <yandex-map-marker v-for="marker in markers" :key="marker.iconSrc" position="top-center left-center" :settings="{ coordinates: marker.coordinates }">
      <img alt="" class="pin" :src="marker.iconSrc" @click="() => openLink(marker.link)" />
    </yandex-map-marker>
  </yandex-map>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import type { YMap } from '@yandex/ymaps3-types';
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapDefaultFeaturesLayer, YandexMapMarker } from 'vue-yandex-maps';

const map = shallowRef<null | YMap>(null);

const openLink = (url: string) => {
  alert('Перейти в Яндекс Карты?');
  window.open(url, '_blank');
};

const markers = [
  {
    coordinates: [37.644818, 55.765974] as [number, number],
    iconSrc: 'https://www.mos.ru/upload/newsfeed/newsfeed/ZAGS_TOP(2)(10).jpg',
    link: 'https://yandex.ru/maps/org/dvorets_brakosochetaniya_1/1241193732/?ll=37.646435%2C55.764632&z=16',
  },
  {
    coordinates: [37.310366, 55.923959] as [number, number],
    iconSrc: 'https://wedwed.ru/upload/user/8997/photo/logo/a5cba6fbcb7c862f9cfa9706cf1647a9',
    link: 'https://yandex.ru/maps/org/art_villadzh/208885713214/?ll=37.310412%2C55.924033&z=17.64',
  },
];
</script>

<style scoped lang="scss">
.pin {
  cursor: pointer;
  max-width: unset;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
