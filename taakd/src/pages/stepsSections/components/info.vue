<template>
    <div class="w-full p-1 bg-info text-black font-medium text-xs">{{ text }}</div>
</template>
<script setup>

// Props
const props = defineProps({
	text:{
		type:String,
		required:true
	}
});
</script>