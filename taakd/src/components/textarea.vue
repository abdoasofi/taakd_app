<!-- textarea.vue -->
<template>
  <div class="relative">
    <!-- التسمية والعناصر المساعدة -->
    <label
      :class="[
        'mb-2 text-sm flex items-center',
        labelColorClass
      ]"
      :for="id"
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
          class="absolute bg-gray-700 text-white text-xs rounded py-1 px-2 mt-1 left-1/2 transform -translate-x-1/2 z-10"
          role="tooltip"
          :id="`${id}-tooltip`"
        >
          {{ infoText }}
        </div>
      </span>
    </label>

    <!-- حقل الـTextarea مع التحكم في فئة الإطار -->
    <div :class="textareaContainerClasses">
      <Textarea
        :variant="'outline'"
        :size="size"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="textareaValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        :class="['w-full text-black focus:ring-0 focus:outline-none']"
      />
    </div>

    <!-- رسائل التحقق من الصحة -->
    <FadeInOut>
      <p v-if="shouldShowError" class="text-red-500 text-xs mt-1">
        {{ errorMessage }}
      </p>
      <p v-else-if="isSuccess" class="text-green-500 text-xs mt-1">
        {{ successMessage }}
      </p>
    </FadeInOut>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import FadeInOut from './fadeInOut.vue';
import Textarea from 'frappe-ui/src/components/Textarea.vue';  
import { defineEmits, defineProps } from 'vue';

// تعريف الخصائص التي يقبلها المكون
const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  placeholder: {
    type: String,
    default: '',
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
  // إزالة isValid كمكون داخلي، سنقوم بإدارته داخلياً
  validationMessage: {
    type: String,
    default: '',
  },
  successMessage: { // رسالة النجاح
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
const isFocused = ref(false);

// تحديث القيمة الخارجية عند تغيّر الإدخال الداخلي
watch(textareaValue, (newVal) => {
  emit('update:modelValue', newVal);
  emit('input-change', {
    name: props.name,
    value: newVal,
  });
});

// تحديث الاختيار الداخلي عند تغيّر القيمة الخارجية
watch(
  () => props.modelValue,
  (newVal) => {
    textareaValue.value = newVal;
  }
);

// دوال للتعامل مع التركيز وفقدان التركيز
const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

// خاصية محسوبة لتحديد فئة لون التسمية
const labelColorClass = computed(() => {
  const colorMap = {
    dark_gray: 'text-gray-700',
    blue: 'text-blue-500',
    // أضف المزيد من الخريطة اللونية حسب الحاجة
  };
  return colorMap[props.labelColor] || 'text-gray-700';
});

// خاصية محسوبة لتحديد ما إذا كان هناك خطأ
const isError = computed(() => {
  return props.isMandatory && !textareaValue.value.trim();
});

// خاصية محسوبة لتحديد متى يجب إظهار رسالة الخطأ
const shouldShowError = computed(() => {
  return isError.value && !isFocused.value;
});

// خاصية محسوبة لتحديد ما إذا كان الحقل صحيحًا
const isSuccess = computed(() => {
  return !isError.value && textareaValue.value.trim();
});

// خاصية محسوبة لتحديد فئات الـTextarea Container بناءً على الحالات المختلفة
const textareaContainerClasses = computed(() => {
  return [
    'w-full p-2 rounded-lg transition-all duration-300 ease-in-out',
    'border',
    {
      'border-green-500': isFocused.value,
      'border-red-500': shouldShowError.value,
      'border-gray-300': !isFocused.value && !shouldShowError.value,
    },
  ];
});

// دالة لمعالجة إدخال البيانات وإصدار الحدث المخصص
const handleInput = (event) => {
  textareaValue.value = event.target.value;
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
.text-gray-700 {
  color: #4B5563; /* مثال على لون رمادي داكن */
}
.text-mid_gray {
  color: #6B7280; /* مثال على لون رمادي متوسط */
}
.text-warn {
  color: #F87171; /* مثال على لون أحمر للتحذير */
}
.text-secondary {
  color: #3B82F6; /* مثال على لون ثانوي */
}
.border-mid_gray {
  border-color: #6B7280;
}
.border-secondary {
  border-color: #3B82F6;
}
</style>