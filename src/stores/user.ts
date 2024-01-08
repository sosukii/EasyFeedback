import { defineStore } from 'pinia';
import { User } from 'src/shared/types/index';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    user: {
      name: '',
      email: '',
    },
  }),
  actions: {
    setIsAuthenticated(isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated;
    },
    setUser(user: User) {
      this.user = user;
    },
  },
});
