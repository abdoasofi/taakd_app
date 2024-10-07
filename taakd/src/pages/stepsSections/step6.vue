<!-- <script>
import Button from "../../components/button.vue";


import FieldContainer from "../../components/fieldContainer.vue";


import ReviewLabel from "./components/reviewLabel.vue";
import ReviewValue from "./components/reviewValue.vue";

export default {
  components:{
    ReviewLabel,
    ReviewValue,
    Button,
    FieldContainer
  }
};
</script>

<template>
  
  <div class="container py-6">
    <h3 class="text-lg font-medium mb-3 text-black">Personal information</h3>

<div>
    <Button level="edit" >edit this section</Button>
    <FieldContainer>
        <ReviewLabel :isMandatory="true">Birth Date</ReviewLabel>
        <ReviewValue>22-5-2022</ReviewValue>
    </FieldContainer>
</div>
</div>


</template> -->

<template>
  <div class="pt-3 container">
    <h1 class="text-4xl font-bold ">Screening Disclosure and Authorization</h1>
    <p class=" mb-3 mt-2"> 
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
      <Button class="my-2" level="secondary" > Print the unsigned document </Button>
    </div>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
          <Select
            labelText="Other Languages"
            :isMandatory="false"
            infoText="Select other languages"
            name="other_languages"
            id="OtherLanguages"
            @input-change="handleInput"
            :options="languageOptions"
          />
        </FieldContainer>   
       </div>
       <div class="lg:grid grid-cols-1 lg:gap-2">
      <FieldContainer>
        <label class="block text-sm font-medium text-gray-700">
          Electronic Signature<span class="text-red-500">*</span>
        </label>
        <CustomSignaturePad @save-signature="handleSaveSignature" />
        <p class="text-sm text-gray-500 mt-2">If you are using a mouse, you will need to hold down your left mouse button while you draw.</p>
        <div v-if="formData.electronic_signature" class="mt-4">
          <h4 class="font-medium">Your Signature:</h4>
          <img :src="formData.electronic_signature" alt="Electronic Signature" class="mt-2 border p-2 max-w-full h-auto" />
        </div>
      </FieldContainer>
      
    </div>
    <FieldContainer>
      <CheckBox name="i_agree_to_the_electronic_signature" id="AgreeToElectronicSignature" @input-change="handleInput">
        I certify that the signature that I have drawn is my signature *       </CheckBox>
    </FieldContainer>
    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          labelText="Full Name"
          :isMandatory="true"
          infoText="Please enter your full name"
          inputType="text"
          @input-change="handleInput"
          name="full_name"
          id="FullName"
        
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
          @input-change="handleInput"
       
        />
      </FieldContainer>
      <Info
          text=" Please ensure the email address provided is correct. 
          A copy of the signed consent form will be sent to this address if permitted by the company that requested the background report."
        /> 
      </div>

    </div>

    <div class="lg:grid grid-rows-2 lg:gap-2">
    <FieldContainer>
      <CheckBox name="i_agree_to_the_electronic_signature" id="AgreeToElectronicSignature" @input-change="handleInput">
        I certify that I am the person identified . My clicking the “Accept & Continue” button constitutes my electronic signature to this document       </CheckBox>
    </FieldContainer>
    <FieldContainer>
      <CheckBox name="i_acknowledge_the_above" id="Acknowledge" @input-change="handleInput">
        I understand that I am using electronic means to sign this document. *      </CheckBox>
    </FieldContainer>

    </div>


  </div>
</template>

<script setup>
import Button from '../../components/button.vue'
import CheckBox from '../../components/checkBox.vue'
import FieldContainer from '../../components/fieldContainer.vue'
import StyledInput from '../../components/styledInput.vue'
import Select from '../../components/select.vue'
import SignaturePad from 'vue-signature-pad'

import { ref } from 'vue'
import CustomSignaturePad from '../../components/CustomSignaturePad.vue'
import Info from './components/info.vue'

// Props
const props = defineProps({
  stepData: {
    type: Object,
    required: true,
  },
})
const formData = ref({
  other_languages: [],
  electronic_signature: '',
  full_name: '',
  email_address: '',
  agree_to_electronic_signature: false,
  acknowledge_electronic_signature: false,
});

const emit = defineEmits(['submit', 'update:stepData'])

// دالة لمعالجة حفظ التوقيع
const handleSaveSignature = (dataURL) => {
  // تحقق من وجود stepData قبل محاولة التحديث
  if (props.stepData) {
    emit('update:stepData', { ...props.stepData, electronic_signature: dataURL })
  } else {
    console.error('stepData is undefined')
  }
}

// Language options for the multi-select field
const languageOptions = ref([
  { value: 'en', text: 'English' },
  { value: 'es', text: 'Spanish' },
  { value: 'fr', text: 'French' },
  // Add more languages as needed
])

// Methods
const handleInput = function (value) {
  props.stepData[value.name]['value'] = value.value;
}



const signaturePadRef = ref(null)
const signatureData = ref('')

const saveSignature = () => {
  if (signaturePadRef.value) {
    signatureData.value = signaturePadRef.value.save()
    // يمكنك إرسال signatureData.value إلى الخادم أو تخزينها حسب الحاجة
  }
}

const clearSignature = () => {
  if (signaturePadRef.value) {
    signaturePadRef.value.clear()
  }
}
</script>
