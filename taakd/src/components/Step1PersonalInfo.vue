<!-- src/components/Step1PersonalInfo.vue -->
<template>
 
    <div class="bg-white p-4 py-6 shadow-sm rounded-sm">
      <div class="flex items-center mb-6">
        <UserIcon class="h-6 w-6 text-blue-600 mr-2" />
        <h2 class="text-2xl font-semibold text-blue-600">Step 1: Personal Information</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoRow label="Employer Name" :value="store.step1.employer_name.value" />
        <InfoRow label="First Name" :value="store.step1.first_name.value" />
        <InfoRow label="Last Name" :value="store.step1.last_name.value" />
        <InfoRow label="Middle Name" :value="store.step1.middle_name.value" />
        <InfoRow label="Suffix" :value="store.step1.suffix.value" />
        <InfoRow label="Country" :value="store.step1.country_now.value" />
        <InfoRow label="City" :value="store.step1.city.value" />
        <InfoRow label="Governorate" :value="store.step1.governorate.value" />
        <InfoRow label="Zip Code" :value="store.step1.zip_code.value" />
        <InfoRow label="Street Address" :value="store.step1.street_address.value" />
        <InfoRow label="Date Living at Address" :value="store.step1.date_living_address.value" />
        <InfoRow label="Email" :value="store.step1.email.value" />
        <InfoRow label="Date of Birth" :value="store.step1.date_of_birth.value" />
      </div>
    </div>
 
</template>

<script setup lang="ts">
import { useVerificationRequestStore } from '../stores/verificationRequest';
import InfoRow from './InfoRow.vue';
import { UserIcon } from '@heroicons/vue/24/solid';

const store = useVerificationRequestStore();
</script>

<style scoped>
/* تم إضافة بعض التحسينات هنا باستخدام TailwindCSS */


/* تحسين مظهر InfoRow إذا لزم الأمر */
</style>