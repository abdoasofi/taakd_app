<template>
  <div dir="rtl" class="p-6 bg-gray-100 min-h-screen">
    <div v-if="request.doc" class="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
      
      <!-- Error Messages -->
      <div v-if="errors.length > 0" class="mb-4 space-y-2">
        <ErrorMessage 
          v-for="(error, index) in errors" 
          :key="index" 
          :message="error" 
        />
      </div>

      <!-- Education Information Sections -->
      <div class="space-y-4">
        <div 
          v-for="(education, index) in request.doc.education_information" 
          :key="education.id" 
          class="border border-gray-200 rounded-md"
        >
          <!-- Toggle Button -->
          <button 
            :id="'section-button-' + education.id"
            @click="toggleSection(education.id)" 
            :aria-expanded="isOpen(education.id)"
            :aria-controls="'section-content-' + education.id"
            class="w-full flex justify-between items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none"
          >
            <span>{{ education.name_of_school_or_college_university || 'سجل تعليمي جديد' }}</span>
            <svg 
              :class="{'transform rotate-180': isOpen(education.id)}" 
              class="w-5 h-5 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <!-- Toggleable Content -->
          <transition name="accordion">
            <div 
              v-show="isOpen(education.id)" 
              class="p-4 space-y-4"
              :id="'section-content-' + education.id"
              role="region"
              :aria-labelledby="'section-button-' + education.id"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- School Name -->
                <div>
                  <label class="block text-gray-700">اسم المدرسة أو الكلية/الجامعة</label>
                  <input 
                    v-model="education.name_of_school_or_college_university" 
                    placeholder="اسم المدرسة أو الكلية/الجامعة"  
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Field of Study -->
                <div>
                  <label class="block text-gray-700">مجال الدراسة أو التخصص</label>
                  <input 
                    v-model="education.field_of_study_or_major" 
                    placeholder="مجال الدراسة أو التخصص"  
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Date Enrolled From -->
                <div>
                  <label class="block text-gray-700">تاريخ الالتحاق من</label>
                  <input 
                    type="date" 
                    v-model="education.date_enrolled_from" 
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Date Enrolled To -->
                <div>
                  <label class="block text-gray-700">تاريخ الالتحاق إلى</label>
                  <input 
                    type="date" 
                    v-model="education.date_enrolled_to" 
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Country -->
                <div>
                  <label class="block text-gray-700">البلد</label>
                  <select 
                    v-model="education.country" 
                    @change="education.selectedCity = ''" 
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر البلد</option>
                    <option 
                      v-for="country in optionCountry" 
                      :key="country.value" 
                      :value="country.value"
                    >
                      {{ country.label }}
                    </option>
                  </select>
                </div>

                <!-- City -->
                <div>
                  <label class="block text-gray-700">المدينة</label>
                  <select 
                    v-model="education.city" 
                    @change="education.governorate = ''" 
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر المدينة</option>
                    <option 
                      v-for="city in getOptionCity(education.country)" 
                      :key="city.value" 
                      :value="city.value"
                    >
                      {{ city.label }}
                    </option>
                  </select>
                </div>

                <!-- Governorate -->
                <div>
                  <label class="block text-gray-700">المحافظة</label>
                  <select 
                    v-model="education.governorate" 
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر المحافظة</option>
                    <option 
                      v-for="governorate in getOptionGovernorate(education.city)" 
                      :key="governorate.value" 
                      :value="governorate.value"
                    >
                      {{ governorate.label }}
                    </option>
                  </select>
                </div>

                <!-- Phone -->
                <div>
                  <label class="block text-gray-700">الهاتف:</label>
                  <input 
                    type="tel" 
                    v-model="education.phone" 
                    placeholder="الهاتف" 
                    pattern="[0-9]{10,15}"
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Extension -->
                <div>
                  <label class="block text-gray-700">التحويلة</label>
                  <input 
                    v-model="education.ext" 
                    placeholder="التحويلة"  
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <!-- Diploma Completion -->
                <div>
                  <label class="block text-gray-700">هل أتممت الدرجة/الدبلوم؟</label>
                  <select 
                    v-model="education.diploma" 
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر</option>
                    <option value="Yes">نعم</option>
                    <option value="No">لا</option>
                  </select>
                </div>

                <!-- Another Name Used -->
                <div>
                  <label class="block text-gray-700">هل استخدمت اسمًا آخر غير الموجود على بطاقة الهوية الحكومية الحالية؟</label>
                  <select 
                    v-model="education.another_name" 
                    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر</option>
                    <option value="Yes">نعم</option>
                    <option value="No">لا</option>
                  </select>
                </div>
              </div>

              <!-- Remove Button -->
              <div class="flex justify-end">
                <button 
                  @click="confirmRemove(education.id)" 
                  class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  حذف السجل
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Add and Save Buttons -->
      <div class="flex items-center mt-6 space-x-4">
        <button 
          @click="addEducation" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          إضافة سجل تعليمي
        </button>
        <button 
          @click="saveRequest" 
          :disabled="isSaving"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          <span v-if="!isSaving">حفظ الطلب</span>
          <span v-else>جاري الحفظ...</span>
        </button>
      </div>
    </div>
    
    <div v-else class="flex justify-center items-center h-full">
      <p class="text-gray-700">جاري التحميل...</p>
    </div>
  </div>
</template>

<script setup>
import { createDocumentResource, ErrorMessage } from 'frappe-ui'
import { ref, watch, reactive, nextTick, computed } from 'vue'
// import { v4 as uuidv4 } from 'uuid' // For unique IDs
import { location } from '../data/useAddressLogic'
import { useToast } from "vue-toastification" // Optional: Toast Notifications

// Initialize toast
const toast = useToast()

// Create the document resource
const request = createDocumentResource({
  doctype: 'Verification Instructions Request',
  name: 'VIR-2024-26-09-000007', // Uncomment to create a new request
})

// Computed properties for dropdown options
const optionCountry = computed(() => {
  return location.data
    .filter(loc => loc.location_type === 'Country')
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))
})

const getOptionCity = (country) => {
  if (!country) return []
  return location.data
    .filter(loc => loc.location_type === 'City' && loc.parent_location === country)
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))
}

const getOptionGovernorate = (city) => {
  if (!city) return []
  return location.data
    .filter(loc => loc.location_type === 'Governorate' && loc.parent_location === city)
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))
}

// Initialize education_information as an array if not present
watch(() => request.doc, (newDoc) => {
  if (newDoc && !newDoc.education_information) {
    newDoc.education_information = []
  }
}, { immediate: true })

// Manage open sections
const openSections = reactive({})

const toggleSection = (id) => {
  openSections[id] = !openSections[id]
}

const isOpen = (id) => {
  return openSections[id]
}

// Manage errors
const errors = ref([])

// Add a new education record
const addEducation = () => {
  const newEducation = {
    // id: uuidv4(), // Use UUID for unique ID
    country: '',
    city: '',
    governorate: '',
    continuous: false,
    name_of_school_or_college_university: '',
    field_of_study_or_major: '',
    phone: '',
    ext: '',
    diploma: '',
    date_enrolled_from: '',
    date_enrolled_to: '',
    another_name: '',
    selectedCountry: '',
    selectedCity: ''
  }
  request.doc.education_information.push(newEducation)
  nextTick(() => {
    openSections[newEducation.id] = true
  })
}

// Confirm before removing an education record
const confirmRemove = (id) => {
  if (confirm('هل أنت متأكد من رغبتك في حذف هذا السجل التعليمي؟')) {
    removeEducation(id)
  }
}

// Remove an education record
const removeEducation = (id) => {
  const index = request.doc.education_information.findIndex(edu => edu.id === id)
  if (index !== -1) {
    request.doc.education_information.splice(index, 1)
    delete openSections[id]
  }
}

// Save the request
const isSaving = ref(false)

const saveRequest = async () => {
  errors.value = [] // Reset errors before validation

  request.doc.education_information.forEach((education, index) => {
    if (!education.name_of_school_or_college_university) {
      errors.value.push(`اسم المدرسة أو الكلية/الجامعة مطلوب في السجل رقم ${index + 1}.`)
    }
    if (!education.field_of_study_or_major) {
      errors.value.push(`مجال الدراسة أو التخصص مطلوب في السجل رقم ${index + 1}.`)
    }
    if (!education.country) {
      errors.value.push(`البلد مطلوب في السجل رقم ${index + 1}.`)
    }
    if (!education.city) {
      errors.value.push(`المدينة مطلوبة في السجل رقم ${index + 1}.`)
    }
    if (!education.governorate) {
      errors.value.push(`المحافظة مطلوبة في السجل رقم ${index + 1}.`)
    }
    if (!education.diploma) {
      errors.value.push(`هل أتممت الدرجة/الدبلوم؟ مطلوب في السجل رقم ${index + 1}.`)
    }
    if (!education.date_enrolled_from) {
      errors.value.push(`تاريخ البدء مطلوب في السجل رقم ${index + 1}.`)
    }
    if (!education.date_enrolled_to) {
      errors.value.push(`تاريخ الانتهاء مطلوب في السجل رقم ${index + 1}.`)
    }

    // Phone pattern validation
    // const phonePattern = /^[0-9]{10,15}$/
    // if (education.phone && !phonePattern.test(education.phone)) {
    //   errors.value.push(`رقم الهاتف غير صالح في السجل رقم ${index + 1}.`)
    // }
  })

  if (errors.value.length > 0) {
    return
  }

  isSaving.value = true
  try {
    await request.setValue.submit({
      education_information: request.doc.education_information,
      // يمكنك إضافة حقول أخرى إذا لزم الأمر
    })
    // .then(() => {
    //   alert('تم حفظ الطلب بنجاح!')
    // })
    // .catch((error) => {
    //   alert(`حدث خطأ أثناء حفظ الطلب: ${error.message}`)
    // })
    toast.success('تم حفظ الطلب بنجاح!')
  } catch (error) {
    errors.value.push(`حدث خطأ أثناء حفظ الطلب: ${error.message}`)
  } finally {
    isSaving.value = false
  }
}

// Format date (if needed elsewhere)
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('ar-EG')
}
</script>

<style scoped>
.accordion-enter-active, .accordion-leave-active {
  transition: max-height 0.3s ease;
}
.accordion-enter-from, .accordion-leave-to {
  max-height: 0;
  overflow: hidden;
}
/* Optional: Add more styles as needed */
</style>