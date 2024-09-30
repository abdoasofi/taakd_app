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
      </div>

   

        <FieldContainer>
          <CheckBox 
            :name="`permission-${employment.id}`" 
            :id="`permission-${employment.id}`" 
            v-model="employment.contact_the_employer"
          >
          Do we have permission to contact this current employer?
          </CheckBox>
        </FieldContainer>

        
        <FieldContainer>
          <CheckBox 
            :name="`permission-${employment.id}`" 
            :id="`permission-${employment.id}`" 
            v-model="employment.issuing_salary"
          >
          Does this employer issue your paycheck? 

          </CheckBox>
        </FieldContainer>

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
      <!-- ******** Ende Company Location ******** -->
      <div class="lg:grid grid-cols-2 lg:gap-2">
      <!-- Permission Checkbox -->
      <FieldContainer>
          <CheckBox 
            :name="`permission-${employment.id}`" 
            :id="`permission-${employment.id}`" 
            v-model="employment.continuous"
          >
          Continuous
          </CheckBox>
        </FieldContainer>   
              
        
        <!-- Activity Has Stopped Checkbox -->
      <FieldContainer>
          <CheckBox 
            :name="`permission-${employment.id}`" 
            :id="`permission-${employment.id}`" 
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
              isMandatory="true" 
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
              isMandatory="true" 
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
              validationMessage="You can edit the message."
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
          <!-- Last Position Held -->
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
              validationMessage="You can edit the message."
            />
          </FieldContainer> 

          <!-- Type of Employment Select -->
          <FieldContainer>
          <Autocomp
            labelText="Type of Employment"
            :isMandatory="true"
            infoText="Type of Employment"
            inputType="text"
            name="type_of_employment"
            :id="`type_of_employment-${employment.id}`"
            :options="optionsTypeEmployment"
            v-model="employment.type_of_employment"
            @input-change="(value) => handleTypeOfEmployment(index, value)"
            :isValid="validateCountry(employment.type_of_employment)"
            validationMessage="Type of Employment is required."
          />
        </FieldContainer>  
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
      <!-- The Company has Different Names Checkbox -->
      <FieldContainer>
          <CheckBox 
            :name="`permission-${employment.id}`" 
            :id="`permission-${employment.id}`" 
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

        <!-- Different Company Names Field -->
        <FieldContainer >
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
          <FieldContainer >
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
          v-model="employment.file"
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
import CheckBox from '../../components/checkBox.vue'
import Select from '../../components/select.vue'
import FileUpload from '../../components/fileUpload.vue'

// Initialize Toast
const toast = useToast()

// Document Resource
const request = createDocumentResource({
  doctype: 'Verification Instructions Request',
  name: 'VIR-2024-26-09-000007',
  // auto: true,
})

 // Employment Type Options
  const optionsTypeEmployment = reactive([
    { value: "Full-Time", label: "Full-Time" },
    { value: "Part-Time", label: "Part-Time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
  ])
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

// Handle Country Change for specific employment
const handleTypeOfEmployment = (index, value) => {
  const employment = request.doc.employment_history[index]
  employment.type_of_employment = value.value
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
        employment.contact_the_employer = employment.contact_the_employer || ''
        employment.issuing_salary = employment.issuing_salary || ''
        employment.name_of_your_employer = employment.name_of_your_employer || ''
        employment.country = employment.country || ''
        employment.city = employment.city || ''
        employment.governorate = employment.governorate || ''
        employment.location_text = employment.location_text || ''
        employment.continuous = employment.continuous || ''
        employment.activity_has_stopped = employment.activity_has_stopped || ''
        employment.from_date = employment.from_date || ''
        employment.end_date = employment.end_date || ''
        employment.phone = employment.phone || ''
        employment.ext = employment.ext || ''
        employment.official_job_title_held_currently = employment.official_job_title_held_currently || ''
        // employment.type_of_employment = employment.type_of_employment || ''
        employment.the_company_has_different_names = employment.the_company_has_different_names || ''
        employment.different_company_names = employment.different_company_names || ''
        employment.you_have_a_nicknamecx = employment.you_have_a_nicknamecx || ''
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
    contact_the_employer: '',
    issuing_salary: '',
    name_of_your_employer: '',
    country: '',
    city: '',
    governorate: '',
    location_text: '',
    continuous: '',
    activity_has_stopped: '',
    from_date: '',
    end_date: '',
    phone: '',
    ext: '',
    official_job_title_held_currently: '',
    // type_of_employment: '',
    the_company_has_different_names: '',
    different_company_names: '',
    you_have_a_nicknamecx: '',
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

const validateFromDate = (from_date) => {
  return typeof from_date === 'string' && from_date.trim() !== ''
}

const validateEndDate = (end_date) => {
  return typeof end_date === 'string' && end_date.trim() !== ''
}

const validatePhone = (phone) => {
  return typeof phone === 'string' && phone.trim() !== ''
}

// const validateTypeOfEmployment= (type_of_employment) => {
//   return typeof type_of_employment === 'string' && type_of_employment.trim() !== ''
// }

const validateOfficialJobTitleHeldCurrently= (official_job_title_held_currently) => {
  return typeof official_job_title_held_currently === 'string' && official_job_title_held_currently.trim() !== ''
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>