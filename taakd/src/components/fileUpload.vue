<!-- /src/components/fileUpload.vue -->
<template>
    <div class="p-5">
      <div class="bg-info/15 rounded-xl border-mid_gray border-[1px] border-dashed p-5 flex flex-col gap-5 items-center">
        <div class="h-8 w-8 bg-dark_gray"></div>
        <div class="font-semibold text-sm text-darkest_gray">Choose a file</div>
        <div class="font-normal text-[10px] text-darkest_gray text-center leading-4">
          JPEG, PNG, PDF, and MP4 formats up to 20MB
        </div>
        
        <!-- Input File (Hidden) -->
        <input
          :name="name"
          :id="id"
          class="hidden"
          type="file"
          @change="onFileChange"
          :accept="acceptFormats"
        />
        
        <!-- Label Triggering the File Input -->
        <label :for="id" class="cursor-pointer">
          <Button level="secondary">
            Select File
          </Button>
        </label>
        
        <!-- Display Selected File Name -->
        <span v-if="modelValue">{{ modelValue.name }}</span>
        
        <!-- Display Validation Message -->
        <span v-if="validationMessage" class="text-red-500 text-xs mt-1">
          {{ validationMessage }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Button from './button.vue';
  import { defineProps, defineEmits } from 'vue';
  
  // تعريف الخصائص (Props)
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object as () => File | null,
      default: null,
    },
    acceptFormats: {
      type: String,
      default: '.jpeg,.jpg,.png,.pdf,.mp4',
    },
    validationMessage: {
      type: String,
      default: '',
    },
  });
  
  // تعريف الأحداث (Emits)
  const emit = defineEmits(['update:modelValue']);
  
  // دالة التعامل مع تغيير الملف
  const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      emit('update:modelValue', target.files[0]);
    } else {
      emit('update:modelValue', null);
    }
  };
  </script>
  
  <style scoped>
  /* يمكنك إضافة أنماط إضافية هنا إذا لزم الأمر */
  </style>