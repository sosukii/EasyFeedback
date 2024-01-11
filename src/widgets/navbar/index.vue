<template>
  <nav class="navigation">
    <q-btn class="navigation__link" to="/" label="Главная" flat />
    <q-btn class="navigation__link" to="/about" label="О сервисе" flat />
    <q-btn class="navigation__link" to="/feedbacks" label="Отзывы" flat />
  </nav>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

defineComponent({
  name: 'NavbarComponent',
});
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  &__link {
    color: white;
  }
}
</style>
