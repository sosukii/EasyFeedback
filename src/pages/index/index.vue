<template>
  <q-page>
    <div class="container">
      <div class="sections">
        <div outlined class="sections__section sections__section-mock">
          <q-btn @click="goToFeedback" class="btn">Моковые данные</q-btn>
          <div class="description text-h5">
            Ознакомьтесь с функционалом с помощью тестовых отзывов
          </div>
        </div>
        <div class="sections__section sections__section-api">
          <q-btn @click="focus" class="btn">У меня есть токен</q-btn>
          <div class="description text-h5">Читайте и отвечайте на отзывы</div>
          <div class="sending">
            <q-input
              outlined
              v-model="token"
              label="Токен для чтения отзывов"
              ref="tokenInput"
              class="sending__input"
            />
            <q-icon
              class="sending__icon"
              :class="{ 'sending__icon-disabled': !isSendIconDisabled }"
              name="send"
              @click="checkToken"
            >
              <q-tooltip transition-show="scale" transition-hide="scale">
                Отправить
              </q-tooltip>
            </q-icon>
          </div>
          <div class="accordion">
            <q-list bordered>
              <q-expansion-item
                group="somegroup"
                icon="help_outline"
                label="Что такое токен?"
                header-class="text-teal"
              >
                <q-card>
                  <q-card-section>
                    Уникальный набор символов. С помощью него можно
                    идентифицировать себя для системы.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item
                group="somegroup"
                icon="explore"
                label="Где найти нужный токен?"
                header-class="text-primary"
              >
                <q-card>
                  <q-card-section>
                    <q-btn
                      class="btn"
                      href="https://seller.wildberries.ru/supplier-settings/access-to-api"
                      target="_blank"
                      icon="arrow_outward"
                      label="Профиль --> Настройки --> Доступ к API"
                      color="purple"
                      no-caps
                    />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import {
  getFeedbacks,
  FeedbacksData,
  FeedbacksError,
} from 'src/shared/api/feedbacks';
import { useAPITokensStore } from 'src/stores/api-tokens';
import { defineComponent, ref, Ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const apiTokensStore = useAPITokensStore();

const token = ref('');
type Nullable<T> = T | null;
const tokenInput: Ref<Nullable<HTMLElement>> = ref(null);

const focus = (): void => tokenInput.value?.focus();

function goToFeedback(): void {
  router.push('/feedbacks');
}
async function checkToken(): Promise<void> {
  const options = { token: token.value, isAnswered: false, feedbackCount: 100 };
  const response: FeedbacksData | FeedbacksError = await getFeedbacks(options);

  if ('data' in response) {
    apiTokensStore.setfeedbackREAD(token.value);
    goToFeedback();
  }
}

const isSendIconDisabled = computed(() => token.value.length > 3);

defineComponent({
  name: 'IndexPage',
});
</script>

<style lang="scss" scoped>
.links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.sections {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 25px;
  gap: 10px;
  &__section {
    flex-grow: 1;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 10px;
    .btn {
      width: 100%;
    }
    .description {
      text-align: center;
      min-height: 60px;
    }
  }
  .sending {
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: end;
    &__input {
      width: 100%;
    }
    &__icon {
      font-size: 1.715em;
      color: #14b309ab;
      transition: 0.3s;
      &-disabled {
        color: black;
        pointer-events: none;
        cursor: not-allowed;
      }
      &:hover {
        cursor: pointer;
        scale: 1.1;
        color: #cb11ab;
      }
      &:active {
        scale: 1;
      }
    }
  }
  .accordion {
    width: 100%;
  }
}
</style>
