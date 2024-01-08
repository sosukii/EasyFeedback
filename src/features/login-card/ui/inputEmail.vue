<template>
  <q-input
    ref="email"
    for="email"
    label="Email*"
    v-model="userEmail"
    @update:model-value="updateEmail"
    :rules="[
      (val) => {
        if (!(val && val.length)) return 'Обязательное поле';
        if (/[^\u0000-\u007F]/.test(val))
          return 'Должен содержать только латинские символы';

        return true;
      },
      (val, rules) => rules.email(val) || 'Некорректный Email',
    ]"
    class="text-body1"
  />
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue';

const userEmail = ref('');

const emit = defineEmits(['update:email']);

const updateEmail = (value: string | number | null): void => {
  if (value && typeof value === 'string')
    emit('update:email', { value: value, type: 'email' });
};

defineComponent({
  name: 'InputEmail',
});
</script>
