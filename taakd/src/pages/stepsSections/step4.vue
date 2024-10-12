<!-- src/pages/stepsSections/step4.vue -->
<template>
  <div class="pt-3 container">
    <h1 class="text-3xl font-bold mb-3 text-black">Additional Professional Qualifications</h1>
    <ul>
      <li>
        All fields marked with an asterisk ( * ) are required.
      </li>
      <li>
        Please provide any additional professional qualifications or certifications.
      </li>
    </ul>
  </div>

  <div class="space-y-2 mt-3">
    <!-- Iterate Over Additional Professional Qualifications -->
    <FieldsToggleContainer
      v-for="(qualification, index) in additionalProfessionalQualifications"
      :key="qualification.id"
      :title="qualification.awarding_body || `Qualification ${index + 1}`"
    >
      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Awarding Body Field -->
        <FieldContainer>
          <StyledInput
            labelText="Awarding Body"
            :isMandatory="true"
            infoText="Enter the name of the awarding body."
            inputType="text"
            name="awarding_body"
            :id="`awarding_body-${qualification.id}`"
            v-model="qualification.awarding_body"
            :isValid="validateAwardingBody(qualification.awarding_body)"
            validationMessage="Awarding Body is required."
          />
        </FieldContainer> 

        <!-- License or Certificate Number Field -->
        <FieldContainer>
          <StyledInput
            labelText="License or Certificate Number"
            :isMandatory="true"
            infoText="Enter your license or certificate number."
            inputType="text"
            name="license_or_certificate_number"
            :id="`license_or_certificate_number-${qualification.id}`"
            v-model="qualification.license_or_certificate_number"
            :isValid="validateLicenseNumber(qualification.license_or_certificate_number)"
            validationMessage="License or Certificate Number is required."
          />
        </FieldContainer> 
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Issuing Country Autocomplete -->
        <FieldContainer>
          <Autocomp
            labelText="Issuing Country"
            :isMandatory="true"
            infoText="Select the country where the qualification was issued."
            inputType="text"
            name="issuing_country"
            :id="`issuing_country-${qualification.id}`"
            :options="getOptionCountry(qualification)"
            v-model="qualification.issuing_country"
            @input-change="(value) => handleIssuingCountryChange(index, value)"
            :isValid="validateIssuingCountry(qualification.issuing_country)"
            validationMessage="Issuing Country is required."
          />
        </FieldContainer>  
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Expiration Date Field -->
        <FieldContainer>
          <StyledInput 
            id="expiration_date" 
            name="expiration_date" 
            labelText="Expiration Date" 
            :isMandatory="qualification.is_an_expiration_date" 
            infoText="Expiration date of the qualification (if applicable)." 
            inputType="date" 
            v-model="qualification.expiration_date"
            :isValid="validateExpirationDate(qualification.expiration_date)" 
            :disabled="!qualification.is_an_expiration_date"
            validationMessage="Expiration Date is required."
          />
        </FieldContainer>
        
        <!-- Date Awarded Field -->
        <FieldContainer>
          <StyledInput 
            id="date_awarded" 
            name="date_awarded" 
            labelText="Date Awarded" 
            :isMandatory="true" 
            infoText="Date when the qualification was awarded." 
            inputType="date" 
            v-model="qualification.date_awarded" 
            :isValid="validateDateAwarded(qualification.date_awarded)"
          />
        </FieldContainer>
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Award Name/Description Field -->
        <FieldContainer>
          <StyledInput
            labelText="Award Name/Description"
            :isMandatory="true"
            infoText="Provide the name or description of the award."
            inputType="date"
            name="award_name_description"
            :id="`award_name_description-${qualification.id}`"
            v-model="qualification.award_name_description"
            :isValid="validateAwardNameDescription(qualification.award_name_description)"
            validationMessage="Award Name/Description is required."
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
            Does this qualification have an expiration date?
          </CheckBox>
        </FieldContainer>

        <!-- Your Name Varies Checkbox -->
        <FieldContainer>
          <CheckBox 
            :name="`your_name_varies-${qualification.id}`" 
            :id="`your_name_varies-${qualification.id}`" 
            v-model="qualification.your_name_varies"
          >
            Does your name vary in this qualification?
          </CheckBox>
        </FieldContainer>        
      </div>

      <!-- Save Qualification Button -->
      <div class="flex justify-end py-2">
        <Button level="primary" @clicked="saveQualification(index)">Save</Button>
      </div>
    </FieldsToggleContainer>

    <!-- Add Qualification Button -->
    <div class="flex justify-center py-3">
      <Button level="secondary" @clicked="addQualification">+ Add Additional Professional Qualification</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive, nextTick } from 'vue'
import { useVerificationRequestStore } from '../../stores/verificationRequest'
import { useToast } from 'vue-toastification'
import { v4 as uuidv4 } from 'uuid'

// المكونات
import Button from '../../components/button.vue'
import FieldContainer from '../../components/fieldContainer.vue'
import FieldsToggleContainer from '../../components/fieldsToggleContainer.vue'
import StyledInput from '../../components/styledInput.vue'
import Autocomp from '../../components/autocomp.vue'
import CheckBox from '../../components/checkBox.vue'

// استيراد البيانات (البلديات والمحافظات)
import { location } from '../../data/useAddressLogic'

// استيراد الستور
const store = useVerificationRequestStore()
const toast = useToast()

// ربط بيانات المؤهلات المهنية الإضافية مع المخزن
const additionalProfessionalQualifications = computed({
  get: () => store.step4.professional_qualification,
  set: (val) => store.updateStep4('professional_qualification', val)
})

// الحصول على خيارات الدولة
const getOptionCountry = (qualification) => {
  const options = location.data
    .filter(loc => loc.location_type === 'Country')
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))

  // إضافة القيمة الحالية إذا لم تكن موجودة في الخيارات
  if (qualification.issuing_country && !options.some(opt => opt.value === qualification.issuing_country)) {
    options.push({
      label: qualification.issuing_country,
      value: qualification.issuing_country
    })
  }

  return options
}

// التعامل مع تغيير Issuing Country
const handleIssuingCountryChange = (index, value) => {
  additionalProfessionalQualifications.value[index].issuing_country = value.value
  // إذا كان هناك حقول تعتمد على البلد، يمكنك إعادة تعيينها هنا إذا لزم الأمر
}

// دوال التحقق من الصحة
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

// دالة لإضافة مؤهل مهني إضافي جديد
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
    // إذا كنت تستخدم مكون FieldsToggleContainer مع إمكانية فتح الأقسام، يمكنك فتح القسم الجديد هنا
    // مثال: openSections[newQualification.id] = true
  })
}

// دالة حفظ المؤهل المهني الفردي
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
/* أضف أي تنسيقات خاصة بالمكون هنا */
</style>