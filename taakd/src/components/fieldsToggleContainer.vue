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
        <button v-if="open===true" :onclick="toggleOff" class="block">-</button>
        <button v-if="open===false" :onclick="toggleOn" class="block">+</button>
      </div>
      <div :class="['py-3',{'hidden':open===false}]">
          <slot />
      </div>
    </div>
  </div>
</template>
