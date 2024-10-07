<!-- المكون الفرعي: -->
<!-- stepsSections/step1.vue -->
<template>
  <div class="pt-3 container">
    <h3 class="text-lg font-medium mb-3 text-black">1. Basic Information</h3>
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

    <!-- <FieldContainer>
      <CheckBox 
        name="certify" 
        id="certify" 
        v-model="certify"
        @change="handleCheckboxChange"
        :isValid="validationFields.middle_name?.isValid"
        :validationMessage="validationFields.middle_name?.validationMessage"
      >
        I certify that I do not have a Middle Name on my official identification document
      </CheckBox>
    </FieldContainer> -->

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <!-- <FieldContainer>
        <StyledInput
          labelText="Middle Name"
          :isMandatory="!certify"
          inputType="text"
          v-model="step1.middle_name.value"
          @input="handleInput('middle_name', step1.middle_name.value)"
          name="middle_name"
          id="MiddleName"
          :isValid="validationFields.middle_name?.isValid"
          :validationMessage="validationFields.middle_name?.validationMessage"
          :disabled="certify"
        />
      </FieldContainer> -->
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
      <!-- <FieldContainer>
        <StyledInput
          labelText="Suffix"
          :isMandatory="false"
          infoText="Suffix"
          inputType="text"
          v-model="step1.suffix.value"
          @input="handleInput('suffix', step1.suffix.value)"
          name="suffix"
          id="Suffix"
          :isValid="validationFields.suffix?.isValid"
          :validationMessage="validationFields.suffix?.validationMessage"
        />
        <SupportingText>Supporting text</SupportingText>
      </FieldContainer> -->
    </div>

    <!-- <FieldContainer>
      <StyledInput
        labelText="Alias Name"
        :isMandatory="false"
        infoText="Alias Name"
        inputType="text"
        v-model="step1.alias_name.value"
        @input="handleInput('alias_name', step1.alias_name.value)"
        name="alias_name"
        id="AliasName"
        :isValid="validationFields.alias_name?.isValid"
        :validationMessage="validationFields.alias_name?.validationMessage"
      />
    </FieldContainer> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import CheckBox from '../../components/checkBox.vue';
import FieldContainer from '../../components/fieldContainer.vue';
import StyledInput from '../../components/styledInput.vue';
import SupportingText from '../../components/supportingText.vue';
import { Step1Data, ValidationResult } from '../../data/types';

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
</script>

<style scoped>
/* أضف تنسيقات إضافية إذا لزم الأمر */
</style>