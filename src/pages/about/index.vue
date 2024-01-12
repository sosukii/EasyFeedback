<template>
  <q-page>
    <div class="container content">
      <q-card class="card">
        <h2 class="card__title">Назначение сервиса:</h2>
        <div class="card__field">
          <q-icon class="card__icon" name="lock_outline" />
          Сепарация данных личного кабинета и работы с обратной связью
        </div>
      </q-card>
      <q-card class="card">
        <h2 class="card__title">Возможности:</h2>
        <div>
          <p class="card__field">
            <q-icon class="card__icon" name="reviews" />
            Агрегация отзывов с маркетплейса Wildberries (необходим токен на
            чтение)
          </p>
          <p class="card__field">
            <q-icon class="card__icon" name="edit" />
            Отправка ответов на отзывы (необходим токен на запись)
          </p>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';

defineComponent({
  name: 'AboutPage',
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 40px 0px 20px;
  .card {
    flex-grow: 1;
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    max-width: 490px;
    &__icon {
      font-size: 32px;
    }
    &__title {
      font-size: 36px;
      font-weight: 350;
      line-height: normal;
      text-align: center;
    }
    &__field {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
