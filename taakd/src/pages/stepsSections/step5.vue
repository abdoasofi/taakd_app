<template>
  <div class="min-h-screen bg-background p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-custom-green">Review your information</h1>
        <!-- <p class="text-mutedText mt-2">عرض شامل للبيانات المدخلة بطريقة احترافية وتفاعلية</p> -->
        <div class="mt-6">
          <button @click="printReport" class="flex items-center justify-center px-6 py-3 bg-info/15 text-black srounded-md hover:bg-accent transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17l4-4 4 4M6 13h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2z" />
            </svg>
            طباعة التقرير
          </button>
        </div>
      </header>

      <!-- الأقسام -->
      <section class="mb-12">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="bg-info/15 shadow-sm hover:bg-hover text-black px-2 py-1 text-sm font-medium rounded-lg">
            <h2 class="text-2xl font-semibold text-black flex items-center">
              Step 1: Personal Information
              <svg  width="32" height="32" class="ml-2 font-black" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66699 25.3337H8.34899L21.9977 11.685L20.3157 10.003L6.66699 23.6517V25.3337ZM5.87233 27.3337C5.53077 27.3337 5.24455 27.2181 5.01366 26.987C4.78255 26.7561 4.66699 26.4699 4.66699 26.1283V23.8183C4.66699 23.4932 4.72944 23.1833 4.85433 22.8887C4.97899 22.594 5.15077 22.3372 5.36966 22.1183L22.2543 5.24132C22.4559 5.05821 22.6784 4.91677 22.922 4.81699C23.1658 4.71699 23.4213 4.66699 23.6887 4.66699C23.956 4.66699 24.2149 4.71444 24.4653 4.80933C24.716 4.90422 24.9379 5.0551 25.131 5.26199L26.7593 6.91066C26.9662 7.10377 27.1137 7.32599 27.2017 7.57733C27.2897 7.82866 27.3337 8.07999 27.3337 8.33133C27.3337 8.59955 27.2879 8.85544 27.1963 9.09899C27.1048 9.34277 26.9591 9.56544 26.7593 9.76699L9.88232 26.631C9.66344 26.8499 9.40666 27.0217 9.11199 27.1463C8.81733 27.2712 8.50744 27.3337 8.18233 27.3337H5.87233ZM21.142 10.8587L20.3157 10.003L21.9977 11.685L21.142 10.8587Z" fill="#FFFFFF"/>
              </svg>            
            </h2>
          </div>
          <div class="px-6 py-6">
            <!-- محتوى القسم -->
            <div v-if="request.doc">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoRow label="الاسم الكامل" :value="request.doc.employer_name" />
                <InfoRow label="الاسم الكامل" :value="request.doc.full_name" />

                <!-- أضف المزيد من الحقول حسب الحاجة -->
              </div>
            </div>
            <div v-else>
              <p class="text-mutedText">لا توجد معلومات شخصية مسجلة.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- قسم معلومات التعليم -->
      <section class="mb-12">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="bg-info/15 shadow-sm hover:bg-hover text-black px-2 py-1 text-sm font-medium rounded-lg">
            <h2 class="text-2xl font-semibold text-black flex items-center">
              Step 2: Education Information
              <svg width="32" height="32" class="ml-2" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66699 25.3337H8.34899L21.9977 11.685L20.3157 10.003L6.66699 23.6517V25.3337ZM5.87233 27.3337C5.53077 27.3337 5.24455 27.2181 5.01366 26.987C4.78255 26.7561 4.66699 26.4699 4.66699 26.1283V23.8183C4.66699 23.4932 4.72944 23.1833 4.85433 22.8887C4.97899 22.594 5.15077 22.3372 5.36966 22.1183L22.2543 5.24132C22.4559 5.05821 22.6784 4.91677 22.922 4.81699C23.1658 4.71699 23.4213 4.66699 23.6887 4.66699C23.956 4.66699 24.2149 4.71444 24.4653 4.80933C24.716 4.90422 24.9379 5.0551 25.131 5.26199L26.7593 6.91066C26.9662 7.10377 27.1137 7.32599 27.2017 7.57733C27.2897 7.82866 27.3337 8.07999 27.3337 8.33133C27.3337 8.59955 27.2879 8.85544 27.1963 9.09899C27.1048 9.34277 26.9591 9.56544 26.7593 9.76699L9.88232 26.631C9.66344 26.8499 9.40666 27.0217 9.11199 27.1463C8.81733 27.2712 8.50744 27.3337 8.18233 27.3337H5.87233ZM21.142 10.8587L20.3157 10.003L21.9977 11.685L21.142 10.8587Z" fill="#FFFFFF"/>
              </svg>            
            </h2>
          </div>
          <div class="px-6 py-6">
            <!-- محتوى القسم -->
            <div v-if="request.doc.education_information && request.doc.education_information.length">
              <div v-for="(education, index) in request.doc.education_information" :key="education.id" class="mb-6">
                <div class="mb-4">
                  <h3 class="text-xl font-medium text-custom-green flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.1046 0 2 .8954 2 2v2c0 1.1046-.8954 2-2 2s-2-.8954-2-2V10c0-1.1046.8954-2 2-2z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 10h-6l-2 2H5v6h14v-6z" />
                    </svg>
                    {{ education.name_of_school_or_college_university || `تعليم ${index + 1}` }}
                  </h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <InfoRow label="اسم المدرسة/الكلية/الجامعة" :value="education.name_of_school_or_college_university" />
                    <InfoRow label="مجال الدراسة/التخصص" :value="education.field_of_study_or_major" />
                    <InfoRow label="البلد" :value="education.country" />
                    <InfoRow label="المدينة" :value="education.city" />
                  </div>
                  <div class="space-y-2">
                    <InfoRow label="المحافظة" :value="education.governorate" />
                    <InfoRow label="تفاصيل الموقع" :value="education.location_text || 'N/A'" />
                    <InfoRow label="تاريخ البدء" :value="formatDate(education.from_date)" />
                    <InfoRow label="تاريخ الانتهاء" :value="formatDate(education.to_date)" />
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="text-mutedText">لا توجد سجلات لمعلومات التعليم.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- قسم تاريخ التوظيف -->
      <section class="mb-12">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="bg-info/15 shadow-sm hover:bg-hover text-black px-2 py-1 text-sm font-medium rounded-lg">
            <h2 class="text-2xl font-semibold text-black flex items-center">
              Step 3: Employment History
              <svg width="32" height="32" class="ml-2" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66699 25.3337H8.34899L21.9977 11.685L20.3157 10.003L6.66699 23.6517V25.3337ZM5.87233 27.3337C5.53077 27.3337 5.24455 27.2181 5.01366 26.987C4.78255 26.7561 4.66699 26.4699 4.66699 26.1283V23.8183C4.66699 23.4932 4.72944 23.1833 4.85433 22.8887C4.97899 22.594 5.15077 22.3372 5.36966 22.1183L22.2543 5.24132C22.4559 5.05821 22.6784 4.91677 22.922 4.81699C23.1658 4.71699 23.4213 4.66699 23.6887 4.66699C23.956 4.66699 24.2149 4.71444 24.4653 4.80933C24.716 4.90422 24.9379 5.0551 25.131 5.26199L26.7593 6.91066C26.9662 7.10377 27.1137 7.32599 27.2017 7.57733C27.2897 7.82866 27.3337 8.07999 27.3337 8.33133C27.3337 8.59955 27.2879 8.85544 27.1963 9.09899C27.1048 9.34277 26.9591 9.56544 26.7593 9.76699L9.88232 26.631C9.66344 26.8499 9.40666 27.0217 9.11199 27.1463C8.81733 27.2712 8.50744 27.3337 8.18233 27.3337H5.87233ZM21.142 10.8587L20.3157 10.003L21.9977 11.685L21.142 10.8587Z" fill="#FFFFFF"/>
              </svg>
            </h2>
          </div>
          <div class="px-6 py-6">
            <!-- محتوى القسم -->
            <div v-if="request.doc.employment_history && request.doc.employment_history.length">
              <div v-for="(employment, index) in request.doc.employment_history" :key="employment.id" class="mb-6">
                <div class="mb-4">
                  <h3 class="text-xl font-medium text-custom-green flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.1046 0 2 .8954 2 2v2c0 1.1046-.8954 2-2 2s-2-.8954-2-2V10c0-1.1046.8954-2 2-2z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 10h-6l-2 2H5v6h14v-6z" />
                    </svg>
                    {{ employment.company || `وظيفة ${index + 1}` }}
                  </h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <InfoRow label="الشركة" :value="employment.company" />
                    <InfoRow label="اسم صاحب العمل" :value="employment.name_of_your_employer" />
                    <InfoRow label="إذن للاتصال بالمُشغّل" :value="employment.contact_the_employer ? 'نعم' : 'لا'" />
                    <InfoRow label="إصدار الراتب من قبل الشركة" :value="employment.issuing_salary ? 'نعم' : 'لا'" />
                  </div>
                  <div class="space-y-2">
                    <InfoRow label="البلد" :value="employment.country" />
                    <InfoRow label="المدينة" :value="employment.city" />
                    <InfoRow label="المحافظة" :value="employment.governorate" />
                    <InfoRow label="تفاصيل الموقع" :value="employment.location_text || 'N/A'" />
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="text-mutedText">لا توجد سجلات لتاريخ التوظيف.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- قسم المؤهلات المهنية -->
      <section class="mb-12">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <div class="bg-info/15 shadow-sm hover:bg-hover text-black px-2 py-1 text-sm font-medium rounded-lg">
            <h2 class="text-2xl font-semibold text-black flex items-center">
              Step 4: Professional Qualification Verification
              <svg width="32" height="32" class="ml-2" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66699 25.3337H8.34899L21.9977 11.685L20.3157 10.003L6.66699 23.6517V25.3337ZM5.87233 27.3337C5.53077 27.3337 5.24455 27.2181 5.01366 26.987C4.78255 26.7561 4.66699 26.4699 4.66699 26.1283V23.8183C4.66699 23.4932 4.72944 23.1833 4.85433 22.8887C4.97899 22.594 5.15077 22.3372 5.36966 22.1183L22.2543 5.24132C22.4559 5.05821 22.6784 4.91677 22.922 4.81699C23.1658 4.71699 23.4213 4.66699 23.6887 4.66699C23.956 4.66699 24.2149 4.71444 24.4653 4.80933C24.716 4.90422 24.9379 5.0551 25.131 5.26199L26.7593 6.91066C26.9662 7.10377 27.1137 7.32599 27.2017 7.57733C27.2897 7.82866 27.3337 8.07999 27.3337 8.33133C27.3337 8.59955 27.2879 8.85544 27.1963 9.09899C27.1048 9.34277 26.9591 9.56544 26.7593 9.76699L9.88232 26.631C9.66344 26.8499 9.40666 27.0217 9.11199 27.1463C8.81733 27.2712 8.50744 27.3337 8.18233 27.3337H5.87233ZM21.142 10.8587L20.3157 10.003L21.9977 11.685L21.142 10.8587Z" fill="#FFFFFF"/>
              </svg>
            </h2>
          </div>
          <div class="px-6 py-6">
            <!-- محتوى القسم -->
            <div v-if="request.doc.professional_qualification && request.doc.professional_qualification.length">
              <div v-for="(qualification, index) in request.doc.professional_qualification" :key="qualification.id" class="mb-6">
                <div class="mb-4">
                  <h3 class="text-xl font-medium text-custom-green flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.1046 0 2 .8954 2 2v2c0 1.1046-.8954 2-2 2s-2-.8954-2-2V10c0-1.1046.8954-2 2-2z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 10h-6l-2 2H5v6h14v-6z" />
                    </svg>
                    {{ qualification.awarding_body || `مؤهل مهني ${index + 1}` }}
                  </h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <InfoRow label="الجهة المانحة" :value="qualification.awarding_body" />
                    <InfoRow label="رقم الرخصة أو الشهادة" :value="qualification.license_or_certificate_number" />
                    <InfoRow label="البلد المصدّر" :value="qualification.issuing_country" />
                  </div>
                  <div class="space-y-2">
                    <InfoRow label="تاريخ الحصول" :value="formatDate(qualification.date_awarded)" />
                    <InfoRow label="تاريخ الانتهاء" :value="qualification.is_an_expiration_date ? formatDate(qualification.expiration_date) : 'N/A'" />
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div class="space-y-2">
                    <InfoRow label="اسم الجوائز/الوصف" :value="qualification.award_name_description" />
                  </div>
                  <div class="space-y-2">
                    <InfoRow label="تاريخ انتهاء المؤهل" :value="qualification.is_an_expiration_date ? 'نعم' : 'لا'" />
                    <InfoRow label="اسمك يتغير في هذا المؤهل" :value="qualification.your_name_varies ? 'نعم' : 'لا'" />
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="text-mutedText">لا توجد سجلات للمؤهلات المهنية.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <!-- <footer class="text-center text-mutedText mt-12">
        © 2024 Asofi . جميع الحقوق محفوظة.
      </footer> -->
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue' 
import { createDocumentResource } from 'frappe-ui'
import { useToast } from 'vue-toastification'
import InfoRow from '../../components/InfoRow.vue' // تأكد من مسار المكون الفرعي
 
// استخدام Vue Router لجلب معرّف المستند ديناميكيًا (إذا كنت تستخدم)
import { useRoute } from 'vue-router' 
const route = useRoute()
const docName = route.params.docName || 'VIR-2024-26-09-000007' // مثال: يمكن تغيير حسب تطبيقك

// مورد المستند
const request = createDocumentResource({
  doctype: 'Verification Instructions Request',
  name: docName,
  auto: true,
})  

// تهيئة Toast
const toast = useToast()

// دالة لطباعة التقرير
const printReport = () => {
  window.print()
}  

// دالة لتنسيق التواريخ
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString('ar-EG', options) // تحديد اللغة العربية المصرية
}  
  
// مراقبة التغييرات في المستند لضمان تهيئة الحقول بشكل صحيح
watch(() => request.doc, (newDoc) => {
  if (newDoc) {
    if (!newDoc.employment_history) {
      newDoc.employment_history = []
    }
    if (!newDoc.education_information) {
      newDoc.education_information = []
    }
    if (!newDoc.professional_qualification) {
      newDoc.professional_qualification = []
    }
  }
}, { immediate: true })
</script>


<style scoped>
/* تأثير الانتقال للظهور */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* تخصيص الألوان */
.text-custom-green {
  color: #10B981; /* اللون الأخضر المخصص */
}

.bg-custom-green {
  background-color: #10B981; /* نفس اللون الأخضر للم backgrounds */
}

.text-mutedText {
  color: #6B7280; /* لون النص المحايد */
}

/* تحسين تصميم الحاويات */
.bg-white {
  background-color: #ffffff;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

/* تحسين تصميم العناوين */
.text-black s{
  color: #ffffff;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

/* تحسين تصميم عناصر InfoRow */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.space-y-2 > :not(:last-child) {
  margin-bottom: 0.5rem;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.md\:grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-6 {
  gap: 1.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.text-center {
  text-align: center;
}

.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.h-5 {
  height: 1.25rem;
}

.w-5 {
  width: 1.25rem;
}

.h-6 {
  height: 1.5rem;
}

.w-6 {
  width: 1.5rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.rounded-md {
  border-radius: 0.375rem;
}



.transition {
  transition: all 0.3s ease;
}

.bg-background {
  background-color: #f3f4f6; /* لون خلفية فاتح */
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

