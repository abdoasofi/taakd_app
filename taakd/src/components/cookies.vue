<script >
import Button from './button.vue';


</script>

<template>
    <div class="p-4 lg:container lg:gap-3 text-white flex justify-between lg:justify-end bg-darkest_gray fixed bottom-0 w-screen">
        <div class="flex flex-col lg:flex-row lg:grow lg:justify-between items-center gap-3">
            <div>We care about your data, and we will only use cookies to improve your experience.</div>
            <Button level="primary">Accept</Button>
        </div>
        <span class="block text-white">X</span>
    </div>
</template>