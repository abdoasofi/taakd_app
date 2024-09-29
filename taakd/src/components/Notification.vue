<!-- Notification.vue -->
<template>
    <div v-if="show" :class="notificationClasses">
      <div v-html="message"></div>
      <button @click="close" class="mt-2 text-sm text-gray-500">إغلاق</button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineProps, computed } from 'vue'
  
  const props = defineProps({
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info' // 'success', 'error', etc.
    }
  })
  
  const show = ref(true)
  
  const notificationClasses = computed(() => {
    switch(props.type) {
      case 'success':
        return 'fixed top-4 right-4 p-4 rounded shadow-lg bg-green-100 text-green-700'
      case 'error':
        return 'fixed top-4 right-4 p-4 rounded shadow-lg bg-red-100 text-red-700'
      case 'warning':
        return 'fixed top-4 right-4 p-4 rounded shadow-lg bg-yellow-100 text-yellow-700'
      default:
        return 'fixed top-4 right-4 p-4 rounded shadow-lg bg-blue-100 text-blue-700'
    }
  })
  
  const close = () => {
    show.value = false
  }
  </script>
  
  <style scoped>
  /* يمكن إضافة بعض الأنماط الإضافية هنا */
  </style>