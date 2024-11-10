<template>
  <div class="">
    <!-- <Header /> -->
    <div>
      <router-view />
    </div>
      <!-- <Footer /> -->

  </div>


</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

// تحديد اتجاه النص بناءً على اللغة
const currentDir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'));

</script>
