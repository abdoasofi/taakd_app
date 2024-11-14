<!-- src/pages/stepsSections/step3.vue -->
<template>
  <div class="pt-3 container">
    <h1 class="text-3xl font-bold mb-3 text-black">{{ $t('step3.employment_history') }}</h1>
    <ul>
      <li>{{ $t('step3.required_fields') }}</li>
      <li>
        {{ $t('step3.provide_employment_info') }}
      </li>
    </ul>
  </div>

  <div class="space-y-2 mt-3">
    <!-- Iterate Over Employment History -->
    <FieldsToggleContainer
      v-for="(employment, index) in employmentHistory"
      :key="employment.employment_id"
      :title="employment.company || `${$t('step3.employment')} ${index + 1}`"
    >
    <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Company Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step3.company')"
            :isMandatory="true"
            :infoText="$t('step3.company')"
            inputType="text"
            name="company"
            :id="`company-${employment.employment_id}`"
            v-model="employment.company"
            :isValid="validateCompany(employment.company)"
            :validationMessage="$t('step3.required_company')"
          />
        </FieldContainer> 

        <!-- Name of Employer Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step3.name_of_your_employer')"
            :isMandatory="true"
            :infoText="$t('step3.name_of_your_employer')"
            inputType="text"
            name="name_of_your_employer"
            :id="`name_of_your_employer-${employment.employment_id}`"
            v-model="employment.name_of_your_employer"
            :isValid="validateNameOfYourEmployer(employment.name_of_your_employer)"
            :validationMessage="$t('step3.required_name_of_your_employer')"
          />
        </FieldContainer> 
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Permission Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`contact_the_employer-${employment.employment_id}`" 
            :id="`contact_the_employer-${employment.employment_id}`" 
            v-model="employment.contact_the_employer"
          >
            {{ $t('step3.permission_to_contact') }}
          </CheckBox>
        </FieldContainer>

        <!-- Issuing Salary Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`issuing_salary-${employment.employment_id}`" 
            :id="`issuing_salary-${employment.employment_id}`" 
            v-model="employment.issuing_salary"
          >
            {{ $t('step3.issuing_salary') }}
          </CheckBox>
        </FieldContainer>
      </div>

      <!-- ******** Start Company Location ******** -->
      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Country Autocomplete -->
        <FieldContainer>
          <Autocomp
            :labelText="$t('step3.country')"
            :isMandatory="true"
            :infoText="$t('step3.country')"
            inputType="text"
            name="country"
            :id="`country-${employment.employment_id}`"
            :options="getOptionCountry(employment)"
            v-model="employment.country"
            @input-change="(value) => handleCountryChange(index, value)"
            :isValid="validateCountry(employment.country)"
            :validationMessage="$t('step3.required_country')"
          />
        </FieldContainer>  

        <!-- City Autocomplete -->
        <FieldContainer>
          <Autocomp
            :labelText="$t('step3.city')"
            :isMandatory="true"
            :infoText="$t('step3.city')"
            inputType="text"
            name="city"
            :id="`city-${employment.employment_id}`"
            :options="getOptionCity(employment)"
            v-model="employment.city"
            @input-change="(value) => handleCityChange(index, value)"
            :isValid="validateCity(employment.city)"
            :validationMessage="$t('step3.required_city')"
          />
        </FieldContainer>

        <!-- Governorate Autocomplete -->
        <FieldContainer>
          <Autocomp
            :labelText="$t('step3.governorate')"
            :isMandatory="true"
            :infoText="$t('step3.governorate')"
            inputType="text"
            name="governorate"
            :id="`governorate-${employment.employment_id}`"
            :options="getOptionGovernorate(employment)"
            v-model="employment.governorate"
            @input-change="(value) => handleGovernorateChange(index, value)"
            :isValid="validateGovernorate(employment.governorate)"
            :validationMessage="$t('step3.required_governorate')"
          />
        </FieldContainer>

        <!-- Location Text of Employer Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step3.location_text')"
            :isMandatory="false"
            :infoText="$t('step3.location_text')"
            inputType="text"
            name="location_text"
            :id="`location_text-${employment.employment_id}`"
            v-model="employment.location_text"
            :validationMessage="$t('step3.edit_message')"
          />
        </FieldContainer> 
      </div>
      <!-- ******** End Company Location ******** -->

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Continuous Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`continuous-${employment.employment_id}`" 
            :id="`continuous-${employment.employment_id}`" 
            v-model="employment.continuous"
          >
            {{ $t('step3.continuous') }}
          </CheckBox>
        </FieldContainer>   

        <!-- Activity Has Stopped Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`activity_has_stopped-${employment.employment_id}`" 
            :id="`activity_has_stopped-${employment.employment_id}`" 
            v-model="employment.activity_has_stopped"
          >
            {{ $t('step3.activity_has_stopped') }}
          </CheckBox>
        </FieldContainer> 
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- From Date -->
        <FieldContainer>
          <StyledInput 
            id="from_date" 
            name="from_date" 
            :labelText="$t('step3.from_date')" 
            :isMandatory="true" 
            :infoText="$t('step3.from_date_info')" 
            inputType="date" 
            v-model="employment.from_date" 
            :isValid="validateFromDate(employment.from_date)"
          />
        </FieldContainer>

        <!-- To Date -->
        <FieldContainer>
          <StyledInput 
            id="end_date" 
            name="end_date" 
            :labelText="$t('step3.end_date')" 
            :isMandatory="true" 
            :infoText="$t('step3.end_date_info')" 
            inputType="date" 
            v-model="employment.end_date"
            :isValid="validateEndDate(employment.end_date)" 
          />
        </FieldContainer>
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Phone Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step3.phone')"
            :isMandatory="true"
            :infoText="$t('step3.phone_example')"
            inputType="text"
            name="phone"
            :id="`phone-${employment.employment_id}`"
            v-model="employment.phone"
            :isValid="validatePhone(employment.phone)" 
            :validationMessage="$t('step3.valid_phone_required')"
          />
        </FieldContainer>

        <!-- Ext Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step3.ext')" 
            :isMandatory="false" 
            :infoText="$t('step3.extension_optional')" 
            inputType="text" 
            name="ext" 
            :id="`ext-${employment.employment_id}`" 
            v-model="employment.ext" 
            :validationMessage="$t('step3.edit_message')"
          />
        </FieldContainer>      
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Official Job Title Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step3.official_job_title_held_currently')"
            :isMandatory="true"
            :infoText="$t('step3.official_job_title_info')"
            inputType="text"
            name="official_job_title_held_currently"
            :id="`official_job_title_held_currently-${employment.employment_id}`"
            v-model="employment.official_job_title_held_currently"
            :isValid="validateOfficialJobTitleHeldCurrently(employment.official_job_title_held_currently)" 
            :validationMessage="$t('step3.required_official_job_title')"
          />
        </FieldContainer> 

        <!-- Type of Employment Select -->
        <FieldContainer>
          <Autocomp
            :labelText="$t('step3.type_of_employment')"
            :isMandatory="false"
            :infoText="$t('step3.type_of_employment_info')"
            inputType="text"
            name="type_of_employment"
            :id="`type_of_employment-${employment.employment_id}`"
            :options="optionsTypeEmployment"
            v-model="employment.type_of_employment"
            @input-change="(value) => handleTypeOfEmployment(index, value)"
            :isValid="validateTypeOfEmployment(employment.type_of_employment)"
            :validationMessage="$t('step3.required_type_of_employment')"
          />
        </FieldContainer>  
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- The Company has Different Names Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`the_company_has_different_names-${employment.employment_id}`" 
            :id="`the_company_has_different_names-${employment.employment_id}`" 
            v-model="employment.the_company_has_different_names"
          >
            {{ $t('step3.the_company_has_different_names') }}
          </CheckBox>
        </FieldContainer> 

        <!-- Nickname Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`nickname_checkbox-${employment.employment_id}`" 
            :id="`nickname_checkbox-${employment.employment_id}`" 
            v-model="employment.you_have_a_nicknamecx"
          >
            {{ $t('step3.you_have_a_nickname') }}
          </CheckBox>
        </FieldContainer> 
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Different Company Names Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step3.different_company_names')"
            :isMandatory="false"
            :infoText="$t('step3.different_company_names_info')"
            inputType="text"
            name="different_company_names"
            :id="`different_company_names-${employment.employment_id}`"
            v-model="employment.different_company_names"
            :isValid="false"
            :validationMessage="$t('step3.edit_message')"
          />
        </FieldContainer>  

        <!-- Nickname Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step3.nickname')"
            :isMandatory="false" 
            :infoText="$t('step3.nickname_info')"
            inputType="text"
            name="nickname"
            :id="`nickname-${employment.employment_id}`"
            v-model="employment.nickname"
            :isValid="false"
            :validationMessage="$t('step3.edit_message')"
          />
        </FieldContainer>         
      </div>

      <!-- File Upload -->
      <div class="lg:grid grid-cols-1 lg:gap-2">
        <FieldContainer>
          <FileUpload
            v-model="employment.file"
            :id="`file-${employment.employment_id}`"
            :name="employment.employment_id" 
            :validationMessage="$t('step3.valid_file_required')"
          />
        </FieldContainer>
      </div>

      <!-- Save Employment Button -->
      <!-- <div class="flex justify-end py-2">
        <Button level="primary" @clicked="saveEmployment(index)">Save</Button>
      </div> -->
    </FieldsToggleContainer>

    <!-- Add Employment Button -->
    <div class="flex justify-center py-3">
      <Button level="secondary" @clicked="addEmployment">+ {{ $t('step3.add_employment_history') }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, nextTick } from 'vue'
import { useVerificationRequestStore } from '../../stores/verificationRequest'
import { useToast } from 'vue-toastification'
import { v4 as uuidv4 } from 'uuid'

// Components
import Button from '../../components/button.vue'
import FieldContainer from '../../components/fieldContainer.vue'
import FieldsToggleContainer from '../../components/fieldsToggleContainer.vue'
import StyledInput from '../../components/styledInput.vue'
import Autocomp from '../../components/autocomp.vue'
import CheckBox from '../../components/checkBox.vue'
import FileUpload from '../../components/fileUpload.vue'

// Import location data (cities and governorates)
import { location } from '../../data/useAddressLogic'
import { EmploymentHistory } from '../../data/types'

// Import store
const store = useVerificationRequestStore()
const toast = useToast()

// Bind employment data with the store
const employmentHistory = computed({
  get: () => store.step3.employment_history,
  set: val => store.updateStep3('employment_history', val)
})

// Employment Type options
const optionsTypeEmployment = reactive([
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
])

// Manage open sections
const openSections = ref<{ [key: string]: boolean }>({})

// Functions to get country, city, governorate options
const getOptionCountry = (employment) => {
  const options = location.data
    .filter(loc => loc.location_type === 'Country')
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  // Add current value if not present
  if (employment.country && !options.some(opt => opt.value === employment.country)) {
    options.push({
      label: employment.country,
      value: employment.country
    })
  }

  return options
}

const getOptionCity = (employment) => {
  if (!employment.country) return []

  const options = location.data
    .filter(loc => loc.location_type === 'City' && loc.parent_location === employment.country)
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  // Add current value if not present
  if (employment.city && !options.some(opt => opt.value === employment.city)) {
    options.push({
      label: employment.city,
      value: employment.city
    })
  }

  return options
}

const getOptionGovernorate = (employment) => {
  if (!employment.city) return []

  const options = location.data
    .filter(loc => loc.location_type === 'Governorate' && loc.parent_location === employment.city)
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  // Add current value if not present
  if (employment.governorate && !options.some(opt => opt.value === employment.governorate)) {
    options.push({
      label: employment.governorate,
      value: employment.governorate
    })
  }

  return options
}

// Handler functions for changes
const handleCountryChange = (index, value) => {
  employmentHistory.value[index].country = value.value
  employmentHistory.value[index].city = '' // Reset city when country changes
  employmentHistory.value[index].governorate = '' // Reset governorate when country changes
}

const handleCityChange = (index, value) => {
  employmentHistory.value[index].city = value.value
  employmentHistory.value[index].governorate = '' // Reset governorate when city changes
}

const handleGovernorateChange = (index, value) => {
  employmentHistory.value[index].governorate = value.value
}

const handleTypeOfEmployment = (index, value) => {
  employmentHistory.value[index].type_of_employment = value.value
}

// Validation functions
const validateCompany = (company) => {
  return typeof company === 'string' && company.trim() !== ''
}

const validateNameOfYourEmployer = (name_of_your_employer) => {
  return typeof name_of_your_employer === 'string' && name_of_your_employer.trim() !== ''
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

const validateEndDate = (end_date) => {
  return typeof end_date === 'string' && end_date.trim() !== ''
}

const validatePhone = (phone) => {
  const phoneRegex = /^\+?[0-9\-]{7,15}$/
  return phoneRegex.test(phone)
}

const validateTypeOfEmployment = (type_of_employment) => {
  return typeof type_of_employment === 'string' && type_of_employment.trim() !== ''
}

const validateOfficialJobTitleHeldCurrently = (official_job_title_held_currently) => {
  return typeof official_job_title_held_currently === 'string' && official_job_title_held_currently.trim() !== ''
}

// Adding new employment record
const addEmployment = () => {
  const newEmployment : EmploymentHistory = {
    employment_id: uuidv4(), // Unique identifier
    company: '',
    name_of_your_employer: '',
    contact_the_employer: false,
    issuing_salary: false,
    country: '',
    city: '',
    governorate: '',
    location_text: '',
    continuous: false,
    activity_has_stopped: false,
    from_date: '',
    end_date: '',
    phone: '',
    ext: '',
    official_job_title_held_currently: '',
    type_of_employment: '',
    the_company_has_different_names: false,
    different_company_names: '',
    you_have_a_nicknamecx: false,
    nickname: '',
    file: null,
  }
  employmentHistory.value.push(newEmployment)
  nextTick(() => {
    openSections.value[newEmployment.employment_id] = true
  })
}

// Save employment data
const saveEmployment = async (index) => {
  if (store.isLoading) { // تحديث الاسم
    return
  }
  try {
    await store.saveStep3()
    toast.success(`تم حفظ بيانات العمل ${index + 1} بنجاح!`)
  } catch (error) {
    console.error(`فشل في حفظ بيانات العمل ${index + 1}:`, error)
    toast.error(`فشل في حفظ بيانات العمل ${index + 1}.`)
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>