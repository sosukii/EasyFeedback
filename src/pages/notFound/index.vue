<template>
  <q-page>
    <h1>NotFound page</h1>
    <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Ну вот… Забредаете на страницы, которых нет.
        Ну, хорошо, я смогу с этим подружиться.
        Только для вас — самая уникальная и несуществующая страница 404 во всей вселенной! 🌌🛸✨
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="На главную"
        no-caps
      />
    </div>
  </div>
  </q-page>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

defineComponent({
  name: 'NotFoundPage',
});
</script>

<style lang="scss" scoped></style>
