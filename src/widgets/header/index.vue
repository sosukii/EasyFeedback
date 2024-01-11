<template>
  <q-header class="header q-py-sm">
    <div class="container">
      <q-toolbar class="toolbar">
        <q-btn
          class="lt-md"
          text-color="white"
          flat
          dense
          icon="menu"
          aria-label="Menu"
          @click="toggleSidebar"
        />

        <q-btn to="/" flat class="logo gt-xs">
          <q-icon class="logo__icon" name="grass" />
          <q-toolbar-title class="logo__title">EasyFeedback</q-toolbar-title>
        </q-btn>
        <Navbar />
        <div>
          <q-btn color="primary" icon="face" class="gt-sm">
            <q-menu transition-show="flip-right" transition-hide="flip-left">
              <q-list style="min-width: 100px">
                <q-item to="/profile" v-if="isUserAuthenticated" clickable>
                  <q-item-section>Профиль</q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  @click="toggleLoginCard"
                  v-if="!isUserAuthenticated"
                  clickable
                >
                  <q-item-section>Войти</q-item-section>
                </q-item>
                <q-item v-if="isUserAuthenticated" @click="logout" clickable>
                  <q-item-section>Выйти</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </div>
  </q-header>

  <q-drawer v-model="sidebarOpen" bordered>
    <q-btn icon="close" class="float-right" flat @click="toggleSidebar" />
    <div class="sidebar">
      <q-btn to="/feedbacks">Отзывы</q-btn>
      <q-separator />
      <q-btn v-if="!isUserAuthenticated" @click="toggleLoginCard">Войти</q-btn>
      <q-btn v-if="isUserAuthenticated" to="/profile">Профиль</q-btn>
      <q-separator />
      <q-btn v-if="isUserAuthenticated" @click="logout">Выйти</q-btn>
    </div>
  </q-drawer>
  <q-dialog v-model="card">
    <LoginCard />
  </q-dialog>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/user';
import { authToken } from 'src/shared/api/auth';
import LoginCard from 'src/features/login-card/index';
import Navbar from 'src/widgets/navbar';

const card = ref(false);
const sidebarOpen = ref(false);

function toggleSidebar(): void {
  sidebarOpen.value = !sidebarOpen.value;
}
function toggleLoginCard(): void {
  card.value = !card.value;
}

const userStore = useUserStore();
const router = useRouter();

const isUserAuthenticated = computed(() => userStore.isAuthenticated);

onMounted(() => {
  userStore.setIsAuthenticated(!!authToken.get());
});

const logout = (): void => {
  authToken.remove();
  userStore.setIsAuthenticated(false);
  router.push('/');
};

defineComponent({
  name: 'HeaderComponent',
});
</script>

<style lang="scss" scoped>
.header {
  background-color: $ocean;
  padding: 10px 0px;
  .toolbar {
    display: flex;
    justify-content: space-between;
  }
}

.logo {
  padding: 10px;
  transition: 0.3s;
  &__icon {
    transition: 0.4s;
  }
  &__title {
    padding: 0 5px;
    text-transform: capitalize;
    color: #fff;
    font-weight: 600;
    font-size: 1.5rem;
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 12px;
}
.sidebar > * {
  text-transform: capitalize;
  max-width: 250px;
}
</style>
