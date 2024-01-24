<template>
  <q-page class="wrapper">
    <q-btn-dropdown
      :label="isMinToMax ? 'Оценка: по возрастанию' : 'Оценка: по убыванию'"
      class="sort text-weight-regular"
      no-caps
    >
      <q-list>
        <q-item clickable v-close-popup @click="isMinToMax = true">
          <q-item-section>
            <q-item-label>Оценка: по возрастанию</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="isMinToMax = false">
          <q-item-section>
            <q-item-label>Оценка: по убыванию</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <div class="feedbacks" v-if="feedbacks !== null">
      <FeedbackCard
        v-for="feedback in feedbacks"
        :feedback="feedback"
        :key="feedback.id"
      />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, watch } from 'vue';
import FeedbackCard from 'src/entities/feedback-card/index';
import { getFeedbacks } from 'src/shared/api/feedbacks';
import { useAPITokensStore } from '../../stores/api-tokens';
import {
  FeedbacksData,
  FeedbacksError,
  Feedback,
} from '../../shared/api/feedbacks';
import { mockData } from './data/mock.js';

const feedbacks = ref<Feedback[] | null>(null);
const apiTokensStore = useAPITokensStore();
const isMinToMax = ref(false);

watch(isMinToMax, () => {
  if (feedbacks.value) {
    feedbacks.value = feedbacks.value.sort((a, b) => {
      const result = isMinToMax.value
        ? a.productValuation - b.productValuation
        : b.productValuation - a.productValuation;
      return result;
    });
  }
});

onMounted(async () => {
  const tokenRead = apiTokensStore.feedbackRead;

  const mock = tokenRead.length < 1;
  if (mock) {
    feedbacks.value = mockData;
    isMinToMax.value = true;
    return;
  }
  const options = { token: tokenRead, isAnswered: false, feedbackCount: 100 };
  const response: FeedbacksData | FeedbacksError = await getFeedbacks(options);

  if ('data' in response) {
    feedbacks.value = response.data.feedbacks;
    isMinToMax.value = true;
  }
});

defineComponent({
  name: 'FeedbackPage',
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 40px;
  .sort {
    color: #070707;
  }
}
.feedbacks {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 35px 25px;
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>
