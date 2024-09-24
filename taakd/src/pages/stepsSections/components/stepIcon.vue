<template>
        <div :class="['p-2 flex flex-col lg:flex-row lg:gap-2 lg:justify-start justify-center items-center',processClass]">
            <div :class="classes">
                <span v-if="complete===false">0/32</span>
                <span class=" border-[1px] border-white rounded-full w-[90%] h-[90%] flex justify-center items-center" v-if="complete===true"><span>T</span></span>
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
	label:{
		type:String,
		required:true
	},
	desc:{
		type:String,
            
	},
	process:{
		type:Boolean,
		required:true
	},
	complete:{
		type:Boolean,
		default:false
	}  
});

// Computed
const classes = computed(() => {
	if(props.complete===true){
		return 'h-10 w-10  bg-secondary border-[1px] border-secondary  rounded-full flex items-center justify-center  text-white'
	}else{
		return 'h-10 w-10 border-2 border-light_gray bg-bg  rounded-full flex items-center justify-center text-[10px] text-mid_gray'
	}
})

const processClass = computed(() => {
	if(props.process){
		return 'border-2 border-secondary'
	}
	else return '';
})

</script>