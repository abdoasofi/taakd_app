<!-- src/components/Step3EmploymentHistory.vue -->
<template>
  <div class="bg-white p-4 py-6 shadow-sm rounded-sm">
    <!-- ترويسة الخطوة -->
    <div class="flex items-center mb-6">
      <BriefcaseIcon class="h-6 w-6 text-yellow-600 ltr:mr-2 rtl:ml-2" />
      <h2 class="text-2xl font-semibold text-yellow-600">{{ $t('step3.employment_history') }}</h2>
    </div>

    <!-- عرض معلومات التوظيف إذا وجدت -->
    <div v-if="employmentHistory.length > 0" class="[&>*:nth-child(5n)]:break-before-page [&>*:nth-child(5n)]:py-8 py-5">
      <div
        v-for="(employment, index) in employmentHistory"
        :key="employment.employment_id"
        class="mb-6 report-employment"
      >
        <!-- عنوان كل وظيفة -->
        <h3 class="flex items-center text-xl font-semibold mb-3 text-gray-700">
          <BriefcaseIcon class="h-5 w-5 text-yellow-500 ltr:mr-2 rtl:ml-2" />
          {{ $t('step3.employment') }} {{ index + 1 }}
        </h3>

        <!-- تفاصيل الوظيفة -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoRow :label="$t('step3.company')" :value="employment.company" />
          <InfoRow :label="$t('step3.job_title')" :value="employment.official_job_title_held_currently" />
          <InfoRow :label="$t('step3.country')" :value="employment.country" />
          <InfoRow :label="$t('step3.city')" :value="employment.city" />
          <InfoRow :label="$t('step3.from_date')" :value="employment.from_date" />
          <InfoRow :label="$t('step3.end_date')" :value="employment.end_date" />
        </div>
      </div>
    </div>

    <!-- رسالة في حال عدم وجود تاريخ توظيف -->
    <div v-else>
      <p class="text-gray-600">{{ $t('step3.no_employment_history') }}</p>
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
/* تحسين مظهر InfoRow إذا لزم الأمر */
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