import './index.css'

import { createApp, reactive } from 'vue'
import router from './router'
import App from './App.vue'

import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

let app = createApp(App)

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


const reques = reactive(requesData);

app.provide("reques", reques);

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)

app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)

app.mount('#app')
