import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import VueFeather from 'vue-feather';

// Crear la instancia de la aplicación
const app = createApp(App);

// Registrar el componente `VueFeather` globalmente
app.component(VueFeather.name, VueFeather);

// Montar la aplicación en el elemento con id 'app'
app.mount('#app');
