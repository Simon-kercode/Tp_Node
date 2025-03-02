import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vuetify from './plugins/Vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);
app.use(Vuetify);
app.mount('#app');
