<!-- select.vue -->
<template>
  <div class="relative">
    <!-- التسمية مع اللون الديناميكي ومؤشر إلزامي اختياري وأيقونة معلومات -->
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
        <!-- تلميح معلومات -->
        <div
          v-if="showInfo"
          class="absolute bg-gray-700 text-white text-xs rounded py-1 px-2 mt-1 start-1/2 transform -translate-x-1/2 z-10"
          role="tooltip"
          :id="`${id}-tooltip`"
        >
          {{ infoText }}
        </div>
      </span>
    </label>

    <!-- حقل Select مع التحكم في فئة الإطار -->
    <div :class="selectContainerClasses">
      <select
        class="w-full focus:ring-0 focus:outline-none bg-transparent"
        :id="id"
        :name="name"
        v-model="selectedOption"
        @change="emitSelected"
        @focus="handleFocus"
        @blur="handleBlur"
        :aria-describedby="infoText ? `${id}-tooltip` : null"
      >
        <option disabled value="">
          {{ placeholder }}
        </option>
        <option v-for="(option, index) in options" :key="index" :value="option.value">
          {{ option.label }}
        </option>
      </select>
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

// تعريف الخصائص التي يستقبلها المكون
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
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: 'اختر خيارًا',
  },
  errorMessage: {
    type: String,
    default: 'هذا الحقل مطلوب.',
  },
  successMessage: {
    type: String,
    default: 'تم الاختيار بنجاح!',
  },
});

// تعريف emit لدعم v-model
const emit = defineEmits(['update:modelValue', 'input-change']);

// إدارة حالة عرض المعلومات
const showInfo = ref(false);

// إدارة حالة التركيز
const isFocused = ref(false);

// تخزين قيمة الاختيار الحالي
const selectedOption = ref(props.modelValue);

// تحديث القيمة الخارجية عند تغيّر الاختيار الداخلي
watch(selectedOption, (newVal) => {
  emit('update:modelValue', newVal);
});

// تحديث الاختيار الداخلي عند تغيّر القيمة الخارجية
watch(
  () => props.modelValue,
  (newVal) => {
    selectedOption.value = newVal;
  }
);

// الدوال للتعامل مع التركيز وفقدان التركيز
const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

// خاصية محسوبة لتحديد فئة لون التسمية
const labelColorClass = computed(() => {
  const colorMap = {
    dark_gray: 'text-dark_gray',
    blue: 'text-blue-500',
    // أضف المزيد من الخريطة اللونية حسب الحاجة
  };
  return colorMap[props.labelColor] || 'text-dark_gray';
});

// خاصية محسوبة لتحديد ما إذا كان هناك خطأ
const isError = computed(() => {
  return props.isMandatory && !selectedOption.value;
});

// خاصية محسوبة لتحديد متى يجب إظهار رسالة الخطأ
const shouldShowError = computed(() => {
  return isError.value && !isFocused.value;
});

// خاصية محسوبة لتحديد ما إذا كان الحقل صحيحًا
const isSuccess = computed(() => {
  return !isError.value && selectedOption.value;
});

// خاصية محسوبة لتحديد فئات الـ Select Container بناءً على الحالات المختلفة
const selectContainerClasses = computed(() => {
  let baseClasses = 'bg-transparent w-full p-2 rounded-lg transition-all duration-300 ease-in-out';
  
  if (isFocused.value) {
    return `${baseClasses} border border-green-500`;
  } else if (shouldShowError.value) {
    return `${baseClasses} border border-red-500`;
  } else if (!isFocused.value && !shouldShowError.value) {
    return `${baseClasses} border border-gray-300`;
  }
  return baseClasses;
});

// دالة لمعالجة تغيير الاختيار وإرسال الحدث
const emitSelected = () => {
  emit('input-change', {
    name: props.name,
    value: selectedOption.value,
  });
};
</script>

<style scoped>
/* تعريف فئات حدود مخصصة إذا لزم الأمر */
.border-1 {
  border-width: 1px;
}
.border-3 {
  border-width: 3px;
}
.text-dark_gray {
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