<template>
  <li class="item">
    <span class="title">{{ paramTitle }}:</span>
    <span class="decoration"></span>
    <span
      class="value"
      :class="[props.paramTitle === 'Артикул' && 'articul']"
      @click="copy"
      >{{ paramValue }}
      <q-icon v-if="props.paramTitle === 'Артикул'" name="content_copy" />
    </span>
  </li>
</template>

<script setup lang="ts">
import { defineComponent, defineProps } from 'vue';
import { Notify } from 'quasar';
import useClipboard from 'vue-clipboard3';

const { toClipboard } = useClipboard()

async function copy(): Promise<void> {

  await toClipboard(`${props.paramValue}`)
  Notify.create({
    message: 'Артикул скопирован',
    icon: 'done',
    position: 'top',
    type: 'positive',
  });
}

const props = defineProps({
  paramTitle: { type: String, required: true },
  paramValue: { type: [String, Number], required: true },
});

defineComponent({
  name: 'ParamItem',
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: end;
  position: relative;
  .decoration {
    width: 100%;
    border-bottom: 1px dashed #d3d4dd;
    position: relative;
    bottom: 6px;
  }
  .title {
    padding-right: 5px;
    color: #868695;
  }
  .value {
    min-width: max-content;
    padding-left: 5px;
    color: #242424;
  }
  .articul:hover {
    cursor: pointer;
    color: rgb(190, 22, 170);
  }
}
</style>
