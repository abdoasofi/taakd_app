
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
              :isValid="false"
              validationMessage="You can edit the message."
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
              :isValid="false"
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
              :options="optionCountry"
              v-model="employment.country"
              @input-change="handleCountryChange(index)"
              :isValid="false"
              validationMessage="You can edit the message."
            />
          </FieldContainer>        
      </div>
        <div class="lg:grid grid-cols-2 lg:gap-2">
          
  
  
  
          <!-- Continuous Checkbox -->
          <!-- <FieldContainer>
            <CheckBox
              :name="`continuous-${employment.id}`"
              :id="`continuous-${employment.id}`"
              v-model="employment.continuous"
            >
              Continuous
            </CheckBox>
          </FieldContainer> -->
  
  
  
          <!-- City Autocomplete -->
          <!-- <FieldContainer>
            <Autocomp
              labelText="City"
              :isMandatory="true"
              infoText="City"
              inputType="text"
              name="city"
              :id="`city-${employment.id}`"
              :options="getOptionCity(employment.country)"
              v-model="employment.city"
              @input-change="handleCityChange(index)"
              :isValid="false"
              validationMessage="You can edit the message."
            />
          </FieldContainer> -->
  
          <!-- Governorate Autocomplete -->
          <!-- <FieldContainer>
            <Autocomp
              labelText="Governorate"
              :isMandatory="true"
              infoText="Governorate"
              inputType="text"
              name="governorate"
              :id="`governorate-${employment.id}`"
              :options="getOptionGovernorate(employment.city)"
              v-model="employment.governorate"
              :isValid="false"
              validationMessage="You can edit the message."
            />
          </FieldContainer> -->
  
          <!-- From Date -->
          <!-- <FieldContainer>
            <StyledInput 
              id="from_date" 
              name="from_date" 
              labelText="From" 
              isMandatory="true" 
              infoText="From Date" 
              inputType="date" 
              v-model="employment.from_date" 
            />
          </FieldContainer> -->
  
          <!-- To Date -->
          <!-- <FieldContainer>
            <StyledInput 
              id="to_date" 
              name="to_date" 
              labelText="To" 
              isMandatory="true" 
              infoText="To Date" 
              inputType="date" 
              v-model="employment.to_date" 
            />
          </FieldContainer> -->
  
          <!-- Phone Field -->
          <!-- <FieldContainer>
            <StyledInput
              labelText="Phone"
              :isMandatory="true"
              infoText="+999-77885951"
              inputType="text"
              name="phone"
              :id="`phone-${employment.id}`"
              v-model="employment.phone"
              :isValid="false"
              validationMessage="You can edit the message."
            />
          </FieldContainer> -->
  
          <!-- Type of Employment Select -->
          <!-- <FieldContainer>
            <Select 
              id="type_of_employment" 
              name="type_of_employment"  
              labelText="Type of Employment" 
              isMandatory="true" 
              infoText="Type of Employment"   
              :options="optionsTypeEmployment"
              v-model="employment.type_of_employment"
              @input-change="handleInput(employment.id, 'type_of_employment', $event)"
            />
          </FieldContainer> -->
  
          <!-- Extension Field -->
          <!-- <FieldContainer>
            <StyledInput
              labelText="Extension"
              :isMandatory="true"
              infoText="Extension"
              inputType="text"
              name="ext"
              :id="`ext-${employment.id}`"
              v-model="employment.ext"
              :isValid="false"
              validationMessage="You can edit the message."
            />
          </FieldContainer>       -->
  
          <!-- Permission Checkbox -->
          <!-- <FieldContainer>
            <CheckBox 
              :name="`permission-${employment.id}`" 
              :id="`permission-${employment.id}`" 
              v-model="employment.do_we_have_permission_to_contact_this_current_employer"
            >
              Do we have permission to contact this current employer?
            </CheckBox>
          </FieldContainer> -->
  
          <!-- Issuing Salary Checkbox -->
          <!-- <FieldContainer>
            <CheckBox 
              :name="`issuing_salary-${employment.id}`" 
              :id="`issuing_salary-${employment.id}`" 
              v-model="employment.issuing_salary"
            >
              Issuing Salary
            </CheckBox>
          </FieldContainer>   -->
  
          <!-- Activity Stopped Checkbox -->
          <!-- <FieldContainer>
            <CheckBox 
              :name="`activity_stopped-${employment.id}`" 
              :id="`activity_stopped-${employment.id}`" 
              v-model="employment.activity_has_stopped"
            >
              Activity Has Stopped
            </CheckBox>
          </FieldContainer>   -->
  
          <!-- Different Company Names Checkbox -->
          <!-- <FieldContainer>
            <CheckBox 
              :name="`different_names-${employment.id}`" 
              :id="`different_names-${employment.id}`" 
              v-model="employment.the_company_has_different_names"
            >
              The company has different names
            </CheckBox>
          </FieldContainer>       -->
  
          <!-- Different Company Names Field -->
          <!-- <FieldContainer>
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
          </FieldContainer>   -->
  
          <!-- Last Position Held -->
          <!-- <FieldContainer>
            <StyledInput
              labelText="Name of the Last Position You Held"
              :isMandatory="true"
              infoText="Name of the Last Position You Held"
              inputType="text"
              name="name_of_the_last_position_you_held"
              :id="`name_of_the_last_position_you_held-${employment.id}`"
              v-model="employment.name_of_the_last_position_you_held"
              :isValid="false"
              validationMessage="You can edit the message."
            />
          </FieldContainer>  -->
  
          <!-- Nickname Checkbox -->
          <!-- <FieldContainer>
            <CheckBox 
              :name="`nickname_checkbox-${employment.id}`" 
              :id="`nickname_checkbox-${employment.id}`" 
              v-model="employment.you_have_a_nicknamecx"
            >
              You have a nickname?
            </CheckBox>
          </FieldContainer>  -->
  
          <!-- Nickname Field -->
          <!-- <FieldContainer v-if="employment.you_have_a_nicknamecx">
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
          </FieldContainer>          -->
          
        </div>  
  
        <!-- File Upload -->
        <!-- <FileUpload
          :name="`file-${employment.id}`"
          :id="`file-${employment.id}`"
          v-model="employment.file"
        /> -->
        
        <!-- Remove Employment Button -->
        <div class="flex justify-end py-2">
          <Button level="danger" @clicked="saveRequest">Add</Button>
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
  
  // Component Imports
  import Button from '../../components/button.vue'
  import CheckBox from '../../components/checkBox.vue'
  import FieldContainer from '../../components/fieldContainer.vue'
  import FieldsToggleContainer from '../../components/fieldsToggleContainer.vue'
  import FileUpload from '../../components/fileUpload.vue'
  import Select from '../../components/select.vue'
  import StyledInput from '../../components/styledInput.vue'
  import Autocomp from '../../components/autocomp.vue'
  import { location } from '../../data/useAddressLogic'
  
  
  // Import the useAddressLogic composable
  
  // Initialize the composable
  
  // Reactive Toast
  const toast = useToast()
  
  // Employment Type Options
  // const optionsTypeEmployment = reactive([
  //   { value: "Full-Time", label: "Full-Time" },
  //   { value: "Part-Time", label: "Part-Time" },
  //   { value: "Contract", label: "Contract" },
  //   { value: "Internship", label: "Internship" },
  // ])
  
  // Document Resource
  const request = createDocumentResource({
    doctype: 'Verification Instructions Request',
    name: 'VIR-2024-26-09-000007',
  })
  
  // Country Options
  
  const optionCountry = computed(() => {
    if (!location.data) {
      console.warn('Location data is not yet available.')
      return []
    }
    return location.data
      .filter(loc => loc.location_type === 'Country')
      .map(loc => ({ label: loc.location_name, value: loc.location_name }))
  })
  
  const handleCountryChange = (index) => {
    // Logic to handle country change (if needed)
  }
  
  // City Options Based on Country
  
  // const getOptionCity = (country) => {
  //   if (!country || !location.data) return []
  //   return location.data
  //     .filter(loc => loc.location_type === 'City' && loc.parent_location === country)
  //     .map(loc => ({ label: loc.location_name, value: loc.location_name }))
  // }
  
  // Governorate Options Based on City
  
  // const getOptionGovernorate = (city) => {
  //   if (!city || !location.data) return []
  //   return location.data
  //     .filter(loc => loc.location_type === 'Governorate' && loc.parent_location === city)
  //     .map(loc => ({ label: loc.location_name, value: loc.location_name }))
  // }
  
  // Initialize employment_history
  watch(() => request.doc, (newDoc) => {
    if (newDoc) {
      if (!newDoc.employment_history) {
        // Initialize employment_history as an empty array if it doesn't exist
        newDoc.employment_history = []
      }
    }
  }, { immediate: true })
  
  // Alternatively, initialize employment_history during component setup
  if (!request.doc || !request.doc.employment_history) {
    if (request.doc) {
      request.doc.employment_history = []
    } else {
      // Handle the case where request.doc is initially null
      // Depending on how createDocumentResource works, you might need to adjust this
      request.doc = {
        employment_history: []
      }
    }
  }
  
  // Section Management
  const openSections = reactive({})
  
  // const toggleSection = (id) => {
  //   openSections[id] = !openSections[id]
  // }
  
  // const isOpen = (id) => openSections[id]
  
  // Add Employment Entry
  const addEmployment = () => {
    const newEmployment = {
      id: uuidv4(), // Unique identifier
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
      nickname: '',
      file: null, // Assuming file upload
    }
    request.doc.employment_history.push(newEmployment)
    nextTick(() => {
      openSections[newEmployment.id] = true
    })
  }
  
  // Remove Employment Entry
  
  // const confirmRemove = (id) => {
  //   if (confirm('Are you sure you want to delete this employment record?')) {
  //     removeEmployment(id)
  //   }
  // }
  
  // const removeEmployment = (id) => {
  //   const index = request.doc.employment_history.findIndex(emp => emp.id === id)
  //   if (index !== -1) {
  //     request.doc.employment_history.splice(index, 1)
  //     delete openSections[id]
  //   }
  // }
  
  // Save Request
  
  const saveRequest = async () => {
    try {
      await request.setValue.submit({
        employment_history: request.doc.employment_history,
      })
      toast.success('Request has been successfully saved!')
    } catch (error) {
      console.error('Failed to save the request:', error)
      toast.error('Failed to save the request.')
    }
  }
  
  // Handle Input Changes
  
  // const handleInput = (employmentId, fieldName, value) => {
  //   const employment = request.doc.employment_history.find(emp => emp.id === employmentId)
  //   if (employment) {
  //     employment[fieldName] = value
  //   } else {
  //     console.warn(`Employment with id ${employmentId} not found.`)
  //   }
  // }
  
  
  // const handleCityChange = (index) => {
  //   // Logic to handle city change (if needed)
  // }
  
  // Validation Logic (Example)
  
  // const validateInput = (employment, field) => {
  //   // Simple example: Check if mandatory fields are filled
  //   const mandatoryFields = ['company', 'name_of_your_employer', 'country', 'city', 'governorate', 'from_date', 'to_date', 'phone', 'ext', 'name_of_the_last_position_you_held']
    
  //   if (mandatoryFields.includes(field)) {
  //     return employment[field] !== ''
  //   }
  //   return true // Optional fields are always valid
  // }
  
  // const getValidationMessage = (employment, field) => {
  //   const mandatoryFields = ['company', 'name_of_your_employer', 'country', 'city', 'governorate', 'from_date', 'to_date', 'phone', 'ext', 'name_of_the_last_position_you_held']
    
  //   if (mandatoryFields.includes(field) && employment[field] === '') {
  //     // Format field name to be more readable
  //     const formattedField = field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
  //     return `${formattedField} is required.`
  //   }
  //   return ''
  // }
  </script>
  