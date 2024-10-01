<!-- <template>
    <div class="bg-[#F7F7F7]">
        <div>
            <h1 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-900  py-px ">Screening Disclosure and Authorization</h1> 
            <p class="text-xl font-semibold px-8 m-2 " > I hereby provide my authorisation and consent for Taakd, on behalf of Requestor to: </p>
            <p class="text-xl font-semibold px-8 m-2 ">1.process my Personal Data in accordance with the verifications set out in the Information Notice and below: </p>
            <UL class="max-w-md space-y-1 list-disc list-inside text-gray-900">
                <Li class="flex items-center">
                    Global Education This check confirms academic credentials by verifying relevant education as determined by the Requestor, for example a degree, certificate or diploma claim directly with the awarding institution or its authorized agent 
                    <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>         
                </Li>
                <Li class="flex items-center">Global Employment	A check to confirm your work history. You will be asked to provide company name, location dates worked and position or title held. This information will then be verified by contacting HR or official sources at each company to be verified. The Requestor has also requested that your..<span class=" text-gray-100 "> Read More</span> </Li>
            </UL>
            
        </div>
        <dev class="flex items-center p-4 m-4 ">
            <router-link to ="/Step_4">
                <div>
                    <Button :variant="'outline'" theme="green" size="sm" label="Button" >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.373 12.75H18.75C18.9628 12.75 19.141 12.6782 19.2845 12.5345C19.4282 12.391 19.5 12.2128 19.5 12C19.5 11.7872 19.4282 11.609 19.2845 11.4655C19.141 11.3218 18.9628 11.25 18.75 11.25H7.373L12.5423 6.08076C12.6909 5.93209 12.7643 5.75809 12.7625 5.55876C12.7605 5.35942 12.682 5.18217 12.527 5.02701C12.3718 4.88217 12.1962 4.80717 12 4.80201C11.8038 4.79684 11.6282 4.87184 11.473 5.02701L5.13275 11.3673C5.03908 11.4609 4.97308 11.5597 4.93475 11.6635C4.89625 11.7673 4.877 11.8795 4.877 12C4.877 12.1205 4.89625 12.2327 4.93475 12.3365C4.97308 12.4403 5.03908 12.5391 5.13275 12.6328L11.473 18.973C11.6115 19.1115 11.783 19.1823 11.9875 19.1855C12.192 19.1887 12.3718 19.1178 12.527 18.973C12.682 18.8178 12.7595 18.6397 12.7595 18.4385C12.7595 18.2372 12.682 18.0589 12.527 17.9038L7.373 12.75Z" fill="#969696"/>
                        </svg>
                    </Button>
                </div>    
            </router-link>


        <div class="flex items-center p-4 m-4 ">
            <router-link to ="/Step_6">
                <Button class="  p-1 m-2 " :variant="'subtle'" theme="gray" size="sm" label="Button">Reject </Button>

            </router-link>

            
            <div >
            <Button @click="showDialog = true" :variant="'subtle'" theme="gray" size="sm" label="Button"> 
                <div class="flex items-center py-4  ">
                                <span class="  p-1 m-2 " >Accept</span> 
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.55025 9.51503L14.1888 0.876532C14.3374 0.727699 14.5114 0.651699 14.7107 0.648533C14.9101 0.645366 15.0873 0.721366 15.2425 0.876532C15.3977 1.0317 15.4753 1.20987 15.4753 1.41103C15.4753 1.61237 15.3977 1.79061 15.2425 1.94578L6.183 11.0208C6.00217 11.2014 5.79125 11.2918 5.55025 11.2918C5.30925 11.2918 5.09833 11.2014 4.9175 11.0208L0.742501 6.84578C0.593834 6.69695 0.520501 6.52028 0.522501 6.31578C0.524334 6.11145 0.602834 5.9317 0.758001 5.77653C0.913167 5.62137 1.09133 5.54378 1.2925 5.54378C1.49383 5.54378 1.67208 5.62137 1.82725 5.77653L5.55025 9.51503Z" fill="#969696"/>
                </svg>
                </div>

                </Button> 
            </div>
            
    
        </div>



        </dev>

    </div>    

    <Dialog title="Title" v-model="showDialog"> Dialog content </Dialog>

</template>
  
  
<script setup>
import { ref } from 'vue'

import { Dialog } from 'frappe-ui'

const showDialog = ref(false);

</script>
   -->

   <template>
    <div dir="rtl" class="p-6 bg-gray-100 min-h-screen">
      <div v-if="request.doc" class="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <!-- <h1 class="text-2xl font-bold mb-4">طلب تعليمات التحقق: {{ request.doc.name }}</h1> -->
        
        <!-- عرض رسائل الخطأ إذا وجدت -->
        <div v-if="errors.length > 0" class="mb-4 space-y-2">
          <ErrorMessage 
            v-for="(error, index) in errors" 
            :key="index" 
            :message="error" 
          />
        </div>
  
        <!-- عرض معلومات الطلب الرئيسي -->
        <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-gray-700 font-semibold">العميل:</label>
            <span class="text-gray-900">{{ request.doc.customer }}</span>
          </div>
          <div>
            <label class="block text-gray-700 font-semibold">تاريخ الطلب:</label>
            <span class="text-gray-900">{{ formatDate(request.doc.order_date) }}</span>
          </div>
        </div> -->
    
        <!-- قائمة المعلومات التعليمية الفرعية على شكل ترويجات (Toggles) -->
        <!-- <h2 class="text-xl font-semibold mb-4">المعلومات التعليمية</h2> -->
        <div class="space-y-4">
          <div 
            v-for="(education, index) in request.doc.education_information" 
            :key="education.id" 
            class="border border-gray-200 rounded-md"
          >
            <!-- رأس القسم الذي يمكن النقر عليه لتوسيع/طي -->
            <button 
              @click="toggleSection(education.id)" 
              :aria-expanded="isOpen(education.id)"
              aria-controls="section-content-{{ education.id }}"
              class="w-full flex justify-between items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-t-md focus:outline-none"
            >
              <!-- <span>{{ education.name_of_school_or_college_university || 'سجل تعليمي جديد' }}</span> -->
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
  
            <!-- محتوى القسم القابل للتوسيع -->
            <transition name="accordion">
              <div 
                v-show="isOpen(education.id)" 
                class="p-4 space-y-4"
                id="section-content-{{ education.id }}"
                role="region"
                aria-labelledby="section-button-{{ education.id }}"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-gray-700" > Name of School or College/University</label>
                    <input 
                      v-model="education.name_of_school_or_college_university" 
                      placeholder=""  
                      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-gray-700" > Name of School or College/University</label>
                    <input 
                      v-model="education.field_of_study_or_major" 
                      placeholder=""  
                      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <!-- <label class="text-gray-700 mr-2">مستمر:</label>
                    <input 
                      type="checkbox" 
                      v-model="education.continuous" 
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    /> -->
                  </div>
                  <div>
                    <label class="block text-gray-700">Country</label>
                    <select 
                      v-model="education.country" 
                      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option v-for="country in optionCountry" :key="country.value" :value="country.value">
                        {{ country.label }}
                      </option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-gray-700">City</label>
                    <select 
                      v-model="education.city" 
                      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option v-for="city in optionCity" :key="city.value" :value="city.value">
                        {{ city.label }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-gray-700">Muhafazah (Governorate)</label>
                    <select 
                      v-model="education.governorate" 
                      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option v-for="governorate in optionGovernorate" :key="governorate.value" :value="governorate.value">
                        {{ governorate.label }}
                      </option>
                    </select>
                  </div>

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

                  <div>
                    <label class="block text-gray-700" > Ext</label>
                    <input 
                      v-model="education.ext" 
                      placeholder=""  
                      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label class="block text-gray-700" > Did you complete your Degree/Diploma?</label>
                    <select 
                      v-model="education.diploma" 
                      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-gray-700" >During this time did you use a name other than that which appears on your current, Government-issued ID?</label>
                    <select 
                      v-model="education.another_name" 
                      class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
  

                
                <!-- زر حذف السجل -->
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
      import { createDocumentResource ,ErrorMessage} from 'frappe-ui'
      import { ref, watch, reactive, nextTick } from 'vue'
      
      import {location} from '../data/useAddressLogic';
      import { computed } from 'vue';

  // إنشاء مورد الوثيقة للـ DocType الرئيسي
  const request = createDocumentResource({
    doctype: 'Verification Instructions Request',
    name: 'VIR-2024-26-09-000007', // إلغاء التعليق لإنشاء طلب جديد
  })
  
  // تعريف قائمة البلدان
  const valueCountry = ref('')
  const valueCity = ref('')
  const valueGovernorate = ref('')
  
  const selectedCountry = ref('')
  const selectedCity= ref('')

  const optionCountry = computed(() => {
        return location.data.filter(loc => loc.location_type === 'Country').map(loc => ({
            label: loc.location_name,
            value: loc.location_name
        }))
    })

    const optionCity = computed(() => {
        return location.data.filter(loc => loc.location_type === 'City' && loc.parent_location == selectedCountry.value).map(loc => ({
            label: loc.location_name,
            value: loc.location_name
        }))
    })

    const optionGovernorate= computed(() => {
        return location.data.filter(loc => loc.location_type === 'Governorate' && loc.parent_location == selectedCity.value).map(loc => ({
            label: loc.location_name,
            value: loc.location_name
        }))
    })

    const handleCountryChange = (value) => {
        selectedCountry.value = value.value
    }
    const handleCityChange = (value) => {
        selectedCity.value = value.value
    }
  
  // تأكد من تهيئة education_information كصفيف
  watch(() => request.doc, (newDoc) => {
    if (newDoc && !newDoc.education_information) {
      newDoc.education_information = []
    }
  }, { immediate: true })
  
  // حالة التوسعة لكل قسم باستخدام معرف فريد
  const openSections = reactive({})
  
  // دالة للتحكم في توسيع/طي كل قسم
  const toggleSection = (id) => {
    openSections[id] = !openSections[id]
  }
  
  const isOpen = (id) => {
    return openSections[id]
  }
  
  // مصفوفة لتخزين رسائل الخطأ
  const errors = ref([])
  
  // إضافة سجل تعليمي جديد
  const addEducation = () => {
    const newEducation = {
      id: Date.now(), // أو استخدم مكتبة UUID لمزيد من التميز
      country: '',
      city: '',
      governorate: '',
      continuous: false,
      name_of_school_or_college_university:'',
      field_of_study_or_major:'',
      phone: '',
      ext: '',
      diploma: '',
      date_enrolled_from: '',
      date_enrolled_to: '',
      another_name: '',
    }
    request.doc.education_information.push(newEducation)
    nextTick(() => {
      openSections[newEducation.id] = true
    })
  }
  
  // تأكيد حذف سجل تعليمي
  const confirmRemove = (id) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا السجل التعليمي؟')) {
      removeEducation(id)
    }
  }
  
  // حذف سجل تعليمي
  const removeEducation = (id) => {
    const index = request.doc.education_information.findIndex(edu => edu.id === id)
    if (index !== -1) {
      request.doc.education_information.splice(index, 1)
      delete openSections[id]
    }
  }
  
  // دالة لحفظ الطلب
  const saveRequest = async () => {
    errors.value = [] // إعادة تعيين رسائل الخطأ قبل البدء في التحقق
  
    request.doc.education_information.forEach((education, index) => {
      if (!education.name_of_school_or_college_university) {
        errors.value.push(`اسم الشركة مطلوب في السجل رقم ${index + 1}.`)
      }
      if (!education.field_of_study_or_major) {
        errors.value.push(`اسم الشركة مطلوب في السجل رقم ${index + 1}.`)
      }
      if (!education.country) {
        errors.value.push(`البلد مطلوب في السجل رقم ${index + 1}.`)
      }
      if (!education.city) {
        errors.value.push(`تاريخ البدء مطلوب في السجل رقم ${index + 1}.`)
      }
      if (!education.governorate) {
        errors.value.push(`تاريخ البدء مطلوب في السجل رقم ${index + 1}.`)
      }
      if (!education.diploma) {
        errors.value.push(`نوع التوظيف مطلوب في السجل رقم ${index + 1}.`)
      }
      if (!education.date_enrolled_from) {
      errors.value.push(`تاريخ البدء مطلوب في السجل رقم ${index + 1}.`)
      }
      if (!education.date_enrolled_to) {
      errors.value.push(`تاريخ البدء مطلوب في السجل رقم ${index + 1}.`)
      }
      // تحقق إضافي لنمط الهاتف
      const phonePattern = /^[0-9]{10,15}$/
      if (education.phone && !phonePattern.test(education.phone)) {
        errors.value.push(`رقم الهاتف غير صالح في السجل رقم ${index + 1}.`)
      }
    })
  
    if (errors.value.length > 0) {
      // لا تقوم بأي إجراء إضافي إذا كانت هناك رسائل خطأ
      return
    }
  
    try {
      await request.save({
        education_information: request.doc.education_information,
        // إضافة حقول أخرى إذا لزم الأمر
      })
      // يمكنك إضافة رسالة نجاح باستخدام Toast أو مكون آخر إذا رغبت
      alert('تم حفظ الطلب بنجاح!') // مثال بسيط لرسالة نجاح
    } catch (error) {
      errors.value.push(`حدث خطأ أثناء حفظ الطلب: ${error.message}`)
    }
  }
  
  // دالة لتنسيق التاريخ
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
  </style>