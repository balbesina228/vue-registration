import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'
import './assets/main.css'
import { useUserStore } from './stores/userStore';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

const userStore = useUserStore();
userStore.initFromLocalStorage();

app.mount('#app');
