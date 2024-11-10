<!-- src/components/Step2EducationInfo.vue -->
<template>
  <div class="bg-white p-4 py-6 shadow-sm rounded-sm">
    <!-- ترويسة الخطوة -->
    <div class="flex items-center mb-6">
      <AcademicCapIcon class="h-6 w-6 text-green-600 ltr:mr-2 rtl:ml-2" />
      <h2 class="text-2xl font-semibold text-green-600">{{ $t('step2.education_info') }}</h2>
    </div>

    <!-- عرض معلومات التعليم إذا وجدت -->
    <div v-if="educationInformation.length > 0" class="[&>*:nth-child(5n)]:break-before-page [&>*:nth-child(5n)]:py-8 py-5">
      <div
        v-for="(education, index) in educationInformation"
        :key="education.id"
        class="mb-6 report-education"
      >
      
        <!-- عنوان كل تعليم -->
        <h3 class="flex items-center text-xl font-semibold mb-3 text-gray-700">
          <AcademicCapIcon class="h-5 w-5 text-green-500  ltr:mr-2 rtl:ml-2" />
          {{ $t('step2.education') }} {{ index + 1 }}
        </h3>

        <!-- تفاصيل التعليم -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoRow :label="$t('step2.school_or_university')" :value="education.name_of_school_or_college_university" />
          <InfoRow :label="$t('step2.field_of_study')" :value="education.field_of_study_or_major" />
          <InfoRow :label="$t('step2.country')" :value="education.country" />
          <InfoRow :label="$t('step2.city')" :value="education.city" />
          <InfoRow :label="$t('step2.from_date')" :value="education.from_date" />
          <InfoRow :label="$t('step2.to_date')" :value="education.to_date" />
        </div>
      </div>
    </div>

    <!-- رسالة في حال عدم وجود معلومات تعليم -->
    <div v-else>
      <p class="text-gray-600">{{ $t('step2.no_education_info') }}</p>
    </div>
  </div>
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