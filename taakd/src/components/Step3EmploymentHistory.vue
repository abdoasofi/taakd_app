<!-- src/components/Step3EmploymentHistory.vue -->
<template>
  <section class="report-section">
    <div class="bg-white shadow-inner rounded-lg p-6 mb-8">
      <!-- ترويسة الخطوة -->
      <div class="flex items-center mb-6">
        <BriefcaseIcon class="h-6 w-6 text-yellow-600 mr-2" />
        <h2 class="text-2xl font-semibold text-yellow-600">Step 3: Employment History</h2>
      </div>

      <!-- عرض تاريخ التوظيف إذا وجد -->
      <div v-if="employmentHistory.length > 0">
        <div
          v-for="(employment, index) in employmentHistory"
          :key="employment.id"
          class="mb-6 report-employment"
        >
          <!-- عنوان كل وظيفة -->
          <h3 class="flex items-center text-xl font-semibold mb-3 text-gray-700">
            <BriefcaseIcon class="h-5 w-5 text-yellow-500 mr-2" />
            Employment {{ index + 1 }}
          </h3>

          <!-- تفاصيل الوظيفة -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoRow label="Company" :value="employment.company" />
            <InfoRow label="Job Title" :value="employment.official_job_title_held_currently" />
            <InfoRow label="Country" :value="employment.country" />
            <InfoRow label="City" :value="employment.city" />
            <InfoRow label="From Date" :value="employment.from_date" />
            <InfoRow label="End Date" :value="employment.end_date" />
          </div>
        </div>
      </div>

      <!-- رسالة في حال عدم وجود تاريخ توظيف -->
      <div v-else>
        <p class="text-gray-600">No employment history provided.</p>
      </div>
    </div>
  </section>
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