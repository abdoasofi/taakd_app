<!-- src/components/Step1PersonalInfo.vue -->
<template>
  <div class="bg-white p-4 py-6 shadow-sm rounded-sm">
    <div class="flex items-center mb-6">
      <UserIcon class="h-6 w-6 text-blue-600 ltr:mr-2 rtl:ml-2" />
      <h2 class="text-2xl font-semibold text-blue-600">{{ $t('step1.personal_information') }}</h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <InfoRow :label="$t('step1.employer_name')" :value="store.step1.employer_name.value" />
      <InfoRow :label="$t('step1.first_name')" :value="store.step1.first_name.value" />
      <InfoRow :label="$t('step1.last_name')" :value="store.step1.last_name.value" />
      <InfoRow :label="$t('step1.middle_name')" :value="store.step1.middle_name.value" />
      <InfoRow :label="$t('step1.suffix')" :value="store.step1.suffix.value" />
      <InfoRow :label="$t('step1.country')" :value="store.step1.country_now.value" />
      <InfoRow :label="$t('step1.city')" :value="store.step1.city.value" />
      <InfoRow :label="$t('step1.governorate')" :value="store.step1.governorate.value" />
      <InfoRow :label="$t('step1.zip_code')" :value="store.step1.zip_code.value" />
      <InfoRow :label="$t('step1.street_address')" :value="store.step1.street_address.value" />
      <InfoRow :label="$t('step1.date_living_address')" :value="store.step1.date_living_address.value" />
      <InfoRow :label="$t('step1.email')" :value="store.step1.email.value" />
      <InfoRow :label="$t('step1.date_of_birth')" :value="store.step1.date_of_birth.value" />
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
/* تحسين مظهر InfoRow إذا لزم الأمر */
</style>