<template>
  <div class="flex gap-2 items-start">
    <input @input="validateInput" :name="name" :id="id" class="block grow-0 shrink w-5" type="checkbox" />
    <label :for="id" class="block"
      ><slot /></label
    >
  </div>
</template>
<script setup>
// Props
const props = defineProps({
       
       id:{type:String,
         required:true
       },
       name:{type:String,
         required:true
       }
     });
     
     // Methods
     const sendValueToParent = function() {
       this.$emit("input-change",{name:props.name,
         value:this.inputValue} );// Emit event to parent
     }
     
     const validateInput = function() {
       // Example validation logic: Input must be at least 3 characters long
       if (this.inputValue.length < 3) {
         this.isValid = false;
         this.validationMessage = 'Input must be at least 3 characters long';
       } else {
         this.isValid = true;
             
       }
       sendValueToParent();
     }
     
</script>