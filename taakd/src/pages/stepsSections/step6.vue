<!-- src/pages/step6.vue -->

<template>
  <div class="pt-3 container">
    <h1 class="text-4xl font-bold">Screening Disclosure and Authorization</h1>
    <p class="mb-3 mt-2"> 
      I hereby provide my authorisation and consent for Taakd, on behalf of Requestor to:
    </p>
    <ol class="my-1 list-decimal">
      <li>
        Process my Personal Data in accordance with the verifications set out in the Information Notice and below:
        <ul class="ml-6 list-disc">
          <li>
            <strong>Global Education:</strong> This check confirms academic credentials by verifying relevant education as determined by the Requestor, for example, a degree, certificate, or diploma claim directly with the awarding institution or its authorized agent.
          </li>
          <li>
            <strong>Global Employment:</strong> A check to confirm your work history. You will be asked to provide the company name, location, dates worked, and position or title held. This information will then be verified by contacting HR or official sources at each company.
          </li>
        </ul>
      </li>
    </ol>
    
    <div class="lg:grid grid-cols-2 lg:gap-2">
      <Button class="my-2" level="secondary">Print the unsigned document</Button>
    </div>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <!-- <AutocompM
          name="other_languages"
          id="OtherLanguages"
          labelText="Other Languages"
          infoText="Select Other Languages"
          inputType="text"
          :options="getOptionLanguage()"
          v-model="otherLanguages"
          :isValid="store.step1.country_now.isValid"
          :validationMessage="store.step1.country_now.validationMessage"
            
          /> -->
      </FieldContainer>  
      <FieldContainer>
        <Autocomp
          name="other_languages"
          id="OtherLanguages"
          labelText="Other Languages"
          infoText="Select Other Languages"
          inputType="text"
          :options="getOptionLanguage()"
          v-model="otherLanguages"
          :isValid="store.step1.country_now.isValid"
          :validationMessage="store.step1.country_now.validationMessage"
        />
      </FieldContainer>
    </div>
    <div class="lg:grid grid-cols-1 lg:gap-2">
      <FieldContainer>
        <label class="block text-sm font-medium text-gray-700">
          Electronic Signature<span class="text-red-500">*</span>
        </label>
        <CustomSignaturePad @save-signature="saveSignature" />
        <p class="text-sm text-gray-500 mt-2">If you are using a mouse, you will need to hold down your left mouse button while you draw.</p>
        <div v-if="electronicSignature" class="mt-4">
          <h4 class="font-medium">Your Signature:</h4>
          <img :src="electronicSignature" alt="Electronic Signature" class="mt-2 border p-2 max-w-full h-auto" />
        </div>
      </FieldContainer>
    </div>
    <FieldContainer>
      <CheckBox 
        name="i_agree_to_electronic_signature" 
        id="AgreeToElectronicSignature" 
        v-model="iAgreeToElectronicSignature"
      >
        I certify that the signature that I have drawn is my signature *
      </CheckBox>
    </FieldContainer>
    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          labelText="Full Name"
          :isMandatory="true"
          infoText="Please enter your full name"
          inputType="text"
          name="full_name"
          id="FullName"
          v-model="fullName"
          :isValid="store.step6.full_name.isValid"
          :validationMessage="store.step6.full_name.validationMessage"
        />
      </FieldContainer>
      <div class="lg:grid grid-rows-2 lg:gap-2">
        <FieldContainer>
          <StyledInput
            labelText="Email Address"
            :isMandatory="true"
            infoText="Please enter your email address"
            inputType="email"
            name="email_address"
            id="EmailAddress"
            v-model="emailAddress"
            :isValid="store.step6.email_address.isValid"
            :validationMessage="store.step6.email_address.validationMessage"
          />
        </FieldContainer>
        <Info
          text="Please ensure the email address provided is correct. 
          A copy of the signed consent form will be sent to this address if permitted by the company that requested the background report."
        /> 
      </div>
    </div>

    <div class="lg:grid grid-rows-2 lg:gap-2">
      <FieldContainer>
        <CheckBox 
          name="i_agree_to_electronic_signature_confirmation" 
          id="AgreeToElectronicSignatureConfirmation" 
        >
          I certify that I am the person identified. My clicking the “Accept & Continue” button constitutes my electronic signature to this document
        </CheckBox>
      </FieldContainer>
      <FieldContainer>
        <CheckBox 
          name="i_acknowledge_the_above" 
          id="Acknowledge" 
          v-model="acknowledgeTheAbove"
        >
          I understand that I am using electronic means to sign this document. *
        </CheckBox>
      </FieldContainer>
    </div>

    <div class="pt-5 flex w-full justify-center">
      <Button level="other" @click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <span v-if="loading">جاري الحفظ...</span>
        <span v-else>Save -></span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Autocomplete } from 'frappe-ui'
import Button from '../../components/button.vue';
import CheckBox from '../../components/checkBox.vue';
import FieldContainer from '../../components/fieldContainer.vue';
import StyledInput from '../../components/styledInput.vue';
import Select from '../../components/select.vue';
import CustomSignaturePad from '../../components/CustomSignaturePad.vue';
import Info from './components/info.vue';

import { ref, computed } from 'vue';
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import { useToast } from 'vue-toastification';
import { useLanguage } from '../../stores/language';
import Autocomp from '../../components/autocomp.vue';
import AutocompM from '../../components/autocompMultiple.vue';

// استيراد الستور
const store = useVerificationRequestStore();
const toast = useToast();

// تعريف متغيرات التحميل
const loading = ref(true);
const languages = useLanguage();
const language = languages.getLanguage();


// استيراد النوع Step6Data

// // تحميل البيانات عند تحميل الصفحة
// onMounted(async () => {
//   loading.value = true;
//   await store.loadDocument();
//   loading.value = false;
// });

// خيارات اللغات الأخرى
const languageOptions = ref([]);
const getOptionLanguage = () => {
  const options = language.data
    .map(loc => ({
      label: loc.language_name,
      value: loc.language_name
    }))
  return options
}
// تعريف computed properties لربط v-model مع مخزن Pinia
const otherLanguages = computed<string[]>({
  get: () => store.step6.other_languages.value,
  set: (val: string[]) => store.updateStep6('other_languages', { value: val }),
});

const fullName = computed<string>({
  get: () => store.step6.full_name.value,
  set: (val: string) => store.updateStep6('full_name', { value: val }),
});

const iAgreeToElectronicSignature = computed<boolean>({
  get: () => store.step6.i_agree_to_the_electronic_signature.value,
  set: (val: boolean) => store.updateStep6('i_agree_to_the_electronic_signature', { value: val }),
});

const emailAddress = computed<string>({
  get: () => store.step6.email_address.value,
  set: (val: string) => store.updateStep6('email_address', { value: val }),
});

const electronicSignature = computed<string>({
  get: () => store.step6.electronic_signature.value,
  set: (val: string) => store.updateStep6('electronic_signature', { value: val }),
});

// const acknowledgeElectronicSignature = computed<boolean>({
//   get: () => store.step6.acknowledge_electronic_signature.value,
//   set: (val: boolean) => store.updateStep6('acknowledge_electronic_signature', { value: val }),
// });

// إضافة computed property لحقل "I acknowledge the above"
const acknowledgeTheAbove = computed<boolean>({
  get: () => store.step6.i_acknowledge_the_above.value,
  set: (val: boolean) => store.updateStep6('i_acknowledge_the_above', { value: val }),
});

// دالة لحفظ التوقيع الإلكتروني
const saveSignature = (signature: string) => {
  store.updateStep6('electronic_signature', { value: signature });
};

// دالة الحفظ
const save = async () => {
  try {
  
    console.log("********************",language)
    loading.value = true;
    await store.saveStep6();
    toast.success('تم حفظ البيانات بنجاح!');
  } catch (error) {
    toast.error('حدث خطأ أثناء حفظ البيانات.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* أضف أي تنسيقات خاصة بالمكون هنا */
</style>