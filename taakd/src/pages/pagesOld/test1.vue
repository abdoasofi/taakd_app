<template>
    <div dir="rtl" class="p-6 bg-gray-100 min-h-screen">
      <div v-if="request.doc" class="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold mb-4">طلب تعليمات التحقق: {{ request.doc.name }}</h1>
        
        <!-- عرض معلومات الطلب الرئيسي -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-gray-700 font-semibold">العميل:</label>
            <span class="text-gray-900">{{ request.doc.customer }}</span>
          </div>
          <div>
            <label class="block text-gray-700 font-semibold">تاريخ الطلب:</label>
            <span class="text-gray-900">{{ formatDate(request.doc.order_date) }}</span>
          </div>
        </div>
    
        <!-- قائمة المعلومات التعليمية الفرعية على شكل ترويجات (Toggles) -->
        <h2 class="text-xl font-semibold mb-4">المعلومات التعليمية</h2>
        <div class="space-y-4">
          <div 
            v-for="(education, index) in request.doc.education_information" 
            :key="index" 
            class="border border-gray-200 rounded-md"
          >
            <!-- رأس القسم الذي يمكن النقر عليه لتوسيع/طي -->
            <button 
              @click="toggleSection(index)" 
              class="w-full flex justify-between items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none"
            >
              <span>{{ education.company || 'سجل تعليمي جديد' }}</span>
              <svg 
                :class="{'transform rotate-180': isOpen(index)}" 
                class="w-5 h-5 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
  
            <!-- محتوى القسم القابل للتوسيع -->
            <div v-show="isOpen(index)" class="p-4 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700">اسم الشركة:</label>
                  <input 
                    v-model="education.company" 
                    placeholder="اسم الشركة" 
                    @input="updateEducation(index, 'company', education.company)"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div class="flex items-center">
                  <label class="text-gray-700 mr-2">مستمر:</label>
                  <input 
                    type="checkbox" 
                    v-model="education.continuous" 
                    @change="updateEducation(index, 'continuous', education.continuous)"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label class="block text-gray-700">البلد:</label>
                  <select 
                    v-model="education.country" 
                    @change="updateEducation(index, 'country', education.country)"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر بلد</option>
                    <option v-for="country in countries" :key="country.value" :value="country.value">
                      {{ country.label }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-gray-700">من تاريخ:</label>
                  <input 
                    type="date" 
                    v-model="education.from_date" 
                    @change="updateEducation(index, 'from_date', education.from_date)" 
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-gray-700">الهاتف:</label>
                  <input 
                    type="tel" 
                    v-model="education.phone" 
                    placeholder="الهاتف" 
                    @input="updateEducation(index, 'phone', education.phone)"
                    pattern="[0-9]{10}"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-gray-700">نوع التوظيف:</label>
                  <select 
                    v-model="education.type_of_employment" 
                    @change="updateEducation(index, 'type_of_employment', education.type_of_employment)"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر نوع التوظيف</option>
                    <option value="Full-time">دوام كامل</option>
                    <option value="Part-time">دوام جزئي</option>
                    <option value="Contract">عقد</option>
                    <option value="Internship">تدريب</option>
                  </select>
                </div>
              </div>
  
              <!-- زر حذف السجل -->
              <div class="flex justify-end">
                <button 
                  @click="removeEducation(index)" 
                  class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  حذف السجل
                </button>
              </div>
            </div>
          </div>
        </div>
    
        <!-- أزرار الإضافة والحفظ -->
        <div class="flex items-center mt-6 space-x-4">
          <button 
            @click="addEducation" 
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            إضافة سجل تعليمي
          </button>
          <button 
            @click="saveRequest" 
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            حفظ الطلب
          </button>
        </div>
      </div>
      
      <div v-else class="flex justify-center items-center h-full">
        <p class="text-gray-700">جاري التحميل...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { createDocumentResource, Button, frappe } from 'frappe-ui'
  import { ref, watch, reactive } from 'vue'
  
  // إنشاء مورد الوثيقة للـ DocType الرئيسي (Verification Instructions Request)
  const request = createDocumentResource({
    doctype: 'Verification Instructions Request',
    // name: 'VIR-2024-26-09-000007', // إلغاء التعليق لإنشاء طلب جديد
  })
  
  // تعريف قائمة البلدان
  const countries = ref([
    { label: 'مصر', value: 'EG' },
    { label: 'اليمن', value: 'YE' },
    { label: 'الإمارات', value: 'AE' },
    { label: 'قطر', value: 'QA' },
    // أضف المزيد من البلدان حسب الحاجة
  ])
  
  // تأكد من تهيئة education_information كصفيف
  watch(() => request.doc, (newDoc) => {
    if (newDoc && !newDoc.education_information) {
      newDoc.education_information = []
    }
  }, { immediate: true })
  
  // حالة التوسعة لكل قسم
  const openSections = reactive({})
  
  // دالة للتحكم في توسيع/طي كل قسم
  const toggleSection = (index) => {
    openSections[index] = !openSections[index]
  }
  
  const isOpen = (index) => {
    return openSections[index]
  }
  
  // دالة لإضافة سجل تعليمي جديد إلى القائمة
  const addEducation = () => {
    const newEducation = {
      company: '',
      continuous: false,
      country: '',
      from_date: '',
      phone: '',
      type_of_employment: '',
    }
    request.doc.education_information.push(newEducation)
    // فتح القسم الجديد تلقائيًا
    nextTick(() => {
      openSections[request.doc.education_information.length - 1] = true
    })
  }
  
  // دالة لحذف سجل تعليمي بناءً على الفهرس
  const removeEducation = (index) => {
    request.doc.education_information.splice(index, 1)
    delete openSections[index]
  }
  
  // دالة لتحديث بيانات سجل تعليمي معين
  const updateEducation = (index, field, value) => {
    request.doc.education_information[index][field] = value
  }
  
  // دالة لحفظ التغييرات في الطلب
  const saveRequest = () => {
    const errors = []
  
    request.doc.education_information.forEach((education, index) => {
      if (!education.company) {
        errors.push(`اسم الشركة مطلوب في السجل رقم ${index + 1}.`)
      }
      if (!education.country) {
        errors.push(`البلد مطلوب في السجل رقم ${index + 1}.`)
      }
      if (!education.from_date) {
        errors.push(`تاريخ البدء مطلوب في السجل رقم ${index + 1}.`)
      }
      if (!education.type_of_employment) {
        errors.push(`نوع التوظيف مطلوب في السجل رقم ${index + 1}.`)
      }
      // تحقق إضافي لنمط الهاتف
      const phonePattern = /^[0-9]{10}$/
      if (education.phone && !phonePattern.test(education.phone)) {
        errors.push(`رقم الهاتف غير صالح في السجل رقم ${index + 1}.`)
      }
    })
  
    if (errors.length > 0) {
      frappe.show_alert({
        message: errors.join('<br>'),
        indicator: 'red'
      })
      return
    }
  
    // حفظ التغييرات باستخدام setValue.submit
    request.setValue.submit({
      education_information: request.doc.education_information,
      // إضافة حقول أخرى إذا لزم الأمر
    })
    .then(() => {
      frappe.show_alert({
        message: 'تم حفظ الطلب بنجاح!',
        indicator: 'green'
      })
    })
    .catch((error) => {
      frappe.show_alert({
        message: `حدث خطأ أثناء حفظ الطلب: ${error.message}`,
        indicator: 'red'
      })
    })
  }
  
  // دالة لتنسيق التاريخ
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('ar-EG')
  }
  </script>