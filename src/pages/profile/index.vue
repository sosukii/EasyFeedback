<template>
  <q-page>
    <div v-if="!isUserAuthenticated">Вход не произведён</div>
    <div v-else>
      <p>Email: {{ refUserData.email }}</p>
      <p>Name: {{ refUserData.name }}</p>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { defineComponent } from 'vue';
import { useUserStore } from 'src/stores/user';
import { getUserByToken } from 'src/shared/api/auth';

const userStore = useUserStore();

const isUserAuthenticated = computed(() => userStore.isAuthenticated);
const refUserData = computed(() => userStore.user);

onMounted(async () => {
  const result = await getUserByToken();

  if ('response' in result && result.response.status === 401) {
    userStore.setIsAuthenticated(false);
  } else {
    if ('name' in result && 'email' in result) {
      userStore.setUser(result);
      userStore.setIsAuthenticated(true);
    }
  }
});

defineComponent({
  name: 'ProfilePage',
});
</script>

<style lang="scss" scoped></style>
