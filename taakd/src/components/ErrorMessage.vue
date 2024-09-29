<!-- src/components/ErrorMessage.vue -->
<template>
    <div class="text-red-500">
      {{ message }}
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    message: {
      type: String,
      required: true
    }
  })
  </script>
  
  <style scoped>
  /* يمكنك إضافة أنماط إضافية إذا لزم الأمر */
  </style>