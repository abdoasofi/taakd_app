<!-- contact.vue -->
<template>
  <div class="pt-6">
    <div class="flex gap-2 mb-2 items-center">
      <div class="w-10 lg:w-14 shrink-0">
        <StyledIcon :status="1" :scale="1" icon="md-verified-outlined" />
      </div>
      <Heading level="secondary" class="text-black" tag="h2">
        {{ $t('contact.heading') }}
      </Heading>
    </div>
    <div>
      <div class="mt-3">
        <h3 class="text-lg font-medium mb-3 text-black">{{ $t('contact.contactDetails') }}</h3>
        <div class="lg:grid lg:grid-cols-2 lg:gap-3 lg:w-1/2">
          <div class="py-3">
            <StyledInput
              id="mobile"
              name="mobile_number"
              :labelText="$t('contact.mobileNumber')"
              :infoText="$t('contact.mobileNumberInfo')"
              inputType="text"
              v-model="mobileNumber"
              :isValid="store.home.mobile_number.isValid"
              :validationMessage="store.home.mobile_number.validationMessage"
              :placeholder="$t('contact.mobileNumberPlaceholder')"
              :class="{
                'border-red-500': !store.home.mobile_number.isValid,
                'border-green-500': store.home.mobile_number.isValid
              }"
              @input="validateMobileNumber"
            />
            <small class="block text-[10px] font-normal">{{ $t('contact.supportingText') }}</small>
          </div>
          <FieldContainer>
            <Autocomp
              id="country"
              name="country"
              :labelText="$t('contact.country')"
              :infoText="$t('contact.countryInfo')"
              inputType="text"
              :options="optionCountry"
              v-model="country"
              @input-change="handleCountryChange"
              :isValid="store.home.country.isValid"
              :validationMessage="store.home.country.validationMessage"
              :isMandatory="true"
              :placeholder="$t('contact.countryPlaceholder')"
            />
          </FieldContainer>
        </div>
        <div class="py-3 text-sm">
          <span class="text-sm block mb-3">{{ $t('contact.didYouObtainDegreeOrDiploma') }}</span>
          <div class="flex flex-col gap-2">
            <div>
              <input
                type="radio"
                name="is_degree_or_diploma"
                id="yes"
                :value="true"
                v-model="isDegreeOrDiploma"
              />
              <label for="yes">{{ $t('contact.degreeOrDiplomaYes') }}</label>
            </div>
            <div>
              <input
                type="radio"
                name="is_degree_or_diploma"
                id="no"
                :value="false"
                v-model="isDegreeOrDiploma"
              />
              <label for="no">{{ $t('contact.degreeOrDiplomaNo') }}</label>
            </div>
          </div>
          <FadeInOut>
            <p v-if="store.home.is_degree_or_diploma.isValid === false" class="text-warn text-[10px]">
              {{ store.home.is_degree_or_diploma.validationMessage }}
            </p>
          </FadeInOut>
          <FadeInOut>
            <p v-if="store.home.is_degree_or_diploma.isValid === true" class="text-secondary text-[10px]">
              {{ store.home.is_degree_or_diploma.validationMessage }}
            </p>
          </FadeInOut>
        </div>
        <div class="py-3">
          <span class="text-sm font-medium block mb-2">{{ $t('contact.availableTime') }}</span>
          <div class="grid grid-cols-2 gap-3 text-sm lg:w-1/2">
            <div class="w-full">
              <StyledInput
                id="from"
                name="from_time"
                :labelText="$t('contact.fromTime')"
                :infoText="$t('contact.fromTimeInfo')"
                inputType="time"
                v-model="fromTime"
                :isValid="store.home.from_time.isValid"
                :validationMessage="store.home.from_time.validationMessage"
                :placeholder="$t('contact.fromTimePlaceholder')"
              />
            </div>
            <div class="w-full">
              <StyledInput
                id="to"
                name="to_time"
                :labelText="$t('contact.toTime')"
                :infoText="$t('contact.toTimeInfo')"
                inputType="time"
                v-model="toTime"
                :isValid="store.home.to_time.isValid"
                :validationMessage="store.home.to_time.validationMessage"
                :placeholder="$t('contact.toTimePlaceholder')"
              />
            </div>
          </div>
        </div>
        <div class="pt-5 flex w-full justify-center">
          <Button
            level="other"
            @click="save"
            :disabled="loading"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <span v-if="loading">{{ $t('contact.saving') }}</span>
            <span v-else>{{ $t('contact.saveButton') }}</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, onUpdated } from 'vue';
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import { useLocation } from '../../stores/locations';
import Button from '../../components/button.vue';
import Heading from '../../components/heading.vue';
import StyledInput from '../../components/styledInput.vue';
import FieldContainer from '../../components/fieldContainer.vue';
import Autocomp from '../../components/autocomp.vue';
import { useToast } from 'vue-toastification';
import FadeInOut from '../../components/fadeInOut.vue'; // تأكد من استيراده
import StyledIcon from '../../components/styledIcon.vue';

const store = useVerificationRequestStore();
const toast = useToast();

const locations = useLocation();
const location = locations.getLocation()

const optionCountry = computed(() => {
  if (location && location.data) {
    return location.data
      .filter((loc) => loc.location_type === 'Country')
      .map((loc) => ({
        label: loc.location_name,
        value: loc.location_name,
      }))
  }
  return [] // إرجاع مصفوفة فارغة إذا لم تتوفر البيانات
})

const loading = ref(false);

// onMounted(async () => {
//   loading.value = true;
//   await store.loadDocument();
//   loading.value = false;
// });
// onUpdated(async () => {
//   await store.loadDocument();
// });

const mobileNumber = computed({
  get: () => store.home.mobile_number.value,
  set: (val: string) => store.updateHome('mobile_number', { value: val })
});

const country = computed({
  get: () => store.home.country.value,
  set: (val: string) => store.updateHome('country', { value: val })
});

const fromTime = computed({
  get: () => store.home.from_time.value,
  set: (val: string) => store.updateHome('from_time', { value: val })
});

const toTime = computed({
  get: () => store.home.to_time.value,
  set: (val: string) => store.updateHome('to_time', { value: val })
});

const isDegreeOrDiploma = computed({
  get: () => store.home.is_degree_or_diploma.value,
  set: (val: boolean | string) => {
    const booleanVal = val === 'true' || val === true;
    store.updateHome('is_degree_or_diploma', { value: booleanVal });
  }
});

const handleCountryChange = (value) => {
  store.home.country.value = value.value;
};

// دالة للتحقق من صحة رقم الهاتف
const validateMobileNumber = () => {
  // تعبير منتظم لقبول أي مفتاح دولة متبوعًا بـ "-" ثم رقم الهاتف
  const regex = /^\+\d{1,3}-\d{7,15}$/;
  const isValid = regex.test(store.home.mobile_number.value);
  store.updateHome('mobile_number', {
    isValid,
    validationMessage: isValid
      ? ''
      : $t('contact.validation.mobileNumberInvalid'),
  });
};

// دالة الحفظ
const save = async () => {
  const { home } = store;
  let isValid = true;

  // تحقق من رقم الهاتف
  // validateMobileNumber();
  // if (!home.mobile_number.isValid) {
  //   isValid = false;
  // }

  // // تحقق من التوقيت
  // if (!home.from_time.value) {
  store.updateHome('from_time', {
    isValid: false,
    validationMessage: $t('contact.validation.timeRequired'),
  });
  //   isValid = false;
  // } else {
  store.updateHome('from_time', {
    isValid: true,
    validationMessage: '',
  });
  // }

  // if (!home.to_time.value) {
  store.updateHome('to_time', {
    isValid: false,
    validationMessage: $t('contact.validation.timeRequired'),
  });
  //   isValid = false;
  // } else {
  store.updateHome('to_time', {
    isValid: true,
    validationMessage: '',
  });
  // }

  // // تحقق من البلد
  // if (!home.country.value) {
  store.updateHome('country', {
    isValid: false,
    validationMessage: $t('contact.validation.countryRequired'),
  });
  //   isValid = false;
  // } else {
  store.updateHome('country', {
    isValid: true,
    validationMessage: '',
  });
  // }

  // تحقق من الدرجة أو الدبلوم
  if (home.is_degree_or_diploma.value === null || home.is_degree_or_diploma.value === undefined) {
    store.updateHome('is_degree_or_diploma', {
      // isValid: false,
      validationMessage: $t('contact.validation.degreeOrDiplomaRequired'),
    });
    isValid = false;
  } else {
    store.updateHome('is_degree_or_diploma', {
      // isValid: true,
      validationMessage: '',
    });
  }

  // if (!isValid) {
  //   toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
  //   return;
  // }

  try {
    loading.value = true;
    const updatedFields = {
      country: store.home.country.value,
      mobile_number: store.home.mobile_number.value,
      is_degree_or_diploma: store.home.is_degree_or_diploma.value,
      from_time: store.home.from_time.value,
      to_time: store.home.to_time.value,
    };
    await store.updateDocumentFields(updatedFields);
    toast.success($t('contact.saveSuccess'));
  } catch (error) {
    console.error('Error saving data:', error);
    toast.error($t('contact.saveError'));
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Custom styles if needed */
</style>