<!-- /pages/stepsSections/step1.vue -->
<template>
  <div class="pt-3 container">
    <h1 class="text-3xl font-bold mb-3 text-black">{{ t('step1.personal_information') }}</h1>
    <ul>
      <li>{{ t('step1.required_fields') }}</li>
      <li>{{ t('step1.provide_information') }}</li>
    </ul>

    <div class="lg:grid grid-rows-2 lg:gap-2">
      <h1 class="text-lg font-medium mb-1 mt-4 text-black">{{ t('step1.name_label') }}</h1>
      <Info :text="t('step1.name_info')" />
    </div>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          :labelText="t('step1.employer_name')"
          :isMandatory="true"
          :infoText="t('step1.employer_info')"
          inputType="text"
          v-model="employerName"
          :isValid="store.step1.employer_name.isValid"
          :validationMessage="store.step1.employer_name.validationMessage"
          name="employer_name"
          id="EmployerName"
        />
        <SupportingText>{{ t('step1.supporting_text') }}</SupportingText>
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          :labelText="t('step1.first_name')"
          :isMandatory="true"
          :infoText="t('step1.first_name_info')"
          inputType="text"
          v-model="firstName"
          :isValid="store.step1.first_name.isValid"
          :validationMessage="store.step1.first_name.validationMessage"
          name="first_name"
          id="firstName"
        />
      </FieldContainer>
    </div>

    <FieldContainer>
      <CheckBox 
        name="dont_middle_name" 
        id="dont_middle_name"
        v-model="dontMiddleName" 
      >
        {{ t('step1.certify_no_middle_name') }}
      </CheckBox>
    </FieldContainer>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer v-if="!dontMiddleName">
        <StyledInput
          :labelText="t('step1.middle_name')"
          inputType="text"
          v-model="middleName"
          :isValid="store.step1.middle_name.isValid"
          :validationMessage="store.step1.middle_name.validationMessage"
          name="middle_name"
          id="MiddleName"
        />
      </FieldContainer>
    </div>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          :labelText="t('step1.last_name')"
          :isMandatory="true"
          :infoText="t('step1.last_name_info')"
          inputType="text"
          v-model="lastName"
          :isValid="store.step1.last_name.isValid"
          :validationMessage="store.step1.last_name.validationMessage"
          name="last_name"
          id="lastName"
        />
      </FieldContainer>
      <FieldContainer>
        <Select
          :labelText="t('step1.suffix')"
          :isMandatory="true"
          :infoText="t('step1.select_suffix')"
          id="suffix"
          name="suffix"
          :options="suffixOptions"
          @input-change="handleSuffix"
          v-model="suffix"
          :isValid="store.step1.suffix.isValid"
          :validationMessage="store.step1.suffix.validationMessage"
        />
      </FieldContainer>
    </div>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <Autocomp
          name="country_now"
          id="country"
          :labelText="t('step1.country')"
          :infoText="t('step1.select_country')"
          inputType="text"
          :options="optionCountry"
          @input-change="handleCountryChange"
          v-model="country"
          :isValid="store.step1.country_now.isValid"
          :validationMessage="store.step1.country_now.validationMessage"
        />
      </FieldContainer>
      <FieldContainer>
        <Textarea
          id="street_address"
          name="street_address"
          :labelText="t('step1.street_address')"
          :infoText="t('step1.street_address_info')"
          size="xl"
          v-model="streetAddress"
          :isValid="store.step1.street_address.isValid"
          :validationMessage="store.step1.street_address.validationMessage"
        />
      </FieldContainer>

      <FieldContainer>
        <Autocomp
          name="city"
          id="city"
          :labelText="t('step1.city')"
          :infoText="t('step1.select_city')"
          inputType="text"
          :options="optionCity"
          @input-change="handleCityChange"
          v-model="city"
          :isValid="store.step1.city.isValid"
          :validationMessage="store.step1.city.validationMessage"
        />
      </FieldContainer>
      <FieldContainer>
        <Autocomp
          name="governorate"
          id="governorate"
          :labelText="t('step1.governorate')"
          :infoText="t('step1.select_governorate')"
          inputType="text"
          :options="optionGovernorate"
          @input-change="handleGovernorateChange"
          v-model="governorate"
          :isValid="store.step1.governorate.isValid"
          :validationMessage="store.step1.governorate.validationMessage"
        />
      </FieldContainer>

      <FieldContainer>
        <StyledInput
          :labelText="t('step1.location_text')"
          :isMandatory="true"
          :infoText="t('step1.location_text_info')"
          inputType="text"
          v-model="locationText"
          :isValid="store.step1.location_text.isValid"
          :validationMessage="store.step1.location_text.validationMessage"
          name="location_text"
          id="locationText"
        />
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          :labelText="t('step1.zip_code')"
          :isMandatory="true"
          :infoText="t('step1.zip_code_info')"
          inputType="text"
          v-model="zipCode"
          :isValid="store.step1.zip_code.isValid"
          :validationMessage="store.step1.zip_code.validationMessage"
          name="zip_code"
          id="zipCode"
        />
      </FieldContainer>

      <FieldContainer>
        <StyledInput 
          id="date_living_address" 
          name="date_living_address" 
          :labelText="t('step1.date_living_address')"
          :isMandatory="true" 
          :infoText="t('step1.date_living_address_info')" 
          inputType="date" 
          v-model="dateLivingAddress"
          :isValid="store.step1.date_living_address.isValid"
          :validationMessage="store.step1.date_living_address.validationMessage"
        />
      </FieldContainer>
    </div>

    <FieldContainer>
      <CheckBox 
        name="this_is_my_name_column" 
        id="this_is_my_name_column" 
        v-model="thisIsMyNameColumn"
      >
        {{ t('step1.certify_current_name') }}
      </CheckBox>
    </FieldContainer>

    <div class="lg:grid grid-rows-2 lg:gap-2 mt-6">
      <h1 class="text-lg font-medium text-black">{{ t('step1.alias_name') }}</h1>
      <Info :text="t('step1.alias_info')" />    
    </div>

    <!-- قسم Alias Name -->
    <div class="lg:grid grid-cols-1 lg:gap-2 mt-4">
      <h1 class="text-lg font-medium mb-1 text-black">{{ t('step1.alias_name') }}</h1>
      <Info :text="t('step1.provide_alias_name')" />

      <!-- جدول فرعي لAlias Name -->
      <div v-for="(alias, index) in aliasNames" :key="alias.id" class=" items-center">
        <FieldContainer class="flex-1">
          <StyledInput
            :labelText="t('step1.first_name')"
            inputType="text"
            v-model="alias.first_name"
            :isValid="true"
            :validationMessage="''"
            name="first_name"
            :id="alias.id"
            @input="updateAliasNameHandler(index, { first_name: alias.first_name })"
          />
        </FieldContainer>
        <FieldContainer class="flex-1">
          <StyledInput
            :labelText="t('step1.middle_name')"
            inputType="text"
            v-model="alias.middle_name"
            :isValid="true"
            :validationMessage="''"
            name="middle_name"
            :id="alias.id"
            @input="updateAliasNameHandler(index, { middle_name: alias.middle_name })"
          />
        </FieldContainer>
        <FieldContainer class="flex-1">
          <StyledInput
            :labelText="t('step1.last_name')"
            inputType="text"
            v-model="alias.last_name"
            :isValid="true"
            :validationMessage="''"
            name="last_name"
            :id="alias.id"
            @input="updateAliasNameHandler(index, { last_name: alias.last_name })"
          />
        </FieldContainer>
        <FieldContainer class="flex-1">
            <!-- زر حذف Alias Name -->
          <button 
            @click="removeAliasName(index)" 
            class="w-full  ltr:ml-2 rtl:mr-2 bg-red-300 hover:bg-red-400 text-black font-bold py- px-4 rounded"
            aria-label="-"
          >
            -
          </button>
        </FieldContainer>

      </div>

      <!-- زر إضافة Alias Name جديد -->
      <FieldContainer class="flex-1">
          <button 
            @click="addAliasName" 
            class="w-full  bg-info hover:bg-secondary text-black font-bold  rounded"
          >
            +
          </button> 
      </FieldContainer>

    </div>

    <!-- قسم أرقام الهواتف -->
    <div class="lg:grid grid-cols-1 lg:gap-2 mt-6">
      <h1 class="text-lg font-medium mb-1 text-black">{{ t('step1.phone_numbers') }}</h1>
      <Info :text="t('step1.provide_phone_numbers')" />

      <!-- جدول فرعي لأرقام الهواتف -->
      <div v-for="(phone, index) in phoneNumbers" :key="phone.id" class=" items-center ">
        <FieldContainer class="flex-1">
          <StyledInput
            :labelText="t('step1.phone')"
            inputType="text"
            v-model="phone.phone"
            :isValid="true"
            :validationMessage="''"
            name="phone"
            :id="phone.id"
            @input="updatePhoneNumberHandler(index, { phone: phone.phone })"
          />
        </FieldContainer>
        <!-- زر حذف رقم الهاتف -->
        <FieldContainer class="flex-1">
          <button 
            @click="removePhoneNumber(index)" 
            class="w-full  ltr:ml-2 rtl:mr-2 bg-red-300 hover:bg-red-400 text-black font-bold py- px-4 rounded"
            aria-label="-"
          >
            -
          </button>        
        </FieldContainer>

      </div>
      <FieldContainer class="flex-1">
        <!-- زر إضافة رقم هاتف جديد -->
        <button 
          @click="addPhoneNumber" 
          class="w-full  bg-info hover:bg-secondary text-black font-bold  rounded"
          >
            +
          </button>        
      </FieldContainer>

    </div>

    <!-- بقية النموذج ... -->

    <!-- زر حفظ البيانات -->
    <div class="pt-5 flex w-full justify-center">
      <Button 
        level="other" 
        @click="save" 
        :disabled="loading" 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <span v-if="loading">{{ t('step1.saving') }}</span>
        <span v-else>{{ t('step1.save') }}</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import CheckBox from '../../components/checkBox.vue';
import FieldContainer from '../../components/fieldContainer.vue';
import StyledInput from '../../components/styledInput.vue';
import SupportingText from '../../components/supportingText.vue';
import Info from './components/info.vue';
import { useToast } from 'vue-toastification';
import Button from '../../components/button.vue';
import Autocomp from '../../components/autocomp.vue';
import Textarea from '../../components/textarea.vue';
import { useLocation } from '../../stores/locations';
import { v4 as uuidv4 } from 'uuid';
import Select from '../../components/select.vue';
import { useI18n } from 'vue-i18n'; // قمنا بإضافة استيراد useI18n

const store = useVerificationRequestStore();
const toast = useToast();
const locations = useLocation();
const location = locations.getLocation();

// استخدام i18n
const { t } = useI18n();

const loading = ref(false);

// تعريف الخيارات
const suffixOptions = computed(() => [
  { label: t('step1.suffix_jr'), value: 'Jr.' },
  { label: t('step1.suffix_sr'), value: 'Sr.' },
  { label: t('step1.suffix_iii'), value: 'III' },
  { label: t('step1.suffix_phd'), value: 'PhD' },
  { label: t('step1.suffix_md'), value: 'MD' },
  { label: t('step1.suffix_esq'), value: 'Esq.' },
]);

const optionCountry = computed(() => {
  if (location && location.data) {
    return location.data
      .filter((loc) => loc.location_type === 'Country')
      .map((loc) => ({
        label: loc.location_name,
        value: loc.location_name,
      }));
  }
  return [];
});

const optionCity = computed(() => {
  if (location && location.data && store.step1.country_now.value) {
    return location.data
      .filter(loc => loc.location_type === 'City' && loc.parent_location === store.step1.country_now.value)
      .map(loc => ({
        label: loc.location_name,
        value: loc.location_name,
      }));
  }
  return [];
});

const optionGovernorate = computed(() => {
  if (location && location.data && store.step1.city.value) {
    return location.data
      .filter(loc => loc.location_type === 'Governorate' && loc.parent_location === store.step1.city.value)
      .map(loc => ({
        label: loc.location_name,
        value: loc.location_name,
      }));
  }
  return [];
});

// تعريف الحقول مع استخدام computed لربطها بالمخزن
const employerName = computed({
  get: () => store.step1.employer_name.value,
  set: (val: string) => store.updateStep1('employer_name', { value: val }),
});

const firstName = computed({
  get: () => store.step1.first_name.value,
  set: (val: string) => store.updateStep1('first_name', { value: val }),
});

const lastName = computed({
  get: () => store.step1.last_name.value,
  set: (val: string) => store.updateStep1('last_name', { value: val }),
});

const dontMiddleName = computed({
  get: () => store.step1.dont_middle_name.value,
  set: (val: boolean) => store.updateStep1('dont_middle_name', { value: val }),
});

const middleName = computed({
  get: () => store.step1.middle_name.value,
  set: (val: string) => store.updateStep1('middle_name', { value: val }),
});

const thisIsMyNameColumn = computed({
  get: () => store.step1.this_is_my_name_column.value,
  set: (val: boolean) => store.updateStep1('this_is_my_name_column', { value: val }),
});

const suffix = computed({
  get: () => store.step1.suffix.value,
  set: (val: string) => store.updateStep1('suffix', { value: val }),
});

const country = computed({
  get: () => store.step1.country_now.value,
  set: (val: string) => store.updateStep1('country_now', { value: val }),
});

const governorate = computed({
  get: () => store.step1.governorate.value,
  set: (val: string) => store.updateStep1('governorate', { value: val }),
});

const city = computed({
  get: () => store.step1.city.value,
  set: (val: string) => store.updateStep1('city', { value: val }),
});

const locationText = computed({
  get: () => store.step1.location_text.value,
  set: (val: string) => store.updateStep1('location_text', { value: val }),
});

const streetAddress = computed({
  get: () => store.step1.street_address.value,
  set: (val: string) => store.updateStep1('street_address', { value: val }),
});

const zipCode = computed({
  get: () => store.step1.zip_code.value,
  set: (val: string) => store.updateStep1('zip_code', { value: val }),
});

const dateLivingAddress = computed({
  get: () => store.step1.date_living_address.value,
  set: (val: string) => store.updateStep1('date_living_address', { value: val }),
});

const email = computed({
  get: () => store.step1.email.value,
  set: (val: string) => store.updateStep1('email', { value: val }),
});

const dateOfBirth = computed({
  get: () => store.step1.date_of_birth.value,
  set: (val: string) => store.updateStep1('date_of_birth', { value: val }),
});

// بيانات alias_name و phone مرتبطة بالمخزن مباشرة
const aliasNames = computed(() => store.step1.alias_name);
const phoneNumbers = computed(() => store.step1.phone);

// دوال لإضافة، إزالة، وتحديث Alias Names
const addAliasName = () => {
  const newAlias = { id: uuidv4(), first_name: '', last_name: '', middle_name: '' };
  store.addAliasName(newAlias);
};

const removeAliasName = (index: number) => {
  store.removeAliasName(index);
};

const updateAliasNameHandler = (index: number,updatedFields) => {
  store.updateAliasName(index, updatedFields);
};
const handleCountryChange = (value) => {
  store.updateStep1('country_now', { value: value.value });
};
const handleCityChange = (value) => {
  store.updateStep1('city', { value: value.value });
};

const handleGovernorateChange = (value) => {
  store.updateStep1('governorate', { value: value.value });
};

const handleSuffix  = (value) => {
  store.updateStep1('suffix', { value: value.value });
};
// دوال لإضافة، إزالة، وتحديث Phone Numbers
const addPhoneNumber = () => {
  const newPhone = { id: uuidv4(), phone: '' };
  store.addPhoneNumber(newPhone);
};

const removePhoneNumber = (index: number) => {
  store.removePhoneNumber(index);
};

const updatePhoneNumberHandler = (index: number, updatedFields) => {
  store.updatePhoneNumber(index, updatedFields);
};

// دوال الحفظ
const save = async () => {
  try {
    loading.value = true;
    await store.saveStep1();
    // يمكنك إضافة المزيد من الحفظ للخطوات الأخرى هنا إذا لزم الأمر
  } catch (error) {
    toast.error("حدث خطأ أثناء الحفظ.");
  } finally {
    loading.value = false;
  }
};

// تحميل البيانات عند تحميل المكون
onMounted(() => {
  store.loadDocument();
});
</script>

<style scoped>
/* أضف تنسيقات إضافية إذا لزم الأمر */
</style>