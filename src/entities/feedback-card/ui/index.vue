<template>
  <q-card class="card">
    <div>
      <q-card-section class="user">
        <div>
          <q-item-label>{{
            feedback.userName || 'Имя не указано'
          }}</q-item-label>
          <q-item-label caption>{{ feedback.createdDate }}</q-item-label>
        </div>

        <q-rating readonly size="18px" v-model="ratingValue" color="primary" />
      </q-card-section>

      <q-card-section>
        <q-item-label>{{ feedback.text }}</q-item-label>
      </q-card-section>
    </div>
    <q-expansion-item
      class="product bg-grey-3 overflow-hidden"
      icon="straighten"
      label="О товаре"
      style="border-radius: 15px"
    >
      <q-card class="bg-grey-3">
        <ul class="product__params">
          <ParamItem
            paramTitle="Артикул"
            :param-value="feedback.productDetails.nmId"
          />
          <q-expansion-item
            label="Название товара"
            class="bg-grey-3 overflow-hidden"
            style="border-radius: 15px"
            header-class="bg-white text-grey-7 q-pa-none"
          >
            <div class="product-title">
              {{ feedback.productDetails.productName }}
            </div>
          </q-expansion-item>

          <ParamItem
            paramTitle="Размер"
            :param-value="feedback.productDetails.size"
          />
          <ParamItem
            paramTitle="Бренд"
            :param-value="feedback.productDetails.brandName"
          />

          <q-separator class="q-my-md" inset color="blue-2" />

          <ParamItem
            paramTitle="imtId"
            :param-value="feedback.productDetails.imtId"
          />

          <q-expansion-item
            label="Артикул продавца"
            class="bg-grey-3 overflow-hidden"
            style="border-radius: 15px"
            header-class="bg-white text-grey-7 q-pa-none"
          >
            <div class="product-title">
              {{ feedback.productDetails.supplierArticle }}
            </div>
          </q-expansion-item>
        </ul>
      </q-card>
    </q-expansion-item>

    <q-btn
      style="color: #cb11ab; background-color: white"
      class="text-lowercase answer-btn"
      @click="answerShowHandler"
    >
      {{ isAnswerShow ? 'Отмена' : 'Ответить на отзыв' }}
    </q-btn>

    <q-intersection
      v-show="isAnswerShow"
      transition="scale"
      class="example-item"
    >
      <q-card flat bordered class="q-ma-sm">
        <q-card-section class="answer">
          <q-input
            class="answer__input"
            focus
            v-model="answerText"
            filled
            autogrow
            label="Текст ответа..."
            placeholder="мин. 3 символа"
            outlined
            counter
            type="textarea"
          >
          </q-input>

          <q-icon
            class="answer__sendBtn"
            :class="{ 'answer__sendBtn-disabled': !isSendButtonDisabled }"
            name="send"
            @click="answerText.length > 3 ? (isConfirmPopupShow = true) : null"
          >
            <q-tooltip transition-show="scale" transition-hide="scale">
              Отправить
            </q-tooltip>
          </q-icon>
        </q-card-section>
      </q-card>
    </q-intersection>
  </q-card>

  <q-dialog v-model="isConfirmPopupShow" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Предпросмотр ответа</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="row items-center">
        <span class="q-ml-sm">{{ answerText }}</span>
      </q-card-section>

      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Отмена" v-close-popup />
        <q-btn flat label="Отправить ответ" color="primary" v-close-popup @click='send'/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {
  defineComponent,
  defineProps,
  PropType,
  ref,
  watch,
  computed,
} from 'vue';
import { Feedback } from '../../../shared/api/feedbacks';
import ParamItem from './param.vue';
import {sendAnswer} from '../api/sendAnswer'
const props = defineProps({
  feedback: { type: Object as PropType<Feedback>, required: true },
});

const ratingValue = ref(props.feedback.productValuation);
const isAnswerShow = ref(false);
const answerText = ref('');
const isConfirmPopupShow = ref(false);

function answerShowHandler(): void {
  isAnswerShow.value = !isAnswerShow.value;
}
async function send(): Promise<void> {
  const option = {'id': props.feedback.id, 'text': answerText.value }
  // const result = await sendAnswer(option)
}

const isSendButtonDisabled = computed(() => answerText.value.length > 3);

watch(
  () => props.feedback.productValuation,
  (newVal) => {
    ratingValue.value = newVal;
  }
);

defineComponent({
  name: 'FeedbackCard',
});
</script>

<style lang="scss" scoped>
.card {
  width: 480px;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  padding-bottom: 48px;
  .user {
    display: flex;
    justify-content: space-between;
  }
  .product {
    width: 90%;
    align-self: center;
    &__params {
      background-color: white;
      border-radius: 15px;
      padding: 10px;
      margin: 10px;
      .product-title {
        padding: 10px;
      }
      .item {
        list-style-type: none;
      }
    }
  }
  .answer {
    display: flex;
    gap: 10px;
    align-items: end;
    &__input {
      width: 100%;
    }
    &__sendBtn {
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
  .answer-btn {
    border: 2px solid #cb11ab;
    border-radius: 10px;
    padding: 10px 30px;
    margin: auto;
    position: absolute;
    bottom: -24px;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
  }
}
</style>
