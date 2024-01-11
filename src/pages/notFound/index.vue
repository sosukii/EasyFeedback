<template>
  <q-page class="container">
    <div class="content">
      <LottieAnimation
        class="cat"
        :animation-data="cat"
        :auto-play="true"
        :loop="true"
        :speed="1"
        ref="animation"
      />
      <div class="text">
        <div>404</div>
        <div>
          Наш котик не нашел такой странички, хотя очень искал её для вас...
          (если она и была, то поломалась, и уже чинится!)
        </div>
      </div>

      <q-btn class="q-mt-xl btn" to="/" label="На главную" no-caps />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from 'vue';
import { LottieAnimation } from 'lottie-web-vue';
import cat from './cat404.json';

const animation = ref();

onMounted(() => {
  setTimeout(() => {
    animation.value.goToAndPlay(150, true);
  }, 500);
});

defineComponent({
  name: 'NotFoundPage',
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 15px;
  .cat {
    max-width: 500px;
  }
  .text {
    text-align: center;
  }
  .btn {
    background-color: $ocean;
    color: white;
  }
}
</style>
