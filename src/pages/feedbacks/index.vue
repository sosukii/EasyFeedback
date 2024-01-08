<template>
  <q-page>
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
import { defineComponent, onMounted, ref } from 'vue';
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

onMounted(async () => {
  const tokenRead = apiTokensStore.feedbackRead;

  const mock = tokenRead.length < 1;
  if (mock) {
    feedbacks.value = mockData;
    return;
  }
  const options = { token: tokenRead, isAnswered: false, feedbackCount: 100 };
  const response: FeedbacksData | FeedbacksError = await getFeedbacks(options);

  if ('data' in response) {
    feedbacks.value = response.data.feedbacks;
  }
});
defineComponent({
  name: 'FeedbackPage',
});
</script>

<style lang="scss" scoped>
.feedbacks {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 35px 25px;
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>
