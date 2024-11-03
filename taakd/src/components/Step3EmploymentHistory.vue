<!-- src/components/Step3EmploymentHistory.vue -->
<template>
  <div class="bg-white p-4 py-6 shadow-sm rounded-sm">
    <!-- ترويسة الخطوة -->
    <div class="flex items-center mb-6">
      <BriefcaseIcon class="h-6 w-6 text-yellow-600 mr-2" />
      <h2 class="text-2xl font-semibold text-yellow-600">{{ $t('step3_employment_history') }}</h2>
    </div>

    <!-- عرض تاريخ التوظيف إذا وجد -->
    <div v-if="employmentHistory.length > 0" class="[&>*:nth-child(5n)]:break-before-page [&>*:nth-child(5n)]:py-8 py-5">
      <div
        v-for="(employment, index) in employmentHistory"
        :key="employment.employment_id"
        class="mb-6 report-employment"
      >
        <!-- عنوان كل وظيفة -->
        <h3 class="flex items-center text-xl font-semibold mb-3 text-gray-700">
          <BriefcaseIcon class="h-5 w-5 text-yellow-500 mr-2" />
          {{ $t('employment') }} {{ index + 1 }}
        </h3>

        <!-- تفاصيل الوظيفة -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoRow :label="$t('company')" :value="employment.company" />
          <InfoRow :label="$t('job_title')" :value="employment.official_job_title_held_currently" />
          <InfoRow :label="$t('country')" :value="employment.country" />
          <InfoRow :label="$t('city')" :value="employment.city" />
          <InfoRow :label="$t('from_date')" :value="employment.from_date" />
          <InfoRow :label="$t('end_date')" :value="employment.end_date" />
        </div>
      </div>
    </div>

    <!-- رسالة في حال عدم وجود تاريخ توظيف -->
    <div v-else>
      <p class="text-gray-600">{{ $t('no_employment_history') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVerificationRequestStore } from '../stores/verificationRequest';
import InfoRow from './InfoRow.vue';
import { BriefcaseIcon } from '@heroicons/vue/24/solid';

// الحصول على البيانات من الـ Store
const store = useVerificationRequestStore();
const employmentHistory = store.step3.employment_history;
</script>

<style scoped>
/* تنسيقات إضافية لتحسين عرض InfoRow */
.info-row {
  display: flex;
  flex-direction: column;
}

.info-row label {
  font-weight: 600;
  color: #4a5568;
}

.value {
  color: #2d3748;
}
</style>