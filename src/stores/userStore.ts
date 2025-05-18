import { defineStore } from "pinia";

export interface User {
  login: string;
  email?: string;
  phone?: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    isLoggedIn: false,
  }),
  actions: {
    login(user: User) {
      this.user = user;
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
    },
    initFromLocalStorage() {
      const storedUser = localStorage.getItem('user');
      const storedLogin = localStorage.getItem('isLoggenIn');
      if (storedUser && storedLogin === 'true') {
        this.user = JSON.parse(storedUser);
        this.isLoggedIn = true;
      }
    },
  },
});
