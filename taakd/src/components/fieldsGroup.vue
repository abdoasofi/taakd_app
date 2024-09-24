<template>
    <div class="py-3">
        <h2  class="text-black text-sm font-medium">{{ title }}</h2>
        <slot />
    </div>
</template>
<script setup>

// Props
const props = defineProps({
	title:{
		type:String,
		required:true
	}
});
</script>