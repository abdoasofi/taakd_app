<!-- src/components/cookies.vue -->


<template>
    <div class="p-4 lg:container lg:gap-3 text-white flex justify-between lg:justify-end bg-darkest_gray fixed bottom-0 w-screen">
        <div class="flex flex-col lg:flex-row lg:grow lg:justify-between items-center gap-3">
            <div>{{ $t('cookies.we_care_about_your_data') }}</div>
            <Button level="primary">{{ $t('cookies.accept') }}</Button>
        </div>
        <span class="block text-white cursor-pointer" @click="closeCookies">{{ $t('cookies.close') }}</span>
    </div>
</template>

<script setup lang="ts">
import Button from './button.vue';
import { ref } from 'vue';

// استخدام مكتبة vueuse لإدارة الكوكيز


</script>

<style scoped>
/* تنسيقات إضافية لتحسين مظهر نافذة الكوكيز */
.cursor-pointer {
  cursor: pointer;
}
</style>