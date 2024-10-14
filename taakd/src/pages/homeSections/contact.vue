<!-- contact.vue -->
<template>
  <div class="pt-6">
    <div class="flex gap-2 mb-2">
      <div class="w-7 lg:w-9 shrink-0">
        <VerificationInformation />
      </div>
      <Heading level="secondary" class="text-black" tag="h2">
        Here you can follow the progress of your report and communicate with Taakd
      </Heading>
    </div>
    <div>
      <div class="mt-3">
        <h3 class="text-lg font-medium mb-3 text-black">Contact details</h3>
        <div class="lg:grid lg:grid-cols-2 lg:gap-3 lg:w-1/2">
          <div class="py-3">
            <StyledInput
              id="mobile"
              name="mobile_number"
              labelText="Mobile Number"
              infoText="mobile number"
              inputType="text"
              v-model="mobileNumber"
              :isValid="store.home.mobile_number.isValid"
              :validationMessage="store.home.mobile_number.validationMessage"
              placeholder="Enter your mobile number"
              :class="{
                'border-red-500': !store.home.mobile_number.isValid,
                'border-green-500': store.home.mobile_number.isValid
              }"
              @input="validateMobileNumber"
            />
            <small class="block text-[10px] font-normal">Supporting text</small>
          </div>
          <FieldContainer>
            <Autocomp
              id="country"
              name="country"
              labelText="Country"
              infoText="Select your country"
              inputType="text"
              :options="optionCountry"
              :v-model="country"
              @input-change="handleCountryChange"
              :isValid="store.home.country.isValid"
              :validationMessage="store.home.country.validationMessage"
              :isMandatory="true"
              placeholder="Select your country"
            />
          </FieldContainer>
        </div>
        <div class="py-3 text-sm">
          <span class="text-sm block mb-3">Did you obtain the degree or diploma? *</span>
          <div class="flex flex-col gap-2">
            <div>
              <input
                type="radio"
                name="is_degree_or_diploma"
                id="yes"
                :value="true"
                v-model="isDegreeOrDiploma"
              />
              <label for="yes">Yes, I obtained</label>
            </div>
            <div>
              <input
                type="radio"
                name="is_degree_or_diploma"
                id="no"
                :value="false"
                v-model="isDegreeOrDiploma"
              />
              <label for="no">No, I did not obtain</label>
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
          <span class="text-sm font-medium block mb-2">Available Time</span>
          <div class="grid grid-cols-2 gap-3 text-sm lg:w-1/2">
            <div class="w-full">
              <StyledInput
                id="from"
                name="from_time"
                labelText="From Time"
                infoText="From Time"
                inputType="time"
                v-model="fromTime"
                :isValid="store.home.from_time.isValid"
                :validationMessage="store.home.from_time.validationMessage"
                placeholder="HH:MM"
              />
            </div>
            <div class="w-full">
              <StyledInput
                id="to"
                name="to_time"
                labelText="To Time"
                infoText="To Time"
                inputType="time"
                v-model="toTime"
                :isValid="store.home.to_time.isValid"
                :validationMessage="store.home.to_time.validationMessage"
                placeholder="HH:MM"
              />
            </div>
          </div>
        </div>
        <div class="pt-5 flex w-full justify-center">
          <Button level="other" @click="save" :disabled="loading" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <span v-if="loading">جاري الحفظ...</span>
            <span v-else>save -></span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import { useLocation } from '../../stores/locations';
import Button from '../../components/button.vue';
import Heading from '../../components/heading.vue';
import StyledInput from '../../components/styledInput.vue';
import FieldContainer from '../../components/fieldContainer.vue';
import Autocomp from '../../components/autocomp.vue';
import VerificationInformation from '../../components/Icons/verificationInformation.vue';
import { useToast } from 'vue-toastification';
import FadeInOut from '../../components/fadeInOut.vue'; // تأكد من استيراده

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

onMounted(async () => {
  loading.value = true;
  await store.loadDocument();
  loading.value = false;
});

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
    validationMessage: isValid ? '' : 'يرجى إدخال رقم هاتف بصيغة صحيحة (+<CountryCode>-<PhoneNumber>).',
  });
};

// دالة الحفظ
const save = async () => {
  const { home } = store;
  let isValid = true;

  // تحقق من رقم الهاتف
  validateMobileNumber();
  if (!home.mobile_number.isValid) {
    isValid = false;
  }

  // تحقق من التوقيت
  if (!home.from_time.value) {
    store.updateHome('from_time', {
      isValid: false,
      validationMessage: 'يرجى تحديد الوقت.',
    });
    isValid = false;
  } else {
    store.updateHome('from_time', {
      isValid: true,
      validationMessage: '',
    });
  }

  if (!home.to_time.value) {
    store.updateHome('to_time', {
      isValid: false,
      validationMessage: 'يرجى تحديد الوقت.',
    });
    isValid = false;
  } else {
    store.updateHome('to_time', {
      isValid: true,
      validationMessage: '',
    });
  }

  // تحقق من البلد
  if (!home.country.value) {
    store.updateHome('country', {
      isValid: false,
      validationMessage: 'يرجى اختيار بلد.',
    });
    isValid = false;
  } else {
    store.updateHome('country', {
      isValid: true,
      validationMessage: '',
    });
  }

  // تحقق من الدرجة أو الدبلوم
  if (home.is_degree_or_diploma.value === null || home.is_degree_or_diploma.value === undefined) {
    store.updateHome('is_degree_or_diploma', {
      isValid: false,
      validationMessage: 'يرجى اختيار ما إذا كنت حصلت على درجة أو دبلوم.',
    });
    isValid = false;
  } else {
    store.updateHome('is_degree_or_diploma', {
      isValid: true,
      validationMessage: '',
    });
  }

  if (!isValid) {
    toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
    return;
  }

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
    toast.success('تم حفظ البيانات بنجاح.');
  } catch (error) {
    console.error('Error saving data:', error);
    toast.error('حدث خطأ أثناء حفظ البيانات.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
