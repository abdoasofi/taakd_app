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
      <div class="text-xs text-[#1D1B20]">Auto Saving</div>

      <div class="flex gap-2">
        <button class="text-secondary" @click="previousStep" :disabled="currentStepIndex === 0">
          &larr;
        </button>
        <Button 
          v-if="!isLastStep" 
          level="primary" 
          @clicked="nextStep"
        >
          Step  &rarr;
        </Button>
      </div>

      <div class="lg:flex justify-end grow lg:gap-2">
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
  // {
  //   component: Step5,
  //   description: "Review Information",
  //   validate: () => validateInputStep5(store.step5),
  // },
  // {
  //   component: Step6,
  //   description: "Final Verification",
  //   validate: () => validateInputStep6(store.step6),
  // },
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
const isCurrentStepValid = computed(() => {
  const validationResult: ValidationResult = steps[currentStepIndex.value].validate();
  store.updateValidation(currentStepIndex.value, validationResult);
  
  return Object.values(validationResult).every(field => field.isValid);
});

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
  console.log("******************************",isCurrentStepValid.value)
  console.log("******************************",store.step1)
  if(isCurrentStepValid.value) {
    currentStepIndex.value++;
  } else {
    // alertsStore.addAlert({ isDanger: true, message: "يرجى تصحيح الأخطاء في البيانات المدخلة." });
  }
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