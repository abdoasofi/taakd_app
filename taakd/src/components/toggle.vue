<template>

    <div class="py-3">
        <FadeInOut>
        <button  v-if="toggled===false" :onclick="toggleOn" class="block w-full py-1 text-center bg-secondary/30 rounded-md">+</button>
        <button v-else-if="toggled===true" :onclick="toggleOff" class="block w-full py-1 text-center bg-warn/30 rounded-md">-</button>
    </FadeInOut>
   
        <FadeInOut>
            <div v-if="toggled===true">
                <slot/>
            </div>
        </FadeInOut>
    </div>
</template>
<script setup>
import FadeInOut from './fadeInOut.vue';

import { ref } from 'vue';


// Data
const toggled = ref(false);

// Methods
const toggleOn = function(){
	toggled.value=true;
}

const toggleOff = function(){
	toggled.value=false;
}

</script>