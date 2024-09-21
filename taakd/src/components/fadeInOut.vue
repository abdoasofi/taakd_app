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
  
  <script>
  export default {
    name: 'FadeInOut',
    data() {
      return {
        show: false, // Controls visibility
      };
    },
    methods: {
      // Optional hooks for additional logic during transitions
      beforeEnter(el) {
        el.style.opacity = 0;
      },
      enter(el, done) {
        el.offsetHeight; // trigger reflow
        el.style.transition = 'opacity 0.5s ease-in-out';
        el.style.opacity = 1;
        done();
      },
      leave(el, done) {
        el.style.transition = 'opacity 0.5s ease-in-out';
        el.style.opacity = 0;
        done();
      }
    }
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
  