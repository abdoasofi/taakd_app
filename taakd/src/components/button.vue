<template>
  
      <button :disabled="disabled" :onclick="emit" :class="btnClass">
          <slot />
      </button>
 
  </template>
  
  <script>
 
  export default {

    name: 'Button',
    props: {
      level: {
        type: String,
        default: 'primary',
      },
      disabled: {
        type: Boolean,
        required:true
      },
    },
    computed: {
      btnClass() {
        return {
          'bg-secondary hover:bg-secondary_hover px-4 py-2 text-white rounded-[100px] shadow': this.level === 'primary',
          'be-white border-[0.8px] hover:bg-hover border-primary px-4 py-2 text-primary text-sm font-medium rounded-[100px]': this.level === 'secondary',
          'bg-light_gray hover:bg-hover text-mid_gray px-4 py-2 text-sm font-medium rounded-[100px]': this.level === 'other',
          'bg-info/15 shadow-sm hover:bg-hover text-black px-2 py-1 text-sm font-medium rounded-lg': this.level === 'edit',
        };
      },
    },
    methods:{
      emit(){
        this.$emit("clicked"); 
      }
    }
  };
  </script>
  
  <style scoped>
.shadow{
    box-shadow: 0px 1px 6px 0px #00000052;
}
</style>