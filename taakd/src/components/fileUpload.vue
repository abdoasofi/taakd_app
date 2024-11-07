<!-- src/components/fileUpload.vue -->
<template>
  <div class="p-5">
    <div class="bg-info/15 rounded-xl border-mid_gray border-[1px] border-dashed p-5 flex flex-col gap-5 items-center">
      <div class="h-12 w-12 border-none"> <StyledIcon  scalse=2 icon="ri-upload-cloud-line"/></div>
      <div v-if="!modelValue" class="font-semibold text-sm text-darkest_gray">Choose a file</div>
      <div v-if="!modelValue" class="font-normal text-[10px] text-darkest_gray text-center leading-4">
        JPEG, PNG, PDF, and MP4 formats up to 20MB
      </div>
      
      <!-- Input File (Uncommented) -->
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
        <slot v-if="!modelValue">
          <div class="be-white border-[0.8px] hover:bg-hover border-primary px-4 py-2 text-primary text-sm font-medium rounded-[100px]">
            Select File
          </div>
        </slot>
      </label>
      
      <!-- Display Selected File Name -->
      <span v-if="modelValue">
        <template v-if="typeof modelValue === 'string'">
          <a
            :href="modelValue"
            target="_blank"
            class="ltr:ml-2 rtl:mr-2 text-blue-600 underline"
          >
            View File
          </a>
        </template>
        <template v-else>
          {{ modelValue.name }}
        </template>
      </span>
      
      <!-- Display Validation Message -->
      <span v-if="validationMessage" class="text-red-500 text-xs mt-1">
        {{ validationMessage }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import StyledIcon from './styledIcon.vue';

// تعريف الخصائص (Props)
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Object as () => File | string | null, // دعم كائن File أو رابط الملف (string)
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