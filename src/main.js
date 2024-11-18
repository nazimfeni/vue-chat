import { createApp } from 'vue';
import App from './App.vue';
import io from 'socket.io-client';
import router from './router';
const socket = io('http://localhost:3000');

const app = createApp(App);
app.config.globalProperties.$socket = socket;
app.use(router);
app.mount('#app');









