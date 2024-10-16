<!-- src/components/Step4ProfessionalQualification.vue -->
<template>
  <section class="report-section">
    <div class="bg-white shadow-inner rounded-lg p-6 mb-8">
      <!-- ترويسة الخطوة -->
      <div class="flex items-center mb-6">
        <CheckBadgeIcon class="h-6 w-6 text-purple-600 mr-2" />
        <h2 class="text-2xl font-semibold text-purple-600">Step 4: Professional Qualification</h2>
      </div>

      <!-- عرض المؤهلات المهنية إذا وجدت -->
      <div v-if="professionalQualification.length > 0">
        <div
          v-for="(qualification, index) in professionalQualification"
          :key="qualification.id"
          class="mb-6 report-qualification"
        >
          <!-- عنوان كل مؤهل -->
          <h3 class="flex items-center text-xl font-semibold mb-3 text-gray-700">
            <CheckBadgeIcon class="h-5 w-5 text-purple-500 mr-2" />
            Qualification {{ index + 1 }}
          </h3>

          <!-- تفاصيل المؤهل -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoRow label="Awarding Body" :value="qualification.awarding_body" />
            <InfoRow label="License/Certificate Number" :value="qualification.license_or_certificate_number" />
            <InfoRow label="Issuing Country" :value="qualification.issuing_country" />
            <InfoRow label="Date Awarded" :value="qualification.date_awarded" />
            <InfoRow label="Award Name/Description" :value="qualification.award_name_description" />
          </div>
        </div>
      </div>

      <!-- رسالة في حال عدم وجود مؤهلات مهنية -->
      <div v-else>
        <p class="text-gray-600">No professional qualifications provided.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useVerificationRequestStore } from '../stores/verificationRequest';
import InfoRow from './InfoRow.vue';
import { CheckBadgeIcon } from '@heroicons/vue/24/solid';

// الحصول على البيانات من الـ Store
const store = useVerificationRequestStore();
const professionalQualification = store.step4.professional_qualification;
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