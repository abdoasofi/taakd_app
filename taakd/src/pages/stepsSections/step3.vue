<template>
  <div class="pt-3 container">
    <h3 class="text-lg font-medium mb-3 text-black">Employment History</h3>

    <div dir="ltr" class="p-6 bg-bg min-h-screen">
      <div v-if="request.doc" class="max-w-7xl mx-auto bg-bg shadow-md rounded-lg p-6">
        
        <!-- رسائل الخطأ -->
        <div v-if="errors.length > 0" class="mb-4 space-y-2">
          <ErrorMessage 
            v-for="(error, index) in errors" 
            :key="index" 
            :message="error" 
          />
        </div>

        <!-- أقسام تاريخ التوظيف -->
        <div class="space-y-4">
          <div 
            v-for="(employment, index) in request.doc.employment_history" 
            :key="employment.id" 
            class="border border-light_gray rounded-md"
          >
            <!-- حاوية أزرار التبديل والحذف -->
            <div class="flex justify-between items-center px-4 py-2 bg-more_lighter_gray hover:bg-bg rounded-t-md">
              <!-- زر التبديل -->
              <button 
                :id="'section-button-' + employment.id"
                @click="toggleSection(employment.id)" 
                :aria-expanded="isOpen(employment.id)"
                :aria-controls="'section-content-' + employment.id"
                class="flex items-center space-x-2 focus:outline-none"
              >
                <span class="text-dark_gray">{{ employment.name_of_your_employer || 'New Employment Record' }}</span>
                <svg 
                  :class="{'transform rotate-180': isOpen(employment.id)}" 
                  class="w-5 h-5 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- زر الحذف -->
              <button 
                @click="confirmRemove(employment.id)" 
                class="bg-warn hover:bg-warn_hover text-white px-2 py-1 rounded-md"
                title="Delete Record"
              >
                Delete
              </button>
            </div>

            <!-- المحتوى القابل للتبديل -->
            <transition name="accordion">
              <div 
                v-show="isOpen(employment.id)" 
                class="p-4 space-y-4"
                :id="'section-content-' + employment.id"
                role="region"
                :aria-labelledby="'section-button-' + employment.id"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Company -->
                  <div>
                    <label class="block text-dark_gray">Company</label>
                    <input 
                      v-model="employment.company" 
                      placeholder="Company"  
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <!-- Name of Your Employer -->
                  <div>
                    <label class="block text-dark_gray">Name of Your Employer</label>
                    <input 
                      v-model="employment.name_of_your_employer" 
                      placeholder="Name of Your Employer"  
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <!-- Type of Employment -->
                  <div>
                    <label class="block text-dark_gray">Type of Employment</label>
                    <select 
                      v-model="employment.type_of_employment" 
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <!-- أضف خيارات أخرى حسب الحاجة -->
                    </select>
                  </div>

                  <!-- Continuous -->
                  <div class="flex items-center">
                    <label class="mr-2 text-dark_gray">Continuous</label>
                    <input 
                      type="checkbox" 
                      v-model="employment.continuous" 
                      class="h-4 w-4 text-primary focus:ring-primary border-light_gray rounded"
                    />
                  </div>

                  <!-- Country -->
                  <div>
                    <label class="block text-dark_gray">Country</label>
                    <select 
                      v-model="employment.country" 
                      @change="employment.selectedCity = ''" 
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Country</option>
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
                    <label class="block text-dark_gray">City</label>
                    <select 
                      v-model="employment.city" 
                      @change="employment.governorate = ''" 
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select City</option>
                      <option 
                        v-for="city in getOptionCity(employment.country)" 
                        :key="city.value" 
                        :value="city.value"
                      >
                        {{ city.label }}
                      </option>
                    </select>
                  </div>

                  <!-- Governorate -->
                  <div>
                    <label class="block text-dark_gray">Governorate</label>
                    <select 
                      v-model="employment.governorate" 
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select Governorate</option>
                      <option 
                        v-for="governorate in getOptionGovernorate(employment.city)" 
                        :key="governorate.value" 
                        :value="governorate.value"
                      >
                        {{ governorate.label }}
                      </option>
                    </select>
                  </div>

                  <!-- From Date -->
                  <div>
                    <label class="block text-dark_gray">From Date</label>
                    <input 
                      type="date" 
                      v-model="employment.from_date" 
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <!-- To Date -->
                  <div>
                    <label class="block text-dark_gray">To Date</label>
                    <input 
                      type="date" 
                      v-model="employment.to_date" 
                      
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <!-- Phone -->
                  <div>
                    <label class="block text-dark_gray">Phone</label>
                    <input 
                      type="tel" 
                      v-model="employment.phone" 
                      placeholder="Phone" 
                      pattern="[0-9]{10,15}"
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <!-- Extension -->
                  <div>
                    <label class="block text-dark_gray">Extension</label>
                    <input 
                      v-model="employment.Ext" 
                      placeholder="Extension"  
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <!-- Do We Have Permission To Contact This Current Employer -->
                  <div class="flex items-center">
                    <label class="mr-2 text-dark_gray">Do we have permission to contact this current employer?</label>
                    <input 
                      type="checkbox" 
                      v-model="employment.do_we_have_permission_to_contact_this_current_employer" 
                      class="h-4 w-4 text-primary focus:ring-primary border-light_gray rounded"
                    />
                  </div>

                  <!-- Issuing Salary -->
                  <div class="flex items-center">
                    <label class="mr-2 text-dark_gray">Issuing Salary</label>
                    <input 
                      type="checkbox" 
                      v-model="employment.issuing_salary" 
                      class="h-4 w-4 text-primary focus:ring-primary border-light_gray rounded"
                    />
                  </div>

                  <!-- Activity Has Stopped -->
                  <div class="flex items-center">
                    <label class="mr-2 text-dark_gray">Activity Has Stopped</label>
                    <input 
                      type="checkbox" 
                      v-model="employment.activity_has_stopped" 
                      class="h-4 w-4 text-primary focus:ring-primary border-light_gray rounded"
                    />
                  </div>

                  <!-- The Company Has Different Names -->
                  <div class="flex items-center">
                    <label class="mr-2 text-dark_gray">The company has different names</label>
                    <input 
                      type="checkbox" 
                      v-model="employment.the_company_has_different_names" 
                      class="h-4 w-4 text-primary focus:ring-primary border-light_gray rounded"
                    />
                  </div>

                  <!-- Different Company Names -->
                  <div v-if="employment.the_company_has_different_names">
                    <label class="block text-dark_gray">Different Company Names</label>
                    <input 
                      v-model="employment.different_company_names" 
                      placeholder="Different Company Names"  
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <!-- Name of the Last Position You Held -->
                  <div>
                    <label class="block text-dark_gray">Name of the Last Position You Held</label>
                    <input 
                      v-model="employment.name_of_the_last_position_you_held" 
                      placeholder="Last Position Held"  
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <!-- You Have a Nickname -->
                  <div class="flex items-center">
                    <label class="mr-2 text-dark_gray">You have a nickname?</label>
                    <input 
                      type="checkbox" 
                      v-model="employment.you_have_a_nicknamecx" 
                      class="h-4 w-4 text-primary focus:ring-primary border-light_gray rounded"
                    />
                  </div>

                  <!-- Nickname -->
                  <div v-if="employment.you_have_a_nicknamecx">
                    <label class="block text-dark_gray">Nickname</label>
                    <input 
                      v-model="employment.nickname" 
                      placeholder="Nickname"  
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- أزرار الإضافة والحفظ -->
        <div class="flex justify-center items-center mt-6 space-x-4">
          <button 
            @click="addEmployment" 
            class="bg-primary hover:bg-primary_hover text-white px-4 py-2 rounded-md"
          >
            Add Employment Record
          </button>
          <button 
            @click="saveRequest" 
            :disabled="isSaving"
            class="bg-secondary hover:bg-secondary_hover text-white px-4 py-2 rounded-md"
          >
            <span v-if="!isSaving">Save Request</span>
            <span v-else>Saving...</span>
          </button>
        </div>
      </div>
      
      <div v-else class="flex justify-center items-center h-full">
        <p class="text-dark_gray">Loading...</p>
      </div>
    </div>    
  </div>
</template>

<script setup>
// ========================
// استيراد المكاتب اللازمة
import { createDocumentResource, ErrorMessage } from 'frappe-ui'
import { ref, watch, reactive, nextTick, computed } from 'vue'
import { location } from '../../data/useAddressLogic'
import { useToast } from "vue-toastification" // اختياري: إشعارات Toast

// تهيئة toast
const toast = useToast()

// إنشاء مورد المستند
const request = createDocumentResource({
  doctype: 'Verification Instructions Request',
  name: 'VIR-2024-26-09-000007', // يمكنك تعديل هذا الاسم حسب الحاجة
})

// الخصائص المحسوبة لخيارات القوائم المنسدلة
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

// تهيئة employment_history كمصفوفة إذا لم تكن موجودة
watch(() => request.doc, (newDoc) => {
  if (newDoc && !newDoc.employment_history) {
    newDoc.employment_history = []
  }
}, { immediate: true })

// إدارة الأقسام المفتوحة
const openSections = reactive({})

const toggleSection = (id) => {
  openSections[id] = !openSections[id]
}

const isOpen = (id) => {
  return openSections[id]
}

// إدارة الأخطاء
const errors = ref([])

// إضافة سجل توظيف جديد
const addEmployment = () => {
  const newEmployment = {
    id: Date.now(), // استخدام timestamp كـ ID فريد
    company: '',
    name_of_your_employer: '',
    type_of_employment: '',
    continuous: false,
    country: '',
    city: '',
    governorate: '',
    from_date: '',
    to_date: '',
    phone: '',
    Ext: '',
    do_we_have_permission_to_contact_this_current_employer: false,
    issuing_salary: false,
    activity_has_stopped: false,
    the_company_has_different_names: false,
    different_company_names: '',
    name_of_the_last_position_you_held: '',
    you_have_a_nicknamecx: false,
    nickname: ''
  }
  request.doc.employment_history.push(newEmployment)
  nextTick(() => {
    openSections[newEmployment.id] = true
  })
}

// تأكيد الحذف قبل إزالة سجل التوظيف
const confirmRemove = (id) => {
  if (confirm('Are you sure you want to delete this employment record?')) {
    removeEmployment(id)
  }
}

// إزالة سجل توظيف
const removeEmployment = (id) => {
  const index = request.doc.employment_history.findIndex(emp => emp.id === id)
  if (index !== -1) {
    request.doc.employment_history.splice(index, 1)
    delete openSections[id]
  }
}

// حفظ الطلب
const isSaving = ref(false)

const saveRequest = async () => {
  errors.value = [] // إعادة تعيين الأخطاء قبل التحقق

  request.doc.employment_history.forEach((employment, index) => {
    if (!employment.company) {
      errors.value.push(`Company is required in record number ${index + 1}.`)
    }
    if (!employment.name_of_your_employer) {
      errors.value.push(`Name of Your Employer is required in record number ${index + 1}.`)
    }
    if (!employment.type_of_employment) {
      errors.value.push(`Type of Employment is required in record number ${index + 1}.`)
    }
    if (!employment.country) {
      errors.value.push(`Country is required in record number ${index + 1}.`)
    }
    if (!employment.city) {
      errors.value.push(`City is required in record number ${index + 1}.`)
    }
    if (!employment.governorate) {
      errors.value.push(`Governorate is required in record number ${index + 1}.`)
    }
    if (!employment.from_date) {
      errors.value.push(`From Date is required in record number ${index + 1}.`)
    }
    if (!employment.continuous && !employment.to_date) {
      errors.value.push(`To Date is required in record number ${index + 1} unless marked as continuous.`)
    }
    if (!employment.phone) {
      errors.value.push(`Phone is required in record number ${index + 1}.`)
    }
    if (!employment.type_of_employment) {
      errors.value.push(`Type of Employment is required in record number ${index + 1}.`)
    }

    // يمكنك تفعيل التحقق من نمط رقم الهاتف إذا لزم الأمر
    // const phonePattern = /^[0-9]{10,15}$/
    // if (employment.phone && !phonePattern.test(employment.phone)) {
    //   errors.value.push(`Invalid phone number in record number ${index + 1}.`)
    // }

    // تحقق من الحقول الشرطية
    if (employment.the_company_has_different_names && !employment.different_company_names) {
      errors.value.push(`Different Company Names is required in record number ${index + 1} if the company has different names.`)
    }

    if (employment.you_have_a_nicknamecx && !employment.nickname) {
      errors.value.push(`Nickname is required in record number ${index + 1} if you have a nickname.`)
    }
  })

  if (errors.value.length > 0) {
    return
  }

  isSaving.value = true
  try {
    await request.setValue.submit({
      employment_history: request.doc.employment_history,
      // يمكنك إضافة حقول أخرى إذا لزم الأمر
    })
    toast.success('Request has been successfully saved!')
  } catch (error) {
    errors.value.push(`An error occurred while saving the request: ${error.message}`)
  } finally {
    isSaving.value = false
  }
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
/* يمكنك إضافة المزيد من الأنماط حسب الحاجة */

/* تحسين تنسيق الرسائل الشرطية */
.error-message {
  color: red;
  font-size: 0.875rem;
}
</style>