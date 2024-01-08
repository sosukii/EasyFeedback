<template>
  <q-input
    label="Имя*"
    type="text"
    v-model="userName"
    @update:model-value="updateName"
    :rules="[(val) => (val && val.length >= 2) || 'Минимум 2 символа']"
    class="text-body1"
  />
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

const userName = ref('');
const emit = defineEmits(['update:name']);

const updateName = (value: string | number | null): void => {
  if (value && typeof value === 'string')
    emit('update:name', { value: value, type: 'name' });
};

defineComponent({
  name: 'InputName',
});
</script>

<style lang="scss" scoped></style>
