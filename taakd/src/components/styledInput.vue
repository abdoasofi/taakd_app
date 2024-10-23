<!-- styledInput.vue -->
<template>
  <div class="relative">
    <!-- التسمية مع اللون الديناميكي ومؤشر إلزامي اختياري وأيقونة معلومات -->
    <label :class="['mb-2 text-sm flex items-center', labelColorClass]" :for="id">
      {{ labelText }}
      <!-- مؤشر إلزامي -->
      <span v-if="isMandatory" class="ml-1 text-red-500">*</span>
      <!-- أيقونة معلومات -->
      <button
        v-if="infoText"
        class="ml-2 cursor-pointer relative"
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
          class="absolute bg-gray-700 text-white text-xs rounded py-1 px-2 mt-1 left-1/2 transform -translate-x-1/2 z-10"
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
      @blur="isFocused = false"
      :placeholder="placeholder"
      :aria-describedby="infoText ? `${id}-tooltip` : null"
    />

    <!-- رسائل التحقق من الصحة -->
    <FadeInOut>
      <p v-if="isValid === false" class="text-warn text-[10px] ">
        <template v-if="Array.isArray(validationMessages)">
          <div v-for="(msg, index) in validationMessages" :key="index">{{ msg }}</div>
        </template>
        <template v-else>
          {{ validationMessages }}
        </template>
      </p>
    </FadeInOut>
    <FadeInOut>
      <p v-if="isValid === true" class="text-mid_gray text-[10px]">
        {{ validationMessages }}
      </p>
    </FadeInOut>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
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
  isValid: {
    type: [Boolean, null],
    default: null,
  }, // حالة صلاحية الإدخال (true, false, أو null)
  validationMessages: {
    type: [String, Array],
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Enter at least 3 characters',
  },
});

// تعريف emit لدعم v-model
const emit = defineEmits(['update:modelValue']);

// إدارة حالة عرض المعلومات
const showInfo = ref(false);

// إدارة حالة التركيز
const isFocused = ref(false);

// خاصية محسوبة لتحديد فئة لون التسمية
const labelColorClass = computed(() => {
  const colorMap = {
    dark_gray: 'text-dark_gray',
    blue: 'text-blue-500',
    // أضف المزيد من الخريطة اللونية حسب الحاجة
  };
  return colorMap[props.labelColor] || 'text-dark_gray';
});

// خاصية محسوبة لتحديد فئات الإدخال بناءً على حالة الصلاحية والتركيز
const inputClasses = computed(() => {
  return [
    'bg-transparent w-full p-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-dashed',
    {
      'border border-mid_gray': !isFocused.value && props.isValid === null,
      'border border-warn': !isFocused.value && props.isValid === false,
      'border border-mid_gray': !isFocused.value && props.isValid === true,
      'border border-green': isFocused.value, // الإطار الأخضر عند التركيز
      // يمكنك إضافة المزيد من الفئات بناءً على الحاجة
    },
  ];
});

// معالجة الإدخال بدون استخدام الديبونس
const onInput = (event) => {
  emit('update:modelValue', event.target.value);
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