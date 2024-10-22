<!-- src/pages/stepsSections/step3.vue -->
<template>
  <div class="pt-3 container">
    <h1 class="text-3xl  font-bold mb-3 text-black">Employment History</h1>
    <ul>
      <li>
        All fields marked with an asterisk ( * ) are required.
      </li>
      <li>
        Please provide your employment history, beginning with the most recent. To add additional employers, click the "Add" icon.
      </li>
    </ul>
  </div>

  <div class="space-y-2 mt-3">
    <!-- Iterate Over Employment History -->
    <FieldsToggleContainer
      v-for="(employment, index) in employmentHistory"
      :key="employment.id"
      :title="employment.company || `Employment ${index + 1}`"
    >
      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Company Field -->
        <FieldContainer>
          <StyledInput
            labelText="Company"
            :isMandatory="true"
            infoText="Company"
            inputType="text"
            name="company"
            :id="`company-${employment.id}`"
            v-model="employment.company"
            :isValid="validateCompany(employment.company)"
            validationMessage="Company name is required."
          />
        </FieldContainer> 

        <!-- Name of Employer Field -->
        <FieldContainer>
          <StyledInput
            labelText="Name of Your Employer"
            :isMandatory="true"
            infoText="Name of Your Employer"
            inputType="text"
            name="name_of_your_employer"
            :id="`name_of_your_employer-${employment.id}`"
            v-model="employment.name_of_your_employer"
            :isValid="validateNameOfYourEmployer(employment.name_of_your_employer)"
            validationMessage="Name of Your Employer is required."
          />
        </FieldContainer> 
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Permission Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`contact_the_employer-${employment.id}`" 
            :id="`contact_the_employer-${employment.id}`" 
            v-model="employment.contact_the_employer"
          >
            Do we have permission to contact this current employer?
          </CheckBox>
        </FieldContainer>

        <!-- Issuing Salary Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`issuing_salary-${employment.id}`" 
            :id="`issuing_salary-${employment.id}`" 
            v-model="employment.issuing_salary"
          >
            Does this employer issue your paycheck? 
          </CheckBox>
        </FieldContainer>
      </div>

      <!-- ******** Start Company Location ******** -->
      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Country Autocomplete -->
        <FieldContainer>
          <Autocomp
            labelText="Country"
            :isMandatory="true"
            infoText="Country"
            inputType="text"
            name="country"
            :id="`country-${employment.id}`"
            :options="getOptionCountry(employment)"
            v-model="employment.country"
            @input-change="(value) => handleCountryChange(index, value)"
            :isValid="validateCountry(employment.country)"
            validationMessage="Country is required."
          />
        </FieldContainer>  

        <!-- City Autocomplete -->
        <FieldContainer>
          <Autocomp
            labelText="City"
            :isMandatory="true"
            infoText="City"
            inputType="text"
            name="city"
            :id="`city-${employment.id}`"
            :options="getOptionCity(employment)"
            v-model="employment.city"
            @input-change="(value) => handleCityChange(index, value)"
            :isValid="validateCity(employment.city)"
            validationMessage="City is required."
          />
        </FieldContainer>

        <!-- Governorate Autocomplete -->
        <FieldContainer>
          <Autocomp
            labelText="Governorate"
            :isMandatory="true"
            infoText="Governorate"
            inputType="text"
            name="governorate"
            :id="`governorate-${employment.id}`"
            :options="getOptionGovernorate(employment)"
            v-model="employment.governorate"
            @input-change="(value) => handleGovernorateChange(index, value)"
            :isValid="validateGovernorate(employment.governorate)"
            validationMessage="Governorate is required."
          />
        </FieldContainer>

        <!-- Location Text of Employer Field -->
        <FieldContainer>
          <StyledInput
            labelText="Location Text"
            :isMandatory="false"
            infoText="Location Text"
            inputType="text"
            name="location_text"
            :id="`location_text-${employment.id}`"
            v-model="employment.location_text"
            validationMessage="You can edit the message."
          />
        </FieldContainer> 
      </div>
      <!-- ******** End Company Location ******** -->

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Continuous Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`continuous-${employment.id}`" 
            :id="`continuous-${employment.id}`" 
            v-model="employment.continuous"
          >
            Continuous
          </CheckBox>
        </FieldContainer>   

        <!-- Activity Has Stopped Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`activity_has_stopped-${employment.id}`" 
            :id="`activity_has_stopped-${employment.id}`" 
            v-model="employment.activity_has_stopped"
          >
            Activity Has Stopped
          </CheckBox>
        </FieldContainer>
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- From Date -->
        <FieldContainer>
          <StyledInput 
            id="from_date" 
            name="from_date" 
            labelText="From" 
            :isMandatory="true" 
            infoText="From Date" 
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
            labelText="End" 
            :isMandatory="true" 
            infoText="End Date" 
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
            labelText="Phone"
            :isMandatory="true"
            infoText="+999-77885951"
            inputType="text"
            name="phone"
            :id="`phone-${employment.id}`"
            v-model="employment.phone"
            :isValid="validatePhone(employment.phone)" 
            validationMessage="Valid phone number is required."
          />
        </FieldContainer>

        <!-- Ext Field -->
        <FieldContainer>
          <StyledInput
            labelText="Ext"
            :isMandatory="false"
            infoText="Ext"
            inputType="text"
            name="ext"
            :id="`ext-${employment.id}`"
            v-model="employment.ext"
            validationMessage="You can edit the message."
          />
        </FieldContainer>      
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Official Job Title Field -->
        <FieldContainer>
          <StyledInput
            labelText="Official Job Title Held Currently"
            :isMandatory="true"
            infoText="Official Job Title Held Currently"
            inputType="text"
            name="official_job_title_held_currently"
            :id="`official_job_title_held_currently-${employment.id}`"
            v-model="employment.official_job_title_held_currently"
            :isValid="validateOfficialJobTitleHeldCurrently(employment.official_job_title_held_currently)" 
            validationMessage="Official Job Title is required."
          />
        </FieldContainer> 

        <!-- Type of Employment Select -->
        <FieldContainer>
          <Autocomp
            labelText="Type of Employment"
            :isMandatory="false"
            infoText="Type of Employment"
            inputType="text"
            name="type_of_employment"
            :id="`type_of_employment-${employment.id}`"
            v-model="employment.type_of_employment"
            @input-change="(value) => handleTypeOfEmployment(index, value)"
            :isValid="validateTypeOfEmployment(employment.type_of_employment)"
            validationMessage="Type of Employment is required."
          />
        </FieldContainer>  
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- The Company has Different Names Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`the_company_has_different_names-${employment.id}`" 
            :id="`the_company_has_different_names-${employment.id}`" 
            v-model="employment.the_company_has_different_names"
          >
            The Company has Different Names
          </CheckBox>
        </FieldContainer> 

        <!-- Nickname Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`nickname_checkbox-${employment.id}`" 
            :id="`nickname_checkbox-${employment.id}`" 
            v-model="employment.you_have_a_nicknamecx"
          >
            You Have a Nickname?
          </CheckBox>
        </FieldContainer> 
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Different Company Names Field -->
        <FieldContainer>
          <StyledInput
            labelText="Different Company Names"
            :isMandatory="false"
            infoText="Different Company Names"
            inputType="text"
            name="different_company_names"
            :id="`different_company_names-${employment.id}`"
            v-model="employment.different_company_names"
            :isValid="false"
            validationMessage="You can edit the message."
          />
        </FieldContainer>  

        <!-- Nickname Field -->
        <FieldContainer>
          <StyledInput
            labelText="Nickname"
            :isMandatory="false" 
            infoText="Nickname"
            inputType="text"
            name="nickname"
            :id="`nickname-${employment.id}`"
            v-model="employment.nickname"
            :isValid="false"
            validationMessage="You can edit the message."
          />
        </FieldContainer>         
      </div>

      <!-- File Upload -->
      <FileUpload
        :name="`file-${employment.id}`"
        :id="`file-${employment.id}`"
      />

      <!-- Save Employment Button -->
      <div class="flex justify-end py-2">
        <Button level="primary" @clicked="saveEmployment(index)">Save</Button>
      </div>
    </FieldsToggleContainer>

    <!-- Add Employment Button -->
    <div class="flex justify-center py-3">
      <Button level="secondary" @clicked="addEmployment">+ Add Employment History</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive, nextTick } from 'vue'
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

// استيراد البيانات (البلديات والمحافظات)
import { location } from '../../data/useAddressLogic'

// استيراد الستور
const store = useVerificationRequestStore()
const toast = useToast()

// ربط بيانات التوظيف مع المخزن
const employmentHistory = computed({
  get: () => store.step3.employment_history,
  set: (val) => store.updateStep3('employment_history', val)
})

// خيارات نوع التوظيف
const optionsTypeEmployment = reactive([
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
])

// إدارة الأقسام المفتوحة
const openSections = ref<{ [key: string]: boolean }>({})

// دوال الحصول على خيارات البلد، المدينة والمحافظة
const getOptionCountry = (employment) => {
  const options = location.data
    .filter(loc => loc.location_type === 'Country')
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  // إضافة القيمة الحالية إذا لم تكن موجودة في الخيارات
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

  // إضافة القيمة الحالية إذا لم تكن موجودة في الخيارات
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

  // إضافة القيمة الحالية إذا لم تكن موجودة في الخيارات
  if (employment.governorate && !options.some(opt => opt.value === employment.governorate)) {
    options.push({
      label: employment.governorate,
      value: employment.governorate
    })
  }

  return options
}

// دوال التعامل مع تغييرات البلد، المدينة والمحافظة
const handleCountryChange = (index, value) => {
  employmentHistory.value[index].country = value.value
  employmentHistory.value[index].city = '' // إعادة تعيين المدينة عند تغيير البلد
  employmentHistory.value[index].governorate = '' // إعادة تعيين المحافظة عند تغيير البلد
}

const handleCityChange = (index, value) => {
  employmentHistory.value[index].city = value.value
  employmentHistory.value[index].governorate = '' // إعادة تعيين المحافظة عند تغيير المدينة
}

const handleGovernorateChange = (index, value) => {
  employmentHistory.value[index].governorate = value.value
}

const handleTypeOfEmployment = (index, value) => {
  employmentHistory.value[index].type_of_employment = value.value
}

// دوال التحقق
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

// دالة لإضافة سجل توظيف جديد
const addEmployment = () => {
  const newEmployment = {
    id: uuidv4(), // مُعرف فريد
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
    openSections.value[newEmployment.id] = true
  })
}

// دالة حفظ بيانات التوظيف
const saveEmployment = async (index) => {
  try {
    await store.saveStep3()
    toast.success(`Employment ${index + 1} has been saved successfully!`)
  } catch (error) {
    console.error(`Failed to save employment ${index + 1}:`, error)
    toast.error(`Failed to save employment ${index + 1}.`)
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>