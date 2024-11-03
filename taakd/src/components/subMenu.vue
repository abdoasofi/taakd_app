<template>
  <div class="absolute w-screen top-12 end-0 z-40">
    <div class="container flex justify-end">
      <div class="rounded bg-white p-6 men_shadow min-w-80 shrink grow-0">
        <div class="flex justify-between items-start">
          <div class="space-y-1 text-dark_gray">
            <div class="font-semibold">{{ session.user }}</div>
          </div>
          <button class="text-lg font-bold" @click="closeFunc">x</button>
        </div>
        <div class="flex flex-col gap-3 text-black font-medium text-[14px] mt-4">
          <button class="flex justify-between border-b-[1px] border-b-light_gray hover:bg-gray-50" @click="toggleLanguageMenu">
            <div class="flex gap-3 items-center">
              <div>
                <v-icon scale="2" name="md-language-outlined" />
              </div>
              <div>{{ t('languages') }}</div>
            </div>
            <div class="font-normal text-mid_gray">{{ currentLanguage === 'en' ? 'English' : 'العربية' }}</div>
          </button>

          <!-- قائمة اختيار اللغة -->
          <div v-if="languageMenuVisible" class="absolute bg-white border border-gray-200 rounded mt-2 shadow-lg z-50">
            <button @click="changeLanguage('en')" class="block px-4 py-2 hover:bg-gray-100 w-full text-left">English</button>
            <button @click="changeLanguage('ar')" class="block px-4 py-2 hover:bg-gray-100 w-full text-left">العربية</button>
          </div>

          <button @click="router.replace({ name: 'reset' });" class="flex gap-3 items-center border-b-[1px] border-b-light_gray hover:bg-gray-50">
            <div>
              <v-icon scale="2" name="hi-lock-closed" />
            </div>
            <div>Change Password</div>
          </button>
          <button class="flex gap-3 items-center border-b-[1px] border-b-light_gray hover:bg-gray-50">
            <div>
              <v-icon scale="2" name="md-phone-outlined" />
            </div>
            <div>Contact Us</div>
          </button>
          <button @click="session.logout.submit()" class="flex gap-3 items-center hover:bg-gray-50">
            <div>
              <v-icon scale="2" name="md-logout" />
            </div>
            <div class="text-warn">Log Out</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import { computed, ref } from 'vue';
import { session } from '../data/session';
import { useVerificationRequestStore } from '../stores/verificationRequest';
import { useI18n } from 'vue-i18n';

const store = useVerificationRequestStore();
const { t, locale } = useI18n();

const props = defineProps({
    closeFunc: { type: Function }
});

const currentLanguage = computed(() => locale.value);
const languageMenuVisible = ref(false); // حالة رؤية قائمة اللغة

const toggleLanguageMenu = () => {
    languageMenuVisible.value = !languageMenuVisible.value; // عكس حالة رؤية القائمة
};

const changeLanguage = (lang) => {
    locale.value = lang; // تغيير اللغة
    languageMenuVisible.value = false; // إخفاء القائمة بعد اختيار اللغة
};

</script>

<style scoped>
.men_shadow {
    box-shadow: 0px 1px 6px 0px #00000052;
}
</style>