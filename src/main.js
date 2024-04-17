// import './assets/styles/main.scss'

//* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import icons */
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
/* add icons to the library */
library.add(fab, fas, far)
//-----------------

import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
	Vue3Toasity,
  {
   autoClose: 1000,
	// multiple: false,	
  }
)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
