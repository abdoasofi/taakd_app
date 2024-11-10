<!-- src/pages/stepsSections/step4.vue -->
<template>
  <div class="pt-3 container">
    <h1 class="text-3xl font-bold mb-3 text-black">{{ $t('step4.additional_professional_qualifications') }}</h1>
    <ul>
      <li>{{ $t('step4.required_fields') }}</li>
      <li>{{ $t('step4.provide_additional_professional_qualifications') }}</li>
    </ul>
  </div>

  <div class="space-y-2 mt-3">
    <!-- Iterate Over Additional Professional Qualifications -->
    <FieldsToggleContainer
      v-for="(qualification, index) in additionalProfessionalQualifications"
      :key="qualification.id"
      :title="qualification.awarding_body || `${$t('step4.qualification')} ${index + 1}`"
    >
      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Awarding Body Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step4.awarding_body')"
            :isMandatory="true"
            :infoText="$t('step4.enter_awarding_body')"
            inputType="text"
            name="awarding_body"
            :id="`awarding_body-${qualification.id}`"
            v-model="qualification.awarding_body"
            :isValid="validateAwardingBody(qualification.awarding_body)"
            :validationMessage="$t('step4.required_awarding_body')"
          />
        </FieldContainer> 

        <!-- License or Certificate Number Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step4.license_or_certificate_number')"
            :isMandatory="true"
            :infoText="$t('step4.enter_license_or_certificate_number')"
            inputType="text"
            name="license_or_certificate_number"
            :id="`license_or_certificate_number-${qualification.id}`"
            v-model="qualification.license_or_certificate_number"
            :isValid="validateLicenseNumber(qualification.license_or_certificate_number)"
            :validationMessage="$t('step4.required_license_or_certificate_number')"
          />
        </FieldContainer> 
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Issuing Country Autocomplete -->
        <FieldContainer>
          <Autocomp
            :labelText="$t('step4.issuing_country')"
            :isMandatory="true"
            :infoText="$t('step4.select_issuing_country')"
            inputType="text"
            name="issuing_country"
            :id="`issuing_country-${qualification.id}`"
            :options="getOptionCountry(qualification)"
            v-model="qualification.issuing_country"
            @input-change="(value) => handleIssuingCountryChange(index, value)"
            :isValid="validateIssuingCountry(qualification.issuing_country)"
            :validationMessage="$t('step4.required_issuing_country')"
          />
        </FieldContainer>  
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Expiration Date Field -->
        <FieldContainer>
          <StyledInput 
            id="expiration_date" 
            name="expiration_date" 
            :labelText="$t('step4.expiration_date')" 
            :isMandatory="qualification.is_an_expiration_date" 
            :infoText="$t('step4.expiration_date_info')" 
            inputType="date" 
            v-model="qualification.expiration_date"
            :isValid="validateExpirationDate(qualification.expiration_date)" 
            :disabled="!qualification.is_an_expiration_date"
            :validationMessage="$t('step4.required_expiration_date')"
          />
        </FieldContainer>
        
        <!-- Date Awarded Field -->
        <FieldContainer>
          <StyledInput 
            id="date_awarded" 
            name="date_awarded" 
            :labelText="$t('step4.date_awarded')" 
            :isMandatory="true" 
            :infoText="$t('step4.date_awarded_info')" 
            inputType="date" 
            v-model="qualification.date_awarded" 
            :isValid="validateDateAwarded(qualification.date_awarded)"
            :validationMessage="$t('step4.required_date_awarded')"
          />
        </FieldContainer>
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Award Name/Description Field -->
        <FieldContainer>
          <StyledInput
            :labelText="$t('step4.award_name_description')"
            :isMandatory="true"
            :infoText="$t('step4.provide_award_name_description')"
            inputType="text"
            name="award_name_description"
            :id="`award_name_description-${qualification.id}`"
            v-model="qualification.award_name_description"
            :isValid="validateAwardNameDescription(qualification.award_name_description)"
            :validationMessage="$t('step4.required_award_name_description')"
          />
        </FieldContainer> 
      </div>

      <!-- Checkboxes -->
      <div class="lg:grid grid-rows-2 lg:gap-2">
        <!-- Is Expiration Date Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`is_an_expiration_date-${qualification.id}`" 
            :id="`is_an_expiration_date-${qualification.id}`" 
            v-model="qualification.is_an_expiration_date"
          >
            {{ $t('step4.does_this_qualification_have_an_expiration_date') }}
          </CheckBox>
        </FieldContainer>

        <!-- Your Name Varies Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`your_name_varies-${qualification.id}`" 
            :id="`your_name_varies-${qualification.id}`" 
            v-model="qualification.your_name_varies"
          >
            {{ $t('step4.does_your_name_vary') }}
          </CheckBox>
        </FieldContainer>      
      </div>

      <!-- Save Qualification Button -->
      <!-- <div class="flex justify-end py-2">
        <Button level="primary" @clicked="saveQualification(index)">Save</Button>
      </div> -->
    </FieldsToggleContainer>

    <!-- Add Qualification Button -->
    <div class="flex justify-center py-3">
      <Button level="secondary" @clicked="addQualification">+ {{ $t('step4.add_additional_professional_qualification') }}</Button>
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

// Import store
const store = useVerificationRequestStore()
const toast = useToast()

// Bind additional professional qualifications data with the store
const additionalProfessionalQualifications = computed({
  get: () => store.step4.professional_qualification,
  set: val => store.updateStep4('professional_qualification', val)
})

// Functions to get country options
const getOptionCountry = (qualification) => {
  const options = location.data
    .filter(loc => loc.location_type === 'Country')
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  // Add current value if not present
  if (qualification.issuing_country && !options.some(opt => opt.value === qualification.issuing_country)) {
    options.push({
      label: qualification.issuing_country,
      value: qualification.issuing_country
    })
  }

  return options
}

// Handle Issuing Country Change
const handleIssuingCountryChange = (index, value) => {
  additionalProfessionalQualifications.value[index].issuing_country = value.value
}

// Validation Functions
const validateAwardingBody = (awarding_body) => {
  return typeof awarding_body === 'string' && awarding_body.trim() !== ''
}

const validateLicenseNumber = (license_number) => {
  return typeof license_number === 'string' && license_number.trim() !== ''
}

const validateIssuingCountry = (issuing_country) => {
  return typeof issuing_country === 'string' && issuing_country.trim() !== ''
}

const validateDateAwarded = (date_awarded) => {
  return typeof date_awarded === 'string' && date_awarded.trim() !== ''
}

const validateExpirationDate = (expiration_date) => {
  return typeof expiration_date === 'string' && expiration_date.trim() !== ''
}

const validateAwardNameDescription = (award_name_description) => {
  return typeof award_name_description === 'string' && award_name_description.trim() !== ''
}

// Adding new professional qualification record
const addQualification = () => {
  const newQualification = {
    id: uuidv4(), // معرف فريد
    awarding_body: '',
    license_or_certificate_number: '',
    issuing_country: '',
    date_awarded: '',
    expiration_date: '',
    award_name_description: '',
    is_an_expiration_date: false,
    your_name_varies: false,
  }
  additionalProfessionalQualifications.value.push(newQualification)
  nextTick(() => {
    // Ackopen the new section if needed
  })
}

// Save qualification data
const saveQualification = async (index) => {
  try {
    await store.saveStep4()
    toast.success(`تم حفظ المؤهل المهني ${index + 1} بنجاح!`)
  } catch (error) {
    console.error(`فشل في حفظ المؤهل المهني ${index + 1}:`, error)
    toast.error(`فشل في حفظ المؤهل المهني ${index + 1}.`)
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>