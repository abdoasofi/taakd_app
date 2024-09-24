<template>
    <component :is="tag" :class="headingClass">
      <slot />
    </component>
  </template>
  
  <script setup>
  import { computed } from 'vue';


// Props
const props = defineProps({
	tag: {
		type: String,
		default: 'h1',
	},
	level: {
		type: String,
		default: 'primary',
	},
});

// Computed
const headingClass = computed(() => {
	return {
		'text-2xl font-bold leading-10': props.level === 'primary',
		'text-xl font-bold  leading-8': props.level === 'secondary',
		'text-[16px] font-semibold leading-7': props.level === 'secondary-2',
	};
})

  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
  