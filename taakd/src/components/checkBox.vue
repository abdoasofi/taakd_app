<template>
  <div class="flex gap-2 items-start">
    <input @input="sendValueToParent" :name="name" :id="id" class="block grow-0 shrink w-5" type="checkbox" />
    <label :for="id" class="block"
      ><slot /></label
    >
  </div>
</template>
<script setup>
  import { defineEmits } from 'vue';
const emit = defineEmits(['input-change']); // Declare the emitted event

const sendValueToParent = () => {
  emit('input-change', {name:props.name,
		value:inputValue.value}); // Emit the event with a message
};

// Props
const props = defineProps({
       
       id:{type:String,
         required:true
       },
       name:{type:String,
         required:true
       }
     });
     
     
</script>