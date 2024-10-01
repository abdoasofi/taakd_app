<script setup>
import { ref } from 'vue';


// Data
const open = ref(false);

// Props
const props = defineProps({
	title:{type:String,
		required:true
	}
});

// Methods
const toggleOn = function(){
	open.value=true;
}

const toggleOff = function(){
	open.value=false;
}

</script>

<template>
  <div class="lg:container">
    <div class="p-1 bg-white border-b-[1px] border-b-light_gray container m-auto px-4">
      <div class="flex justify-between text-lg">
        <div class="text-dark_gray text-sm font-semibold">{{ title }}</div>
        <button v-if="open===true" :onclick="toggleOff" class="block">
          <svg :class="{'transform rotate-180':open===true}"
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6 text-primary cursor-pointer transition-transform duration-300" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <button v-if="open===false" :onclick="toggleOn" class="block">            
          <svg 
             
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6 text-primary cursor-pointer transition-transform duration-300" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
      </div>
      <div :class="['py-3',{'hidden':open===false}]">
          <slot />
      </div>
    </div>
  </div>
</template>
