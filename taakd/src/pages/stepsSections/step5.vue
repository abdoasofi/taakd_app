<!-- step5.vue -->
<template>
  <div class="container mx-auto py-8 px-4 relative">
    <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">Review Your Information</h1>

    <div id="report-content" ref="reportContent" class="bg-gray-50 p-6 rounded-lg shadow-lg">
      <!-- ترويسة PDF -->
      <div class="header-pdf mb-8">
        <img src="../../assets/logo.png" alt="Logo" class="h-16 mx-auto mb-4" />
        <h2 class="text-3xl font-semibold text-center text-gray-700">Information Review Report</h2>
      </div>

      <!-- Step 1: Personal Information -->
      <section class="bg-white shadow-inner rounded-lg p-6 mb-8">
        <div class="flex items-center mb-4">
          <UserIcon class="h-6 w-6 text-blue-600 mr-2" />
          <h2 class="text-2xl font-semibold text-blue-600">Step 1: Personal Information</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </section>

      <!-- Step 2: Education Information -->
      <section class="bg-white shadow-inner rounded-lg p-6 mb-8 page-break-before">
        <div class="flex items-center mb-4">
          <AcademicCapIcon class="h-6 w-6 text-green-600 mr-2" />
          <h2 class="text-2xl font-semibold text-green-600">Step 2: Education Information</h2>
        </div>
        <div v-if="store.step2.educationInformation.length > 0">
          <div
            v-for="(education, index) in store.step2.educationInformation"
            :key="index"
            class="mb-6"
          >
            <h3 class="flex items-center text-xl font-semibold mb-3 text-gray-700">
              <AcademicCapIcon class="h-5 w-5 text-green-500 mr-2" />
              Education {{ index + 1 }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoRow label="School/University" :value="education.name_of_school_or_college_university" />
              <InfoRow label="Field of Study" :value="education.field_of_study_or_major" />
              <InfoRow label="Country" :value="education.country" />
              <InfoRow label="City" :value="education.city" />
              <InfoRow label="From Date" :value="education.from_date" />
              <InfoRow label="To Date" :value="education.to_date" />
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-600">No education information provided.</p>
        </div>
      </section>

      <!-- Step 3: Employment History -->
      <section class="bg-white shadow-inner rounded-lg p-6 mb-8 page-break-before">
        <div class="flex items-center mb-4">
          <BriefcaseIcon class="h-6 w-6 text-yellow-600 mr-2" />
          <h2 class="text-2xl font-semibold text-yellow-600">Step 3: Employment History</h2>
        </div>
        <div v-if="store.step3.employment_history.length > 0">
          <div
            v-for="(employment, index) in store.step3.employment_history"
            :key="index"
            class="mb-6"
          >
            <h3 class="flex items-center text-xl font-semibold mb-3 text-gray-700">
              <BriefcaseIcon class="h-5 w-5 text-yellow-500 mr-2" />
              Employment {{ index + 1 }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoRow label="Company" :value="employment.company" />
              <InfoRow label="Job Title" :value="employment.official_job_title_held_currently" />
              <InfoRow label="Country" :value="employment.country" />
              <InfoRow label="City" :value="employment.city" />
              <InfoRow label="From Date" :value="employment.from_date" />
              <InfoRow label="End Date" :value="employment.end_date" />
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-600">No employment history provided.</p>
        </div>
      </section>

      <!-- Step 4: Professional Qualification -->
      <section class="bg-white shadow-inner rounded-lg p-6 mb-8 page-break-before">
        <div class="flex items-center mb-4">
          <CheckBadgeIcon class="h-6 w-6 text-purple-600 mr-2" />
          <h2 class="text-2xl font-semibold text-purple-600">Step 4: Professional Qualification</h2>
        </div>
        <div v-if="store.step4.professional_qualification.length > 0">
          <div
            v-for="(qualification, index) in store.step4.professional_qualification"
            :key="index"
            class="mb-6"
          >
            <h3 class="flex items-center text-xl font-semibold mb-3 text-gray-700">
              <CheckBadgeIcon class="h-5 w-5 text-purple-500 mr-2" />
              Qualification {{ index + 1 }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoRow label="Awarding Body" :value="qualification.awarding_body" />
              <InfoRow label="License/Certificate Number" :value="qualification.license_or_certificate_number" />
              <InfoRow label="Issuing Country" :value="qualification.issuing_country" />
              <InfoRow label="Date Awarded" :value="qualification.date_awarded" />
              <InfoRow label="Award Name/Description" :value="qualification.award_name_description" />
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-600">No professional qualifications provided.</p>
        </div>
      </section>

      <!-- تذييل PDF -->
      <div class="footer-pdf text-right text-sm text-gray-500 mt-8">
        Page {PAGE_NUM} of {TOTAL_PAGES}
      </div>
    </div>

    <!-- مؤشر التحميل Overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p class="loading-text">جارٍ إنشاء ملف PDF، يرجى الانتظار...</p>
    </div>

    <!-- أزرار الطباعة والعودة -->
    <div class="flex justify-center space-x-6 mt-12">
      <Button
        class="btn-back"
        @click="goBack"
      >
        Edit Information
      </Button>
      <Button
        class="btn-print"
        @click="printPDF"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">Print PDF</span>
        <span v-else>Processing...</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import InfoRow from '../../components/InfoRow.vue';
import Button from '../../components/button.vue';
import { useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.js';import { jsPDF } from 'jspdf';
import { ref } from 'vue';

// استيراد الأيقونات من Heroicons
import { 
  UserIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  CheckBadgeIcon // بديل لـ BadgeCheckIcon
} from '@heroicons/vue/24/solid';

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

// دالة طباعة PDF
const printPDF = () => {
  if (!reportContent.value) {
    console.error('لا يمكن العثور على المحتوى للطباعة.');
    return;
  }

  isLoading.value = true; // تفعيل حالة التحميل

  // الانتظار حتى يتم تحميل جميع الصور
  const images = reportContent.value.querySelectorAll('img');
  const promises = Array.from(images).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
  });

  Promise.all(promises)
    .then(() => {
      const opt = {
        margin: [20, 10, 20, 10], // الهوامش [أعلى، يمين، أسفل، يسار]
        filename: 'report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], before: '.page-break-before', after: '.page-break-after' }
      };

      // إنشاء كائن jsPDF
      const pdf = new jsPDF(opt.jsPDF.orientation, opt.jsPDF.unit, opt.jsPDF.format);

      html2pdf()
        .set(opt)
        .from(reportContent.value)
        .toPdf()
        .get('pdf')
        .then((pdfDoc: jsPDF) => {
          const totalPages = pdfDoc.internal.getNumberOfPages();

          // إضافة أرقام الصفحات
          for (let i = 1; i <= totalPages; i++) {
            pdfDoc.setPage(i);
            pdfDoc.setFontSize(10);
            pdfDoc.setTextColor(150, 150, 150);
            pdfDoc.text(
              `Page ${i} of ${totalPages}`,
              pdfDoc.internal.pageSize.getWidth() - 20,
              pdfDoc.internal.pageSize.getHeight() - 10,
              { align: 'right' }
            );
          }

          // حفظ ملف PDF
          pdfDoc.save('report.pdf');
          isLoading.value = false; // إيقاف حالة التحميل بعد الحفظ
        })
        .catch(error => {
          console.error('خطأ أثناء إنشاء PDF:', error);
          isLoading.value = false; // إيقاف حالة التحميل في حالة الخطأ
        });
    })
    .catch(error => {
      console.error('خطأ في تحميل الصور:', error);
      isLoading.value = false; // إيقاف حالة التحميل في حالة الخطأ
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

/* إضافة فاصل صفحة قبل الأقسام المحددة */
.page-break-before {
  page-break-before: always;
  break-before: always;
}

/* إضافة فاصل صفحة بعد الأقسام المحددة */
.page-break-after {
  page-break-after: always;
  break-after: always;
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

/* تحسين تنسيقات الأزرار باستخدام Tailwind */
.btn-print {
  @apply bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 flex items-center justify-center;
}

.btn-print:disabled {
  @apply bg-green-400 cursor-not-allowed;
}

.btn-back {
  @apply bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-semibold py-2 px-6 rounded-lg transition duration-300;
}

/* تحسين تنسيقات InfoRow */
.info-row {
  display: flex;
  flex-direction: column;
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
</style>