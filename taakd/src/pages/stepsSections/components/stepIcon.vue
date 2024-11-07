<!-- src/components/StepIcon.vue -->
<template>
	<div
	  :class="[
		'p-2 flex flex-col lg:flex-row lg:gap-2 lg:justify-start justify-center items-center transition-colors duration-300',
		processClass,
		{ 'bg-green-100': isHovered }
	  ]"
	  @click="handleClick"
	>
	  <!-- الدائرة مع تقدم النسبة المئوية -->
	  <div class="relative h-12 w-12">
		<!-- الدائرة الخلفية -->
		<svg class="absolute top-0 left-0 w-full h-full">
		  <circle
			cx="50%"
			cy="50%"
			r="18" 
			stroke="#e4e4e4" 
			stroke-width="4"
			fill="none"
		  />
		  <!-- دائرة التقدم -->
		  <circle
			cx="50%"
			cy="50%"
			r="18" 
			stroke="#81C045" 
			stroke-width="4"
			fill="none"
			:stroke-dasharray="circumference"
			:stroke-dashoffset="offset"
			stroke-linecap="round"
			class="transition-all duration-500"
		  />
		</svg>
		
		<!-- محتوى الدائرة (النسبة أو علامة الصح) -->
		<div class="absolute inset-0 flex items-center justify-center ">
			<div class=" rounded-full w-[75%] h-[75%] flex justify-center items-center ">
		  <span v-if="!complete" class="text-xs font-medium text-mid_gray">
			{{ percentageCompleted }}%
		  </span>
		  <span
			class="border-[1px] border-white rounded-full w-[90%] h-[90%] flex justify-center items-center bg-secondary"
			v-else
		  >
			<svg
			  width="18"
			  height="13"
			  viewBox="0 0 18 13"
			  fill="none"
			  xmlns="http://www.w3.org/2000/svg"
			>
			  <path
				d="M2.45101 5.69168L6.51626 9.75737L15.5152 0.757996C15.7689 0.504537 16.0764 0.377808 16.4374 0.377808C16.7985 0.377808 17.1059 0.504537 17.3597 0.757996C17.6132 1.01175 17.7371 1.32193 17.7316 1.68856C17.7257 2.05547 17.6018 2.36012 17.3597 2.60249L7.62357 12.3386C7.30711 12.6548 6.93801 12.8129 6.51626 12.8129C6.09451 12.8129 5.7254 12.6548 5.40895 12.3386L0.606506 7.53618C0.353048 7.28243 0.226318 6.97502 0.226318 6.61393C0.226318 6.25285 0.353048 5.94543 0.606506 5.69168C0.860257 5.43823 1.17044 5.31427 1.53707 5.31981C1.90399 5.32564 2.20863 5.4496 2.45101 5.69168Z"
				fill="white"
			  />
			</svg>
		  </span>
		</div>
		</div>
	  </div>
  
	  <!-- تفاصيل المرحلة -->
	  <div
		class="ltr:ml-4 rtl:mr-4 lg:flex lg:flex-col justify-center mt-2 lg:mt-0"
		@mouseenter="onMouseEnter"
		@mouseleave="onMouseLeave"
	  >
		<span class="block text-center lg:text-left rtl:lg:text-right">{{ label }}</span>
		<span class="hidden lg:block text-center lg:text-left rtl:lg:text-right text-sm text-primary font-semibold">
		  {{ desc }}
		</span>
	  </div>
	</div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  
  // تعريف الأحداث المرسلة
  const emit = defineEmits(['click']);
  
  // Props
  const props = defineProps({
	label: {
	  type: String,
	  required: true
	},
	desc: {
	  type: String,
	  required: false,
	  default: ''
	},
	process: {
	  type: Boolean,
	  required: true
	},
	complete: {
	  type: Boolean,
	  default: false
	},
	percentageCompleted: {
	  type: Number,
	  default: 0
	}
  });
  
  // معامل محيط الدائرة (r = 18, ليكون مناسباً للدائرة بحجم h-12 w-12)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  
  // حساب الإزاحة بناءً على النسبة المئوية
  const offset = computed(() => circumference - (props.percentageCompleted / 100) * circumference);
  
  // تحديد لون التقدم (ثابت للأخضر كما طلبت)
  const progressColor = computed(() => {
	if (props.complete) return '#10B981'; // أخضر للمكتملة
	if (props.process) return '#10B981'; // استخدام الأخضر للمرحلة الحالية بدل الأزرق
	return '#6B7280'; // رمادي للمراحل التي لم تبدأ بعد
  });
  
  // تحديد كلاس الحاوية بناءً على حالة `process`
  const processClass = computed(() => {
	return props.process ? 'border-2 border-secondary rounded-lg' : '';
  });
  
  // حالات التحويم
  const isHovered = ref(false);
  
  // دالة التعامل مع النقر
  const handleClick = () => {
	emit('click');
  };
  
  // دوال التحويم
  const onMouseEnter = () => {
	isHovered.value = true;
  };
  
  const onMouseLeave = () => {
	isHovered.value = false;
  };
  </script>
  
  <style scoped>
  /* إضافة أي تنسيقات إضافية هنا إذا لزم الأمر */
  </style>