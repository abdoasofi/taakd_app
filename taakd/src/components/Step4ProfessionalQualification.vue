<!-- src/components/Step4ProfessionalQualification.vue -->
<template>
  <div class="bg-white p-4 py-6 shadow-sm rounded-sm">
    <!-- ترويسة الخطوة -->
    <div class="flex items-center mb-6">
      <CheckBadgeIcon class="h-6 w-6 text-purple-600 ltr:mr-2 rtl:ml-2" />
      <h2 class="text-2xl font-semibold text-purple-600">{{ $t('step4_professional_qualification') }}</h2>
    </div>

    <!-- عرض المؤهلات المهنية إذا وجدت -->
    <div v-if="professionalQualification.length > 0" class="[&>*:nth-child(5n)]:break-before-page [&>*:nth-child(5n)]:py-8 py-5">
      <div
        v-for="(qualification, index) in professionalQualification"
        :key="qualification.id"
        class="mb-6 report-qualification"
      >
        <!-- عنوان كل مؤهل -->
        <h3 class="flex items-center text-xl font-semibold mb-3 text-gray-700">
          <CheckBadgeIcon class="h-5 w-5 text-purple-500 ltr:mr-2 rtl:ml-2" />
          {{ $t('qualification') }} {{ index + 1 }}
        </h3>

        <!-- تفاصيل المؤهل -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoRow :label="$t('awarding_body')" :value="qualification.awarding_body" />
          <InfoRow :label="$t('license_or_certificate_number')" :value="qualification.license_or_certificate_number" />
          <InfoRow :label="$t('issuing_country')" :value="qualification.issuing_country" />
          <InfoRow :label="$t('date_awarded')" :value="qualification.date_awarded" />
          <InfoRow :label="$t('award_name_description')" :value="qualification.award_name_description" />
        </div>
      </div>
    </div>

    <!-- رسالة في حال عدم وجود مؤهلات مهنية -->
    <div v-else>
      <p class="text-gray-600">{{ $t('no_professional_qualifications') }}</p>
    </div>
  </div>
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