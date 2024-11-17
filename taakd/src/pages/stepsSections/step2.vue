<!-- /pages/stepsSections/step2.vue -->
<template>
  <div class="pt-3 container">
    <h1 class="text-3xl font-bold mb-3 text-black">{{ $t('step2.education_information') }}</h1>
    <ul class="list-disc list-inside mb-4">
      <li>{{ $t('step2.required_fields') }}</li>
      <li>{{ $t('step2.provide_education_info') }}</li>
    </ul>
  </div>

  <!-- قائمة الأقسام القابلة للطي والحذف -->
  <div class="space-y-4 mt-4">
    <FieldsToggleContainer
      v-for="(education, index) in educationInformation"
      :key="education.id"
      :title="education.name_of_school_or_college_university || `${$t('step2.education')} ${index + 1}`"
      @delete="deleteEducation(index)"
    >
      <div class="lg:grid grid-cols-2 lg:gap-4">
        <!-- حقل اسم المؤسسة التعليمية -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step2.name_of_school')"
            :isMandatory="true"
            :infoText="$t('step2.enter_name_of_school')"
            inputType="text"
            name="name_of_school_or_college_university"
            :id="`name_of_school_or_college_university-${education.id}`"
            v-model="education.name_of_school_or_college_university"
            :isValid="validateNameOfSchool(education.name_of_school_or_college_university)"
            :validationMessage="$t('step2.required_name_of_school')"
          />
        </FieldContainer>

        <!-- حقل مجال الدراسة -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step2.field_of_study')"
            :isMandatory="true"
            :infoText="$t('step2.enter_field_of_study')"
            inputType="text"
            name="field_of_study_or_major"
            :id="`field_of_study_or_major-${education.id}`"
            v-model="education.field_of_study_or_major"
            :isValid="validateFieldOfStudy(education.field_of_study_or_major)"
            :validationMessage="$t('step2.required_field_of_study')"
          />
        </FieldContainer>
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-4">
        <!-- حقل البلد -->
        <FieldContainer>
          <Autocomp
            :labelText="$t('step2.country')"
            :isMandatory="true"
            :infoText="$t('step2.select_country')"
            inputType="text"
            name="country"
            :id="`country-${education.id}`"
            :options="getOptionCountry(education)"
            v-model="education.country"
            @input-change="(value) => handleCountryChange(index, value)"
            :isValid="validateCountry(education.country)"
            :validationMessage="$t('step2.required_country')"
          />
        </FieldContainer>

        <!-- حقل المدينة -->
        <FieldContainer>
          <Autocomp
            :labelText="$t('step2.city')"
            :isMandatory="true"
            :infoText="$t('step2.select_city')"
            inputType="text"
            name="city"
            :id="`city-${education.id}`"
            :options="getOptionCity(education)"
            v-model="education.city"
            @input-change="(value) => handleCityChange(index, value)"
            :isValid="validateCity(education.city)"
            :validationMessage="$t('step2.required_city')"
          />
        </FieldContainer>

        <!-- حقل المحافظة -->
        <FieldContainer>
          <Autocomp
            :labelText="$t('step2.governorate')"
            :isMandatory="true"
            :infoText="$t('step2.select_governorate')"
            inputType="text"
            name="governorate"
            :id="`governorate-${education.id}`"
            :options="getOptionGovernorate(education)"
            v-model="education.governorate"
            @input-change="(value) => handleGovernorateChange(index, value)"
            :isValid="validateGovernorate(education.governorate)"
            :validationMessage="$t('step2.required_governorate')"
          />
        </FieldContainer>

        <!-- حقل الموقع النصي -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step2.location_text')"
            :isMandatory="false"
            :infoText="$t('step2.location_text_info')"
            inputType="text"
            name="location_text"
            :id="`location_text-${education.id}`"
            v-model="education.location_text"
            :validationMessage="$t('step2.edit_message')"
          />
        </FieldContainer>
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-4">
        <!-- حقل تاريخ البدء -->
        <FieldContainer>
          <StyledInput 
            id="from_date" 
            name="from_date" 
            :labelText="$t('step2.from_date')" 
            :isMandatory="true" 
            :infoText="$t('step2.education_start_date')" 
            inputType="date" 
            v-model="education.from_date" 
            :isValid="validateFromDate(education.from_date)"
          />
        </FieldContainer>

        <!-- حقل تاريخ الانتهاء -->
        <FieldContainer>
          <StyledInput 
            id="to_date" 
            name="to_date" 
            :labelText="$t('step2.to_date')" 
            :isMandatory="true" 
            :infoText="$t('step2.education_end_date')" 
            inputType="date" 
            v-model="education.to_date"
            :isValid="validateToDate(education.to_date)" 
            :validationMessage="$t('step2.required_to_date')"
          />
        </FieldContainer>
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-4">
        <!-- حقل الهاتف -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step2.phone')"
            :isMandatory="true"
            :infoText="$t('step2.phone_example')"
            inputType="phone"
            name="phone"
            :id="`phone-${education.id}`"
            v-model="education.phone"
            :isValid="validatePhone(education.phone)" 
            :validationMessage="$t('step2.valid_phone_required')"
          />
        </FieldContainer>
        
        <!-- حقل الامتداد -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step2.ext')"
            :isMandatory="false"
            :infoText="$t('step2.extension_optional')"
            inputType="text"
            name="ext"
            :id="`ext-${education.id}`"
            v-model="education.ext"
            :validationMessage="$t('step2.edit_message')"
          />
        </FieldContainer>      
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-4">
        <!-- حقل الدبلومة -->
        <FieldContainer>
          <Select
            :labelText="$t('step2.diploma')"
            :isMandatory="true"
            :infoText="$t('step2.select_highest_diploma')"
            name="diploma"
            :id="`diploma-${education.id}`"
            :options="optionsDiploma"
            v-model="education.diploma"
            :isValid="validateDiploma(education.diploma)"
            :validationMessage="$t('step2.required_diploma')"
          />
        </FieldContainer>

        <!-- حقل الاسم البديل -->
        <FieldContainer>
          <Select
            :labelText="$t('step2.another_name')"
            :isMandatory="false"
            :infoText="$t('step2.another_name_info')"
            name="another_name"
            :id="`another_name-${education.id}`"
            :options="optionsAnotherName"
            v-model="education.another_name"
            :validationMessage="$t('step2.edit_message')"
          />
        </FieldContainer>
      </div>

      <!-- يمكن إضافة أزرار إضافية هنا إذا لزم الأمر -->
    </FieldsToggleContainer>

    <!-- زر إضافة قسم جديد -->
    <div class="flex justify-center py-3">
      <Button level="secondary" @clicked="addEducation">+ {{ $t('step2.add_education_information') }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, reactive, onMounted } from 'vue'
import { useVerificationRequestStore } from '../../stores/verificationRequest'
import { useToast } from 'vue-toastification'
import { v4 as uuidv4 } from 'uuid'

// المكونات
import Button from '../../components/button.vue'
import FieldContainer from '../../components/fieldContainer.vue'
import FieldsToggleContainer from '../../components/fieldsToggleContainer.vue'
import StyledInput from '../../components/styledInput.vue'
import Autocomp from '../../components/autocomp.vue'
import Select from '../../components/select.vue'

// الاستيراد
import { location } from '../../data/useAddressLogic'

// استيراد الستور
const store = useVerificationRequestStore()
const toast = useToast()

// البيانات المحسوبة لمعلومات التعليم
const educationInformation = computed({
  get: () => store.step2.educationInformation,
  set: val => store.updateStep2('educationInformation', val)
})

// خيارات الدبلومة
const optionsDiploma = reactive([
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
])

// خيارات الاسم البديل
const optionsAnotherName = reactive([
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
])

// دوال الحصول على الخيارات للبلد، المدينة، والمحافظة
const getOptionCountry = (education) => {
  const options = location.data
    .filter(loc => loc.location_type === 'Country')
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  if (education.country && !options.some(opt => opt.value === education.country)) {
    options.push({
      label: education.country,
      value: education.country
    })
  }

  return options
}

const getOptionCity = (education) => {
  if (!education.country) return []

  const options = location.data
    .filter(loc => loc.location_type === 'City' && loc.parent_location === education.country)
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  if (education.city && !options.some(opt => opt.value === education.city)) {
    options.push({
      label: education.city,
      value: education.city
    })
  }

  return options
}

const getOptionGovernorate = (education) => {
  if (!education.city) return []

  const options = location.data
    .filter(loc => loc.location_type === 'Governorate' && loc.parent_location === education.city)
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  if (education.governorate && !options.some(opt => opt.value === education.governorate)) {
    options.push({
      label: education.governorate,
      value: education.governorate
    })
  }

  return options
}

// دوال لمعالجة التغيرات في البلد، المدينة، والمحافظة
const handleCountryChange = (index, value) => {
  const education = educationInformation.value[index]
  education.country = value.value
  education.city = ''
  education.governorate = ''
}

const handleCityChange = (index, value) => {
  const education = educationInformation.value[index]
  education.city = value.value
  education.governorate = ''
}

const handleGovernorateChange = (index, value) => {
  const education = educationInformation.value[index]
  education.governorate = value.value
}

// دوال التحقق من صحة الحقول
const validateNameOfSchool = (name) => {
  return typeof name === 'string' && name.trim() !== '';
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

const validateAnotherName = () => {
  return true; // دالة تحقق دائمًا صحيحة لأن الحقل اختياري
}

// دالة لإضافة سجل تعليم جديد
const addEducation = () => {
  const newEducation = {
    id: uuidv4(),
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
  educationInformation.value.push(newEducation)
  nextTick(() => {
    // يمكن إضافة أي عمليات إضافية بعد إضافة السجل الجديد
  })
}

// دالة لحذف سجل تعليم
const deleteEducation = (index) => {
  educationInformation.value.splice(index, 1)
  toast.info(`تم حذف السجل التعليمي بنجاح.`)
}

// دالة لحفظ السجلات التعليمية (معلقة حاليًا)
const saveEducation = async (index) => {
  try {
    await store.saveStep2();
    toast.success(`تم حفظ التعليم ${index + 1} بنجاح!`)
  } catch (error) {
    console.error(`فشل في حفظ التعليم ${index + 1}:`, error)
    toast.error(`فشل في حفظ التعليم ${index + 1}.`)
  }
}
</script>

<style scoped>
/* إضافة تنسيقات إضافية إذا لزم الأمر */
</style>