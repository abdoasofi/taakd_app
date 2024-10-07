<template>
  <div class="pt-3 container">
    <h1 class="text-3xl  font-bold mb-3 text-black">Education Information</h1>
    <ul>
      <li>
        All fields marked with an asterisk ( * ) are required.
      </li>
      <li>
        Please provide your education and training information beginning with the most recent
      </li>
    </ul>
    
  </div>
  
  <div class="space-y-2 mt-3">
    <!-- Iterate Over Education Information -->
    <FieldsToggleContainer
      v-for="(education, index) in request.doc.education_information"
      :key="education.id"
      :title="education.name_of_school_or_college_university || `Education ${index + 1}`"
    >
      <div class="lg:grid grid-cols-2 lg:gap-2">

        <!-- Name of School/College/University Field -->
        <FieldContainer>
          <StyledInput
            labelText="Name of School/College/University"
            :isMandatory="true"
            infoText="Enter the name of your educational institution."
            inputType="text"
            name="name_of_school_or_college_university"
            :id="`name_of_school_or_college_university-${education.id}`"
            v-model="education.name_of_school_or_college_university"
            :isValid="validateNameOfSchool(education.name_of_school_or_college_university)"
            validationMessage="Name of School/College/University is required."
          />
        </FieldContainer> 

        <!-- Field of Study/Major Field -->
        <FieldContainer>
          <StyledInput
            labelText="Field of Study/Major"
            :isMandatory="true"
            infoText="Enter your field of study or major."
            inputType="text"
            name="field_of_study_or_major"
            :id="`field_of_study_or_major-${education.id}`"
            v-model="education.field_of_study_or_major"
            :isValid="validateFieldOfStudy(education.field_of_study_or_major)"
            validationMessage="Field of Study/Major is required."
          />
        </FieldContainer> 
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Country Autocomplete -->
        <FieldContainer>
          <Autocomp
            labelText="Country"
            :isMandatory="true"
            infoText="Select your country."
            inputType="text"
            name="country"
            :id="`country-${education.id}`"
            :options="getOptionCountry(education)"
            v-model="education.country"
            @input-change="(value) => handleCountryChange(index, value)"
            :isValid="validateCountry(education.country)"
            validationMessage="Country is required."
          />
        </FieldContainer>  

        <!-- City Autocomplete -->
        <FieldContainer>
          <Autocomp
            labelText="City"
            :isMandatory="true"
            infoText="Select your city."
            inputType="text"
            name="city"
            :id="`city-${education.id}`"
            :options="getOptionCity(education)"
            v-model="education.city"
            @input-change="(value) => handleCityChange(index, value)"
            :isValid="validateCity(education.city)"
            validationMessage="City is required."
          />
        </FieldContainer>

        <!-- Governorate Autocomplete -->
        <FieldContainer>
          <Autocomp
            labelText="Governorate"
            :isMandatory="true"
            infoText="Select your governorate."
            inputType="text"
            name="governorate"
            :id="`governorate-${education.id}`"
            :options="getOptionGovernorate(education)"
            v-model="education.governorate"
            @input-change="(value) => handleGovernorateChange(index, value)"
            :isValid="validateGovernorate(education.governorate)"
            validationMessage="Governorate is required."
          />
        </FieldContainer>

        <!-- Location Text Field -->
        <FieldContainer>
          <StyledInput
            labelText="Location Text"
            :isMandatory="false"
            infoText="Additional location details (optional)."
            inputType="text"
            name="location_text"
            :id="`location_text-${education.id}`"
            v-model="education.location_text"
            validationMessage="You can edit the message."
          />
        </FieldContainer> 
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- From Date -->
        <FieldContainer>
          <StyledInput 
            id="from_date" 
            name="from_date" 
            labelText="From Date" 
            isMandatory="true" 
            infoText="Start date of your education." 
            inputType="date" 
            v-model="education.from_date" 
            :isValid="validateFromDate(education.from_date)"
          />
        </FieldContainer>

        <!-- To Date -->
        <FieldContainer>
          <StyledInput 
            id="to_date" 
            name="to_date" 
            labelText="To Date" 
            isMandatory="true" 
            infoText="End date of your education." 
            inputType="date" 
            v-model="education.to_date"
            :isValid="validateToDate(education.to_date)" 
            validationMessage="To Date is required."
          />
        </FieldContainer>
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Phone Field -->
        <FieldContainer>
          <StyledInput
            labelText="Phone"
            :isMandatory="true"
            infoText="+999-77885951"
            inputType="phone"
            name="phone"
            :id="`phone-${education.id}`"
            v-model="education.phone"
            :isValid="validatePhone(education.phone)" 
            validationMessage="Valid phone number is required."
          />
        </FieldContainer>
        
        <!-- Ext Field -->
        <FieldContainer>
          <StyledInput
            labelText="Ext"
            :isMandatory="false"
            infoText="Extension (optional)"
            inputType="text"
            name="ext"
            :id="`ext-${education.id}`"
            v-model="education.ext"
            validationMessage="You can edit the message."
          />
        </FieldContainer>      
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Diploma Select -->
        <FieldContainer>
          <Select
            labelText="Diploma"
            :isMandatory="true"
            infoText="Select your highest diploma."
            name="diploma"
            :id="`diploma-${education.id}`"
            :options="optionsDiploma"
            v-model="education.diploma"
            :isValid="validateDiploma(education.diploma)"
            validationMessage="Diploma is required."
          />
        </FieldContainer>

        <!-- Another Name Select -->
        <FieldContainer>
          <Select
            labelText="Another Name"
            :isMandatory="false"
            infoText="Do you have another name used during your education?"
            name="another_name"
            :id="`another_name-${education.id}`"
            :options="optionsAnotherName"
            v-model="education.another_name"
            :isValid="validateAnotherName(education.another_name)"
            validationMessage="You can edit the message."
          />
        </FieldContainer>
      </div>

      <!-- Save Education Button -->
      <div class="flex justify-end py-2">
        <Button level="primary" @clicked="saveEducation(index)">Save</Button>
      </div>
    </FieldsToggleContainer>

    <!-- Add Education Button -->
    <div class="flex justify-center py-3">
      <Button level="secondary" @clicked="addEducation">+ Add Education Information</Button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, reactive, nextTick } from 'vue'
import { createDocumentResource } from 'frappe-ui'
import { useToast } from 'vue-toastification'
import { v4 as uuidv4 } from 'uuid'

// المكونات
import Button from '../../components/button.vue'
import FieldContainer from '../../components/fieldContainer.vue'
import FieldsToggleContainer from '../../components/fieldsToggleContainer.vue'
import StyledInput from '../../components/styledInput.vue'
import Autocomp from '../../components/autocomp.vue'
import Select from '../../components/select.vue'

import { location } from '../../data/useAddressLogic'

// تهيئة Toast
const toast = useToast()

// مورد المستند
const request = createDocumentResource({
  doctype: 'Verification Instructions Request',
  name: 'VIR-2024-26-09-000007', // يمكنك تغيير الاسم حسب الحاجة
  // auto: true,
})

// خيارات Diploma
const optionsDiploma = reactive([
  { value: "High School", label: "High School" },
  { value: "Associate Degree", label: "Associate Degree" },
  { value: "Bachelor's Degree", label: "Bachelor's Degree" },
  { value: "Master's Degree", label: "Master's Degree" },
  { value: "Doctorate", label: "Doctorate" },
  { value: "Other", label: "Other" },
])

// خيارات Another Name
const optionsAnotherName = reactive([
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
])

// الحصول على خيارات الدولة
const getOptionCountry = (education) => {
  const options = location.data
    .filter(loc => loc.location_type === 'Country')
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  // إضافة القيمة الحالية إذا لم تكن موجودة في الخيارات
  if (education.country && !options.some(opt => opt.value === education.country)) {
    options.push({
      label: education.country,
      value: education.country
    })
  }

  return options
}

// الحصول على خيارات المدينة
const getOptionCity = (education) => {
  if (!education.country) return []

  const options = location.data
    .filter(loc => loc.location_type === 'City' && loc.parent_location === education.country)
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  // إضافة القيمة الحالية إذا لم تكن موجودة في الخيارات
  if (education.city && !options.some(opt => opt.value === education.city)) {
    options.push({
      label: education.city,
      value: education.city
    })
  }

  return options
}

// الحصول على خيارات المحافظة
const getOptionGovernorate = (education) => {
  if (!education.city) return []

  const options = location.data
    .filter(loc => loc.location_type === 'Governorate' && loc.parent_location === education.city)
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  // إضافة القيمة الحالية إذا لم تكن موجودة في الخيارات
  if (education.governorate && !options.some(opt => opt.value === education.governorate)) {
    options.push({
      label: education.governorate,
      value: education.governorate
    })
  }

  return options
}

// التعامل مع تغيير الدولة
const handleCountryChange = (index, value) => {
  const education = request.doc.education_information[index]
  education.country = value.value
  education.city = '' // إعادة تعيين المدينة عند تغيير الدولة
  education.governorate = '' // إعادة تعيين المحافظة عند تغيير الدولة
}

// التعامل مع تغيير المدينة
const handleCityChange = (index, value) => {
  const education = request.doc.education_information[index]
  education.city = value.value
  education.governorate = '' // إعادة تعيين المحافظة عند تغيير المدينة
}

// التعامل مع تغيير المحافظة
const handleGovernorateChange = (index, value) => {
  const education = request.doc.education_information[index]
  education.governorate = value.value
}

// التعامل مع تغيير نوع الدبلوم
const handleDiplomaChange = (index, value) => {
  const education = request.doc.education_information[index]
  education.diploma = value.value
}

// التعامل مع تغيير Another Name
const handleAnotherNameChange = (index, value) => {
  const education = request.doc.education_information[index]
  education.another_name = value.value
}

// تهيئة education_information
watch(() => request.doc, (newDoc) => {
  if (newDoc) {
    if (!newDoc.education_information) {
      // تهيئة education_information كمصفوفة فارغة إذا لم تكن موجودة
      newDoc.education_information = []
    } else {
      // التأكد من تهيئة جميع الحقول في الإدخالات الحالية
      newDoc.education_information.forEach(education => {
        education.name_of_school_or_college_university = education.name_of_school_or_college_university || ''
        education.country = education.country || ''
        education.city = education.city || ''
        education.governorate = education.governorate || ''
        education.location_text = education.location_text || ''
        education.from_date = education.from_date || ''
        education.to_date = education.to_date || ''
        education.field_of_study_or_major = education.field_of_study_or_major || ''
        education.phone = education.phone || ''
        education.ext = education.ext || ''
        education.diploma = education.diploma || ''
        education.another_name = education.another_name || ''
      })
    }
  }
}, { immediate: true })

// تهيئة افتراضية
if (!request.doc || !request.doc.education_information) {
  if (request.doc) {
    request.doc.education_information = []
  } else {
    // التعامل مع الحالة التي يكون فيها request.doc في البداية null
    request.doc = {
      education_information: []
    }
  }
}

// إضافة سجل تعليمي جديد
const addEducation = () => {
  const newEducation = {
    id: uuidv4(), // معرف فريد
    name_of_school_or_college_university: '',
    country: '',
    city: '',
    governorate: '',
    location_text: '',
    from_date: '',
    to_date: '',
    field_of_study_or_major: '',
    phone: '',
    ext: '',
    diploma: '',
    another_name: '',
  }
  request.doc.education_information.push(newEducation)
  nextTick(() => {
    // إذا كنت تستخدم مكون FieldsToggleContainer مع إمكانية فتح الأقسام، يمكنك فتح القسم الجديد هنا
    openSections[newEducation.id] = true
  })
}

// حفظ الطلب بالكامل
const saveRequest = async () => {
  try {
    await request.setValue.submit(request.doc)
    toast.success('تم حفظ الطلب بنجاح!')
  } catch (error) {
    console.error('فشل في حفظ الطلب:', error)
    toast.error('فشل في حفظ الطلب.')
  }
}

// حفظ سجل تعليمي فردي
const saveEducation = async (index) => {
  try {
    // يمكنك تعديل هذا الجزء لحفظ السجل التعليمي الفردي حسب إعدادات الـ Backend الخاص بك
    await request.setValue.submit(request.doc)
    toast.success(`تم حفظ التعليم ${index + 1} بنجاح!`)
  } catch (error) {
    console.error(`فشل في حفظ التعليم ${index + 1}:`, error)
    toast.error(`فشل في حفظ التعليم ${index + 1}.`)
  }
}

// دوال التحقق من الصحة
const validateNameOfSchool = (name) => {
  return typeof name === 'string' && name.trim() !== ''
}

const validateFieldOfStudy = (field) => {
  return typeof field === 'string' && field.trim() !== ''
}

const validateCountry = (country) => {
  return typeof country === 'string' && country.trim() !== ''
}

const validateCity = (city) => {
  return typeof city === 'string' && city.trim() !== ''
}

const validateGovernorate = (governorate) => {
  return typeof governorate === 'string' && governorate.trim() !== ''
}

const validateFromDate = (from_date) => {
  return typeof from_date === 'string' && from_date.trim() !== ''
}

const validateToDate = (to_date) => {
  return typeof to_date === 'string' && to_date.trim() !== ''
}

const validatePhone = (phone) => {
  const phoneRegex = /^\+?[0-9\-]{7,15}$/
  return phoneRegex.test(phone)
}

const validateDiploma = (diploma) => {
  return typeof diploma === 'string' && diploma.trim() !== ''
}

const validateAnotherName = (another_name) => {
  // بما أن هذا الحقل اختياري، يمكن اعتباره صالحًا دائمًا أو إضافة تحقق إضافي إذا لزم الأمر
  return true
}
</script>
