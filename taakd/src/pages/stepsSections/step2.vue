<template>
  <div class="pt-3 container">
    <h1 class="text-3xl font-bold mb-3 text-black">{{ $t('education_information') }}</h1>
    <ul>
      <li>{{ $t('required_fields') }}</li>
      <li>{{ $t('provide_education_info') }}</li>
    </ul>
  </div>
  <div class="space-y-2 mt-3">
    <FieldsToggleContainer
      v-for="(education, index) in educationInformation"
      :key="education.id"
      :title="education.name_of_school_or_college_university || `${$t('education')} ${index + 1}`"
    >
      <div class="lg:grid grid-cols-2 lg:gap-2">

        <!-- Name of School/College/University Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('name_of_school')"
            :isMandatory="true"
            :infoText="$t('enter_name_of_school')"
            inputType="text"
            name="name_of_school_or_college_university"
            :id="`name_of_school_or_college_university-${education.id}`"
            v-model="education.name_of_school_or_college_university"
            :isValid="validateNameOfSchool(education.name_of_school_or_college_university)"
            :validationMessage="$t('required_name_of_school')"
          />
        </FieldContainer>

        <!-- Field of Study/Major Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('field_of_study')"
            :isMandatory="true"
            :infoText="$t('enter_field_of_study')"
            inputType="text"
            name="field_of_study_or_major"
            :id="`field_of_study_or_major-${education.id}`"
            v-model="education.field_of_study_or_major"
            :isValid="validateFieldOfStudy(education.field_of_study_or_major)"
            :validationMessage="$t('required_field_of_study')"
          />
        </FieldContainer>
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <FieldContainer>
          <Autocomp
            :labelText="$t('country')"
            :isMandatory="true"
            :infoText="$t('select_country')"
            inputType="text"
            name="country"
            :id="`country-${education.id}`"
            :options="getOptionCountry(education)"
            v-model="education.country"
            @input-change="(value) => handleCountryChange(index, value)"
            :isValid="validateCountry(education.country)"
            :validationMessage="$t('required_country')"
          />
        </FieldContainer>

        <FieldContainer>
          <Autocomp
            :labelText="$t('city')"
            :isMandatory="true"
            :infoText="$t('select_city')"
            inputType="text"
            name="city"
            :id="`city-${education.id}`"
            :options="getOptionCity(education)"
            v-model="education.city"
            @input-change="(value) => handleCityChange(index, value)"
            :isValid="validateCity(education.city)"
            :validationMessage="$t('required_city')"
          />
        </FieldContainer>

        <FieldContainer>
          <Autocomp
            :labelText="$t('governorate')"
            :isMandatory="true"
            :infoText="$t('select_governorate')"
            inputType="text"
            name="governorate"
            :id="`governorate-${education.id}`"
            :options="getOptionGovernorate(education)"
            v-model="education.governorate"
            @input-change="(value) => handleGovernorateChange(index, value)"
            :isValid="validateGovernorate(education.governorate)"
            :validationMessage="$t('required_governorate')"
          />
        </FieldContainer>

        <FieldContainer>
          <StyledInput
            :labelText="$t('location_text')"
            :isMandatory="false"
            :infoText="$t('location_text_info')"
            inputType="text"
            name="location_text"
            :id="`location_text-${education.id}`"
            v-model="education.location_text"
            :validationMessage="$t('edit_message')"
          />
        </FieldContainer>
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <FieldContainer>
          <StyledInput 
            id="from_date" 
            name="from_date" 
            :labelText="$t('from_date')" 
            :isMandatory="true" 
            :infoText="$t('education_start_date')" 
            inputType="date" 
            v-model="education.from_date" 
            :isValid="validateFromDate(education.from_date)"
          />
        </FieldContainer>

        <FieldContainer>
          <StyledInput 
            id="to_date" 
            name="to_date" 
            :labelText="$t('to_date')" 
            :isMandatory="true" 
            :infoText="$t('education_end_date')" 
            inputType="date" 
            v-model="education.to_date"
            :isValid="validateToDate(education.to_date)" 
            :validationMessage="$t('required_to_date')"
          />
        </FieldContainer>
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <FieldContainer>
          <StyledInput
            :labelText="$t('phone')"
            :isMandatory="true"
            :infoText="$t('phone_example')"
            inputType="phone"
            name="phone"
            :id="`phone-${education.id}`"
            v-model="education.phone"
            :isValid="validatePhone(education.phone)" 
            :validationMessage="$t('valid_phone_required')"
          />
        </FieldContainer>
        
        <FieldContainer>
          <StyledInput
            :labelText="$t('ext')"
            :isMandatory="false"
            :infoText="$t('extension_optional')"
            inputType="text"
            name="ext"
            :id="`ext-${education.id}`"
            v-model="education.ext"
            :validationMessage="$t('edit_message')"
          />
        </FieldContainer>      
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <FieldContainer>
          <Select
            :labelText="$t('diploma')"
            :isMandatory="true"
            :infoText="$t('select_highest_diploma')"
            name="diploma"
            :id="`diploma-${education.id}`"
            :options="optionsDiploma"
            v-model="education.diploma"
            :isValid="validateDiploma(education.diploma)"
            :validationMessage="$t('required_diploma')"
          />
        </FieldContainer>

        <FieldContainer>
          <Select
            :labelText="$t('another_name')"
            :isMandatory="false"
            :infoText="$t('another_name_info')"
            name="another_name"
            :id="`another_name-${education.id}`"
            :options="optionsAnotherName"
            v-model="education.another_name"
            :validationMessage="$t('edit_message')"
          />
        </FieldContainer>
      </div>

      <!-- <div class="flex justify-end py-2">
        <Button level="primary" @clicked="saveEducation(index)">Save</Button>
      </div> -->
    </FieldsToggleContainer>

    <div class="flex justify-center py-3">
      <Button level="secondary" @clicked="addEducation">+ {{ $t('add_education_information') }}</Button>
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

import { location } from '../../data/useAddressLogic'


// استيراد الستور
const store = useVerificationRequestStore()
const toast = useToast()

const educationInformation = computed({
  get: () => store.step2.educationInformation,
  set: val => store.updateStep2('educationInformation', val)
})

const optionsDiploma = reactive([
  { value: "High School", label: "High School" },
  { value: "Associate Degree", label: "Associate Degree" },
  { value: "Bachelor's Degree", label: "Bachelor's Degree" },
  { value: "Master's Degree", label: "Master's Degree" },
  { value: "Doctorate", label: "Doctorate" },
  { value: "Other", label: "Other" },
])

const openSections = ref<{ [key: string]: boolean }>({});

const optionsAnotherName = reactive([
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
])

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

// Handler functions for changes

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

// Validation functions

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
  return true; // اعتبار الحقل دائمًا صحيحًا كونه اختياري.
}

// Adding new education record
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
    openSections.value[newEducation.id] = true; // تأكد من استخدام .value للوصول إلى كائن openSections
  })
}

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