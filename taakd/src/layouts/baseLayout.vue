<template>
    <div class="min-h-screen bg-bg  leading-[1.6rem] text-dark_gray">
     <Header />
      <main class="container  py-6 "> 
        <slot />
      </main> 
    </div>
  </template>
  
  <script setup>
  import Header from '../components/header.vue';

  </script>
  
  <style scoped>
  /* You can add custom styles here */
  </style>
  