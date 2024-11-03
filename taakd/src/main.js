// main.js
import './index.css';

import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import translationPlugin from './translation';

import { createPinia } from 'pinia';
import { OhVueIcon, addIcons } from "oh-vue-icons";
// استيراد الأيقونات
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
    FaSearch,
    RiUploadCloudLine
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
    FaSearch,
    RiUploadCloudLine
);

import { Button, Card, Input, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui';

// استيراد ملفات الترجمة
import en from './locales/en.json';
import ar from './locales/ar.json';

// إعداد i18n
const i18n = createI18n({
    locale: 'ar', // اللغة الافتراضية
    messages: {
        en,
        ar,
    }
});

let app = createApp(App);

const pinia = createPinia();

setConfig('resourceFetcher', frappeRequest);

app.use(router);
app.use(resourcesPlugin);
app.use(translationPlugin);
app.use(i18n); // إضافة i18n إلى التطبيق

app.component('Button', Button);
app.component('Card', Card);
app.component('Input', Input);
app.component("v-icon", OhVueIcon);
app.use(pinia);

app.mount('#app');