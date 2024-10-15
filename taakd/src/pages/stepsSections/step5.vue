<!-- step5.vue -->
<template>
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold mb-6 text-center">Review Your Information</h1>

    <div id="report-content" ref="reportContent">
      <!-- ترويسة PDF -->
      <div class="header-pdf mb-6">
        <img src="../../assets/logo.png" alt="Logo" class="h-12 mx-auto mb-4" />
                عنوان التقرير
      </div>

      <!-- Step 1: Personal Information -->
      <section class="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 class="text-2xl font-semibold mb-4">Step 1: Personal Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <section class="bg-white shadow-md rounded-lg p-6 mb-6 page-break-before">
        <h2 class="text-2xl font-semibold mb-4">Step 2: Education Information</h2>
        <div v-if="store.step2.educationInformation.length > 0">
          <div v-for="(education, index) in store.step2.educationInformation" :key="index" class="mb-4">
            <h3 class="text-xl font-semibold mb-2">Education {{ index + 1 }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <p>No education information provided.</p>
        </div>
      </section>

      <!-- Step 3: Employment History -->
      <section class="bg-white shadow-md rounded-lg p-6 mb-6 page-break-before">
        <h2 class="text-2xl font-semibold mb-4">Step 3: Employment History</h2>
        <div v-if="store.step3.employment_history.length > 0">
          <div v-for="(employment, index) in store.step3.employment_history" :key="index" class="mb-4">
            <h3 class="text-xl font-semibold mb-2">Employment {{ index + 1 }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <p>No employment history provided.</p>
        </div>
      </section>

      <!-- Step 4: Professional Qualification -->
      <section class="bg-white shadow-md rounded-lg p-6 mb-6 page-break-before">
        <h2 class="text-2xl font-semibold mb-4">Step 4: Professional Qualification</h2>
        <div v-if="store.step4.professional_qualification.length > 0">
          <div v-for="(qualification, index) in store.step4.professional_qualification" :key="index" class="mb-4">
            <h3 class="text-xl font-semibold mb-2">Qualification {{ index + 1 }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow label="Awarding Body" :value="qualification.awarding_body" />
              <InfoRow label="License/Certificate Number" :value="qualification.license_or_certificate_number" />
              <InfoRow label="Issuing Country" :value="qualification.issuing_country" />
              <InfoRow label="Date Awarded" :value="qualification.date_awarded" />
              <InfoRow label="Award Name/Description" :value="qualification.award_name_description" />
            </div>
          </div>
        </div>
        <div v-else>
          <p>No professional qualifications provided.</p>
        </div>
      </section>

      <!-- تذييل PDF -->
      <div class="footer-pdf">
        <!-- سيتم إضافة أرقام الصفحات بواسطة jsPDF -->
        Page {PAGE_NUM} of {TOTAL_PAGES}
      </div>
    </div>

    <!-- أزرار الطباعة والعودة -->
    <div class="flex justify-center space-x-4 mt-8">
      <Button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn-back"
        @click="goBack"
      >
        Edit Information
      </Button>
      <Button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded btn-print"
        @click="printPDF"
      >
        Print PDF
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import InfoRow from '../../components/InfoRow.vue';
import Button from '../../components/button.vue';
import { useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';
import { ref } from 'vue';

// استخدام Pinia store
const store = useVerificationRequestStore();
const router = useRouter();

// دالة العودة
const goBack = () => {
  router.push('/steps');
};

// إضافة المرجع للمحتوى
const reportContent = ref<null | HTMLElement>(null);

// دالة طباعة PDF
const printPDF = () => {
  if (!reportContent.value) {
    console.error('لا يمكن العثور على المحتوى للطباعة.');
    return;
  }

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
        margin:       [20, 10, 20, 10], // الهوامش [أعلى، يمين، أسفل، يسار]
        filename:     'report.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['css', 'legacy'], before: '.page-break-before', after: '.page-break-after' }
      };

      // إنشاء كائن jsPDF
      const pdf = new jsPDF(opt.jsPDF.orientation, opt.jsPDF.unit, opt.jsPDF.format);

      html2pdf().set(opt).from(reportContent.value).toPdf().get('pdf').then((pdfDoc: jsPDF) => {
        const totalPages = pdfDoc.internal.getNumberOfPages();

        // إضافة أرقام الصفحات
        for (let i = 1; i <= totalPages; i++) {
          pdfDoc.setPage(i);
          pdfDoc.setFontSize(10);
          pdfDoc.setTextColor(150, 150, 150);
          pdfDoc.text(`Page ${i} of ${totalPages}`, pdfDoc.internal.pageSize.getWidth() - 20, pdfDoc.internal.pageSize.getHeight() - 10, { align: 'right' });
        }

        // حفظ ملف PDF
        pdfDoc.save('report.pdf');
      }).catch(error => {
        console.error('خطأ أثناء إنشاء PDF:', error);
      });
    })
    .catch(error => {
      console.error('خطأ في تحميل الصور:', error);
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
h1, h2, h3 {
  font-family: 'Arial', sans-serif;
}

/* إزالة الأزرار من الطباعة */
@media print {
  .btn-print, .btn-back {
    display: none;
  }
}

/* تنسيقات ترويسة PDF */
.header-pdf {
  text-align: center;
  font-size: 14px;
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
  @apply bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded;
}

.btn-back {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}
</style>