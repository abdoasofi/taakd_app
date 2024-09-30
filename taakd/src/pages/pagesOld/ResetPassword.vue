<template>
  <div class="pt-3 container">
    <h3 class="text-lg font-medium mb-3 text-black">Employment History</h3>

  </div>
  <div class="space-y-2">
    <FieldsToggleContainer
      v-for="n in companies"
      :key="n"
      :title="Company"
    >
    <div class="lg:grid grid-cols-2 lg:gap-2">

      <FieldContainer>
        <StyledInput
          labelText="Company"
          :isMandatory="true"
          infoText="Company"
          inputType="text"
          :name="company"
          :id="company"
          :isValid="false"
          :validationMessage="'you can edit message'"
        />
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          labelText="Name of Your Employer"
          :isMandatory="true"
          infoText="Name of Your Employer"
          inputType="text"
          :name="name_of_your_employer"
          :id="name_of_your_employer"
          :isValid="false"
          :validationMessage="'you can edit message'"
        />
      </FieldContainer>

      <FieldContainer>
        <CheckBox name="continuous" id="continuous" @input-change="handleInput">
          Continuous
        </CheckBox>
      </FieldContainer>

      <FieldContainer>
            <Autocomp
              labelText="country"
              :isMandatory="true"
              infoText="country"
              inputType="text"
              name="country"
              id="country"
              :options="optionCountry"
              :isValid="false"
              :validationMessage="'you can edit message'"
            />
      </FieldContainer>
      <FieldContainer>
            <Autocomp
              labelText="city"
              :isMandatory="true"
              infoText="city"
              inputType="text"
              name="city"
              id="city"
              :isValid="false"
              :validationMessage="'you can edit message'"
            />
      </FieldContainer>
      <FieldContainer>
            <Autocomp
              labelText="governorate"
              :isMandatory="true"
              infoText="governorate"
              inputType="text"
              name="governorate"
              id="governorate"
              :isValid="false"
              :validationMessage="'you can edit message'"
            />
      </FieldContainer>

      <FieldContainer>
        <StyledInput 
          id="from_date" 
          name="from_date" 
          labelText="From" 
          isMandatory="true" 
          infoText="from_date" 
          inputType="date" 
          @input-change=""  />
      </FieldContainer>
      <FieldContainer>
        <StyledInput 
          id="to_date" 
          name="to_date" 
          labelText="From" 
          isMandatory="true" 
          infoText="to_date" 
          inputType="date" 
          @input-change=""  />
      </FieldContainer>

      <FieldContainer>
        <StyledInput
          labelText="Phone"
          :isMandatory="true"
          infoText="+999-77885951"
          inputType="text"
          :name="phone"
          :id="phone"
          :isValid="false"
          :validationMessage="'you can edit message'"
        />
      </FieldContainer>

      <FieldContainer>
        <Select 
          id="type_of_employment" 
          name="type_of_employment"  
          labelText="Type of Employment" 
          isMandatory="true" 
          infoText="Type of Employment"   
          :options="optionsTypeEmployment"
          @input-change="handleChange" 
          />
      </FieldContainer>

      <FieldContainer>
        <StyledInput
          labelText="Extension"
          :isMandatory="true"
          infoText="Extension"
          inputType="text"
          :name="ext"
          :id="ext"
          :isValid="false"
          :validationMessage="'you can edit message'"
        />
      </FieldContainer>      


      <FieldContainer>
        <CheckBox 
          name="do_we_have_permission_to_contact_this_current_employer" 
          id="do_we_have_permission_to_contact_this_current_employer" 
          @input-change="handleInput"
        >
          Do we have permission to contact this current employer?
        </CheckBox>
      </FieldContainer>
      <FieldContainer>
        <CheckBox 
          name="issuing_salary" 
          id="issuing_salary" 
          @input-change="handleInput"
        >
        Issuing Salary
        </CheckBox>
      </FieldContainer>  
      <FieldContainer>
        <CheckBox 
          name="activity_has_stopped" 
          id="activity_has_stopped" 
          @input-change="handleInput"
        >
        Activity Has Stopped
        </CheckBox>
      </FieldContainer>  
      <FieldContainer>
        <CheckBox 
          name="the_company_has_different_names" 
          id="the_company_has_different_names" 
          @input-change="handleInput"
        >
        The company has different names
        </CheckBox>
      </FieldContainer>      
      
      <FieldContainer>
        <StyledInput
          labelText="Different Company Names"
          :isMandatory="true"
          infoText="Different Company Names"
          inputType="text"
          :name="different_company_names"
          :id="different_company_names"
          :isValid="false"
          :validationMessage="'you can edit message'"
        />
      </FieldContainer>  

      <FieldContainer>
        <StyledInput
          labelText="Name of the Last Position You Held"
          :isMandatory="true"
          infoText="Name of the Last Position You Held"
          inputType="text"
          :name="name_of_the_last_position_you_held"
          :id="name_of_the_last_position_you_held"
          :isValid="false"
          :validationMessage="'you can edit message'"
        />
      </FieldContainer> 

      <FieldContainer>
        <CheckBox 
          name="you_have_a_nicknamecx" 
          id="you_have_a_nicknamecx" 
          @input-change="handleInput"
        >
        You have a nickname?
        </CheckBox>
      </FieldContainer> 

      <FieldContainer>
        <StyledInput
          labelText="Nickname"
          :isMandatory="true"
          infoText="Nickname"
          inputType="text"
          :name="name_of_the_last_position_you_held"
          :id="name_of_the_last_position_you_held"
          :isValid="false"
          :validationMessage="'you can edit message'"
        />
      </FieldContainer>         
      
    </div>  
      <FileUpload
        :name="`file-${n}`"
        :id="`file-${n}`"
        
      />
    </FieldsToggleContainer>
    <div class="flex justify-center py-3">
      <Button level="secondary" @clicked="addCompany">+ add employment history</Button>
    </div>
  </div>
</template>

<script setup>
import Button from '../../components/button.vue'
import CheckBox from '../../components/checkBox.vue'
import FieldContainer from '../../components/fieldContainer.vue'
import FieldsGroup from '../../components/fieldsGroup.vue'
import FieldsToggleContainer from '../../components/fieldsToggleContainer.vue'
import FileUpload from '../../components/fileUpload.vue'
import List from '../../components/list.vue'
import Select from '../../components/select.vue'
import StyledInput from '../../components/styledInput.vue'
import StyledtextArea from '../../components/styledtextArea.vue'
import SupportingText from '../../components/supportingText.vue'
import Toggle from '../../components/toggle.vue'
import Info from './components/info.vue'
// ==============
import { ref,computed,watch,reactive } from 'vue'
import { createDocumentResource } from 'frappe-ui'
import { useToast } from "vue-toastification"

import { location } from '../../data/useAddressLogic'
import Autocomp from '../../components/autocomp.vue'

const toast = useToast()

const optionsTypeEmployment = reactive([
	{ value: "Full-Time",
		label: "Full-Time" },
	{ value: "Part-Time",
		label: "Part-Time" },
	{ value: "Contract",
		label: "Contract" },
  { value: "Internship",
    label: "Internship" },
]);

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

const addEmployment = () => {
  const newEmployment = {
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
    Ext: '',
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

const saveRequest = async () => {
  try {
    await request.setValue.submit({
      employment_history: request.doc.employment_history,
    })
    toast.success('Request has been successfully saved!')
  } catch (error) {

  }
}

// ==============

// Data
const companies = ref(1)

// Props
const props = defineProps({
  stepData: {
    type: Object,
    required: true,
  },
})

// Methods
const handleInput = function (value) {
  props.stepData[value.name]['value'] = value.value
}
 
const addCompany = function () {
  companies.value++
}
</script>
