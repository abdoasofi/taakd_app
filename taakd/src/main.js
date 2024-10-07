import './index.css'

import { createApp, reactive } from 'vue'
import router from './router'
import App from './App.vue'

import { createPinia } from 'pinia';


import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

let app = createApp(App)

const pinia = createPinia();

let requesData = localStorage.getItem("reques")
if (!requesData) {
	const requesJSON = JSON.stringify({
		items: []
	})

	localStorage.setItem("reques", requesJSON)
	requesData = {
		items: []
	}
} else {
	requesData = JSON.parse(requesData);
}

const requesList = reactive({
	requesName:'VIR-2024-26-09-000008'

});


const reques = reactive(requesData);

app.provide("reques", reques);

app.provide("requesList", requesList);


setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)

app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)

app.use(pinia);

app.mount('#app')
