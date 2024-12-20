// main.js
import './index.css';

import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import translationPlugin from './translation';
import Cookies from 'js-cookie';
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
    RiUploadCloudLine,
    BiArrowLeft,
    BiArrowRight,
    FcCheckmark,
    PrArrowLeft,
    PrArrowRight,
    FaMinus    
    
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
    RiUploadCloudLine,
    BiArrowLeft,
    BiArrowRight,
    FcCheckmark,
    PrArrowLeft,
    PrArrowRight,
    FaMinus    
);

import { Button, Card, Input, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui';

// استيراد ملفات الترجمة
import en from './locales/en.json';
import ar from './locales/ar.json';

let locale = Cookies.get('locale') || "en";

if (locale === 'ar') {
    document.documentElement.dir ='rtl';
  }
  else{
    document.documentElement.dir ='ltr';
  }

document.documentElement.lang =locale;

const i18n = createI18n({
    locale: locale, // اللغة الافتراضية
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