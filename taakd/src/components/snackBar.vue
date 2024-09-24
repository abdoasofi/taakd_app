<template>
<FadeInOut>
 
    <div :class="[{'bg-darkest_gray':isDanger===false},{'bg-warn':isDanger===true},'text-bg font-normal text-sm p-3 rounded-lg snack-shadow w-full']">
        {{ message }}
    
    </div>
</FadeInOut>
</template>
<script setup>
import FadeInOut from './fadeInOut.vue';


// Props
const props = defineProps({
	message:{
		type:String,
		Required:true
	},
	isDanger:{
		type:Boolean,
		default:false
	}
});
</script>
<style scoped>
.snack-shadow{
    box-shadow: 0px 1px 6px 0px #00000052;
}
</style>