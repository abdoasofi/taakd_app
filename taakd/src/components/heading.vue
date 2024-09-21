<template>
    <component :is="tag" :class="headingClass">
      <slot />
    </component>
  </template>
  
  <script>
  export default {
    name:"Heading",
    props: {
      tag: {
        type: String,
        default: 'h1',
      },
      level: {
        type: String,
        default: 'primary',
      },
    },
    computed: {
      headingClass() {
        return {
          'text-2xl font-bold leading-10': this.level === 'primary',
          'text-xl font-bold  leading-8': this.level === 'secondary',
          'text-[16px] font-semibold leading-7': this.level === 'secondary-2',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
  