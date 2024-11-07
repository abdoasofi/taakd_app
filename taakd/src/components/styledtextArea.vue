<template>
    <div class="relative">
      <!-- Label with dynamic color and optional mandatory indicator and info icon -->
      <label
        :class="[
          'mb-2 text-sm flex items-center',
          {
            [`text-${labelColor}`]: true
          }
        ]"
        :for="id"
      >
        {{ labelText }}
        <!-- Mandatory indicator -->
        <span v-if="isMandatory" class="ltr:ml-1 rtl:mr-1 text-red-500">*</span>
        <!-- Info icon -->
        <span v-if="infoText" class="ltr:ml-2 rtl:mr-2 cursor-pointer relative" @mouseover="showInfo = true" @mouseleave="showInfo = false">
          <svg class="w-5 h-5 text-mid_gray text-[10px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h1m0-4h-1v1h-1v1h1v2h1v-2h1v-1h-1V9zm-1-6a9 9 0 100 18 9 9 0 000-18z"/>
          </svg>
          <!-- Info tooltip -->
          <div v-if="showInfo" class="absolute bg-gray-700 text-white text-xs rounded py-1 px-2 mt-1 start-1/2 transform -translate-x-1/2">
            {{ infoText }}
          </div>
        </span>
      </label>
  
      <!-- Input field -->
      <textarea
       :id="id"
      :name="name"
        :type="inputType" 
        :class="[
          'bg-transparent w-full p-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-none',
          {
            'border-1 border-mid_gray focus:border-black focus:ring-0': isValid === null,
            'border-1 border-warn focus:ring-warn': isValid === false,
            'border-3 border-secondary focus:ring-secondary': isValid === true
          }
        ]"
        v-model="inputValue"
        @input="sendValueToParent"
        placeholder="Enter at least 3 characters"
      />
  
    <FadeInOut>  
        <p v-if="isValid === false" class="text-warn  text-[10px]">{{ validationMessage }}</p>
    </FadeInOut>
    <FadeInOut>  
        <p v-if="isValid === true" class="text-secondary  text-[10px]">{{ validationMessage }}</p>
    </FadeInOut>
    </div>
  </template>
  
  <script setup>
  import FadeInOut from './fadeInOut.vue';
  
  import { ref } from 'vue';
  import { defineEmits } from 'vue';
const emit = defineEmits(['input-change']); // Declare the emitted event

const sendValueToParent = () => {
  emit('input-change', {name:props.name,
		value:inputValue.value}); // Emit the event with a message
};


// Data
const inputValue = ref('');
const validationMessage = ref('');
const showInfo = ref(false);

// Props
const props = defineProps({
	id: { type: String,
		required: true },
	name: { type: String,
		required: true },
	labelText: {
		type: String,
		default: 'Label'
	},
	labelColor: {
		type: String,
		default: 'dark_gray'
	},
	isMandatory: {
		type: Boolean,
		default: false
	},
	isValid: {
		type: Boolean,
		default: null
	},
	infoText: {
		type: String,
		default: ''
	},
	inputType: {
		type: String,
		default: 'text'
	}
});





  </script>
  
  <style scoped>
  /* Custom border-width utility for Tailwind */
  .border-1 {
    border-width: 1px;
  }
  .border-3 {
    border-width: 3px;
  }
  </style>
  