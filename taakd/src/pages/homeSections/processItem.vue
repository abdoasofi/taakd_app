<!-- processItem.vue -->
<template>
    <div class="flex flex-col items-center gap-4 px-1">
      <div class="w-12 lg:w-20">
        <StyledIcon :status="status" :icon="icon" scale="2" />
      </div>
  
      <div :class="['text-xs text-center', {
        'font-bold': status === 1 || status === 2,
        'font-semibold': status === 0
      }]">
        {{ $t(label) }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import StyledIcon from "../../components/styledIcon.vue";
  
  // Props
  const props = defineProps({
    status: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: "processItem.empty" // استخدام مفتاح ترجمة بدلاً من "empty"
    },
    icon: {
      type: String,
      default: "",
    },
  });
  </script>
  
  <style scoped>
  /* أضف أي أنماط مخصصة للمكون هنا */
  </style>