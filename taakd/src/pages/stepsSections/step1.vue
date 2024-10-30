<!-- المكون الفرعي: -->
<!-- /pages/stepsSections/step1.vue -->
<template>
  <div class="pt-3 container">
    <h1 class="text-3xl font-bold mb-3 text-black">Personal Information</h1>
    <ul>
      <li>All fields marked with an asterisk ( * ) are required.</li>
      <li>Providing your information as completely and accurately as possible will help speed up the completion of your Background Verification</li>
    </ul>

    <div class="lg:grid grid-rows-2 lg:gap-2">
      <h1 class="text-lg font-medium mb-1 mt-4 text-black">Name</h1>
      <Info
        text="Please provide your name exactly as it appears on your current government-issued identification document such as your Passport, Driver’s License or National Identification Document"
      />
    </div>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
        <StyledInput
          labelText="Employer Name"
          :isMandatory="true"
          infoText="Employer Name"
          inputType="text"
          v-model="employerName"
          :isValid="store.step1.employer_name.isValid"
          :validationMessage="store.step1.employer_name.validationMessage"
          name="employer_name"
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
        I certify that I do not have a Middle Name on my official identification document
      </CheckBox>
    </FieldContainer>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer v-if="!dontMiddleName">
        <StyledInput
          labelText="Middle Name"
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
          labelText="Last Name"
          :isMandatory="true"
          infoText="Last Name"
          inputType="text"
          v-model="lastName"
          :isValid="store.step1.last_name.isValid"
          :validationMessage="store.step1.last_name.validationMessage"
          name="last_name"
          id="lastName"
        />
      </FieldContainer>
      <FieldContainer>
        <!-- <Autocomp
          id="suffix"
          name="suffix"
          labelText="Suffix"
          infoText="Select your suffix"
          inputType="text"
          :options="suffixOptions"
          @input-change="handleSuffix"
          v-model="suffix"
          :isValid="store.step1.suffix.isValid"
          :validationMessage="store.step1.suffix.validationMessage"
        /> -->
        <Select
              labelText="Suffix"
              :isMandatory="true"
              infoText="Select your suffix"
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
          labelText="Country"
          infoText="Select your country"
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
          labelText="Street Address"
          labelColor="blue"
          infoText="Street Address"
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
          labelText="City"
          infoText="City"
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
          labelText="Governorate"
          infoText="Governorate"
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
          labelText="Location Text"
          :isMandatory="true"
          infoText="Location Text"
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
          labelText="Zip Code"
          :isMandatory="true"
          infoText="Zip Code"
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
          labelText="Date you started living at this address" 
          :isMandatory="true" 
          infoText="End date of your education." 
          inputType="date" 
          v-model="dateLivingAddress"
          :isValid="store.step1.zip_code.isValid"
          :validationMessage="store.step1.zip_code.validationMessage"
        />
      </FieldContainer>
    </div>

    <FieldContainer>
      <CheckBox 
        name="this_is_my_name_column" 
        id="this_is_my_name_column" 
        v-model="thisIsMyNameColumn"
      >
        I certify this is my current legal name, exactly as it is displayed on my government-issued identification document *
      </CheckBox>
    </FieldContainer>

    <div class="lg:grid grid-rows-2 lg:gap-2">
      <h1 class="text-lg font-medium text-black">Alias Name</h1>
      <Info
        text="Skip this section if you do not have any alias names.        
        Please provide:
        Any other names appearing on government-issued identity documents where that name differs from your primary identity document; or
        A prior legal name which can include your birth surname or any official change to a legal name; or
        A name that you use in an “official” capacity."
      />    
    </div>

    <!-- إضافة قسم Alias Name -->
    <div class="lg:grid grid-cols-1 lg:gap-2">
      <h1 class="text-lg font-medium mb-1 mt-4 text-black">Alias Name</h1>
      <Info text="Please provide your alias name." />

      <!-- جدول فرعي لAlias Name -->
      <div v-for="(alias, index) in aliasNames" :key="alias.id" class="flex items-center mb-2">
        <FieldContainer>
          <StyledInput
            labelText="Full Name"
            inputType="text"
            v-model="aliasNames[index].first_name"
            :isValid="true"
            :validationMessage="''"
            name="first_name"
            :id="aliasNames[index].id"
            @input="updateAliasName(index, aliasNames[index])"
          />
        </FieldContainer>
        <FieldContainer>
          <StyledInput
            labelText="Middle Name"
            inputType="text"
            v-model="aliasNames[index].middle_name"
            :isValid="true"
            :validationMessage="''"
            name="middle_name"
            :id="aliasNames[index].id"
            @input="updateAliasName(index, aliasNames[index])"
          />
        </FieldContainer>
        <FieldContainer>
          <StyledInput
            labelText="Last Name"
            inputType="text"
            v-model="aliasNames[index].last_name"
            :isValid="true"
            :validationMessage="''"
            name="last_name"
            :id="aliasNames[index].id"
            @input="updateAliasName(index, aliasNames[index])"
          />
        </FieldContainer>

        <!-- زر حذف Alias Name -->
        <Button @click="removeAliasName(index)" class="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Remove
        </Button>
      </div>

      <!-- زر إضافة Alias Name جديد -->
      <Button @click="addAliasName" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Alias Name
      </Button>
    </div>

    <div class="lg:grid grid-cols-1 lg:gap-2">
      <FieldContainer>
        <StyledInput
          labelText="Email"
          :isMandatory="true"
          infoText="Please enter your email address"
          inputType="email"
          name="email"
          id="email"
          v-model="email"
          :isValid="store.step1.email.isValid"
          :validationMessage="store.step1.email.validationMessage"
        />
      </FieldContainer>
      <Info
        text="Taakd may occasionally need to contact you for clarification of items on your Background Verification. We will never share or sell your email address."
      />    
    </div>

    <!-- إضافة قسم أرقام الهواتف -->
    <div class="lg:grid grid-cols-1 lg:gap-2">
      <h1 class="text-lg font-medium mb-1 mt-4 text-black">Phone Numbers</h1>
      <Info text="Please provide your phone numbers. You can add multiple phone numbers." />

      <!-- جدول فرعي لأرقام الهواتف -->
      <div v-for="(phone, index) in phoneNumbers" :key="index" class="flex items-center mb-2">
        <FieldContainer>
          <StyledInput
            labelText="Phone"
            inputType="text"
            v-model="phoneNumbers[index].phone"
            :isValid="true"
            :validationMessage="''"
            name="phone"
            :id="phoneNumbers[index].id"
            @input="updatePhoneNumber(index, phoneNumbers[index])"
          />
        </FieldContainer>
        <!-- زر حذف رقم الهاتف -->
        <Button @click="removePhoneNumber(index)" class="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Remove
        </Button>
      </div>

      <!-- زر إضافة رقم هاتف جديد -->
      <Button @click="addPhoneNumber" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Phone Number
      </Button>
    </div>

    <div class="lg:grid grid-ows-2 lg:gap-2">
      <h1 class="text-lg font-medium text-black">Identification</h1>
      <Info
        text="Most public records are stored using your name and birth date, so providing this information allows us to accurately search these sources."
      />
    </div>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <!-- Date of Birth -->
      <FieldContainer>
        <StyledInput 
          id="date_of_birth" 
          name="date_of_birth" 
          labelText="Date of Birth" 
          infoText="Start date of your education." 
          inputType="date" 
          v-model="dateOfBirth"
          :isValid="store.step1.date_of_birth.isValid"
          :validationMessage="store.step1.date_of_birth.validationMessage"
        />
      </FieldContainer>
    </div>

    <!-- <div class="pt-5 flex w-full justify-center">
      <Button level="other" @click="save" :disabled="loading" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <span v-if="loading">جاري الحفظ...</span>
        <span v-else>save -></span>
      </Button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, reactive, ref } from 'vue';
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

const store = useVerificationRequestStore();
const toast = useToast();
const locations = useLocation();
const location = locations.getLocation();

const loading = ref(false);
const phoneNumbers = ref([{id: uuidv4(), phone: '' }]);
const aliasNames = ref([{ id: uuidv4(), first_name: '', last_name: '', middle_name: '' }]);
// onUpdated(async () => {
//    store.loadStep1Fields();
// });
const suffixOptions =reactive([
  { label: 'Jr.', value: 'Jr.' },
  { label: 'Sr.', value: 'Sr.' },
  { label: 'III', value: 'III' },
  { label: 'PhD', value: 'PhD' },
  { label: 'MD', value: 'MD' },
  { label: 'Esq.', value: 'Esq.' },
])

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
  if (location && location.data && country.value) {
    return location.data
      .filter(loc => loc.location_type === 'City' && loc.parent_location === country.value)
      .map(loc => ({
        label: loc.location_name,
        value: loc.location_name,
      }));
  }
  return [];
});

const optionGovernorate = computed(() => {
  if (location && location.data && city.value) {
    return location.data
      .filter(loc => loc.location_type === 'Governorate' && loc.parent_location === city.value)
      .map(loc => ({
        label: loc.location_name,
        value: loc.location_name,
      }));
  }
  return [];
});

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

//Funciones for handling user inputs


// معالجة تغيير اختيار الدولة
const handleCountryChange = (value) => {
  // store.step1.country_now.value=value.value
  store.updateStep1('country_now', { value: value.value });
};

const handleCityChange = (value) => {
  // store.step1.city.value=value.value
  store.updateStep1('city', { value: value.value });
};

const handleGovernorateChange = (value) => {
  // store.step1.governorate.value=value.value
  store.updateStep1('governorate', { value: value.value });
};

const handleSuffix  = (value) => {
  // store.step1.suffix.value=value.value
  store.updateStep1('suffix', { value: value.value });
};
const addPhoneNumber = () => {
  phoneNumbers.value.push({ id: uuidv4(), phone: '' } );
};

const removePhoneNumber = (index) => {
  phoneNumbers.value.splice(index, 1);
};

const updatePhoneNumber = (index, phone) => {
  store.updatePhoneNumber(index,phone);
};

const addAliasName = () => {
  aliasNames.value.push({ id: uuidv4(), first_name: '', last_name: '', middle_name: '' });
};

const removeAliasName = (index) => {
  aliasNames.value.splice(index, 1);
};

const updateAliasName = (index, alias) => {
  store.updateAliasName(index, alias);
};

// const save = async () => {
//   try {
//     loading.value = true;
//     await store.saveStep1();
//   } catch (error) {
//     const toast = useToast();
//     toast.error("حدث خطأ أثناء الحفظ.");
//   } finally {
//     loading.value = false;
//   }
// };
</script>

<style scoped>
/* أضف تنسيقات إضافية إذا لزم الأمر */
</style>