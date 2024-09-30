<template>
  <div class="pt-3 container">
    <h3 class="text-lg font-medium mb-3 text-black">Employment History</h3>
  </div>
  
  <div class="space-y-2">
    <!-- Iterate Over Employment History -->
    <FieldsToggleContainer
      v-for="(employment, index) in request.doc.employment_history"
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
              validationMessage="You can edit the message."
            />
          </FieldContainer> 

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
      </div>
   
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

<script setup>
import { ref, computed, watch, reactive, nextTick } from 'vue'
import { createDocumentResource } from 'frappe-ui'
import { useToast } from 'vue-toastification'
import { v4 as uuidv4 } from 'uuid'

// Components
import Button from '../../components/button.vue'
import FieldContainer from '../../components/fieldContainer.vue'
import FieldsToggleContainer from '../../components/fieldsToggleContainer.vue'
import StyledInput from '../../components/styledInput.vue'
import Autocomp from '../../components/autocomp.vue'
import { location } from '../../data/useAddressLogic'

// Initialize Toast
const toast = useToast()

// Document Resource
const request = createDocumentResource({
  doctype: 'Verification Instructions Request',
  name: 'VIR-2024-26-09-000007',
})

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
// Handle Country Change for specific employment
const handleCountryChange = (index, value) => {
  const employment = request.doc.employment_history[index]
  employment.country = value.value
  employment.city = '' // Reset city when country changes
  employment.governorate = '' // Reset governorate when country changes
}

// Handle City Change for specific employment
const handleCityChange = (index, value) => {
  const employment = request.doc.employment_history[index]
  employment.city = value.value
  employment.governorate = '' // Reset governorate when city changes
}
 
// Handle Governorate Change for specific employment
const handleGovernorateChange = (index, value) => {
  const employment = request.doc.employment_history[index]
  employment.governorate = value.value
  // إذا كان هناك حقول تعتمد على المحافظات، يمكنك إعادة تعيينها هنا
}

// Initialize employment_history
// تهيئة employment_history والتأكد من تعيين جميع الحقول بشكل صحيح
watch(() => request.doc, (newDoc) => {
  if (newDoc) {
    if (!newDoc.employment_history) {
      // تهيئة employment_history كمصفوفة فارغة إذا لم تكن موجودة
      newDoc.employment_history = []
    } else {
      // التأكد من تهيئة جميع الحقول في الإدخالات الحالية
      newDoc.employment_history.forEach(employment => {
        employment.company = employment.company || ''
        employment.name_of_your_employer = employment.name_of_your_employer || ''
        employment.country = employment.country || ''
        employment.city = employment.city || ''
        employment.governorate = employment.governorate || ''
        
      })
    }
  }
}, { immediate: true })

// Fallback Initialization
if (!request.doc || !request.doc.employment_history) {
  if (request.doc) {
    request.doc.employment_history = []
  } else {
    // Handle the case where request.doc is initially null
    request.doc = {
      employment_history: []
    }
  }
}

// Add a new employment entry
const addEmployment = () => {
  const newEmployment = {
    id: uuidv4(), // Unique identifier
    company: '',
    name_of_your_employer: '',
    country: '',
    city: '',
    governorate: '',
  }
  request.doc.employment_history.push(newEmployment)
  nextTick(() => {
    openSections[newEmployment.id] = true
  })
}
// Save the entire request
const saveRequest = async () => {
  try {
    await request.setValue.submit(request.doc)
    toast.success('Request has been successfully saved!')
  } catch (error) {
    console.error('Failed to save the request:', error)
    toast.error('Failed to save the request.')
  }
}

// Save individual employment entry (optional, based on your backend setup)
const saveEmployment = async (index) => {
  try {
    // Implement logic to save only the specific employment entry if required
    // For example, you might need to send only the updated employment entry to the backend
    // This depends on how your backend API is designed
    await request.setValue.submit(request.doc)
    toast.success(`Employment ${index + 1} has been saved successfully!`)
  } catch (error) {
    console.error(`Failed to save employment ${index + 1}:`, error)
    toast.error(`Failed to save employment ${index + 1}.`)
  }
}

// Validation Functions
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
</script>

<style scoped>
/* Add any component-specific styles here */
</style>