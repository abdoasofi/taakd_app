<!-- src/pages/stepsSections/step5.vue -->
<template>
  <div id="yourDivId" ref="reportContent">
    <!-- ترويسة PDF -->
    <div>
      <img src="@/assets/logo.png" alt="Logo" class="h-16 mx-auto mb-4" />
      <h2 class="text-3xl font-semibold text-center text-gray-700">{{ $t('information_review_report') }}</h2>
    </div>
    <!-- مكونات الخطوات المنفصلة -->
    <section class="my-5">
      <Step1PersonalInfo />
    </section>
    <section class="my-5">
      <Step2EducationInfo />
    </section>
    <section class="my-5">
      <Step3EmploymentHistory />
    </section>
    <section class="my-5">
      <Step4ProfessionalQualification />
    </section>
    <!-- تذييل PDF -->
    <div class="text-right rtl:text-left text-sm text-gray-500 mt-8">
      <span class="page-number"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import Step1PersonalInfo from '../../components/Step1PersonalInfo.vue';
import Step2EducationInfo from '../../components/Step2EducationInfo.vue';
import Step3EmploymentHistory from '../../components/Step3EmploymentHistory.vue';
import Step4ProfessionalQualification from '../../components/Step4ProfessionalQualification.vue';
import Button from '../../components/button.vue';
import { useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.js';
import { jsPDF } from 'jspdf';
import { ref, nextTick } from 'vue';
import printJS from 'print-js';
import Report from './report.vue';
import ReportView from './reportView.vue';

// استخدام Pinia store
const store = useVerificationRequestStore();
const router = useRouter();

// دالة العودة
const goBack = () => {
  router.push('/steps');
};

// إضافة المرجع للمحتوى
const reportContent = ref<null | HTMLElement>(null);

// حالة التحميل
const isLoading = ref(false);

const printDiv = () => {
  printJS({ 
    printable: 'yourDivId', 
    type: 'html', 
    targetStyles: ['*'] // Includes styles from your Tailwind CSS
  });
};

</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* منع فصل الأقسام داخل الصفحات */
section {
  page-break-inside: avoid;
  break-inside: avoid;
}

/* إضافة فاصل صفحة قبل الأقسام المحددة (باستثناء الخطوة الأولى) */
.page-break-before {
  page-break-before: always;
  break-before: always;
}

/* تحسين تصميم العناوين لضمان وضوحها في PDF */
h1,
h2,
h3 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* إزالة الأزرار من الطباعة */
@media print {
  .btn-print,
  .btn-back,
  .loading-overlay {
    display: none;
  }
}

/* تنسيقات ترويسة PDF */
.header-pdf {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* تنسيقات تذييل PDF */
.footer-pdf {
  text-align: right;
  font-size: 10px;
  color: #969696;
  margin-top: 10px;
}
html[dir='rtl'] .footer-pdf {
  text-align: left;
}
/* تحسين تنسيقات InfoRow */
.info-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

.info-row label {
  font-weight: 600;
  color: #4a5568;
}

.info-row .value {
  margin-top: 2px;
  color: #2d3748;
}

/* إضافة تأثيرات ظل للنصوص الهامة */
.text-blue-600 {
  color: #2c5282;
}

.text-gray-700 {
  color: #4a5568;
}

.text-gray-600 {
  color: #718096;
}

.text-gray-800 {
  color: #2d3748;
}

/* تنسيقات مؤشر التحميل */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
html[dir='rtl'] .loading-overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 50;
}
.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #2c5282;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 16px;
  font-size: 1rem;
  color: #2d3748;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* تحسين تنسيق التقرير */
.report-section {
  margin-bottom: 20px;
}

/* تنسيقات الجنس للتقرير */
.bg-white {
  background-color: #ffffff;
}

/* إضافة تنسيقات خاصة للفصول */

/* تحسين تنسيق التذييل */
.footer-pdf {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 100%;
}

html[dir='rtl'].footer-pdf {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 100%;
}
/* تنسيق الإشعارات */

</style>