<template>
  <header class="header">
    <h1>План дня</h1>

    <p>
      Это текст. Нажмите один раз и выберите «Редактировать текст» или просто кликните дважды, чтобы добавить свой текст и настроить шрифт. Здесь вы можете рассказать посетителям подробнее о себе. Это текст. Нажмите один раз и выберите «Редактировать текст» или просто кликните дважды, чтобы добавить
      свой текст и настроить шрифт. Здесь вы можете рассказать посетителям подробнее о себе. Это текст. Нажмите один раз и выберите «Редактировать текст» или просто кликните дважды.
    </p>
  </header>
  <main>
    <section class="wedding">
      <h2 class="wedding-title">Свадьба</h2>
      <div class="wedding-wrapper">
        <div class="wedding-group">
          <p>Когда</p>
          <p>14.06.2025 10:30</p>
          <p>14.06.2025 14:00</p>
        </div>
        <v-divider :thickness="3" class="border-opacity-100" color="info" vertical></v-divider>
        <div class="wedding-group">
          <p>Где</p>
          <p>Дворец бракосочетания №1</p>
          <span>Малый Харитоньевский переулок, 10с1</span>
          <p>Art Village</p>
          <span>Рябиновая ул., 1Г/3, д. Голиково</span>
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
