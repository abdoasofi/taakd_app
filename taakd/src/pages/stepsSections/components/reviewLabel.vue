<template>
    <div class="text-dark_gray text-sm font-normal"><slot/><span v-if="Boolean(isMandatory)" class="text-warn">*</span></div>
</template>
<script setup>

// Props
const props = defineProps({
	isMandatory:{
		type:Boolean,
	}
});
</script>