<template>
    <div v-if="request.doc">
      <h1>طلب تعليمات التحقق: {{ request.doc.name }}</h1>
      
      <!-- عرض معلومات الطلب الرئيسي -->
      <div>
        <label><strong>العميل:</strong></label>
        <span>{{ request.doc.customer }}</span>
      </div>
      <div>
        <label><strong>تاريخ الطلب:</strong></label>
        <span>{{ formatDate(request.doc.order_date) }}</span>
      </div>
  
      <!-- جدول المعلومات التعليمية الفرعية -->
      <h2>المعلومات التعليمية</h2>
      <table>
        <thead>
          <tr>
            <th>الشركة</th>
            <th>مستمر</th>
            <th>البلد</th>
            <th>من تاريخ</th>
            <th>الهاتف</th>
            <th>نوع التوظيف</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(education, index) in request.doc.education_information" :key="education.name">
            <td>
              <input 
                v-model="education.company" 
                placeholder="اسم الشركة" 
                @input="updateEducation(index, 'company', education.company)"
              />
            </td>
            <td>
              <input 
                type="checkbox" 
                v-model="education.continuous" 
                @change="updateEducation(index, 'continuous', education.continuous)"
              />
            </td>
            <td>
              <select 
                v-model="education.country" 
                @change="updateEducation(index, 'country', education.country)"
              >
                <option value="">اختر بلد</option>
                <option v-for="country in countries" :key="country.value" :value="country.value">
                  {{ country.label }}
                </option>
              </select>
            </td>
            <td>
              <input 
                type="date" 
                v-model="education.from_date" 
                @change="updateEducation(index, 'from_date', education.from_date)" 
              />
            </td>
            <td>
              <input 
                type="tel" 
                v-model="education.phone" 
                placeholder="الهاتف" 
                @input="updateEducation(index, 'phone', education.phone)"
              />
            </td>
            <td>
              <select 
                v-model="education.type_of_employment" 
                @change="updateEducation(index, 'type_of_employment', education.type_of_employment)"
              >
                <option value="">اختر نوع التوظيف</option>
                <option value="Full-time">دوام كامل</option>
                <option value="Part-time">دوام جزئي</option>
                <option value="Contract">عقد</option>
                <option value="Internship">تدريب</option>
              </select>
            </td>
            <td>
              <Button @click="removeEducation(index)" type="danger">
                حذف
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- أزرار الإضافة والحفظ -->
      <Button @click="addEducation" type="primary">
        إضافة سجل تعليمي
      </Button>
      <Button @click="saveRequest" type="success" style="margin-left: 10px;">
        حفظ الطلب
      </Button>
    </div>
    
    <div v-else>
      جاري التحميل...
    </div>
  </template>
  
  <script setup>
  import { createDocumentResource, Button } from 'frappe-ui'
  import { ref } from 'vue'
  
  // **1. إنشاء مورد الوثيقة للـ DocType الرئيسي (Verification Instructions Request)**
  const request = createDocumentResource({
    doctype: 'Verification Instructions Request',
    name: 'VIR-2024-26-09-000007', // يمكنك تركه فارغًا لإنشاء طلب جديد
    // يمكنك إضافة whitelistedMethods إذا كانت هناك عمليات مخصصة
  })
  
  // **2. تعريف قائمة البلدان (يمكن تعديلها وفقًا للاحتياجات)**
  const countries = ref([
    { label: 'مصر', value: 'EG' },
    { label: 'اليمن', value: 'اليمن' },
    { label: 'الإمارات', value: 'AE' },
    { label: 'قطر', value: 'قطر' },
    // أضف المزيد من البلدان حسب الحاجة
  ])
  
  // **3. دالة لإضافة سجل تعليمي جديد إلى الجدول الفرعي**
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
  }
  
  // **4. دالة لحذف سجل تعليمي من الجدول الفرعي بناءً على الفهرس**
  const removeEducation = (index) => {
    request.doc.education_information.splice(index, 1)
  }
  
  // **5. دالة لتحديث بيانات سجل تعليمي معين**
  const updateEducation = (index, field, value) => {
    // تحديث الحقل المحدد في السجل المحدد
    request.doc.education_information[index][field] = value
  }
  
  // **6. دالة لحفظ التغييرات في الطلب**
  const saveRequest = () => {
    // **a. التحقق من صحة البيانات قبل الحفظ**
    for (const [index, education] of request.doc.education_information.entries()) {
      if (!education.company) {
        alert(`اسم الشركة مطلوب في السجل رقم ${index + 1}.`)
        return
      }
      if (!education.country) {
        alert(`البلد مطلوب في السجل رقم ${index + 1}.`)
        return
      }
      if (!education.from_date) {
        alert(`تاريخ البدء مطلوب في السجل رقم ${index + 1}.`)
        return
      }
      if (!education.type_of_employment) {
        alert(`نوع التوظيف مطلوب في السجل رقم ${index + 1}.`)
        return
      }
      // يمكنك إضافة تحقق إضافي حسب الحاجة
    }
  
    // **b. حفظ التغييرات باستخدام setValue.submit**
    request.setValue.submit({
      education_information: request.doc.education_information,
      // يمكنك إضافة حقول أخرى إذا لزم الأمر
    })
    .then(() => {
      alert('تم حفظ الطلب بنجاح!')
    })
    .catch((error) => {
      alert(`حدث خطأ أثناء حفظ الطلب: ${error.message}`)
    })
  }
  
  // **7. دالة لتنسيق التاريخ (اختياري)**
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('ar-EG') // تنسيق التاريخ باللغة العربية المصرية
  }
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  input, select {
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
  }
  
  button {
    margin: 5px;
  }
  </style>