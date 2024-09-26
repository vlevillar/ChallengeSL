import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupCalendar } from 'v-calendar';

const app = createApp(App);

app.use(setupCalendar, {});
app.mount('#app');
