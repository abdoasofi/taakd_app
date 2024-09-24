<script setup>
import Button from './button.vue';
import { ref } from 'vue';


// Data
const file = ref(null);
const uploadStatus = ref('');

// Props
const props = defineProps({
	id: { type: String,
		required: true },
	name: { type: String,
		required: true },
});

// Methods
const onFileChange = function(event) {
	file.value = event.target.files[0];
	this.$emit("input-change",{name:props.name,
		value:this.inputValue} );
}

</script>

<template>
    <div class="p-5">
        <div class="bg-info/15 rounded-xl border-mid_gray border-[1px] border-dashed p-5 flex flex-col gap-5 items-center">
                <div class="h-8 w-8 bg-dark_gray"></div>
                <div class="font-semibold text-sm text-darkest_gray">Choose a file </div>
                <div class="font-normal text-[10px] text-darkest_gray text-center leading-4">JPEG, PNG, PDG, and MP4 formats
                    up to 20MB </div>
                    <input :name="name" :id="id" class="hidden" type="file" @change="onFileChange" />
                    <label  :for="id">
                        <Button level="secondary">
                            Select File
                        </Button>
                    </label>
        </div>
        </div>
</template>
