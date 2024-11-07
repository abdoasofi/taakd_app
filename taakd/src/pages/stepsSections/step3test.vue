<template>
  <div class="pt-3 container">
    <h3 class="text-lg font-medium mb-3 text-black">Employment History</h3>

    <div dir="ltr" class="p-6 bg-bg min-h-screen">
      <div v-if="request.doc" class="max-w-7xl mx-auto bg-bg shadow-md rounded-lg p-6">
        
        <!-- رسائل الخطأ العامة -->
        <div v-if="errors.global && errors.global.length > 0" class="mb-4 space-y-2">
          <ErrorMessage 
            v-for="(error, index) in errors.global" 
            :key="'global-' + index" 
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
                  <!-- الحقول: إضافة رسائل خطأ تحت كل حقل إذا كانت موجودة -->

                  <!-- Company -->
                  <div>
                    <label class="block text-dark_gray">Company</label>
                    <input 
                      v-model="employment.company" 
                      placeholder="Company"  
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      @input="validateEmploymentField(employment.id, 'company')"
                    />
                    <ErrorMessage v-if="errors[employment.id]?.company" :message="errors[employment.id].company" />
                  </div>

                  <!-- Name of Your Employer -->
                  <div>
                    <label class="block text-dark_gray">Name of Your Employer</label>
                    <input 
                      v-model="employment.name_of_your_employer" 
                      placeholder="Name of Your Employer"  
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      @input="validateEmploymentField(employment.id, 'name_of_your_employer')"
                    />
                    <ErrorMessage v-if="errors[employment.id]?.name_of_your_employer" :message="errors[employment.id].name_of_your_employer" />
                  </div>

                  <!-- Type of Employment -->
                  <div>
                    <label class="block text-dark_gray">Type of Employment</label>
                    <select 
                      v-model="employment.type_of_employment" 
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      @change="validateEmploymentField(employment.id, 'type_of_employment')"
                    >
                      <option value="">Select Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                    <ErrorMessage v-if="errors[employment.id]?.type_of_employment" :message="errors[employment.id].type_of_employment" />
                  </div>

                  <!-- Continuous -->
                  <div class="flex items-center">
                    <label class="ltr:mr-2 rtl:ml-2 text-dark_gray">Continuous</label>
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
                      @change="() => { employment.city = ''; validateEmploymentField(employment.id, 'country') }" 
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
                    <ErrorMessage v-if="errors[employment.id]?.country" :message="errors[employment.id].country" />
                  </div>

                  <!-- City -->
                  <div>
                    <label class="block text-dark_gray">City</label>
                    <select 
                      v-model="employment.city" 
                      @change="validateEmploymentField(employment.id, 'city')" 
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
                    <ErrorMessage v-if="errors[employment.id]?.city" :message="errors[employment.id].city" />
                  </div>

                  <!-- Governorate -->
                  <div>
                    <label class="block text-dark_gray">Governorate</label>
                    <select 
                      v-model="employment.governorate" 
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      @change="validateEmploymentField(employment.id, 'governorate')"
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
                    <ErrorMessage v-if="errors[employment.id]?.governorate" :message="errors[employment.id].governorate" />
                  </div>

                  <!-- From Date -->
                  <div>
                    <label class="block text-dark_gray">From Date</label>
                    <input 
                      type="date" 
                      v-model="employment.from_date" 
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      @input="validateEmploymentField(employment.id, 'from_date')"
                    />
                    <ErrorMessage v-if="errors[employment.id]?.from_date" :message="errors[employment.id].from_date" />
                  </div>

                  <!-- To Date -->
                  <div>
                    <label class="block text-dark_gray">To Date</label>
                    <input 
                      type="date" 
                      v-model="employment.to_date" 
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      @input="validateEmploymentField(employment.id, 'to_date')"
                    />
                    <ErrorMessage v-if="errors[employment.id]?.to_date" :message="errors[employment.id].to_date" />
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
                      @input="validateEmploymentField(employment.id, 'phone')"
                    />
                    <ErrorMessage v-if="errors[employment.id]?.phone" :message="errors[employment.id].phone" />
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
                    <label class="ltr:mr-2 rtl:ml-2 text-dark_gray">Do we have permission to contact this current employer?</label>
                    <input 
                      type="checkbox" 
                      v-model="employment.do_we_have_permission_to_contact_this_current_employer" 
                      class="h-4 w-4 text-primary focus:ring-primary border-light_gray rounded"
                    />
                  </div>

                  <!-- Issuing Salary -->
                  <div class="flex items-center">
                    <label class="ltr:mr-2 rtl:ml-2 text-dark_gray">Issuing Salary</label>
                    <input 
                      type="checkbox" 
                      v-model="employment.issuing_salary" 
                      class="h-4 w-4 text-primary focus:ring-primary border-light_gray rounded"
                    />
                  </div>

                  <!-- Activity Has Stopped -->
                  <div class="flex items-center">
                    <label class="ltr:mr-2 rtl:ml-2 text-dark_gray">Activity Has Stopped</label>
                    <input 
                      type="checkbox" 
                      v-model="employment.activity_has_stopped" 
                      class="h-4 w-4 text-primary focus:ring-primary border-light_gray rounded"
                    />
                  </div>

                  <!-- The Company Has Different Names -->
                  <div class="flex items-center">
                    <label class="ltr:mr-2 rtl:ml-2 text-dark_gray">The company has different names</label>
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
                      @input="validateEmploymentField(employment.id, 'different_company_names')"
                    />
                    <ErrorMessage v-if="errors[employment.id]?.different_company_names" :message="errors[employment.id].different_company_names" />
                  </div>

                  <!-- Name of the Last Position You Held -->
                  <div>
                    <label class="block text-dark_gray">Name of the Last Position You Held</label>
                    <input 
                      v-model="employment.name_of_the_last_position_you_held" 
                      placeholder="Last Position Held"  
                      class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      @input="validateEmploymentField(employment.id, 'name_of_the_last_position_you_held')"
                    />
                    <ErrorMessage v-if="errors[employment.id]?.name_of_the_last_position_you_held" :message="errors[employment.id].name_of_the_last_position_you_held" />
                  </div>

                  <!-- You Have a Nickname -->
                  <div class="flex items-center">
                    <label class="ltr:mr-2 rtl:ml-2 text-dark_gray">You have a nickname?</label>
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
                      @input="validateEmploymentField(employment.id, 'nickname')"
                    />
                    <ErrorMessage v-if="errors[employment.id]?.nickname" :message="errors[employment.id].nickname" />
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
import { createDocumentResource, ErrorMessage } from 'frappe-ui'
import { ref, watch, reactive, nextTick, computed } from 'vue'
import { location } from '../../data/useAddressLogic'
import { useToast } from "vue-toastification"

const toast = useToast()

const request = createDocumentResource({
  doctype: 'Verification Instructions Request',
  name: 'VIR-2024-26-09-000007',
})

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

watch(() => request.doc, (newDoc) => {
  if (newDoc && !newDoc.employment_history) {
    newDoc.employment_history = []
  }
}, { immediate: true })

const openSections = reactive({})

const toggleSection = (id) => {
  openSections[id] = !openSections[id]
}

const isOpen = (id) => {
  return openSections[id]
}

const errors = reactive({})

const addEmployment = () => {
  const newEmployment = {
    // id: Date.now(),
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
    ext: '',
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

const confirmRemove = (id) => {
  if (confirm('Are you sure you want to delete this employment record?')) {
    removeEmployment(id)
  }
}

const removeEmployment = (id) => {
  const index = request.doc.employment_history.findIndex(emp => emp.id === id)
  if (index !== -1) {
    request.doc.employment_history.splice(index, 1)
    delete openSections[id]
  }
}

const isSaving = ref(false)

const saveRequest = async () => {
  const tempErrors = {} // استخدم كائنًا مؤقتًا للأخطاء

  request.doc.employment_history.forEach((employment) => {
    tempErrors[employment.id] = {}

    // نفس التحقق المباشر
    if (!employment.company) {
      tempErrors[employment.id].company = 'Company is required.'
    }
    if (!employment.name_of_your_employer) {
      tempErrors[employment.id].name_of_your_employer = 'Name of Your Employer is required.'
    }
    if (!employment.type_of_employment) {
      tempErrors[employment.id].type_of_employment = 'Type of Employment is required.'
    }
    if (!employment.country) {
      tempErrors[employment.id].country = 'Country is required.'
    }
    if (!employment.city) {
      tempErrors[employment.id].city = 'City is required.'
    }
    if (!employment.governorate) {
      tempErrors[employment.id].governorate = 'Governorate is required.'
    }
    if (!employment.from_date) {
      tempErrors[employment.id].from_date = 'From Date is required.'
    }
    if (!employment.continuous && !employment.to_date) {
      tempErrors[employment.id].to_date = 'To Date is needed unless marked as continuous.'
    }
    if (!employment.phone) {
      tempErrors[employment.id].phone = 'Phone is required.'
    }
    if (employment.the_company_has_different_names && !employment.different_company_names) {
      tempErrors[employment.id].different_company_names = 'Different Company Names are required.'
    }
    if (employment.you_have_a_nicknamecx && !employment.nickname) {
      tempErrors[employment.id].nickname = 'Nickname is required.'
    }
  })

  errors.value = tempErrors // تعيين الأخطاء من الكائن المؤقت

  // تحقق من وجود أخطاء قبل الحفظ
  if (Object.keys(tempErrors).some(key => Object.keys(tempErrors[key]).length > 0)) {
    return
  }

  isSaving.value = true
  try {
    await request.setValue.submit({
      employment_history: request.doc.employment_history,
    })
    toast.success('Request has been successfully saved!')
  } catch (error) {
    if (!errors.global) {
      errors.global = []
    }
    errors.global.push(`An error occurred while saving the request: ${error.message}`)
  } finally {
    isSaving.value = false
  }
}
const validateEmploymentField = (id, field) => {
  if (!errors[id]) {
    errors[id] = {}
  }

  const employment = request.doc.employment_history.find(emp => emp.id === id)

  if (field === 'company') {
    errors[id].company = employment.company ? '' : 'Company is required.'
  } else if (field === 'name_of_your_employer') {
    errors[id].name_of_your_employer = employment.name_of_your_employer ? '' : 'Name of Your Employer is required.'
  } else if (field === 'type_of_employment') {
    errors[id].type_of_employment = employment.type_of_employment ? '' : 'Type of Employment is required.'
  } else if (field === 'country') {
    errors[id].country = employment.country ? '' : 'Country is required.'
  } else if (field === 'city') {
    errors[id].city = employment.city ? '' : 'City is required.'
  } else if (field === 'governorate') {
    errors[id].governorate = employment.governorate ? '' : 'Governorate is required.'
  } else if (field === 'from_date') {
    errors[id].from_date = employment.from_date ? '' : 'From Date is required.'
  } else if (field === 'to_date') {
    errors[id].to_date = employment.to_date ? '' : 'To Date is required unless marked as continuous.'
  } else if (field === 'phone') {
    errors[id].phone = employment.phone ? '' : 'Phone is required.'
  } else if (field === 'different_company_names') {
    errors[id].different_company_names = employment.different_company_names ? '' : 'Different Company Names are required if applicable.'
  } else if (field === 'nickname') {
    errors[id].nickname = employment.nickname ? '' : 'Nickname is required if applicable.'
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
.error-message {
  color: red;
  font-size: 0.875rem;
}
</style>