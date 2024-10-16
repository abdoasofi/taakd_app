<!-- src/views/step5.vue -->
<template>
  <div class="container mx-auto py-8 px-4 relative">
    <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">Review Your Information</h1>

    <div id="report-content" ref="reportContent" class="bg-gray-50 p-6 rounded-lg shadow-lg">
      <!-- ترويسة PDF -->
      <div class="header-pdf ">
        <img src="@/assets/logo.png" alt="Logo" class="h-16 mx-auto mb-4" />
        <h2 class="text-3xl font-semibold text-center text-gray-700">Information Review Report</h2>
      </div>

      <!-- مكونات الخطوات المنفصلة -->
      <Step1PersonalInfo />
      <Step2EducationInfo />
      <Step3EmploymentHistory />
      <Step4ProfessionalQualification />

      <!-- تذييل PDF -->
      <div class="footer-pdf text-right text-sm text-gray-500 mt-8">
        <!-- سيتم تحديث أرقام الصفحات ديناميكيًا بواسطة jsPDF -->
        <!-- يمكن إزالة هذا العنصر وإضافة التذييل مباشرة في jsPDF -->
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
import Step1PersonalInfo from '../../components/Step1PersonalInfo.vue';
import Step2EducationInfo from '../../components/Step2EducationInfo.vue';
import Step3EmploymentHistory from '../../components/Step3EmploymentHistory.vue';
import Step4ProfessionalQualification from '../../components/Step4ProfessionalQualification.vue';
import Button from '../../components/button.vue';
import { useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.js';
import { jsPDF } from 'jspdf';
import { ref, nextTick } from 'vue';

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
const printPDF = async () => {

  if (!reportContent.value) {
    console.error('لا يمكن العثور على المحتوى للطباعة.');
    return;
  }

  if (!(reportContent.value instanceof HTMLElement)) {
    console.error('reportContent.value ليس عنصر DOM');
    return;
  }

  isLoading.value = true; // تفعيل حالة التحميل

  // التأكد من تحديث DOM
  await nextTick();

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
        margin: [10, 10, 10, 10], // تقليل الهوامش [أعلى، يمين، أسفل، يسار]
        filename: 'report.pdf',
        image: { type: 'jpeg', quality: 0.95 }, // خفض الجودة قليلاً لتحسين أداء التحويل
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        // pagebreak: { mode: ['css', 'legacy'], before: '.page-break-before', after: '.page-break-after' }
      };
      html2pdf()
        .set(opt)
        .from(reportContent.value)
        .toPdf()
        .get('pdf')
        .then((pdfDoc: jsPDF) => {
          // const totalPages = pdfDoc.internal.getNumberOfPages();

          // // إضافة أرقام الصفحات
          // for (let i = 1; i <= totalPages; i++) {
          //   pdfDoc.setPage(i);
          //   pdfDoc.setFontSize(10);
          //   pdfDoc.setTextColor(150, 150, 150);
          //   pdfDoc.text(
          //     `Page ${i} of ${totalPages}`,
          //     pdfDoc.internal.pageSize.getWidth() - 20,
          //     pdfDoc.internal.pageSize.getHeight() - 10,
          //     { align: 'right' }
          //   );
          // }

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