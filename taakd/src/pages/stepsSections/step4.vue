<template>
  <div class="pt-3 container">
    <h3 class="text-lg font-medium mb-3 text-black">Professional Qualifications</h3>
  </div>
  
  <div class="space-y-2">
    <!-- Iterate Over Professional Qualifications -->
    <FieldsToggleContainer
      v-for="(qualification, index) in request.doc.professional_qualification"
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

        <!-- Date Awarded Field -->
        <FieldContainer>
          <StyledInput 
            id="date_awarded" 
            name="date_awarded" 
            labelText="Date Awarded" 
            isMandatory="true" 
            infoText="Date when the qualification was awarded." 
            inputType="date" 
            v-model="qualification.date_awarded" 
            :isValid="validateDateAwarded(qualification.date_awarded)"
          />
        </FieldContainer>

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
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- Award Name/Description Field -->
        <FieldContainer>
          <StyledInput
            labelText="Award Name/Description"
            :isMandatory="true"
            infoText="Provide the name or description of the award."
            inputType="text"
            name="award_name_description"
            :id="`award_name_description-${qualification.id}`"
            v-model="qualification.award_name_description"
            :isValid="validateAwardNameDescription(qualification.award_name_description)"
            validationMessage="Award Name/Description is required."
          />
        </FieldContainer> 

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
      </div>

      <div class="lg:grid grid-cols-2 lg:gap-2">
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
      <Button level="secondary" @clicked="addQualification">+ Add Professional Qualification</Button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, reactive, nextTick } from 'vue'
import { createDocumentResource } from 'frappe-ui'
import { useToast } from 'vue-toastification'
import { v4 as uuidv4 } from 'uuid'

// المكونات
import Button from '../../components/button.vue'
import FieldContainer from '../../components/fieldContainer.vue'
import FieldsToggleContainer from '../../components/fieldsToggleContainer.vue'
import StyledInput from '../../components/styledInput.vue'
import Autocomp from '../../components/autocomp.vue'
import CheckBox from '../../components/checkBox.vue'

// تهيئة Toast
const toast = useToast()

// مورد المستند
const request = createDocumentResource({
  doctype: 'Verification Instructions Request',
  name: 'VIR-2024-26-09-000007', // يمكنك تغيير الاسم حسب الحاجة
  // auto: true,
})

// الحصول على خيارات الدولة (يمكنك استخدام نفس البيانات المستخدمة في الكمبوننتات السابقة)
import { location } from '../../data/useAddressLogic'

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
  const qualification = request.doc.professional_qualification[index]
  qualification.issuing_country = value.value
  // إذا كان هناك حقول تعتمد على البلد، يمكنك إعادة تعيينها هنا إذا لزم الأمر
}

// تهيئة professional_qualification
watch(() => request.doc, (newDoc) => {
  if (newDoc) {
    if (!newDoc.professional_qualification) {
      // تهيئة professional_qualification كمصفوفة فارغة إذا لم تكن موجودة
      newDoc.professional_qualification = []
    } else {
      // التأكد من تهيئة جميع الحقول في الإدخالات الحالية
      newDoc.professional_qualification.forEach(qualification => {
        qualification.awarding_body = qualification.awarding_body || ''
        qualification.license_or_certificate_number = qualification.license_or_certificate_number || ''
        qualification.issuing_country = qualification.issuing_country || ''
        qualification.date_awarded = qualification.date_awarded || ''
        qualification.expiration_date = qualification.expiration_date || ''
        qualification.award_name_description = qualification.award_name_description || ''
        qualification.is_an_expiration_date = qualification.is_an_expiration_date || false
        qualification.your_name_varies = qualification.your_name_varies || false
      })
    }
  }
}, { immediate: true })

// تهيئة افتراضية
if (!request.doc || !request.doc.professional_qualification) {
  if (request.doc) {
    request.doc.professional_qualification = []
  } else {
    // التعامل مع الحالة التي يكون فيها request.doc في البداية null
    request.doc = {
      professional_qualification: []
    }
  }
}

// إضافة مؤهل مهني جديد
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
  request.doc.professional_qualification.push(newQualification)
  nextTick(() => {
    // إذا كنت تستخدم مكون FieldsToggleContainer مع إمكانية فتح الأقسام، يمكنك فتح القسم الجديد هنا
    // مثال: openSections[newQualification.id] = true
  })
}

// حفظ الطلب بالكامل
const saveRequest = async () => {
  try {
    await request.setValue.submit(request.doc)
    toast.success('تم حفظ الطلب بنجاح!')
  } catch (error) {
    console.error('فشل في حفظ الطلب:', error)
    toast.error('فشل في حفظ الطلب.')
  }
}

// حفظ مؤهل مهني فردي
const saveQualification = async (index) => {
  try {
    // يمكنك تعديل هذا الجزء لحفظ السجل التعليمي الفردي حسب إعدادات الـ Backend الخاص بك
    await request.setValue.submit(request.doc)
    toast.success(`تم حفظ المؤهل المهني ${index + 1} بنجاح!`)
  } catch (error) {
    console.error(`فشل في حفظ المؤهل المهني ${index + 1}:`, error)
    toast.error(`فشل في حفظ المؤهل المهني ${index + 1}.`)
  }
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
  if (request.doc.professional_qualification.some(q => q.is_an_expiration_date && (typeof q.expiration_date !== 'string' || q.expiration_date.trim() === ''))) {
    return false
  }
  return true
}

const validateAwardNameDescription = (award_name_description) => {
  return typeof award_name_description === 'string' && award_name_description.trim() !== ''
}
</script>
