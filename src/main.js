// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import '@/assets/scss/config/default/app.scss';
import '@/assets/js/layout.js';
import '@/assets/css/bootstrap.min.css';
import '@/assets/css/icons.min.css';
import '@/assets/css/app.min.css';
import '@/assets/css/custom.css';
import '@/assets/libs/sweetalert2/sweetalert2.min.css';

/*
import '@/assets/libs/bootstrap/js/bootstrap.bundle.min.js';
import '@/assets/libs/simplebar/simplebar.min.js';
import '@/assets/libs/node-waves/waves.min.js';
import '@/assets/libs/feather-icons/feather.min.js';
import '@/assets/js/pages/plugins/lord-icon-2.1.0.js';
import '@/assets/libs/sweetalert2/sweetalert2.min.js';
import '@/assets/js/plugins.js';
*/
const app = createApp(App)

app.use(router)

app.mount('#app')
