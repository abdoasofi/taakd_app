<!-- المكون الرئيسي: -->
<!-- src/components/steps.vue -->
<!-- src/components/steps.vue -->
<template>
  <Header />
  <div class="lg:grid lg:grid-cols-12 lg:container py-8 bg-bg">
    <div class="container col-span-4 lg:order-2 relative">
      <div class="sticky top-4">
        <div class="pb-3 font-medium text-primary text-[1rem]">
          <p>اسم المستند: {{ documentName }}</p>
          <span class="m-2">&larr;</span>Model steps instructions of Job Request ({{ percentageCompleted }}% Completed)
        </div>
        <div class="py-3 grid grid-cols-6 lg:flex lg:flex-col lg:gap-4 w-full">
          <StepIcon
            v-for="(step, index) in steps"
            :key="index"
            :process="currentStepIndex === index"
            :complete="currentStepIndex > index"
            :label="'Step ' + (index + 1)"
            :desc="step.description"
          />
        </div>
        <div class="py-3 lg:hidden flex justify-end text-secondary text-[1rem]">
          <button>
            All Steps ({{ steps.length }})<span class="inline-block mx-1">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
    <div class="pb-20 bg-bg leading-[1.6rem] col-span-8">
      <component 
        :is="currentStepComponent" 
        :stepData="currentStepData" 
        @update:stepData="" 
      />
    </div>
  </div>
  <div class="bg-[#F0F0F0] fixed lg:static bottom-0 w-screen h-fit">
    <div class="container py-4 flex w-full justify-between items-center">
      <div class="lg:flex justify-start grow lg:gap-2" >
             <svg width="30" height="30" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14.0355" y="40.5156" width="37.449" height="37.449" transform="rotate(-45 14.0355 40.5156)" stroke="#F7F7F7" stroke-width="5"/>
        <mask id="mask0_175_7016" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="7" width="67" height="67">
        <rect width="66.1225" height="66.1225" transform="translate(7.64355 7.23535)" fill="#DE3500"/>
        </mask>
        <g mask="url(#mask0_175_7016)">
        <rect x="14.0365" y="40.5166" width="37.449" height="37.449" transform="rotate(-45 14.0365 40.5166)" stroke="#81C045" stroke-width="5"/>
        </g>
      </svg>
      <div class="text-xs text-[#1D1B20]">Auto Saving</div> 
      </div>

      
      <div class="flex gap-2">
        <button class="text-secondary" @click="previousStep" :disabled="currentStepIndex === 0" v-if="currentStepIndex != 0">
          <svg width="86" height="62" viewBox="0 0 86 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_478_20124)">
            <g clip-path="url(#clip0_478_20124)">
            <path d="M38.373 30.75H49.75C49.9628 30.75 50.141 30.6782 50.2845 30.5345C50.4282 30.391 50.5 30.2128 50.5 30C50.5 29.7872 50.4282 29.609 50.2845 29.4655C50.141 29.3218 49.9628 29.25 49.75 29.25H38.373L43.5423 24.0808C43.6909 23.9321 43.7643 23.7581 43.7625 23.5588C43.7605 23.3594 43.682 23.1822 43.527 23.027C43.3718 22.8822 43.1962 22.8072 43 22.802C42.8038 22.7968 42.6282 22.8718 42.473 23.027L36.1327 29.3673C36.0391 29.4609 35.9731 29.5597 35.9348 29.6635C35.8962 29.7673 35.877 29.8795 35.877 30C35.877 30.1205 35.8962 30.2327 35.9348 30.3365C35.9731 30.4403 36.0391 30.5391 36.1327 30.6328L42.473 36.973C42.6115 37.1115 42.783 37.1823 42.9875 37.1855C43.192 37.1887 43.3718 37.1178 43.527 36.973C43.682 36.8178 43.7595 36.6397 43.7595 36.4385C43.7595 36.2372 43.682 36.0589 43.527 35.9038L38.373 30.75Z" fill="#81C045"/>
            </g>
            <path d="M7 30C7 16.7452 17.7452 6 31 6H55C68.2548 6 79 16.7452 79 30C79 43.2548 68.2548 54 55 54H31C17.7452 54 7 43.2548 7 30Z" stroke="#81C045" stroke-width="2" shape-rendering="crispEdges"/>
            </g>
            <defs>
            <filter id="filter0_d_478_20124" x="0" y="0" width="86" height="62" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="1"/>
            <feGaussianBlur stdDeviation="3"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_478_20124"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_478_20124" result="shape"/>
            </filter>
            <clipPath id="clip0_478_20124">
            <path d="M7 30C7 16.7452 17.7452 6 31 6H55C68.2548 6 79 16.7452 79 30C79 43.2548 68.2548 54 55 54H31C17.7452 54 7 43.2548 7 30Z" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </button>
        <Button 
          v-if="!isLastStep" 
          level="primary" 
          @clicked="nextStep"
        >
          Step  &rarr;
        </Button>
      </div>

      <div class="lg:flex justify-end grow lg:gap-2" v-if="isLastStep">
        <Button level="other" @clicked="accept" >
          Accept
        </Button>
        <Button level="other" @clicked="reject"> Reject </Button>
      </div>
    </div>
  </div>
  <div class="fixed z-10 bottom-0 py-6 px-4 flex flex-col gap-2">
    <!-- <SnackBar 
      v-for="(alert, index) in alerts" 
      :key="index" 
      :isDanger="alert.isDanger" 
      :message="alert.message" 
      @close="removeAlert(index)" 
    /> -->
  </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import { useVerificationRequestStore } from '../stores/verificationRequest';
import Header from '../components/header.vue'; 
import StepIcon from './stepsSections/components/stepIcon.vue';
import Step1 from './stepsSections/step1.vue';
import Step2 from './stepsSections/step2.vue';
import Step3 from './stepsSections/step3.vue';
import Step4 from './stepsSections/step4.vue';
import Step5 from './stepsSections/step5.vue';
import Step6 from './stepsSections/step6.vue';
import SnackBar from '../components/snackBar.vue';
import Button from '../components/button.vue';
import { useToast } from 'vue-toastification';
import { createRequestList, updateFieldsInRequestList } from '../data/request';
import objectConvertor from '../data/convertor';
import validateInputStep1 from '../data/validate/validateInputStep1';
import validateInputStep2 from '../data/validate/validateInputStep2';
import validateInputStep3 from '../data/validate/validateInputStep3';
import validateInputStep4 from '../data/validate/validateInputStep4';
// import validateInputStep4 from '../data/validateInputStep4';
// import validateInputStep5 from '../data/validateInputStep5';
// import validateInputStep6 from '../data/validateInputStep6';// يفترض أن يكون لديك دوال تحقق لكل خطوة
import { ValidationResult } from '../data/types';

// إعدادات التنبيهات من Pinia Store (إذا كنت تستخدم Pinia لإدارة التنبيهات)
// import { useAlertsStore } from '../stores/alerts';
// 
interface Alert {
  isDanger: boolean;
  message: string;
}

const store = useVerificationRequestStore();
// const alertsStore = useAlertsStore();
const toast = useToast();

const currentStepIndex = ref(0); // المرحلة الحالية
const totalSteps = 6;

// تعريف المراحل مع المكونات والوصف
const steps = [
  {
    component: Step1,
    description: "Personal Information",
    validate: () => validateInputStep1(store.step1),
  },
  {
    component: Step2,
    description: "Education Information",
    validate: () => validateInputStep2(store.step2),
  },
  {
    component: Step3,
    description: "Employment History",
    validate: () => validateInputStep3(store.step3),
  },
  {
    component: Step4,
    description: "Professional Qualifications",
    validate: () => validateInputStep4(store.step4),
  },
  {
    component: Step5,
    description: "Review Information",
    // validate: () => validateInputStep5(store.step5),
  },
  {
    component: Step6,
    description: "Final Verification",
    // validate: () => validateInputStep6(store.step6),
  },
];

const currentStepComponent = computed(() => steps[currentStepIndex.value].component);

const currentStepData = computed(() => {
  return store[`step${currentStepIndex.value + 1}` as keyof typeof store];
});

// حساب نسبة الإنجاز
const percentageCompleted = computed(() => {
  return Math.round((100 / totalSteps) * (currentStepIndex.value + 1));
});

// تحقق من كون المرحلة الحالية هي الأخيرة
const isLastStep = computed(() => currentStepIndex.value === totalSteps - 1);

// دالة التحقق من صحة المرحلة الحالية
// const isCurrentStepValid = computed(() => {
//   const validationResult: ValidationResult = steps[currentStepIndex.value].validate();
//   store.updateValidation(currentStepIndex.value, validationResult);
  
//   return Object.values(validationResult).every(field => field.isValid);
// });

// دالة التحقق من صحة جميع الخطوات
// const isAllStepsValid = computed(() => {
//   let allValid = true;
  
//   steps.forEach((step, index) => {
//     const validationResult = step.validate();
//     store.updateValidation(index, validationResult);
//     if (!Object.values(validationResult).every(field => field.isValid)) {
//       allValid = false;
//     }
//   });
  
//   return allValid;
// });

// قائمة التنبيهات
// const alerts = computed(() => alertsStore.alerts);

// دالة إزالة تنبيه
// const removeAlert = (index: number) => {
//   alertsStore.removeAlert(index);
// };

// دالة تحديث بيانات الخطوة الحالية
// const updateStepData = (newData: any) => {
//   store.updateStep(['step1', 'step2', 'step3', 'step4', 'step5', 'step6'][currentStepIndex.value], newData);
// };

// دالة التنقل للخلف
const previousStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--;
  }
};

// دالة التنقل للأمام
const nextStep = () => {
  // console.log("******************************",isCurrentStepValid.value)
  console.log("******************************",store.step1)
  currentStepIndex.value++;
  // if(isCurrentStepValid.value) {
  //   currentStepIndex.value++;
  // } else {
  //   // alertsStore.addAlert({ isDanger: true, message: "يرجى تصحيح الأخطاء في البيانات المدخلة." });
  // }
};

// دالة قبول الطلب في خطوة 6
const accept = async () => {
  // التحقق من صحة جميع الخطوات
  // if (!isAllStepsValid.value) {
  //   // alertsStore.addAlert({ isDanger: true, message: "يرجى تصحيح الأخطاء في جميع الخطوات." });
  //   return;
  // }

  // دمج جميع البيانات من الخطوات المختلفة
  const finalData = objectConvertor({
    ...store.step1,
    // ...store.step2,
    // ...store.step3,
    // ...store.step4,
    // ...store.step5,
    // ...store.step6,
  });

  try {
    if (!store.documentName) {
      // إنشاء وثيقة جديدة إذا لم تكن موجودة
      const requestList = createRequestList(['name', 'user_id']); // تأكد من تحديد الحقول المطلوبة

      // يمكن إضافة منطق إضافي هنا لإنشاء وثيقة جديدة باستخدام `useDocumentResource`
      console.log("*****",store.documentName)
      toast.success("تم إنشاء الوثيقة بنجاح.");
    } else {
      
      // تحديث الوثيقة الحالية
      const requestList = createRequestList(['name', 'user_id']); // تأكد من تحديد الحقول المطلوبة
      updateFieldsInRequestList(requestList, { ...finalData, name: store.documentName });
      toast.success("تم تحديث الوثيقة بنجاح.");
    }
  } catch (error) {
    console.error("Error saving verification request:", error);
    // alertsStore.addAlert({ isDanger: true, message: "حدث خطأ أثناء حفظ البيانات." });
  }
};

// دالة رفض الطلب (يمكنك تخصيصها حسب احتياجاتك)
const reject = () => {
  // alertsStore.addAlert({ isDanger: false, message: "تم رفض الطلب." });
  store.resetStore();
  currentStepIndex.value = 0;
};

const documentName = computed(() => store.documentName);
watch(documentName, (newVal, oldVal) => {
  console.log(`documentName تغير من "${oldVal}" إلى "${newVal}"`);
});
</script>

<style scoped>
/* أضف أي تنسيقات إضافية هنا إذا لزم الأمر */
</style>