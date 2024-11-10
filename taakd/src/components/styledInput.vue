<!-- styledInput.vue -->
<template>
  <div class="relative">
    <!-- التسمية مع اللون الديناميكي ومؤشر إلزامي اختياري وأيقونة معلومات -->
    <label :class="['mb-2 text-sm flex items-center', labelColorClass]" :for="id">
      {{ labelText }}
      <!-- مؤشر إلزامي -->
      <span v-if="isMandatory" class="ltr:ml-1 rtl:mr-1 text-red-500">*</span>
      <!-- أيقونة معلومات -->
      <button
        v-if="infoText"
        class="ltr:ml-2 rtl:mr-2 cursor-pointer relative"
        @mouseover="showInfo = true"
        @mouseleave="showInfo = false"
        aria-label="مزيد من المعلومات"
      >
        <svg
          class="w-5 h-5 text-mid_gray text-[10px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h1m0-4h-1v1h-1v1h1v2h1v-2h1v-1h-1V9zm-1-6a9 9 0 100 18 9 9 0 000-18z"
          />
        </svg>
        <!-- تلميح معلومات -->
        <div
          v-if="showInfo"
          class="absolute bg-gray-700 text-white text-xs rounded py-1 px-2 mt-1 start-1/2 transform -translate-x-1/2 z-10"
          role="tooltip"
          :id="`${id}-tooltip`"
        >
          {{ infoText }}
        </div>
      </button>
    </label>

    <!-- حقل الإدخال -->
    <input
      :id="id"
      :name="name"
      :type="inputType"
      :class="inputClasses"
      :value="modelValue"
      @input="onInput"
      @focus="isFocused = true"
      @blur="handleBlur"
      :placeholder="placeholder"
      :aria-describedby="infoText ? `${id}-tooltip` : null"
    />

    <!-- رسائل التحقق من الصحة -->
    <FadeInOut>
      <p v-if="shouldShowError" class="text-red-500 text-xs mt-1">
        {{ errorMessage }}
      </p>
      <p v-else-if="successMessage" class="text-green-500 text-xs mt-1">
        {{ successMessage }}
      </p>
    </FadeInOut>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import FadeInOut from './fadeInOut.vue';

// تعريف props لدعم v-model
const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
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
  inputType: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: 'هذا الحقل مطلوب.',
  },
  successMessage: {
    type: String,
    default: '',
  },
});

// تعريف emit لدعم v-model
const emit = defineEmits(['update:modelValue']);

// إدارة حالة عرض المعلومات
const showInfo = ref(false);

// إدارة حالة التركيز
const isFocused = ref(false);

// تعريف حالة الخطأ
const isError = computed(() => {
  return props.isMandatory && !props.modelValue;
});

// تحديد متى يجب إظهار رسالة الخطأ
const shouldShowError = computed(() => {
  return isError.value && !isFocused.value;
});

// خاصية محسوبة لتحديد فئة لون التسمية
const labelColorClass = computed(() => {
  const colorMap = {
    dark_gray: 'text-dark_gray',
    blue: 'text-blue-500',
    // أضف المزيد من الخريطة اللونية حسب الحاجة
  };
  return colorMap[props.labelColor] || 'text-dark_gray';
});

// خاصية محسوبة لتحديد فئات الإدخال بناءً على حالة التركيز والخطأ
const inputClasses = computed(() => {
  return [
    'bg-transparent w-full p-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-dashed',
    'border',
    {
      'border-green-500': isFocused.value,
      'border-red-500': shouldShowError.value,
      'border-gray-300': !isFocused.value && !shouldShowError.value,
    },
  ];
});

// معالجة الإدخال بدون استخدام الديبونس
const onInput = (event) => {
  emit('update:modelValue', event.target.value);
};

// التعامل مع فقدان التركيز
const handleBlur = () => {
  isFocused.value = false;
};
</script>

<style scoped>
/* تعريف فئات عرض الحد المخصص إذا لزم الأمر */
.border-1 {
  border-width: 1px;
}
.border-3 {
  border-width: 3px;
}
</style>