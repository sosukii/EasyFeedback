<template>
  <nav
    class="navigation"
    :class="{ 'gt-sm': hideWhenTablet, column: isColumn }"
  >
    <q-btn
      class="navigation__link"
      no-caps
      to="/"
      label="Главная"
      :flat="!!isFlat"
    />
    <q-btn
      class="navigation__link"
      no-caps
      to="/about"
      label="О сервисе"
      :flat="!!isFlat"
    />
    <q-btn
      class="navigation__link"
      no-caps
      to="/feedbacks"
      label="Отзывы"
      :flat="!!isFlat"
    />
  </nav>
</template>

<script lang="ts" setup>
import { defineComponent, defineProps } from 'vue';

defineProps({
  hideWhenTablet: Boolean,
  isFlat: Boolean,
  isColumn: Boolean,
});
defineComponent({
  name: 'NavbarComponent',
});
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.column {
  flex-direction: column;
}
</style>
