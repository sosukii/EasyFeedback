<template>
  <q-card
    class="my-card"
    transition-show="flip-right"
    transition-hide="flip-left"
  >
    <q-card-section>
      <q-btn label="Логин" @click="reg = false" class="q-mr-sm" />
      <q-btn label="Регистрация" @click="reg = true" />
    </q-card-section>

    <q-card-section>
      <q-form @submit="handleAuth">
        <InputName @update:name="handleData" v-if="reg" />
        <InputEmail @update:email="handleData" />
        <InputPassword @update:password="handleData" />
        <q-card-actions align="center">
          <q-btn
            class="text-capitalize"
            type="submit"
            :label="reg ? 'Зарегистрироваться' : 'Войти'"
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import InputPassword from './ui/inputPassword.vue';
import InputEmail from './ui/inputEmail.vue';
import InputName from './ui/inputName.vue';
import { objInput, User } from './ui/types';
import { register } from 'src/shared/api/registration';
import { login } from 'src/shared/api/auth';
import { useRouter } from 'vue-router';

const reg = ref(false);
const router = useRouter();

const userData: User = {
  email: '',
  password: '',
};

function handleData(inputData: objInput): void {
  const { value, type } = inputData;
  userData[type] = value;
}
async function handleAuth(): Promise<void> {
  const result = reg.value ? await register(userData) : await login(userData);
  if ('token' in result) {
    router.push('/profile');
  }
}

defineComponent({
  name: 'AuthForm',
});
</script>
