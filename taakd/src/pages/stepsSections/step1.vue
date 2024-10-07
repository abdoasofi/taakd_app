<!-- المكون الفرعي: -->
<!-- stepsSections/step1.vue -->
<template>
  <div class="pt-3 container">
    <p>اسم المستند: {{ documentName }}</p>
    <h1 class="text-3xl  font-bold mb-3 text-black">Personal Information</h1>
    <ul>
      <li>
        All fields marked with an asterisk ( * ) are required.
      </li>
      <li>
        Providing your information as completely and accurately as possible will help speed up the completion of your Background Verification
      </li>
    </ul>

    <div class="lg:grid grid-rows-2 lg:gap-2">
      <h1 class="text-lg font-medium mb-1 mt-4 text-black">Name</h1>
      <Info
      text="Please provide your name exactly as it appears on your current government-issued identification document such as your Passport,
       Driver’s License or National Identification Document"
    />
    </div>
    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          labelText="Employer Name"
          :isMandatory="true"
          infoText="Employer Name"
          inputType="text"
          v-model="step1.employer_name.value"
          @input="handleInput('employer_name', step1.employer_name.value)"
          name="employer_name"
          id="EmployerName"
        />
        <SupportingText>Supporting text</SupportingText>
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          labelText="First Name"
          :isMandatory="true"
          infoText="First Name"
          inputType="text"
          v-model="step1.first_name.value"
          @input="handleInput('first_name', step1.first_name.value)"
          name="first_name"
          id="firstName"
    
        />
      </FieldContainer>
    </div>

    <FieldContainer>
      <CheckBox 
        name="certify" 
        id="certify" 
        :isValid="validationFields.middle_name?.isValid"
        :validationMessage="validationFields.middle_name?.validationMessage"
      >
        I certify that I do not have a Middle Name on my official identification document
      </CheckBox>
    </FieldContainer>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          labelText="Middle Name"
          inputType="text"
          name="middle_name"
          id="MiddleName"
          :isValid="validationFields.middle_name?.isValid"
          :validationMessage="validationFields.middle_name?.validationMessage"
        />
      </FieldContainer>
    </div>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          labelText="Last Name"
          :isMandatory="true"
          infoText="Last Name"
          inputType="text"
          v-model="step1.last_name.value"
          @input="handleInput('last_name', step1.last_name.value)"
          name="last_name"
          id="lastName"

        />
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          labelText="Suffix"
          :isMandatory="false"
          infoText="Suffix"
          inputType="text"
          name="suffix"
          id="Suffix"
          :isValid="validationFields.suffix?.isValid"
          :validationMessage="validationFields.suffix?.validationMessage"
        />
        <SupportingText>Supporting text</SupportingText>
      </FieldContainer>
    </div>
        <FieldContainer>
      <CheckBox 
        name="certify" 
        id="certify" 
        :isValid="validationFields.middle_name?.isValid"
        :validationMessage="validationFields.middle_name?.validationMessage"
      > 
      I certify this is my current legal name, exactly as it is displayed on my government-issued identification document *
      </CheckBox>
    </FieldContainer>
    <div class="lg:grid grid-ows-2 lg:gap-2">
          <h1 class="text-lg font-medium   text-black">Alias Name</h1>
          <Info
          text="Skip this section if you do not have any alias names.        
          Please provide:
              Any other names appearing on government-issued identity documents where that name differs from your primary identity document; or
              A prior legal name which can include your birth surname or any official change to a legal name and government identity documents were issued; or
              A name that you use in an “official” capacity which can include any name under which you hold a professional qualification or that you use(d) to apply for any credit or may be recorded in any employee file at a current or past employer."
        />    
        <Toggle>
      <FieldContainer>
        <StyledInput
          labelText="First Name"
          :isMandatory="true"
          infoText="First Name"
          inputType="text"
          v-model="step1.first_name.value"
          @input="handleInput('first_name', step1.first_name.value)"
          name="first_name"
          id="firstName"
    
        />
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          labelText="Middle Name"
          inputType="text"
          name="middle_name"
          id="MiddleName"
          :isValid="validationFields.middle_name?.isValid"
          :validationMessage="validationFields.middle_name?.validationMessage"
        />
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          labelText="Last Name"
          :isMandatory="true"
          infoText="Last Name"
          inputType="text"
          v-model="step1.last_name.value"
          @input="handleInput('last_name', step1.last_name.value)"
          name="last_name"
          id="lastName"

        />
      </FieldContainer>
        </Toggle>
    </div>
    <!-- <InfoRow label="Username" value="Instructions for Verifying Basic Information Instructions for Verifying Basic Information."/> -->
    <!-- <Info
      text="Instructions for Verifying Basic Information Instructions for Verifying Basic Information."
    /> -->
    <div class="lg:grid grid-ows-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          labelText="Email"
          :isMandatory="true"
          infoText="Please enter your email address"
          inputType="email"
          name="email"
          id="Email"
          @input-change="handleInput"
       
        />
      </FieldContainer>
          <Info
          text=" Taakd may occasionally need to contact you for clarification of items on your Background Verification. We will never share or sell your email address"
        />    

    </div> 
    <div class="lg:grid grid-ows-2 lg:gap-2">
          <h1 class="text-lg font-medium   text-black">Identification</h1>
          <Info
          text=" Most public records are stored using your name and birth date, so providing this information allows us to accurately search these sources"
        />    

    </div> 
  <div class="lg:grid grid-cols-2 lg:gap-2">
        <!-- From Date -->
        <FieldContainer>
          <StyledInput 
            id="from_date" 
            name="from_date" 
            labelText="From Date" 
            infoText="Start date of your education." 
            inputType="date" 
          />
        </FieldContainer>

        <!-- To Date -->
        <FieldContainer>
          <StyledInput 
            id="to_date" 
            name="to_date" 
            labelText="To Date" 
            infoText="End date of your education." 
            inputType="date" 
            validationMessage="To Date is required."
          />
        </FieldContainer>
      </div>
  </div>

</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import CheckBox from '../../components/checkBox.vue';
import FieldContainer from '../../components/fieldContainer.vue';
import StyledInput from '../../components/styledInput.vue';
import SupportingText from '../../components/supportingText.vue';
import { Step1Data, ValidationResult } from '../../data/types';
import InfoRow from '../../components/InfoRow.vue';
import Toggle from "../../components/toggle.vue";
import FieldsGroup from "../../components/fieldsGroup.vue";
import Info from './components/info.vue';


const store = useVerificationRequestStore();

// بيانات الخطوة 1 من المتجر
const step1 = computed({
  get: () => store.step1,
  set: (val: Partial<Step1Data>) => store.updateStep('step1', val),
});

// حالة checkbox
// const certify = computed({
//   get: () => store.step1.middle_name.value === '',
//   set: (value: boolean) => {
//     if (value) {
//       store.updateStep('step1', { middle_name: { value: '', isValid: true, validationMessage: '' } });
//     }
//   },
// });

// الحصول على نتائج التحقق من صحة الخطوة من المتجر
const currentValidation = computed(() => {
  return store.validations[0]?.validation || {};
});

// تحويل نتائج التحقق إلى خصائص مفصلة
const validationFields = computed(() => {
  const result: { [key: string]: { isValid: boolean; validationMessage?: string } } = {};
  Object.entries(currentValidation.value).forEach(([key, value]) => {
    result[key] = {
      isValid: value.isValid,
      validationMessage: value.validationMessage || '',
    };
  });
  return result;
});

// دالة تحديث بيانات الخطوة الحالية
const handleInput = (field: keyof Step1Data, value: any) => {
  store.updateStep('step1', { [field]: { value, isValid: true, validationMessage: '' } });
};

// دالة التعامل مع تغيير checkbox
// const handleCheckboxChange = () => {
//   if (certify.value) {
//     store.updateStep('step1', { middle_name: { value: '', isValid: true, validationMessage: '' } });
//   }
// };

const documentName = computed(() => store.documentName);
watch(documentName, (newVal, oldVal) => {
  console.log(`documentName تغير من "${oldVal}" إلى "${newVal}"`);
});
</script>

<style scoped>
/* أضف تنسيقات إضافية إذا لزم الأمر */
</style>