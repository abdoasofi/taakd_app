<template>
  <div class="pt-3 container">
    <h3 class="text-lg font-medium mb-3 text-black">1 Basic Information</h3>
    <!-- <List>
      <li>Instructions for Verifying Basic Information.</li>
      <li>Instructions for Verifying Basic Information.</li>
      <li>Instructions for Verifying Basic Information.</li>
    </List> -->
    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          labelText="Employer Name"
          :isMandatory="true"
          infoText="Employer Name"
          inputType="text"
          @input-change="handleInput"
          name="employer_name"
          id="EmployerName"
          :isValid="stepData['employer_name']['isValid']"
          :validationMessage="stepData['employer_name']['validationMessage']"
        />
        <SupportingText>Supporting text</SupportingText>
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          labelText="First Name"
          :isMandatory="true"
          infoText="First Name"
          inputType="text"
          name="first_name"
          id="firstName"
          @input-change="handleInput"
          :isValid="stepData['first_name']['isValid']"
          :validationMessage="stepData['first_name']['validationMessage']"
        />
      </FieldContainer>
    </div>
    <FieldContainer>
      <CheckBox name="certify" id="certify" @input-change="handleInput">
        I certify that I do not have a Middle Name on my official identification
        document
      </CheckBox>
    </FieldContainer>
    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          labelText="Middle Name"
          :isMandatory="false"
          inputType="text"
          name="middle_name"
          id="MiddleName"
          @input-change="handleInput"
          :isValid="stepData['middle_name']['isValid']"
          :validationMessage="stepData['middle_name']['validationMessage']"
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
          name="LastName"
          id="LastName"
          
        />
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          labelText="Suffix"
          :isMandatory="true"
          infoText="Suffix"
          inputType="text"
          name="Suffix"
          id="Suffix"
          
        />
        <SupportingText>Supporting text</SupportingText>
      </FieldContainer>
    </div>

    <FieldContainer>
      <StyledInput
        labelText="Alias Name"
        ::isMandatory="true"
        infoText="Alias Name"
        inputType="text"
        name="AliasName"
        id="AliasName"
        
      />
    </FieldContainer>

    <Toggle>
      <FieldContainer>
        <StyledInput
          labelText="Alias Name"
          :isMandatory="true"
          infoText="Alias Name"
          inputType="text"
          name="AliasName2"
          id="AliasName2"
          
        />
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          labelText="Alias Name"
          :isMandatory="true"
          infoText="Alias Name"
          inputType="text"
          name="AliasName3"
          id="AliasName3"
          
        />
      </FieldContainer>
    </Toggle>

    <Info
      text="Instructions for Verifying Basic Information Instructions for Verifying Basic Information."
    />

    <FieldsGroup title="Current mailing address">
      <FieldContainer>
        <StyledInput
          labelText="Alias Name"
          :isMandatory="true"
          infoText="Alias Name"
          inputType="text"
          name="AliasName4"
          id="AliasName4"
          
        />
      </FieldContainer>

      <Toggle>
        <FieldContainer>
          <StyledInput
            labelText="Alias Name"
            ::isMandatory="true"
            infoText="Alias Name"
            inputType="text"
            name="AliasName5"
            id="AliasName5"
            
          />
        </FieldContainer>
        <FieldContainer>
          <StyledInput
            labelText="Alias Name"
            ::isMandatory="true"
            infoText="Alias Name"
            inputType="text"
            name="AliasName6"
            id="AliasName6"
            
          />
        </FieldContainer>
      </Toggle>

      <StyledtextArea
        labelText="Alias Name"
        ::isMandatory="true"
        infoText="Alias Name"
        inputType="text"
        name="AliasName7"
        id="AliasName7"
        
      />
    </FieldsGroup>
  </div>
  <div class="space-y-2">
    <FieldsToggleContainer
      v-for="n in companies"
      :key="n"
      :title="n === 1 ? 'Current Company' : `Company ${n}`"
    >
      <FieldContainer>
        <StyledInput
          labelText="Alias Name"
          ::isMandatory="true"
          infoText="Alias Name"
          inputType="text"
          :name="`AliasName-${n}`"
          :id="`AliasName-${n}`"
          
          :isValid="false"
          :validationMessage="'you can edit message'"
        />
      </FieldContainer>
      <FileUpload
        :name="`file-${n}`"
        :id="`file-${n}`"
        
      />
    </FieldsToggleContainer>
    <div class="flex justify-center py-3">
      <Button level="secondary" @clicked="addCompany">+ add company</Button>
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

import { ref } from 'vue'

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
  // console.log("*****",value)
  // if (value.name === 'employer_name') {

  //   console.log("***5**",value)
  //   if (value.value === "" ) {
  //     props.stepData[value.name]['isValid'] = false

  //     props.stepData[value.name]['validationMessage'] = 'هذا الحقل فارغ'
  //   } else {
  //     props.stepData[value.name]['value'] = value.value
  //     props.stepData[value.name]['isValid'] = true
  //     props.stepData[value.name]['validationMessage'] = null
  //   }
  // }
  // else{
  // if(value.value !== null||""){  
  //   props.stepData[value.name]['value'] = value.value;
  //   props.stepData[value.name]['isValid'] = true

  // }
  // }
}

const addCompany = function () {
  companies.value++
}
</script>
