import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue'
import router from './router';
import Vuetify from './plugins/Vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Vuetify);
app.mount('#app');
