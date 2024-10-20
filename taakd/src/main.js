import './index.css'

import { createApp, reactive } from 'vue'
import router from './router'
import App from './App.vue'

import translationPlugin from './translation'

import { createPinia } from 'pinia';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { 
	FaRegularFileAlt,
	MdDoneTwotone,
	BiMusicPlayer,
	AiProtocols,
	MdVerifiedOutlined,
	IoDocumentTextOutline,
	MdRatereviewOutlined,
	MdLogout,
	MdPhoneOutlined,
	HiLockClosed,
	MdLanguageOutlined,
	FaSearch

} from "oh-vue-icons/icons";
addIcons(
	FaRegularFileAlt,
	MdDoneTwotone,
	BiMusicPlayer,
	AiProtocols,
	MdVerifiedOutlined,
	IoDocumentTextOutline,
	MdRatereviewOutlined,
	MdLogout,
	MdPhoneOutlined,
	HiLockClosed,
	MdLanguageOutlined,
	FaSearch

);
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

// let requesData = localStorage.getItem("reques")
// if (!requesData) {
// 	const requesJSON = JSON.stringify({
// 		items: "gggggggggggggg"
// 	})

// 	localStorage.setItem("reques", requesJSON)
// 	requesData = {
// 		items: []
// 	}
// } else {
// 	requesData = JSON.parse(requesData);
// }

// const requesList = reactive({
// 	requesName:'ffffffffffff'

// });



// const reques = reactive(requesData);

// app.provide("reques", reques);

// app.provide("requesList", requesList);


setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)
app.use(translationPlugin)

app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)
app.component("v-icon", OhVueIcon);
app.use(pinia);

app.mount('#app')






