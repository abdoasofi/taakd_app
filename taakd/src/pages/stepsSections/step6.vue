<!-- src/pages/step6.vue -->
<template>
  <div class="pt-3 container">
    <h1 class="text-4xl font-bold">{{ $t('step6.screening_disclosure_and_authorization') }}</h1>
    <p class="mb-3 mt-2"> 
      {{ $t('step6.authorization_consent') }}
    </p>
    <ol class="my-1 list-decimal">
      <li>
        {{ $t('step6.process_personal_data') }}
        <ul class="ltr:ml-6 rtl:mr-6 list-disc">
          <li>
            <strong>{{ $t('step6.global_education') }}:</strong> {{ $t('step6.global_education_description') }}
          </li>
          <li>
            <strong>{{ $t('step6.global_employment') }}:</strong> {{ $t('step6.global_employment_description') }}
          </li>
        </ul>
      </li>
    </ol>
    
    <div class="lg:grid grid-cols-2 lg:gap-2">
      <Button @click="printDiv" class="my-2" level="secondary">{{ $t('step6.print_unsigned_document') }}</Button>
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
          :isValid="store.step6.other_languages.isValid"
          :validationMessage="store.step6.other_languages.validationMessage"
            
          /> -->
      </FieldContainer>  
      <FieldContainer>
        <Autocomp
          name="other_languages"
          id="OtherLanguages"
          :labelText="$t('step6.other_languages')"
          :infoText="$t('step6.select_other_languages')"
          inputType="text"
          :options="getOptionLanguage()"
          v-model="otherLanguages"
          :isValid="store.step6.other_languages.isValid"
          :validationMessage="store.step6.other_languages.validationMessage"
        />
      </FieldContainer>
    </div>
    

    <div class="lg:grid grid-cols-1 lg:gap-2">
      <FieldContainer>
        <label class="block text-sm font-medium text-gray-700">
          {{ $t('step6.electronic_signature') }}<span class="text-red-500">*</span>
        </label>
        <!-- تمرير initialSignature كمُدخل إلى المكون -->
        <CustomSignaturePad 
          :initialSignature="electronicSignature" 
          @update-signature="saveSignature" 
        />
        <p class="text-sm text-gray-500 mt-2">{{ $t('step6.signature_instruction') }}</p>
      </FieldContainer>
    </div>

   
    <FieldContainer>
      <CheckBox 
        name="i_agree_to_electronic_signature" 
        id="AgreeToElectronicSignature" 
        v-model="iAgreeToElectronicSignature"
      >
        {{ $t('step6.certify_signature') }}
      </CheckBox>
    </FieldContainer>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          :labelText="$t('step6.full_name')"
          :isMandatory="true"
          :infoText="$t('step6.please_enter_full_name')"
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
            :labelText="$t('step6.email_address')"
            :isMandatory="true"
            :infoText="$t('step6.please_enter_email_address')"
            inputType="email"
            name="email_address"
            id="EmailAddress"
            v-model="emailAddress"
            :isValid="store.step6.email_address.isValid"
            :validationMessage="store.step6.email_address.validationMessage"
          />
        </FieldContainer>
        <Info
          :text="$t('step6.email_privacy_info')" 
        />
      </div>
    </div>

    <div class="lg:grid grid-rows-2 lg:gap-2">
      <FieldContainer>
        <CheckBox 
          name="i_agree_to_electronic_signature_confirmation" 
          id="AgreeToElectronicSignatureConfirmation" 
        >
          {{ $t('step6.certify_identification') }}
        </CheckBox>
      </FieldContainer>
      <FieldContainer>
        <CheckBox 
          name="i_acknowledge_the_above" 
          id="Acknowledge" 
          v-model="acknowledgeTheAbove"
        >
          {{ $t('step6.understand_electronic_means') }}
        </CheckBox>
      </FieldContainer>
    </div>

    <div class="pt-5 flex w-full justify-center">
      <Button level="other" @click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <span v-if="loading">{{ $t('step6.saving') }}</span>
        <span v-else>{{ $t('step6.save') }}</span>
      </Button>
    </div>
  </div>
  <div class="hidden">
      <div id="yourDivId">
        <Report />
      </div>
    </div>
</template>

<script setup lang="ts">
import { Autocomplete } from 'frappe-ui'
import Button from '../../components/button.vue';
import CheckBox from '../../components/checkBox.vue';
import FieldContainer from '../../components/fieldContainer.vue';
import StyledInput from '../../components/styledInput.vue';
import Autocomp from '../../components/autocomp.vue';
import CustomSignaturePad from '../../components/CustomSignaturePad.vue';
import Info from './components/info.vue';

import { ref, computed } from 'vue';
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import { useToast } from 'vue-toastification';
import { useLanguage } from '../../stores/language';
import printJS from 'print-js';
import Report from './report.vue';

// استيراد الستور
const store = useVerificationRequestStore();
const toast = useToast();
const languages = useLanguage();
const language = languages.getLanguage();

// تعريف متغيرات التحميل
const loading = ref(false);

// خيارات اللغات الأخرى
const languageOptions = ref([]);
const getOptionLanguage = () => {
  const options = language.data
    .map(loc => ({
      label: loc.language_name,
      value: loc.language_name
    }));
  return options;
};

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

// دالة لحفظ التوقيع الإلكتروني عند تحديثه
const saveSignature = (signature: string) => {
  store.updateStep6('electronic_signature', { value: signature });
};

// دالة الحفظ
const save = async () => {
  try {
    loading.value = true;
    await store.saveStep6();
    toast.success($t('step6.save_success')); // تأكد من إضافة مفتاح 'save_success' في ملفات الترجمة
  } catch (error) {
    toast.error($t('step6.save_error')); // تأكد من إضافة مفتاح 'save_error' في ملفات الترجمة
  } finally {
    loading.value = false;
  }
};

const printDiv = () => {
  printJS({
    printable: 'yourDivId',
    type: 'html',
    targetStyles: ['*'], // يتضمن الأنماط من Tailwind CSS
  });
};
</script>

<style scoped>
/* أضف أي تنسيقات خاصة بالمكون هنا */
</style>