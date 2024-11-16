<!-- src/pages/steps.vue -->
<template>
  <Header />
  <div class="lg:grid lg:grid-cols-12 lg:container py-8 bg-bg">
    <!-- Sidebar -->
    <div class="col-span-4 lg:order-2 relative">
      <div class="sticky top-4">
        <div class="flex gap-2 px-4 items-center"> 
          <button @click="closeModal">
            <span>
              <StyledIcon :status="0" :scale="0" :icon="modelStepsInstructionsIcon" />
            </span>
          </button>
          <div class="pb-3 font-medium text-primary text-base">
            <p>{{ $t('steps.documentName') }}: {{ docName }}</p>
            <p>{{ $t('steps.modelStepsInstructions') }} {{ overallCompletion }}% {{ $t('steps.completed') }}</p>
          </div>
        </div>
        <div class="py-3 grid grid-cols-6 lg:flex lg:flex-col lg:gap-4 w-full">
          <StepIcon
            v-for="(step, index) in steps"
            :key="index"
            :process="currentStepIndex === index"
            :complete="currentStepIndex > index"
            :label="`${$t('steps.step')} ${index + 1}`"
            :desc="step.description"
            :percentageCompleted="stepsCompletionPercentages[index + 1]"
            @click="goToStep(index)"
          />
        </div>
        <div class="py-3 lg:hidden flex justify-end text-secondary text-base">
          <button @click="toggleModal">
            {{ $t('steps.allSteps') }} ({{ steps.length }})<span class="inline-block mx-1">{{ buttonAllStep }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="col-span-8">
      <component 
        :is="currentStepComponent" 
        :stepData="currentStepData" 
      />
    </div>
  </div>

  <!-- Footer -->
  <div class="bg-[#F0F0F0] fixed   bottom-0 w-screen h-fit">
    <div class="container py-4 flex w-full justify-between items-center">
      <!-- Auto Saving Indicator -->
      <div v-if="saveFlag"  class="lg:flex justify-start grow  items-center lg:gap-2">
       <div class="h-5 w-5">
        <span>
          <StyledIcon :status="0" :scale="0" icon="fc-checkmark"/>
        </span>
      </div>
       
        <div  class="text-xs text-[#1D1B20]">{{ $t('steps.saved') }}</div> 
      </div>

      <div v-if="!saveFlag" class="lg:flex justify-start grow  items-center lg:gap-2">
        <div class="autosave-overlay">
           <div class="auto-save-icon">
            <div class="auto-save-icon-fill"></div>
           </div>
       </div>
       <div  class="text-xs text-[#1D1B20]">{{ $t('steps.autoSaving') }}</div> 
      </div>

      <!-- Navigation Buttons -->
      <div v-if="!isLastStep" class="flex gap-2">
        <button 
          class="bg-light_gray border-2 border-secondary hover:bg-hover text-mid_gray px-4 py-2 text-sm font-medium rounded-[100px]" 
          @click="previousStep" 
          :disabled="currentStepIndex === 0" 
          v-if="currentStepIndex > 0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="ltr:mr-2 rtl:ml-2 transform rotate-180">
            <path d="M10 0L8.59 1.41L14.17 7H0V9H14.17L8.59 14.59L10 16L16 10L10 0Z" fill="currentColor"/>
          </svg>
          <!-- اسم المرحلة التي سيتم الرجوع إليها -->
        </button>
        
        <Button 
          level="primary" 
          @clicked="handleStep" 
          :disabled="loading"
        >
          <div class="flex"><span class="block">{{ $t('steps.currentStep') }} {{ currentStepIndex + 1 }}</span>
            <span class="block"><StyledIcon :status="0" :scale="0" :icon="buttonStep" class="mx-1 "/></span>
          </div> 
        </Button>
      </div>

      <!-- Accept/Reject Buttons for Last Step -->
      <div class="lg:flex justify-end grow lg:gap-2" v-if="isLastStep">
        <button 
          class="bg-light_gray border-2 border-secondary hover:bg-hover text-mid_gray px-4 py-2 text-sm font-medium rounded-[100px]" 
          @click="previousStep" 
          :disabled="currentStepIndex === 0" 
          v-if="currentStepIndex > 0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="ltr:mr-2 rtl:ml-2 transform rotate-180">
            <path d="M10 0L8.59 1.41L14.17 7H0V9H14.17L8.59 14.59L10 16L16 10L10 0Z" fill="currentColor"/>
          </svg>
        </button>
        
        <Button level="other" @clicked="reject">{{ $t('steps.reject') }}</Button>
        <Button level="other" @clicked="accept">{{ $t('steps.accept') }}</Button>
      </div>
    </div>
  </div>

  <!-- SnackBar (if needed) -->
  <!-- <div class="fixed z-10 bottom-0 py-6 px-4 flex flex-col gap-2">
    <SnackBar 
      v-for="(alert, index) in alerts" 
      :key="index" 
      :isDanger="alert.isDanger" 
      :message="alert.message" 
      @close="removeAlert(index)" 
    />
  </div> -->
  <div v-if="stepsModal" class="bg-white w-screen h-screen inset-0 p-10 items-center fixed z-[60]">
    <div :class="['flex gap-2 px-4 items-center']"> 
      <button @click="closeModal">
        <span>
          <StyledIcon :status="0" :scale="0" :icon="modelStepsInstructionsIcon" />
        </span>
      </button>
      <div class="pb-3 font-medium text-primary text-base">
        <p>{{ $t('steps.documentName') }}: {{ docName }}</p>
        <p>{{ $t('steps.modelStepsInstructions') }} {{ overallCompletion }}% {{ $t('steps.completed') }}</p>
      </div>
    </div>
    <div class="py-3 lg:hidden flex flex-col gap-4 w-full">
      <StepsToggle
        v-for="(step, index) in steps"
        :key="index"
        :process="currentStepIndex === index"
        :complete="currentStepIndex > index"
        :label="`${$t('steps.step')} ${index + 1}`"
        :desc="step.description"
        :percentageCompleted="stepsCompletionPercentages[index + 1]"
        @click="goToStep(index)"
      />
    </div>
  </div>

  <div v-if="store.isLoading" class="fixed inset-0 w-screen h-screen flex items-center justify-center bg-white z-[100]">
    <div class="loading-overlay">
           <div class="loading-icon">
            <div class="loading-icon-fill"></div>
           </div>
       </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick, } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVerificationRequestStore } from '../stores/verificationRequest';
import Header from '../components/header.vue'; 
import StepIcon from '../pages/stepsSections/components/stepIcon.vue';
import Step1 from './stepsSections/step1.vue';
import Step2 from './stepsSections/step2.vue';
import Step3 from './stepsSections/step3.vue';
import Step4 from './stepsSections/step4.vue';
import Step5 from './stepsSections/step5.vue';
import Step6 from './stepsSections/step6.vue';
import Button from '../components/button.vue';
import { useToast } from 'vue-toastification';
import StepsToggle from './stepsSections/components/stepsToggle.vue';
import StyledIcon from '../components/styledIcon.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { locale } = useI18n();

const route = useRoute();
const router = useRouter();
const store = useVerificationRequestStore();
const toast = useToast();

// الحصول على documentName من route params
const documentNameFromRoute = computed(() => route.params.documentName as string);
const docName = computed(() => store.documentName);

// تعريف المراحل والخطوات
const currentStepIndex = ref(0);
const totalSteps = 6;

// إنشاء خاصية محسوبة لتحديد اسم الأيقونة بناءً على locale
const modelStepsInstructionsIcon = computed(() => {
  return locale.value === 'ar' ? 'bi-arrow-right' : 'bi-arrow-left';
}); 


const buttonStep = computed(() => {
  return locale.value === 'ar' ? 'pr-arrow-left' : 'pr-arrow-right';
}); 

const buttonAllStep = computed(() => {
  const leftArrow = '←'
  const rightArrow = '→'
  return locale.value === 'ar' ? leftArrow: rightArrow;
}); 


const steps = [
  {
    component: Step1,
    description: t('steps.stepOneDescription'),
    save: store.saveStep1,
  },
  {
    component: Step2,
    description: t('steps.stepTwoDescription'),
    save: store.saveStep2,
  },
  {
    component: Step3,
    description: t('steps.stepThreeDescription'),
    save: store.saveStep3,
  },
  {
    component: Step4,
    description: t('steps.stepFourDescription'),
    save: store.saveStep4,
  },
  {
    component: Step5,
    description: t('steps.stepFiveDescription')
  },
  {
    component: Step6,
    description: t('steps.stepSixDescription'),
    save: store.saveStep6,
  },
];

const currentStepComponent = computed(() => steps[currentStepIndex.value].component);

const currentStepData = computed(() => {
  return store[`step${currentStepIndex.value + 1}`];
});

// حساب نسب الإنجاز لكل مرحلة باستخدام الـ getter
const stepsCompletionPercentages = computed(() => store.stepsCompletionPercentage);

// حساب النسبة الكلية للإنجاز
const overallCompletion = computed(() => store.overallCompletionPercentage);

// تحقق من كون المرحلة الحالية هي الأخيرة
const isLastStep = computed(() => currentStepIndex.value === totalSteps - 1);

// متغير التحميل للتحكم في حالة الزر "Step"
const loading = ref(false);

// دوال التنقل
const previousStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--;
  }
};

const saveFlag=ref(false);
const save = async(index: number)=>{
  const step = steps[index];
  if(step.save){
      await step.save();
      saveFlag.value=true;
      setTimeout(()=>{
        saveFlag.value=false;
      },2000);
    }
}

const goToStep = async(index: number) => {
  try {
    loading.value = true;
    
    const step = steps[index];
    await save(index);

    currentStepIndex.value = index;
  } catch (error) {
    console.error("خطأ أثناء الحفظ:", error);
    toast.error(t('steps.saveError'));
  } finally {
    loading.value = false;
  }
};

// دالة الانتقال للأمام (زر "Step")
const handleStep = async () => {
  try {
    loading.value = true;
    
    // حفظ البيانات للمرحلة الحالية
    const step = steps[currentStepIndex.value];
    await save(currentStepIndex.value);

    // الانتقال إلى الخطوة التالية
    if (currentStepIndex.value < totalSteps - 1) {
      currentStepIndex.value++;
    }
    else{
      toast.success(t('steps.processCompleted'));
    }
  } catch (error) {
    console.error("خطأ أثناء الحفظ:", error);
    toast.error(t('steps.saveError'));
  } finally {
    loading.value = false;
  }
};

// دوال قبول ورفض الطلب في الخطوات الأخيرة
const accept = async () => {
  toast.success(t('steps.acceptSuccess'));
};

const reject = () => {
  toast.info(t('steps.rejectInfo'));
  store.resetStore();
  currentStepIndex.value = 0;
};

// مراقبة اسم المستند
const documentName = computed(() => store.documentName);

// تحميل الوثيقة عند بدء المكون
onMounted(async () => {
  const query = { ...route.query };
  const docId=query.doc;
  if(docId)
  {
    store.setDocumentName(docId.toString());
  await store.loadDocument();}
  else{
    toast.error(t('steps.loadDocumentError'));
  }
});

// مراقبة تغييرات اسم المستند
watch(documentName, async (newName) => {
  if(newName){
    loading.value = true;
    try {
      await store.loadDocument();
      console.log('تم تحديث المستند إلى:', newName);
    } catch (error) {
      console.error('خطأ أثناء تحديث المستند:', error);
      toast.error(t('steps.loadDocumentError'));
    } finally {
      loading.value = false;
    }
  }
});

const isAutosaveDone=ref(true);
 const intervalId=ref<number|undefined>(undefined);
 
 const startAutoSave=()=> {
       intervalId.value = setInterval(() => {
        // Your logic here
        if(isAutosaveDone.value){ 
    isAutosaveDone.value=false;
    const step=steps[currentStepIndex.value];
    const save=step.save;
    if(save){
      save().then(()=>{
        isAutosaveDone.value=true;
      });
    }}
       
      }, 10000); 
    }
  
    const stopAutoSave=() =>{
      if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = undefined;
      }
    }

const stepsModal = ref(false);

const modalFromQuery = computed(() => route.query.modal === 'true');

watch(
  () => route.query.modal,
  (newModalState) => {
    stepsModal.value = newModalState === 'true';
  },
  { immediate: true }
);

// دوال للتحكم في المودال
const toggleModal = () => {
  stepsModal.value = !stepsModal.value;
  updateQuery();
};

const closeModal = () => {
  if(stepsModal.value === false){
    router.push("/home");
  }
  else{
    stepsModal.value = false;
    updateQuery();
  }
};

// تحديث الـ query params بناءً على حالة المودال
const updateQuery = () => {
  const query = { ...route.query };
  if (stepsModal.value) {
    query.modal = 'true';
  } else {
    delete query.modal;
  }
  router.push({ query }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err;
    }
  });
};
</script>

<style scoped>
.auto-save-icon {
  width: 20px;
  aspect-ratio: 1;
  

  padding: 10%;

  background: linear-gradient(225deg, rgb(110, 110, 110) 50%, rgb(110, 110, 110) 51%); /* Initial gradient */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: smoothGradient 2s ease infinite;
}

.auto-save-icon-fill {
  width: 100%;
  height: 100%;

  background-color: #fff;
}
@keyframes smoothGradient {
  0% {
    background-size: 100% 100%;
  }
  50% {
    background-size: 0% 0%;
  }
  100% {
    background-size: 100% 100%;
  }
}
.autosave-overlay{
  background-color: rgb(199, 198, 198);
  transform: rotate(45deg);
}

.loading-icon {
  width: 100px;
  aspect-ratio: 1;
  

  padding: 5%;

  background: linear-gradient(225deg, rgb(88, 208, 73) 50%, rgb(88, 208, 73) 51%); /* Initial gradient */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: smoothGradient 2s ease infinite;
}

.loading-icon-fill {
  width: 100%;
  height: 100%;

  background-color: #fff;
}

.loading-overlay{
  background-color: rgb(199, 198, 198);
  transform: rotate(45deg);
}
</style>