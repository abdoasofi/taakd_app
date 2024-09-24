<template>
    <transition
      name="fade"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <slot/>
    </transition>
  </template>
  
  <script setup>
 import { ref } from 'vue';


// Data
const show = ref(false);

// Methods
const beforeEnter = function(el) {
	el.style.opacity = 0;
}

const enter = function(el, done) {
	el.offsetHeight; // trigger reflow
	el.style.transition = 'opacity 0.5s ease-in-out';
	el.style.opacity = 1;
	done();
}

const leave = function(el, done) {
	el.style.transition = 'opacity 0.5s ease-in-out';
	el.style.opacity = 0;
	done();
}

  </script>
  
  <style scoped>
  /* Fade transition */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  