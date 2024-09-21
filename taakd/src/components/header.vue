<template>
    <header class="header w-full overflow-x-hidden z-10 relative">
      <div class="container flex justify-between items-center ">
        <div class="logo py-4 lg:flex lg:gap-6">
          <div class="h-6  lg:h-9 aspect-[1.376] flex justify-center items-center">logo</div>
          <span class=" h-9 w-[2px] bg-light_gray hidden lg:block" />
          <div class="gap-2 hidden lg:flex text-3xl">
            <span class="block text-secondary"><</span>
            <span class="block text-secondary">></span>
          </div>
          <input class="lg:block hidden border-[1px] border-mid_gray rounded-lg w-80 p-1"/>
        </div>
       
          <div class="flex justify-around items-center gap-7 ">
          <Button class="hidden lg:block"  level="secondary">Contact Us</Button>
            <div class="min-h-4 max-h-7 aspect-square bg-dark_gray lg:hidden"></div>
            <div class=" text-dark_gray text-3xl font-bold">...</div>
          </div>
      </div>
    </header>
  </template>
  
  <script>
import Button from './button.vue';

  export default {
    name: 'Header',
    components:{Button}
  };
  </script>
  
  <style scoped>
  .header {
    background-color: #fff;
    box-shadow: 0px 1px 6px 0px #00000052;
  }
  
  .nav a {
    text-decoration: none;
    color: #343a40;
  }
  
  .nav a:hover {
    text-decoration: underline;
  }
  </style>
  