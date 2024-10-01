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
    <h3 class="text-lg font-medium mb-3 text-black">Verification Instructions Request</h3>
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
        <FieldContainer>
          <StyledInput
            labelText="Electronic Signature"
            :isMandatory="true"
            infoText="Please provide your electronic signature"
            inputType="text"
            name="electronic_signature"
            id="ElectronicSignature"
            @input-change="handleInput"
          
          />
     </FieldContainer>
    </div>
    <div class="lg:grid grid-cols-2 lg:gap-2">
    <FieldContainer>
      <CheckBox name="i_agree_to_the_electronic_signature" id="AgreeToElectronicSignature" @input-change="handleInput">
        I agree to the electronic signature
      </CheckBox>
    </FieldContainer>
    <FieldContainer>
      <CheckBox name="i_acknowledge_the_above" id="Acknowledge" @input-change="handleInput">
        I acknowledge the above
      </CheckBox>
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

import { ref } from 'vue'

// Props
const props = defineProps({
  stepData: {
    type: Object,
    required: true,
  },
})

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
</script>
