<template>
  <Header />
  <div class="lg:grid lg:grid-cols-12 lg:container py-8 bg-bg">
    <div class="container col-span-4 lg:order-2 relative">
      <div class="sticky top-4">
        <div class="pb-3 font-medium text-primary text-[1rem]">
          <span class="m-2"><-</span>Model steps instructions of Job Request ({{
            Math.round((100 / 6) * processed)
          }}% Completed)
        </div>
        <div class="py-3 grid grid-cols-6 lg:flex lg:flex-col lg:gap-4 w-full">
          <StepIcon
            :process="Boolean(processed === 0)"
            :complete="Boolean(processed >= 1)"
            label="Step 1"
            desc="Personal Information"
          />
          <StepIcon
            :process="Boolean(processed === 1)"
            :complete="Boolean(processed >= 2)"
            label="Step 2"
            desc="Personal Information"
          />
          <StepIcon
            :process="Boolean(processed === 2)"
            :complete="Boolean(processed >= 3)"
            label="Step 3"
            desc="Personal Information"
          />
          <StepIcon
            :process="Boolean(processed === 3)"
            :complete="Boolean(processed >= 4)"
            label="Step 4"
            desc="Personal Information"
          />
          <StepIcon
            :process="Boolean(processed === 4)"
            :complete="Boolean(processed >= 5)"
            label="Step 5"
            desc="Personal Information"
          />
          <StepIcon
            :process="Boolean(processed === 5)"
            :complete="Boolean(processed >= 6)"
            label="Step 6"
            desc="Personal Information"
          />
        </div>
        <div class="py-3 lg:hidden flex justify-end text-secondary text-[1rem]">
          <button>
            All Steps (5)<span class="inline-block mx-1">-></span>
          </button>
        </div>
      </div>
    </div>
    <div class="pb-20 bg-bg leading-[1.6rem] col-span-8">
      <Step1 :stepData="step1Data" v-if="processed === 0" />
      <Step2 :stepData="step2Data" v-if="processed === 1" />
      <Step3 :stepData="step3Data" v-if="processed === 2" />
      <Step4 :stepData="step4Data" v-if="processed === 3" />
      <Step5 :stepData="step5Data" v-if="processed === 4" />
      <Step6 :stepData="step6Data" v-if="processed === 5" />
    </div>
  </div>
  <div class="bg-[#F0F0F0] fixed lg:static bottom-0 w-screen h-fit">
    <div class="container py-4 flex w-full justify-between items-center">
      <div class="text-xs text-[#1D1B20]">auto saving</div>

      <div class="flex gap-2">
		<button  @click="previousStep" v-if="processed !== 0"><</button>
		<Button v-if="processed !== 5" level="primary" @clicked="nextStep()">
		  step {{ stepN }} ->
		</Button>
	  </div>

      <div v-if="processed === 5" class="lg:flex justify-end grow lg:gap-2">
        <Button level="other" @clicked=""> Accept </Button>
        <Button level="other" @clicked=""> Reject </Button>
      </div>
    </div>
  </div>
    <div class=" fixed z-10 bottom-0 py-6 px-4 flex flex-col gap-2">

  <div  v-for="(alert, index) in alerts" :key="index">
      <SnackBar :isDanger="true" :message="alert.message" @close="removeAlert(index)" />
      </div>
	</div>
</template>
<script setup>
// import BaseContainer from '../components/baseContainer.vue';
import Button from '../components/button.vue'
import Header from '../components/header.vue'
// import Heading from '../components/heading.vue';
// import StyledIcon from '../components/styledIcon.vue';
import BaseLayout from '../layouts/baseLayout.vue'
import StepIcon from './stepsSections/components/stepIcon.vue'

import Step1 from './stepsSections/step1.vue'
import Step2 from './stepsSections/step2.vue'
import Step3 from './stepsSections/step3.vue'
import Step4 from './stepsSections/step4.vue'
import Step5 from './stepsSections/step5.vue'
import Step6 from './stepsSections/step6.vue'

// import Contact from './homeSections/contact.vue';
// import JobRequest from './homeSections/jobRequest.vue';
// import ProcessItem from './homeSections/processItem.vue';
// import Review from './homeSections/review.vue';
// import Verification from './homeSections/verification.vue';

import { computed, reactive, ref } from 'vue'

import { createRequestList, updateFieldsInRequestList } from '../data/request'
import validateInput from '../data/validateInput'
import objectConvertor from '../data/convertor'
import SnackBar from '../components/snackBar.vue'

// Data
const processed = ref(0)
const stepN = ref(2)

const fieldsStep1 = ['name', 'first_name', 'last_name']
const requestListStep1 = createRequestList(fieldsStep1)
// ===============
const alerts = reactive([]);
// Methods
const triggerAlert = function(message) {
	alerts.push({ message });
	setTimeout(() => {
		alerts.shift(); // Automatically remove the alert after some time
	}, 3000);
}

const removeAlert = function(index) {
	alerts.splice(index, 1);
}
// ================

const updatedFieldsStep1 = {
  first_name: 'abdo',
  last_name: 'asofi',
}

const step1Data = reactive({
  employer_name: {
    value: '',
    isValid: null,
    validationMessage: null,
  },
  first_name: {
    value: '',
    isValid: null,
    validationMessage: null,
  },
  // last_name:{
  // 	value:"",
  // 	isValid:null,
  // 	validationMessage:null,

  // },
  middle_name: {
    value: '',
    isValid: null,
    validationMessage: null,
  },
  // dont_middle_name:{
  // 	value:true,
  // 	isValid:null,
  // 	validationMessage:null

  // },
  // suffix:{
  // 	value:"",
  // 	isValid:null,
  // 	validationMessage:null

  // },
})
const step2Data = reactive({})
const step3Data = reactive({})
const step4Data = reactive({})
const step5Data = reactive({})
const step6Data = reactive({})
const previousStep = function () {
	processed.value--
	stepN.value--
}
// Methods
const nextStep = function () {
  // processed=processed.value++;
  /// رسالة الفاليديشن ارسلها للحقل
  // //  isValid استخدم ذا عشان يحمر الحقل
  //validationMessage واستخدم ذا عشان تعرض رسالة تحت الحق

  //     <StyledInput
  //   labelText="Employer Name"
  //   :isMandatory="true"
  //   infoText="Employer Name"
  //   inputType="number"
  //   @input-change="handleInput"
  //   name="EmployerName"
  //   id="EmployerName"
  //  :isValid="true" :isValid="false"  :isValid="null"
  //validationMessage="h"
  // />

  // حسب فرابي شوف اذا تحتاج تستخدم متغيرات ترسلها للكمبوننت حق الستيب ومنها تتعبي اذا الفاليديشن حق الابناء الحقول بارسال القيم الي فوق

  if (processed.value === 0) {
    step1Save()
  }
  // if(processed.value===1){
  // 	step2Save()
  // }
  // if(processed.value===2){
  // 	step3Save()
  // }
  // if(processed.value===3){
  // 	step4Save()
  // }
  // if(processed.value===4){
  // 	step5Save()
  // }
  // if(processed.value===5){
  // 	step6Save()
  // }

 
}

const step1Save = function () {
  console.log('***** updateFieldsInRequestList ****')
  // اذا حفظت بنجاح
  // step1Data["اسم الحقل"]["value"]
  // مالم اعرض الرت او عالج الفاليديشن
  let validateRes = validateInput(step1Data)

  if (validateRes===true) {
	triggerAlert("aaaaaaaaaaaaaaaaaaaaa")
  } else {
    let converted = objectConvertor(step1Data)

    updateFieldsInRequestList(requestListStep1, converted)
	processed.value++
	stepN.value++
  }
}

const step2Save = function () {
  // اذا حفظت بنجاح
  // step2Data["اسم الحقل"]
  processed.value = 2
  // مالم اعرض الرت او عالج الفاليديشن
}

const step3Save = function () {
  // اذا حفظت بنجاح
  processed.value = 3
  // مالم اعرض الرت او عالج الفاليديشن
}

const step4Save = function () {
  // اذا حفظت بنجاح
  processed.value = 4
  // مالم اعرض الرت او عالج الفاليديشن
}

const step5Save = function () {
  // اذا حفظت بنجاح
  processed.value = 5
  // مالم اعرض الرت او عالج الفاليديشن
}

const step6Save = function () {
  /// هنا تقدر تنتقل
  // اذا حفظت بنجاح
  processed.value = 6
  // مالم اعرض الرت او عالج الفاليديشن
}
const nextNum = computed(() => {
  return processed.value
})
</script>
