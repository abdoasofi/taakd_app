<!-- src/pages/steps.vue -->
<template>
  <Header />
  <div class="lg:grid lg:grid-cols-12 lg:container py-8 bg-bg">
    <!-- Sidebar -->
    <div class="col-span-4 lg:order-2 relative">
      <div class="sticky top-4">
        <div class="pb-3 font-medium text-primary text-base">
          <p>{{ $t('document_name') }}: {{ docName }}</p>
          <p v-if="docName">{{ $t('model_steps_instructions') }} {{ overallCompletion }}% {{ $t('completed') }}</p>
        </div>
        <div class="py-3 grid grid-cols-6 lg:flex lg:flex-col lg:gap-4 w-full">
          <StepIcon
            v-for="(step, index) in steps"
            :key="index"
            :process="currentStepIndex === index"
            :complete="currentStepIndex > index"
            :label="`${$t('step')} ${index + 1}`"
            :desc="step.description"
            :percentageCompleted="stepsCompletionPercentages[index + 1]"
            @click="goToStep(index)"
          />
        </div>
        <div class="py-3 lg:hidden flex justify-end text-secondary text-base">
          <button @click="toggleAllStepsModal">
            {{ $t('all_steps') }} ({{ steps.length }})<span class="inline-block mx-1">&rarr;</span>
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
  <div class="bg-[#F0F0F0] fixed lg:static bottom-0 w-screen h-fit">
    <div class="container py-4 flex w-full justify-between items-center">
      <!-- Auto Saving Indicator -->
      <div class="lg:flex justify-start grow lg:gap-2">
        <svg width="30" height="30" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14.0355" y="40.5156" width="37.449" height="37.449" transform="rotate(-45 14.0355 40.5156)" stroke="#F7F7F7" stroke-width="5"/>
          <mask id="mask0_175_7016" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="7" y="7" width="67" height="67">
            <rect width="66.1225" height="66.1225" transform="translate(7.64355 7.23535)" fill="#DE3500"/>
          </mask>
          <g mask="url(#mask0_175_7016)">
            <rect x="14.0365" y="40.5166" width="37.449" height="37.449" transform="rotate(-45 14.0365 40.5166)" stroke="#81C045" stroke-width="5"/>
          </g>
        </svg>
        <div class="text-xs text-[#1D1B20]">{{ $t('auto_saving') }}</div> 
      </div>

      <!-- Navigation Buttons -->
      <div v-if="!isLastStep" class="flex gap-2">
        <button 
          class="flex items-center justify-center px-4 py-2 text-white bg-secondary rounded-[100px] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300" 
          @click="previousStep" 
          :disabled="currentStepIndex === 0" 
          v-if="currentStepIndex > 0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2 transform rotate-180">
            <path d="M10 0L8.59 1.41L14.17 7H0V9H14.17L8.59 14.59L10 16L16 10L10 0Z" fill="currentColor"/>
          </svg>
          {{ $t('step') }} {{ currentStepIndex }} <!-- اسم المرحلة التي سيتم الرجوع إليها -->
        </button>
        
        <Button 
          level="primary" 
          @clicked="handleStep" 
        >
          {{ $t('step') }} {{ currentStepIndex + 1 }} &rarr; <!-- عرض رقم المرحلة الحالية -->
        </Button>
      </div>

      <!-- Accept/Reject Buttons for Last Step -->
      <div class="lg:flex justify-end grow lg:gap-2" v-if="isLastStep">
        <button 
          class="flex items-center justify-center px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300" 
          @click="previousStep" 
          :disabled="currentStepIndex === 0" 
          v-if="currentStepIndex > 0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2 transform rotate-180">
            <path d="M10 0L8.59 1.41L14.17 7H0V9H14.17L8.59 14.59L10 16L16 10L10 0Z" fill="currentColor"/>
          </svg>
          {{ $t('step') }} {{ currentStepIndex }} <!-- اسم المرحلة التي سيتم الرجوع إليها -->
        </button>
        
        <Button level="other" @clicked="reject">{{ $t('reject') }}</Button>
        <Button level="other" @clicked="accept">{{ $t('accept') }}</Button>
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
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
import { createRequestList } from '../data/request';

// استيراد route
const route = useRoute();

// استيراد الستور
const store = useVerificationRequestStore();
const toast = useToast();

// الحصول على documentName من route params
const documentNameFromRoute = computed(() => route.params.documentName as string);
const docName = computed(() => store.documentName);
// // استقبال documentName كـ prop
// const props = defineProps({
//   docName: {
//     type: String,
//     required: true,
//   },
// });
const currentStepIndex = ref(0);
const totalSteps = 6;

// تعريف المراحل مع المكونات والوصف ودوال التحقق
const steps = [
  {
    component: Step1,
    description: "Personal Information",
    save: store.saveStep1,
  },
  {
    component: Step2,
    description: "Education Information",
    save: store.saveStep2,
  },
  {
    component: Step3,
    description: "Employment History",
    save: store.saveStep3,
  },
  {
    component: Step4,
    description: "Professional Qualifications",
    save: store.saveStep4,
  },
  {
    component: Step5,
    description: "Review Information"
  },
  {
    component: Step6,
    description: "Final Verification",
    save: store.saveStep6,
  },
];

const currentStepComponent = computed(() => steps[currentStepIndex.value].component);

const currentStepData = computed(() => {
  return (store as any)[`step${currentStepIndex.value + 1}`];
});

// حساب نسب الإنجاز لكل مرحلة باستخدام الـ getter
const stepsCompletionPercentages = computed(() => store.stepsCompletionPercentage);

// حساب النسبة الكلية للإنجاز
const overallCompletion = computed(() => store.overallCompletionPercentage);

// تحقق من كون المرحلة الحالية هي الأخيرة
const isLastStep = computed(() => currentStepIndex.value === totalSteps - 1);

// تعريف متغير التحميل للتحكم في حالة الزر "Step"
const loading = ref(false);

// دالة التنقل للخلف
const previousStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--;
  }
};

// دالة الانتقال إلى خطوة معينة
const goToStep = async(index: number) => {
  currentStepIndex.value = index;
  try {
    loading.value = true;
    
    if(currentStepIndex.value===1){
      await store.saveStep1();
    }
    else if(currentStepIndex.value===2){
      await store.saveStep2();
    }else if(currentStepIndex.value===3){
      await store.saveStep3();
    }
    else if(currentStepIndex.value===4){
      await store.saveStep4();
    }
    else if(currentStepIndex.value===6){
      await store.saveStep6();
    }

  } catch (error) {
    console.error("خطأ أثناء الحفظ:", error);
  } finally {
    loading.value = false;
  }
};

// دالة التنقل للأمام (زر "Step")
const handleStep = async () => {
  try {
    loading.value = true;
    
    if(currentStepIndex.value === 0){
      await store.saveStep1();
    }
    else if(currentStepIndex.value === 1){
      await store.saveStep2();
    }
    else if(currentStepIndex.value === 2){
      await store.saveStep3();
    }
    else if(currentStepIndex.value === 3){
      await store.saveStep4();
    }
    else if(currentStepIndex.value === 5){
      await store.saveStep6();
    }

    // الانتقال إلى الخطوة التالية
    if (currentStepIndex.value < totalSteps - 1) {
      currentStepIndex.value++;
    }
  } catch (error) {
    console.error("خطأ أثناء الحفظ:", error);
  } finally {
    loading.value = false;
  }
};

// دالة قبول الطلب في خطوة 6
const accept = async () => {
  toast.success("تم قبول الطلب بنجاح.");
};

// دالة رفض الطلب
const reject = () => {
  toast.info("تم رفض الطلب.");
  store.resetStore();
  currentStepIndex.value = 0;
};

// دالة فتح نموذج عرض جميع المراحل (إذا كنت ستستخدمه)
const toggleAllStepsModal = () => {
  // Implement modal toggle logic
};

// مراقبة تغييرات اسم المستند
const documentName = computed(() => store.documentName);

// تحميل الوثيقة عند بدء المكون
onMounted(async () => {
  if(docName.value){
    store.setDocumentName(docName.value);
    loading.value = true;
    await store.loadDocument();
    loading.value = false;
  }
  else{
    toast.error('لم يتم تحديد اسم المستند.');
  }
});

// لو كنت تريد إعادة تحميل البيانات عندما يتغير documentName, استخدم watcher:
watch(documentName, async (newName) => {
  if(newName){
    loading.value = true;
    await store.loadDocument();
    loading.value = false;
  }
});
</script>

<style scoped>
/* أضف أي تنسيقات إضافية هنا إذا لزم الأمر */
</style>