<template>
  <q-footer elevated class="footer">
    <div class="container">
      <q-toolbar class="toolbar">
        <q-toolbar-title
          ><a class="toolbar__title" href="/">EasyFeedback</a></q-toolbar-title
        >

        <div class="toolbar__content">
          <nav class="navigation">
            <q-btn class="navigation__link" to="/" label="Главная" flat />
            <q-btn
              class="navigation__link"
              to="/about"
              label="О сервисе"
              flat
            />
            <q-btn
              class="navigation__link"
              to="/feedbacks"
              label="Отзывы"
              flat
            />
          </nav>
          <div class="copyright">
            © 2024 EasyFeedback by
            <a class="tg" href="https://t.me/sosukii" target="_blank"
              >sosukii</a
            >
          </div>
        </div>
      </q-toolbar>
    </div>
  </q-footer>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

defineComponent({
  name: 'FooterComponent',
});
</script>

<style lang="scss" scoped>
.footer {
  background-color: $ocean;
  color: rgba(255, 255, 255, 0.6);
  padding: 25px 0px;
  .toolbar {
    display: flex;
    flex-direction: column;
    &__title {
      color: white;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.5rem;
    }
    &__content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
  }
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
  .copyright {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    .tg {
      color: white;
      transition: 0.3s;
      &:hover {
        color: #cb11ab;
      }
      &:active {
        scale: 0.9;
      }
    }
  }
}
</style>
