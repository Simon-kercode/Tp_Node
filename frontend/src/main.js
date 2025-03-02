import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
// import { createVuetify } from 'vuetify';
import Vuetify from './plugins/Vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';


// const vuetify = createVuetify({
//     theme: {
//       defaultTheme: 'light',
//     },
//   });

const app = createApp(App);
app.use(Vuetify);
app.mount('#app');
