<!-- textarea.vue -->
<template>
  <div class="relative">
    <!-- التسمية والعناصر المساعدة -->
    <label
      :class="[
        'mb-2 text-sm flex items-center',
        { [`text-${labelColor}`]: true }
      ]"
    >
      {{ labelText }}
      <!-- مؤشر إلزامي -->
      <span v-if="isMandatory" class="ltr:ml-1 rtl:mr-1 text-red-500">*</span>
      <!-- أيقونة معلومات -->
      <span
        v-if="infoText"
        class="ltr:ml-2 rtl:mr-2 cursor-pointer relative"
        @mouseover="showInfo = true"
        @mouseleave="showInfo = false"
      >
        <svg
          class="w-5 h-5 text-mid_gray text-[10px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h1m0-4h-1v1h-1v1h1v2h1v-2h1v-1h-1V9zm-1-6a9 9 0 100 18 9 9 0 000-18z"
          />
        </svg>
        <!-- تلميح المعلومات -->
        <div
          v-if="showInfo"
          class="absolute bg-gray-700 text-white text-xs rounded py-1 px-2 mt-1 start-1/2 transform -translate-x-1/2"
        >
          {{ infoText }}
        </div>
      </span>
    </label>

    <!-- حقل النصarea -->
    <div
      :class="[
        'bg-transparent w-full p-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-none',
        {
          'border-1 border-mid_gray focus:border-black focus:ring-0': isValid === null,
          'border-1 border-warn focus:ring-warn': isValid === false,
          'border-3 border-secondary focus:ring-secondary': isValid === true
        }
      ]"
    >
      <Textarea
        :variant="'outline'"
        :size="size"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="textareaValue"
        @input="handleInput"
        :class="['w-full text-black focus:ring-0 focus:outline-none focus:border-none']"
      />
    </div>

    <!-- رسائل التحقق من الصحة -->
    <FadeInOut>
      <p v-if="isValid === false" class="text-warn text-[10px]">
        {{ validationMessage }}
      </p>
    </FadeInOut>
    <FadeInOut>
      <p v-if="isValid === true" class="text-secondary text-[10px]">
        {{ validationMessage }}
      </p>
    </FadeInOut>
  </div>
</template>

<script setup>
import FadeInOut from './fadeInOut.vue';
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';
import Textarea from 'frappe-ui/src/components/Textarea.vue';  

// تعريف الخصائص التي يقبلها المكون
const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  placeholder: {
    type: String,
    default: 'Placeholder',
  },
  labelText: {
    type: String,
    default: 'Label',
  },
  labelColor: {
    type: String,
    default: 'dark_gray',
  },
  isMandatory: {
    type: Boolean,
    default: false,
  },
  infoText: {
    type: String,
    default: '',
  },
  isValid: {
    type: Boolean,
    default: null,
  },
  validationMessage: {
    type: String,
    default: '',
  },
  size: { // حجم النصarea
    type: String,
    default: 'xl',
  },
  disabled: { // تعطيل النصarea
    type: Boolean,
    default: false,
  },
  modelValue: { // القيمة المرتبطة بـ v-model
    type: String,
    default: '',
  },
});

// تعريف الأحداث التي يصدرها المكون
const emit = defineEmits(['update:modelValue', 'input-change']);

// إدارة الحالة الداخلية
const textareaValue = ref(props.modelValue || '');
const showInfo = ref(false);

// دالة التعامل مع إدخال البيانات وإصدار الحدث المخصص
const handleInput = (event) => {
  textareaValue.value = event.target.value;
  
  // إصدار الحدث الافتراضي لـ v-model
  emit('update:modelValue', textareaValue.value);
  
  // إصدار الحدث المخصص إذا كنت بحاجة إليه
  emit('input-change', {
    name: props.name,
    value: textareaValue.value,
  });
};
</script>

<style scoped>
/* Utility لتحديد عرض الحدود في Tailwind */
.border-1 {
  border-width: 1px;
}
.border-3 {
  border-width: 3px;
}
/* يمكنك إضافة أنماط إضافية حسب الحاجة */
</style>
