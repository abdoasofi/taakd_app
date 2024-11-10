<!-- ContactDialog.vue -->
<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-lg w-80 p-6 relative">
      <!-- أيقونة الإغلاق -->
      <button @click="close" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <!-- عنوان مربع الحوار -->
      <h2 class="text-xl font-semibold mb-4">{{ t('contactDialog.title') }}</h2>
      
      <!-- رسالة مربع الحوار -->
      <p class="text-gray-700">{{ t('contactDialog.message') }}</p>
      
      <!-- زر الإغلاق في الأسفل (اختياري) -->
      <!-- <button @click="close" class="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {{ t('contactDialog.close') }}
      </button> -->
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  closeFunc: {
    type: Function,
    required: true
  }
});

const { t } = useI18n();

const close = () => {
  props.closeFunc();
};
</script>

<style scoped>
/* يمكنك إضافة أنماط إضافية هنا إذا لزم الأمر */
</style>