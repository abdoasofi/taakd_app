<!-- home.vue -->
<template>
  <BackgroundLayout class="relative">
    <div class="pb-6">
      <BaseContainer>
        <div
          :style="{ backgroundImage: `url(${bg1})` }"
          class="z-0 bg-no-repeat bg-cover aspect-[1] h-60 lg:h-90 absolute -top-2 -right-2"
        ></div>

        <div class="z-10 relative">
          <div class="w-full py-3 pb-20">
            <div class="aspect-[1.376] h-10 mb-2 m-auto">
              <!-- شعار أو أيقونة هنا -->
              <!-- ... (SVG أو أي مكون آخر) -->
              <svg width="150" height="150" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_944_13802)">
                            <path d="M55.9662 21.9149V24.1236L62.7031 21.8174V25.0489L53.3271 28.1221V22.8374L55.9662 21.9149Z" fill="#81C045"/>
                            <mask id="mask0_944_13802" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-15" y="-15" width="102" height="102">
                            <path d="M86.625 -14.625H-14.625V86.625H86.625V-14.625Z" fill="white"/>
                            </mask>
                            <g mask="url(#mask0_944_13802)">
                            <path d="M34.9153 24.0023H28.6181L32.6043 17.4961H27.4162L23.9728 24.0258C24.0196 25.8183 24.6328 27.2808 25.3406 28.2473H35.175C36.0243 28.2473 36.6375 28.4592 37.0612 28.9317C37.4625 29.3798 37.5796 29.9461 37.5796 30.6061V32.422H21.4256V30.3698C21.4256 28.0823 21.119 26.408 19.9162 25.0167C18.7134 23.6255 16.8028 23.0592 14.3971 23.0592H13.5009V27.3042H14.7984C15.7181 27.3042 16.2609 27.5873 16.6612 28.1058C17.0146 28.5773 17.1806 29.167 17.1806 29.992V32.4211H9.32715V36.6661H41.8246V30.9352C41.8246 29.0011 41.3765 27.0436 40.3153 25.8408C39.089 24.473 37.3434 24.0014 34.9143 24.0014" fill="#3F4457"/>
                            <path d="M55.9775 28.6214V32.422H49.3241L49.3597 20.3686H46.6691L49.3653 18.247L49.3682 17.4961H45.1232L45.0791 36.667H60.2225V27.2302L55.9775 28.6214Z" fill="#3F4457"/>
                            <path d="M21.1207 46.8464C20.4682 47.4089 20.0866 48.2058 19.917 49.1836C19.9029 49.2605 19.8916 49.3393 19.8795 49.4189C19.811 49.913 19.811 50.4155 19.8795 50.9096C19.8907 50.9893 19.902 51.068 19.917 51.1449C20.0866 52.1227 20.4682 52.9186 21.1207 53.4839C22.0516 54.2893 23.1757 54.4946 24.7095 54.4946H25.3076L26.0848 53.3293V54.4946H28.931V45.833H24.7104C23.1766 45.833 22.0526 46.0383 21.1216 46.8455M26.0838 51.6493H24.4563C23.9032 51.6493 23.5085 51.5396 23.1926 51.3005C22.9198 51.0905 22.7445 50.8233 22.6816 50.4221C22.6545 50.2505 22.6545 50.0761 22.6816 49.9064C22.7445 49.5052 22.9198 49.2352 23.1926 49.0252C23.5085 48.788 23.9032 48.6783 24.4563 48.6783H26.0838V51.6483V51.6493Z" fill="#3F4457"/>
                            <path d="M31.2165 46.8464C30.564 47.4089 30.1843 48.2058 30.0127 49.1836C29.9996 49.2605 29.9874 49.3393 29.9771 49.4189C29.9087 49.913 29.9087 50.4155 29.9771 50.9096C29.9874 50.9893 29.9996 51.068 30.0127 51.1449C30.1843 52.1227 30.564 52.9186 31.2165 53.4839C32.1502 54.2893 33.2715 54.4946 34.8043 54.4946H35.4165L36.1937 53.3293V54.4946H39.0249V45.833H34.8043C33.2705 45.833 32.1502 46.0383 31.2165 46.8455M36.1796 51.6493H34.5521C33.998 51.6493 33.6043 51.5396 33.2884 51.3005C33.0155 51.0905 32.8402 50.8233 32.7774 50.4221C32.7502 50.2505 32.7502 50.0761 32.7765 49.9064C32.8412 49.5052 33.0165 49.2352 33.2893 49.0252C33.6052 48.788 33.999 48.6783 34.553 48.6783H36.1805V51.6483L36.1796 51.6493Z" fill="#3F4457"/>
                            <path d="M57.37 41.0869V45.8325H55.9938C54.4591 45.8325 53.336 46.0378 52.4022 46.8441C51.7488 47.4094 51.3682 48.2053 51.1975 49.1859C51.1844 49.2628 51.1722 49.3416 51.161 49.4212C51.0935 49.9153 51.0935 50.4187 51.161 50.9128C51.1722 50.9925 51.1844 51.0713 51.1975 51.1491C51.3682 52.1288 51.7488 52.9256 52.4022 53.4891C53.336 54.2972 54.4591 54.5025 55.9938 54.5025H60.2191V41.0859H57.37V41.0869ZM57.37 51.6553H55.7407C55.1875 51.6553 54.7919 51.5438 54.475 51.3066C54.2022 51.0966 54.0269 50.8275 53.9632 50.4253C53.936 50.2547 53.936 50.0803 53.9632 49.9097C54.0269 49.5075 54.2022 49.2394 54.475 49.0294C54.791 48.7922 55.1866 48.6806 55.7407 48.6806H57.37V51.6544V51.6553Z" fill="#3F4457"/>
                            <path d="M50.69 42.7944H47.2129L43.7057 47.0797V41.0947H40.8604V54.4972H43.7057V51.4541L44.5663 50.3853L47.93 54.4972H51.4082L46.4675 48.0285L50.69 42.7944Z" fill="#3F4457"/>
                            <path d="M15.386 51.6515H12.1432L12.1675 43.5721L12.1713 42.1499L12.1732 41.4121H9.29785V54.4968H18.2313V49.1034H15.386V51.6515Z" fill="#3F4457"/>
                            <path d="M12.1687 43.59V45.0853L16.7296 43.5244V45.7116L10.3818 47.7919V44.2144L12.1687 43.59Z" fill="#81C045"/>
                            </g>
                            </g>
                            <defs>
                            <clipPath id="clip0_944_13802">
                            <rect width="72" height="72" fill="white"/>
                            </clipPath>
                            </defs>
              </svg>
            </div>
          </div>
          <h1 class="text-sm text-secondary font-bold my-2 text-center w-full pt-5">
            {{ $t('home.trustVerifySucceed') }}
          </h1>

          <!-- إضافة سلايدر Swiper هنا -->
          <Swiper
            v-if="requestList.data && requestList.data.length > 0"
            @swiper="onSwiper"
            :modules="[Navigation, Pagination]"
            navigation
            :pagination="{ clickable: true }"
            :spaceBetween="50"
            :slidesPerView="1"
            @slideChange="onSlideChange"
            class="my-8 lg:py-10 lg:px-40"
          >
            <SwiperSlide v-for="(request, index) in requestList.data" :key="request.name || index">
              <div class="grid grid-cols-3">
                <ProcessItem
                  :label="$t('home.processItem.jobRequest')"
                  :status="getStatusOrder(request.application_status).request"
                  icon="io-document-text-outline"
                />
                <ProcessItem
                  :label="$t('home.processItem.verification')"
                  :status="getStatusOrder(request.application_status).verf"
                  icon="md-verified-outlined"
                />
                <ProcessItem
                  :label="$t('home.processItem.reviewReportWriting')"
                  :status="getStatusOrder(request.application_status).report"
                  icon="md-ratereview-outlined"
                />
              </div>
            </SwiperSlide>
          </Swiper>
          <div v-else class="text-center text-gray-500">
            {{ $t('home.noRequestsAvailable') }}
          </div>

          <!-- الأزرار والشروط المعتمدة على السجل الحالي -->
          <div class="flex justify-center mt-4">
            <Button
              v-if="currentProcess.request && !currentProcess.verf"
              @click="fill_the_form_now"
              type="submit"
              class="bg-secondary hover:bg-secondary_hover px-4 py-2 text-white"
            >
              {{ $t('home.fillTheFormNow') }} <span class="mx-2">-&gt;</span>
            </Button>

            <Button
              v-if="currentProcess.request == 2 && currentProcess.verf == 2 && currentProcess.report == 2"
              @click="printDiv"
              class="bg-secondary hover:bg-secondary_hover px-4 py-2 text-white"
            >
              {{ $t('home.viewReport') }}
            </Button>
          </div>

          <div
            v-if="currentProcess.request == 2 && currentProcess.verf == 1 && currentProcess.report == 0"
            class="gap-3 w-full flex flex-col justify-center items-center mt-4"
          >
            <span class="text-primary font-bold text-lg block">{{ $t('home.thanksForInformation') }}</span>
            <span class="text-sm font-medium block">{{ $t('home.thanksForInformation') }}</span>
            <span class="text-xs font-medium block">{{ $t('home.orderId') }}</span>
            <Button class="w-fit" type="submit">
              <i class="inline-block w-4 h-4 rounded-full bg-mid_gray"></i> {{ $t('home.rate') }}
            </Button>
          </div>
          <!-- <Rating
            size="md"
            label="Rating"
          /> -->
        </div>
      </BaseContainer>
    </div>

    <!-- مكونات بناءً على الحالة الحالية -->
    <JobRequest v-if="currentProcess.request == 1 && currentProcess.verf == 0 && currentProcess.report == 0" />
    <div class="hidden">
      <div id="yourDivId">
        <Report />
      </div>
    </div>
    <Review v-if="!currentProcess.request" />
    <Verification v-if="currentProcess.request == 2 && currentProcess.verf == 2 && currentProcess.report == 1" />
    <Contact :location="location" v-if="currentProcess.request == 2 && currentProcess.verf == 1 && currentProcess.report == 0" />

    <!-- التنبيهات -->
    <div class="fixed z-10 bottom-0 py-6 px-4 flex flex-col gap-2">
      <div v-for="(alert, index) in alerts" :key="index">
        <SnackBar :isDanger="true" :message="alert.message" @close="removeAlert(index)" />
      </div>
    </div>
  </BackgroundLayout>
</template>

<script setup>
import router from '@/router';
import { ref, watch, reactive, onMounted, computed } from 'vue';
import { Button, Rating } from 'frappe-ui';
import BaseContainer from '../components/baseContainer.vue';
import ProcessItem from './homeSections/processItem.vue';
import Contact from './homeSections/contact.vue';
import SnackBar from '../components/snackBar.vue';
import JobRequest from './homeSections/jobRequest.vue';
import Review from './homeSections/review.vue';
import Verification from './homeSections/verification.vue';
import { location } from '../data/useAddressLogic';
import validateInputContact from '../data/validate/validateInputContact';
import { createAllRequestsList } from '../data/request';
import { useVerificationRequestStore } from '../stores/verificationRequest';
import BackgroundLayout from '../layouts/backgroundLayout.vue';
import bg1 from '@/assets/bg1.svg';
import printJS from 'print-js';
import Report from './stepsSections/report.vue';
import { useToast } from 'vue-toastification';

// استيراد مكونات Swiper من 'swiper/vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';

// استيراد أنماط Swiper الأساسية والخاصة بالوحدات
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const toast = useToast();
const store = useVerificationRequestStore();

const alerts = reactive([]);

const isLoading = ref(false);

const data = reactive({
  mobile_number: {
    value: true,
    isValid: null,
    validationMessage: null,
  },
  country: {
    value: '',
    isValid: null,
    validationMessage: null,
  },
  from_time: {
    value: '',
    isValid: null,
    validationMessage: null,
  },
  to_time: {
    value: '',
    isValid: null,
    validationMessage: null,
  },
  is_degree_or_diploma: {
    value: true,
    isValid: null,
    validationMessage: null,
  },
});

// دالة العودة
const goBack = () => {
  router.push('/steps');
};

// إضافة المرجع للمحتوى
const reportContent = ref(null);

// مرجع لسلايدر Swiper
const swiperRef = ref(null);

const triggerAlert = function(message) {
  alerts.push({ message });
  setTimeout(() => {
    alerts.shift(); // إزالة التنبيه تلقائيًا بعد مدة
  }, 3000);
};

const removeAlert = function(index) {
  alerts.splice(index, 1);
};

// دالة لمعالجة التعديلات عند ملء النموذج
function fill_the_form_now() {
  let validateRes = validateInputContact(data);
  if (validateRes !== true) {
    triggerAlert($t('home.validation.fillErrors'));
    return;
  } else {
    router.replace({ name: 'steps' });
  }
}

// جلب السجلات
const requestList = createAllRequestsList(['name', 'user_id', 'application_status', 'company_name', 'creation']);

// عملية الطلب الحالية
const currentIndex = ref(0);

// الحصول على السجل الحالي بناءً على الفهرس
const currentRequest = computed(() => requestList.data[currentIndex.value]);

// الحصول على الحالة الحالية بناءً على السجل الحالي
const currentProcess = computed(() => {
  if (!currentRequest.value) {
    console.log('لا يوجد طلب حالي.');
    return { request: -1, verf: -1, report: -1 };
  }
  const process = getStatusOrder(currentRequest.value.application_status);
  console.log('تم حساب currentProcess:', process);
  return process;
});

// دالة لتحويل application_status إلى عمليات
function getStatusOrder(processStr) {
  switch (processStr) {
    case 'New Request':
      return { request: 0, verf: 0, report: 0 };
    case 'In Progress':
      return { request: 1, verf: 0, report: 0 };
    case 'Submitted':
      return { request: 2, verf: 1, report: 0 };
    case 'Verification Started':
    case 'More Info Needed':
      return { request: 2, verf: 2, report: 0 };
    case 'Writing report':
      return { request: 2, verf: 2, report: 1 };
    case 'Report is ready':
      return { request: 2, verf: 2, report: 2 };
    default:
      console.warn('حالة التطبيق غير معروفة:', processStr);
      return { request: -1, verf: -1, report: -1 };
  }
}

// تعريف مرجع جديد لسلايدر Swiper
const swiperInstance = ref(null);

// دالة للحصول على مرجع السلايدر عند تهيئته
function onSwiper(swiper) {
  swiperInstance.value = swiper;
  console.log('Swiper initialized:', swiper);
}

// تحديث دالة تغيير السلايد لاستخدام مرجع السلايدر الجديد
function onSlideChange() {
  if (swiperInstance.value) {
    currentIndex.value = swiperInstance.value.activeIndex;
    console.log('تم تغيير السلايد. الفهرس الحالي:', currentIndex.value);
    if (currentRequest.value && currentRequest.value.application_status) {
      store.setDocumentName(currentRequest.value.name);
      console.log('اسم المستند الحالي:', currentRequest.value.name);
      console.log('الحالة الحالية:', currentProcess.value);
    } else {
      console.log('لا يوجد طلب حالي أو حالة التطبيق غير موجودة.');
    }
  } else {
    console.log('مرجع السلايدر غير موجود أو Swiper غير مهيأ.');
  }
}

// دالة الطباعة
const printDiv = () => {
  printJS({
    printable: 'yourDivId',
    type: 'html',
    targetStyles: ['*'], // يتضمن الأنماط من Tailwind CSS
  });
};

// تحميل الوثيقة عند بدء المكون
onMounted(async () => {
  if (currentRequest.value && currentRequest.value.name) {
    store.setDocumentName(currentRequest.value.name);
    await store.loadDocument();
    console.log('تم تحميل المستند:', currentRequest.value.name);
  } else {
    toast.error($t('home.loadDocumentError'));
    console.log('لم يتم تحديد اسم المستند أثناء التحميل.');
  }
});

// مراقبة تغييرات السجلات
watch(
  () => requestList.data,
  (newList) => {
    if (newList && newList.length > 0) {
      currentIndex.value = 0;
      store.setDocumentName(newList[0].name);
      console.log('تم تعيين الفهرس إلى 0 بناءً على البيانات الجديدة.');
      // currentProcess سيُحسب تلقائيًا عبر computed
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* أي أنماط إضافية إذا لزم الأمر */

/* تخصيص Swiper إذا لزم الأمر */
.swiper-button-next,
.swiper-button-prev {
  color: #3F4457; /* مثال على تخصيص لون الأزرار */
}

.swiper-pagination-bullet {
  background: #3F4457; /* لون النقاط */
}
</style>