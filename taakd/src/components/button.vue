<template>
  <button 
    :disabled="disabled" 
    @click="emit" 
    :class="btnClass"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

// Define props
const props = defineProps({
  level: {
    type: String,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false, // Optional default value
  }
});

// Define emits
const emitEvent = defineEmits(['clicked']);

// Computed property for button class
const btnClass = computed(() => {
  return {
    'bg-secondary hover:bg-secondary_hover px-4 py-2 text-white rounded-[100px] shadow': props.level === 'primary',
    'be-white border-[0.8px] hover:bg-hover border-primary px-4 py-2 text-primary text-sm font-medium rounded-[100px]': props.level === 'secondary',
    'bg-light_gray hover:bg-hover text-mid_gray px-4 py-2 text-sm font-medium rounded-[100px]': props.level === 'other',
    'bg-info/15 shadow-sm hover:bg-hover text-black px-2 py-1 text-sm font-medium rounded-lg': props.level === 'edit',
  };
});

// Emit function for click event
const emit = () => {
  emitEvent('clicked');
};
</script>

<style scoped>
.shadow {
  box-shadow: 0px 1px 6px 0px #00000052;
}
</style>
