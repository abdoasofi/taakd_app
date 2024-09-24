<template >
    <div class="p-2 container bg-green-100">
        <h3 class="text-p-lg">Current Mailing Address</h3>
        <div class="grid grid-cols-3 gap-2 py-2">
            <Autocomplete class=" "
            placeholder="Country"
            :options="optionCountry"
            v-model="valueCountry"
            @change="handleCountryChange"
             @update:modelValue="handleCountryChange"
          />
          <Autocomplete
            placeholder="City"
            v-model="valueCity"
            :options="optionCity"
            @update:modelValue="handleCityChange"
          />
          <Autocomplete
            placeholder="Governorate"
            v-model="valueGovernorate"
            :options="optionGovernorate"
          />
        </div>
    </div>
</template>
  
  
<script lang="ts" setup>
    import { computed ,ref} from 'vue'
    import { Autocomplete } from 'frappe-ui'
    import {location} from '../../data/useAddressLogic';

    const valueCountry = ref('')
    const valueCity = ref('')
    const valueGovernorate = ref('')

    const selectedCountry = ref('')
    const selectedCity= ref('')

    const optionCountry = computed(() => {
        return location.data.filter(loc => loc.location_type === 'Country').map(loc => ({
            label: loc.location_name,
            value: loc.location_name
        }))
    })

    const optionCity = computed(() => {
        return location.data.filter(loc => loc.location_type === 'City' && loc.parent_location == selectedCountry.value).map(loc => ({
            label: loc.location_name,
            value: loc.location_name
        }))
    })

    const optionGovernorate= computed(() => {
        return location.data.filter(loc => loc.location_type === 'Governorate' && loc.parent_location == selectedCity.value).map(loc => ({
            label: loc.location_name,
            value: loc.location_name
        }))
    })

    const handleCountryChange = (value) => {
        selectedCountry.value = value.value
    }
    const handleCityChange = (value) => {
        selectedCity.value = value.value
    }
  </script>
  