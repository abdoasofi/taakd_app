<!-- src/components/Step2EducationInfo.vue -->
<template>
  <section class="report-section">
    <div class="bg-white shadow-inner rounded-lg p-6 mb-8">
      <!-- ترويسة الخطوة -->
      <div class="flex items-center mb-6">
        <AcademicCapIcon class="h-6 w-6 text-green-600 mr-2" />
        <h2 class="text-2xl font-semibold text-green-600">Step 2: Education Information</h2>
      </div>

      <!-- عرض معلومات التعليم إذا وجدت -->
      <div v-if="educationInformation.length > 0">
        <div
          v-for="(education, index) in educationInformation"
          :key="education.id"
          class="mb-6 report-education"
        >
          <!-- عنوان كل تعليم -->
          <h3 class="flex items-center text-xl font-semibold mb-3 text-gray-700">
            <AcademicCapIcon class="h-5 w-5 text-green-500 mr-2" />
            Education {{ index + 1 }}
          </h3>

          <!-- تفاصيل التعليم -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoRow label="School/University" :value="education.name_of_school_or_college_university" />
            <InfoRow label="Field of Study" :value="education.field_of_study_or_major" />
            <InfoRow label="Country" :value="education.country" />
            <InfoRow label="City" :value="education.city" />
            <InfoRow label="From Date" :value="education.from_date" />
            <InfoRow label="To Date" :value="education.to_date" />
          </div>
        </div>
      </div>

      <!-- رسالة في حال عدم وجود معلومات تعليم -->
      <div v-else>
        <p class="text-gray-600">No education information provided.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useVerificationRequestStore } from '../stores/verificationRequest';
import InfoRow from './InfoRow.vue';
import { AcademicCapIcon } from '@heroicons/vue/24/solid';

// الحصول على البيانات من الـ Store
const store = useVerificationRequestStore();
const educationInformation = store.step2.educationInformation;
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