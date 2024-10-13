<template>
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold mb-6 text-center">Review Your Information</h1>

    <!-- Step 1: Personal Information -->
    <div id="report-content" class="bg-white shadow-md rounded-lg p-6 mb-6">
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
    </div>

    <!-- Step 2: Education Information -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
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
    </div>

    <!-- Step 3: Employment History -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
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
    </div>

    <!-- Step 4: Professional Qualification -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
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
    </div>

    <!-- Step 6: Screening Disclosure and Authorization -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">Step 6: Screening Disclosure and Authorization</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoRow label="Full Name" :value="store.step6.full_name.value" />
        <InfoRow label="Email Address" :value="store.step6.email_address.value" />
        <InfoRow label="Electronic Signature" :value="store.step6.electronic_signature.value" />
        <InfoRow label="Agreed to Electronic Signature" :value="store.step6.i_agree_to_electronic_signature.value ? 'Yes' : 'No'" />
        <InfoRow label="Acknowledged Electronic Signature" :value="store.step6.acknowledge_electronic_signature.value ? 'Yes' : 'No'" />
      </div>
    </div>

    <!-- أزرار الطباعة والعودة -->
    <div class="flex justify-center space-x-4">
      <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="goBack">
        Edit Information
      </Button>
      <Button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="printPDF">
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
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// استدعاء المخزن
const store = useVerificationRequestStore();
const router = useRouter();

// دالة للعودة إلى الصفحة السابقة
const goBack = () => {
  router.push('/steps');
};

// دالة لطباعة التقرير كملف PDF
const printPDF = async () => {
  const element = document.getElementById('report-content');
  
  if (element) {
    // تحويل HTML إلى صورة باستخدام html2canvas
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    // إنشاء ملف PDF باستخدام jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // عرض الصفحة A4 بالملليمتر
    const pageHeight = 295; // ارتفاع الصفحة A4 بالملليمتر
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // إضافة الصورة إلى ملف PDF
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // إذا كان المحتوى أطول من صفحة واحدة، قم بإضافة صفحات إضافية
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // حفظ ملف PDF
    pdf.save('report.pdf');
  }
};
</script>

<style scoped>
/* تحسينات إضافية على التصميم */
.container {
  max-width: 1200px;
}
</style>
