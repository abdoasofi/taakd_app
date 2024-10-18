<template>
  <div class="min-h-screen bg-bg  leading-[1.6rem] text-dark_gray relative">
   <Header />
    <main class="container relative z-10 py-6 "> 
      <slot />
    </main> 
<div :style="{ backgroundImage: `url(${bg2})` }" class=" z-0 bg-no-repeat bg-cover aspect-[0.784594386] w-80 lg:w-90 absolute top-[15%] lg:top-[29%] -left-[77px] lg:-left-[50px] "></div>
<div :style="{ backgroundImage: `url(${bg3})` }"  class=" z-0 bg-no-repeat bg-cover aspect-[1] w-112 absolute top-[calc(15%+30rem)] -left-5 -rotate-12"></div>
  </div>
</template>

<script setup>
import Header from '../components/header.vue';
import bg2 from '@/assets/bg2.svg';
import bg3 from '@/assets/bg3.svg';

</script>

<style scoped>
/* You can add custom styles here */
</style>