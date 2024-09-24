<template>    
    <div class="pt-6">
        <div class="flex gap-2 mb-2">     
            <div class="w-7 lg:w-9 shrink-0">
                <StyledIcon />
            </div>
            <Heading level="secondary" class="text-black" tag="h2">Here you can follow the progress of your report and communicate with Taakd</Heading>
        </div>
        <div >  

            <div class="mt-3">
                <h3 class="text-lg font-medium mb-3 text-black">Contact details</h3>
                <div class="lg:grid lg:grid-cols-2 lg:gap-3 lg:w-1/2">
                    <div class="py-3">
                        <StyledInput id="mobile" name="mobile" labelText="Mobile Number" infoText="mobile number" inputType="text" />
                        <small class="block text-[10px] font-normal">Supporting text</small>
                    </div>

                    <div class="py-3">
                        <Autocomplete
                       
                            placeholder="Country"
                            :options="optionCountry"
                            v-model="valueCountry"
                            @change="handleCountryChange"
                            @update:modelValue="handleCountryChange"
                        />
                    </div>

                </div>
                <div class="py-3 text-sm ">
                    <span class="text-sm block mb-3">Did you obtain the degree or diploma? *</span>
                    <div class="flex flex-col gap-2">
                        <div>
                            <input type="radio" name="diploma" id="yes" />
                            <label for="yes">Yes, I obtained</label>
                        </div>
                        <div>
                            <input type="radio" name="diploma" id="no" />
                            <label for="no">No, I did not obtain</label>
                        </div>
                    </div>
                </div>
                <div class="py-3">
                    <span class="text-sm font-medium block mb-2">Available Time</span>
                    <div class="grid grid-cols-2 gap-3 text-sm lg:w-1/2">
                        <div class="w-full">
                            <StyledInput id="from" name="from" labelText="From" isMandatory="true" infoText="from" inputType="date" @input-change="" />
                        </div>
                        <div class="w-full">
                            <StyledInput id="to" name="to" labelText="To" isMandatory="true" infoText="To" inputType="date" @input-change="" />
                        </div>
                    </div>
                </div>
                <div class="pt-5 flex w-full justify-center">
                    <Button level='other'>save -></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps } from 'vue';
import { Autocomplete } from 'frappe-ui';
import Button from '../../components/button.vue';
import Heading from '../../components/heading.vue';
import StyledIcon from '../../components/styledIcon.vue';
import StyledInput from '../../components/styledInput.vue';

// استيراد الخصائص
const props = defineProps(['location']);

const valueCountry = ref('');
const selectedCountry = ref('');

// تأكد أن location و data موجودة قبل استخدامها
const optionCountry = computed(() => {
    if (props.location && props.location.data) {
        return props.location.data
            .filter(loc => loc.location_type === 'Country')
            .map(loc => ({
                label: loc.location_name,
                value: loc.location_name
            }));
    }
    return []; // إرجاع مصفوفة فارغة إذا لم تتوفر البيانات
});

// معالجة تغيير اختيار الدولة
const handleCountryChange = (value) => {
    selectedCountry.value = value.value;
};

</script>

<style scoped>
/* Custom styles if needed */
</style>