<!-- src/components/autocomp.vue -->
<template>
  <div class="relative">
    <label
      :class="[
        'mb-2 text-sm flex items-center',
        {
          [`text-${labelColor}`]: true
        }
      ]"
    >
      {{ labelText }}
      <span v-if="isMandatory" class="ltr:ml-1 rtl:mr-1 text-red-500">*</span>
      <span 
        v-if="infoText" 
        class="ltr:ml-2 rtl:mr-2 cursor-pointer relative" 
        @mouseover="showInfo = true" 
        @mouseleave="showInfo = false"
      >
        <svg class="w-5 h-5 text-mid_gray text-[10px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M13 16h-1v-4h1m0-4h-1v1h-1v1h1v2h1v-2h1v-1h-1V9zm-1-6a9 9 0 100 18 9 9 0 000-18z"/>
        </svg>
        <div v-if="showInfo" class="absolute bg-gray-700 text-white text-xs rounded py-1 px-2 mt-1 start-1/2 transform -translate-x-1/2">
          {{ infoText }}
        </div>
      </span>
    </label>
    <div :class="[
      'bg-transparent w-full p-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-none',
      {
        'border-1 border-mid_gray focus:border-black focus:ring-0': isValid === null,
        'border-1 border-warn focus:ring-warn': isValid === false,
        'border-3 border-mid_gray focus:border-black': isValid === true
      }
    ]">
      <Autocomplete
        :options="options"
        :modelValue="modelValue" 
        @update:modelValue="handleChange" 
        :class="['w-full text-black focus:ring-0 focus:outline-none focus:border-none']"
      />
    </div>
    <FadeInOut>
      <p v-if="isValid === false" class="text-warn text-[10px]">{{ validationMessage }}</p>
    </FadeInOut>
    <FadeInOut>
      <!-- يمكن إضافة رسائل إضافية إذا لزم الأمر -->
    </FadeInOut>
  </div>
</template>

<script setup lang="ts">
import FadeInOut from './fadeInOut.vue';
import { ref } from 'vue';
import { defineEmits, defineProps } from 'vue';
import { Autocomplete } from 'frappe-ui';

// تعريف نوع البيانات
interface AutocompleteValue {
  value: string;
}

// تعريف الخصائص (props)
const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  options: {
    type: Array, // تحديد نوع البيانات كـ Array
    required: true,
  },
  customClass: {
    type: String,
    default: "",
  },
  validationMessage: {
    type: String,
    default: "",
  },
  isValid: {
    type: Boolean,
    default: null,
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
  modelValue: { // تعريف modelValue لدعم v-model
    type: [String, Object],
    default: '',
  },
});

// تعريف الأحداث (emits)
const emit = defineEmits(['update:modelValue', 'input-change']);

// الحالة المحلية لإظهار/إخفاء معلومات إضافية
const showInfo = ref(false);

// دالة لمعالجة التغيير في الاختيار مع Type Guard
const handleChange = (newValue: string | AutocompleteValue) => {
  console.log('Autocomplete changed:', newValue);
  if (typeof newValue === 'object' && 'value' in newValue) {
    emit('update:modelValue', newValue.value);
    emit('input-change', { name: props.name, value: newValue.value });
  } else {
    emit('update:modelValue', newValue);
    emit('input-change', { name: props.name, value: newValue });
  }
};
</script>

<style scoped>
/* تخصيص عرض الحدود */
.border-1 {
  border-width: 1px;
}
.border-3 {
  border-width: 3px;
}
</style>