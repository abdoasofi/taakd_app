
<template>
  <div class="pt-3 container">
    <h3 class="text-lg font-medium mb-3 text-black">5 Basic Information</h3>
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
          inputType="number"
          @input-change="handleInput"
          name="EmployerName"
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
          name="firstName"
          id="firstName"
          @input-change="handleInput"

             :isValid="true"
            :validationMessage="null"
        />
      </FieldContainer>
    </div>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <CheckBox name="certify" id="certify" @input-change="handleInput">
          I certify that I do not have a Middle Name on my official identification
          document
        </CheckBox>
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          labelText="Middle Name"
          :isMandatory="false"
          inputType="text"
          name="MiddleName"
          id="MiddleName"
          @input-change="handleInput"
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
          @input-change="handleInput"
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
          @input-change="handleInput"
        />
        <SupportingText>Supporting text</SupportingText>
      </FieldContainer>
    </div>

    <FieldContainer>
      <StyledInput
        labelText="Alias Name"
        :isMandatory="true"
        infoText="Alias Name"
        inputType="text"
        name="AliasName"
        id="AliasName"
        @input-change="handleInput"
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
          @input-change="handleInput"
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
          @input-change="handleInput"
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
          @input-change="handleInput"
        />
      </FieldContainer>

      <Toggle>
        <FieldContainer>
          <StyledInput
            labelText="Alias Name"
            :isMandatory="true"
            infoText="Alias Name"
            inputType="text"
            name="AliasName5"
            id="AliasName5"
            @input-change="handleInput"
          />
        </FieldContainer>
        <FieldContainer>
          <StyledInput
            labelText="Alias Name"
            :isMandatory="true"
            infoText="Alias Name"
            inputType="text"
            name="AliasName6"
            id="AliasName6"
            @input-change="handleInput"
          />
        </FieldContainer>
      </Toggle>

      <StyledtextArea
        labelText="Alias Name"
        :isMandatory="true"
        infoText="Alias Name"
        inputType="text"
        name="AliasName7"
        id="AliasName7"
        @input-change="handleInput"
      />
    </FieldsGroup>
   </div> 
   <div class="space-y-2">
      <FieldsToggleContainer  v-for="n in companies" :key="n" :title="(n===1?'Current Company':`Company ${n}`)">
        <FieldContainer >
            <StyledInput
              labelText="Alias Name"
              :isMandatory="true"
              infoText="Alias Name"
              inputType="text"
              :name="`AliasName-${n}`"
              :id="`AliasName-${n}`"
              @input-change="handleInput"

                 :isValid="false"
            :validationMessage="'you can edit message'"
            />
          </FieldContainer>
          <FileUpload  :name="`file-${n}`"
          :id="`file-${n}`"
           @input-change="handleInput" />
      </FieldsToggleContainer>
   <div class="flex justify-center py-3"><Button level="secondary" @clicked="addCompany">+ add company</Button></div>
    </div>
  
</template>

<script setup>
import Button from "../../components/button.vue";
import CheckBox from "../../components/checkBox.vue";
import FieldContainer from "../../components/fieldContainer.vue";
import FieldsGroup from "../../components/fieldsGroup.vue";
import FieldsToggleContainer from "../../components/fieldsToggleContainer.vue";
import FileUpload from "../../components/fileUpload.vue";
import List from "../../components/list.vue";
import Select from "../../components/select.vue";
import StyledInput from "../../components/styledInput.vue";
import StyledtextArea from "../../components/styledtextArea.vue";
import SupportingText from "../../components/supportingText.vue";
import Toggle from "../../components/toggle.vue";
import Info from "./components/info.vue";

import { ref } from 'vue';


// Data
const companies = ref(1);

// Props
const props = defineProps({
	stepData :{
		type: Object,
		required:true
	}
});

// Methods
const handleInput = function(value) {
	props.stepData[value.name]["value"] = value.value; 
	// ااذا تحب تخضر الحقل
	props.stepData[value.name]["isValid"] = true; 

	// عشان تمسح رسالة الغلط
	props.stepData[value.name]["validationMessage"] = null;
	// اذا قيمة الحقل غلط 
	// props.stepData[value.name]["isValid"] = false; 
	// props.stepData[value.name]["validationMessage"] = "رسالة الغلط"; 

	// اذا في معك معالجة على حقل معين
	// if(value.name==="EmployerName"){
        
	// }

	// الاسم الحق انت تحطة بالكمبوننت 

	// <StyledInput
	///// ->   name="EmployerName"
	//   id="EmployerName"
	//   :isValid="stepData['EmployerName']['isValid']"
	//   :validationMessage="stepData['EmployerName']['validationMessage']"
	// />

}

const addCompany = function(){
	companies.value++
}

</script>
