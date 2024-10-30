<!-- src/components/StepIcon.vue -->
<template>
	<div :class="['p-2 flex flex-col lg:flex-row lg:gap-2 lg:justify-start justify-center items-center', processClass]">
	  <div :class="classes">
		<span v-if="!complete">
		  {{ percentageCompleted }}%
		</span>
		<span class="border-[1px] border-white rounded-full w-[90%] h-[90%] flex justify-center items-center" v-else>
		  <span>
			<svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
			  <path d="M2.45101 5.69168L6.51626 9.75737L15.5152 0.757996C15.7689 0.504537 16.0764 0.377808 16.4374 0.377808C16.7985 0.377808 17.1059 0.504537 17.3597 0.757996C17.6132 1.01175 17.7371 1.32193 17.7316 1.68856C17.7257 2.05547 17.6018 2.36012 17.3597 2.60249L7.62357 12.3386C7.30711 12.6548 6.93801 12.8129 6.51626 12.8129C6.09451 12.8129 5.7254 12.6548 5.40895 12.3386L0.606506 7.53618C0.353048 7.28243 0.226318 6.97502 0.226318 6.61393C0.226318 6.25285 0.353048 5.94543 0.606506 5.69168C0.860257 5.43823 1.17044 5.31427 1.53707 5.31981C1.90399 5.32564 2.20863 5.4496 2.45101 5.69168Z" fill="white"/>
			</svg>
		  </span>
		</span>
	  </div>
	  <div class="lg:flex lg:flex-col justify-center mt-2 lg:mt-0">
		<span class="block text-center lg:text-left">{{ label }}</span>
		<span class="hidden lg:block text-center lg:text-left text-sm text-primary font-semibold ">{{ desc }}</span>
	  </div>
	</div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  // Props
  const props = defineProps({
	label: {
	  type: String,
	  required: true
	},
	desc: {
	  type: String,
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
  
  // Computed
  const classes = computed(() => {
	if(props.complete === true){
	  return 'h-10 w-10 bg-secondary border-[1px] border-secondary rounded-full flex items-center justify-center text-white';
	} else {
	  return 'h-10 w-10 border-2 border-light_gray bg-bg rounded-full flex items-center justify-center text-[10px] text-mid_gray';
	}
  });
  
  const processClass = computed(() => {
	if(props.process){
	  return 'border-2 border-secondary';
	}
	else return '';
  });
  </script>
  
  <style scoped>
  /* أضف أي تنسيقات إضافية هنا إذا لزم الأمر */
  </style>