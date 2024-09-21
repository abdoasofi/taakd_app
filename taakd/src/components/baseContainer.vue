<template>
    <div class="bg-white  con-border">
      <main class="py-6 px-4 lg:px-52">
        <slot />
      </main>
    </div>
  </template>
  
  <script>


  export default {
   
    name: 'BaseContainer',
  };
  </script>
  
  <style scoped>
  .con-border{border: 1px solid #969696}
  /* You can add custom styles here */
  </style>
  