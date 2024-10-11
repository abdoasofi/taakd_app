<!-- المكون الفرعي: -->
<!-- stepsSections/step1.vue -->
<template>
  <div class="pt-3 container">
    <!-- <p>اسم المستند: {{ documentName }}</p> -->
    <h1 class="text-3xl  font-bold mb-3 text-black">Personal Information</h1>
    <ul>
      <li>
        All fields marked with an asterisk ( * ) are required.
      </li>
      <li>
        Providing your information as completely and accurately as possible will help speed up the completion of your Background Verification
      </li>
    </ul>

    <div class="lg:grid grid-rows-2 lg:gap-2">
      <h1 class="text-lg font-medium mb-1 mt-4 text-black">Name</h1>
      <Info
      text="Please provide your name exactly as it appears on your current government-issued identification document such as your Passport,
       Driver’s License or National Identification Document"
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
        name="certify" 
        id="certify" 
      >
        I certify that I do not have a Middle Name on my official identification document
      </CheckBox>
    </FieldContainer>

    <div class="lg:grid grid-cols-2 lg:gap-2">
      <FieldContainer>
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
            <Autocomp
              id="suffix"
              name="suffix"
              labelText="Suffix"
              infoText="Select your suffix"
              inputType="text"
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
              <!-- Date you started living at this address -->
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
        name="certify" 
        id="certify" 

      > 
      I certify this is my current legal name, exactly as it is displayed on my government-issued identification document *
      </CheckBox>
    </FieldContainer>
    <div class="lg:grid grid-ows-2 lg:gap-2">
          <h1 class="text-lg font-medium   text-black">Alias Name</h1>
          <Info
          text="Skip this section if you do not have any alias names.        
          Please provide:
              Any other names appearing on government-issued identity documents where that name differs from your primary identity document; or
              A prior legal name which can include your birth surname or any official change to a legal name and government identity documents were issued; or
              A name that you use in an “official” capacity which can include any name under which you hold a professional qualification or that you use(d) to apply for any credit or may be recorded in any employee file at a current or past employer."
        />    
        <!-- <Toggle>
      <FieldContainer>
        <StyledInput
          labelText="First Name"
          :isMandatory="true"
          infoText="First Name"
          inputType="text"
          v-model="step1.first_name.value"
          @input="handleInput('first_name', step1.first_name.value)"
          name="first_name"
          id="firstName"
    
        />
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          labelText="Middle Name"
          inputType="text"
          name="middle_name"
          id="MiddleName"

        />
      </FieldContainer>
      <FieldContainer>
        <StyledInput
          labelText="Last Name"
          :isMandatory="true"
          infoText="Last Name"
          inputType="text"
          v-model="step1.last_name.value"
          @input="handleInput('last_name', step1.last_name.value)"
          name="last_name"
          id="lastName"

        />
      </FieldContainer>
        </Toggle> -->
    </div>
    <!-- <InfoRow label="Username" value="Instructions for Verifying Basic Information Instructions for Verifying Basic Information."/> -->
    <!-- <Info
      text="Instructions for Verifying Basic Information Instructions for Verifying Basic Information."
    /> -->
    <div class="lg:grid grid-ows-2 lg:gap-2">
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
          text=" Taakd may occasionally need to contact you for clarification of items on your Background Verification. We will never share or sell your email address"
        />    

    </div> 
    <div class="lg:grid grid-ows-2 lg:gap-2">
          <h1 class="text-lg font-medium   text-black">Identification</h1>
          <Info
          text=" Most public records are stored using your name and birth date, so providing this information allows us to accurately search these sources"
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
      <div class="pt-5 flex w-full justify-center">
          <Button level="other" @click="save" :disabled="loading" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <span v-if="loading">جاري الحفظ...</span>
            <span v-else>save -></span>
          </Button>
        </div>
  </div>

</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import CheckBox from '../../components/checkBox.vue';
import FieldContainer from '../../components/fieldContainer.vue';
import StyledInput from '../../components/styledInput.vue';
import SupportingText from '../../components/supportingText.vue';
import { Step1Data, ValidationResult } from '../../data/types';
import InfoRow from '../../components/InfoRow.vue';
import Toggle from "../../components/toggle.vue";
import FieldsGroup from "../../components/fieldsGroup.vue";
import Info from './components/info.vue';
import { useToast } from 'vue-toastification';
import Button from '../../components/button.vue';
import Autocomp from '../../components/autocomp.vue';
import Textarea from '../../components/textarea.vue';
import { useLocation } from '../../stores/locations';
// import Textarea from 'frappe-ui/src/components/Textarea.vue';


const store = useVerificationRequestStore();
const toast = useToast();

const locations = useLocation();
const location = locations.getLocation()


// تعريف متغيرات التحميل
const loading = ref(false);

// const optionSuffix = reactive([
//   { value: "", label: "" },
//   { value: "Junior (Jr.)", label: "Junior (Jr.)" },
//   { value: "Senior (Sr.)", label: "Senior (Sr.)" },
// ])

const selectedCountry = ref('')
const selectedCity= ref('')

// تحميل البيانات عند تحميل الصفحة
onMounted(async () => {
  
  loading.value = true;
  await store.loadDocument();
  loading.value = false;
});

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

// const optionCity = computed(() => {
//   if (location && location.data) {
//         return location.filter(loc => loc.location_type === 'City' && loc.parent_location == selectedCountry.value).map(loc => ({
//             label: loc.location_name,
//             value: loc.location_name
//         }))    
//   }
  
//   return []
//     })
// const optionGovernorate = computed(() => {
//     if (location && location.data) {
//               return location.filter(loc => loc.location_type === 'Governorate' && loc.parent_location == selectedCity.value).map(loc => ({
//             label: loc.location_name,
//             value: loc.location_name
//         }))
//     }
//   return []
//     })
// تعريف computed properties لربط v-model مع مخزن Pinia
const employerName = computed({
  get: () => store.step1.employer_name.value,
  set: (val: string) => store.updateStep1('employer_name', { value: val })
});

const firstName = computed({
  get: () => store.step1.first_name.value,
  set: (val: string) => store.updateStep1('first_name', { value: val })
});
const lastName = computed({
  get: () => store.step1.last_name.value,
  set: (val: string) => store.updateStep1('last_name', { value: val })
});
const middleName = computed({
  get: () => store.step1.middle_name.value,
  set: (val: string) => store.updateStep1('middle_name', { value: val })
});
const suffix = computed({
  get: () => store.step1.suffix.value,
  set: (val: string) => store.updateStep1('suffix', { value: val })
});
const country = computed({
  get: () => store.step1.country_now.value,
  set: (val: string) => store.updateStep1('country_now', { value: val })
});
const governorate = computed({
  get: () => store.step1.city.value,
  set: (val: string) => store.updateStep1('city', { value: val })
});
const city = computed({
  get: () => store.step1.governorate.value,
  set: (val: string) => store.updateStep1('governorate', { value: val })
});
const locationText = computed({
  get: () => store.step1.location_text.value,
  set: (val: string) => store.updateStep1('location_text', { value: val })
});
const streetAddress = computed({
  get: () => store.step1.street_address.value,
  set: (val: string) => store.updateStep1('street_address', { value: val })
});
const zipCode = computed({
  get: () => store.step1.zip_code.value,
  set: (val: string) => store.updateStep1('zip_code', { value: val })
});
const dateLivingAddress = computed({
  get: () => store.step1.date_living_address.value,
  set: (val: string) => store.updateStep1('date_living_address', { value: val })
});
const email = computed({
  get: () => store.step1.email.value,
  set: (val: string) => store.updateStep1('email', { value: val })
});
const dateOfBirth = computed({
  get: () => store.step1.date_of_birth.value,
  set: (val: string) => store.updateStep1('date_of_birth', { value: val })
});

// const aliasName = computed({
//   get: () => store.step1.alias_name.value,
//   set: (val: string) => store.updateStep1('alias_name', { value: val })
// });
// const phone = computed({
//   get: () => store.step1.phone.value,
//   set: (val: string) => store.updateStep1('phone', { value: val })
// });

// معالجة تغيير اختيار الدولة
const handleCountryChange = (value) => {
  store.step1.country_now.value=value.value
}
const handleCityChange = (value) => {
  store.step1.city.value=value.value
}
const handleGovernorateChange = (value) => {
  store.step1.governorate.value=value.value
}
 // دالة الحفظ
const save = async () => {
  // التحقق من صحة الحقول
  const { step1 } = store;
  let isValid = true;

  // تحقق من 
  if (!step1.employer_name.value) {
    store.updateStep1('employer_name', {
      isValid: false,
      validationMessage: 'يرجى تحديد .',
    });
    isValid = false;
  } else {
    store.updateStep1('employer_name', {
      isValid: true,
      validationMessage: '',
    });
  }

  // تحقق من 
  if (!step1.first_name.value) {
    store.updateStep1('first_name', {
      isValid: false,
      validationMessage: 'يرجى تحديد .',
    });
    isValid = false;
  } else {
    store.updateStep1('first_name', {
      isValid: true,
      validationMessage: '',
    });
  }

  // تحقق من 
  if (!step1.last_name.value) {
    store.updateStep1('last_name', {
      isValid: false,
      validationMessage: 'يرجى اختيار .',
    });
    isValid = false;
  } else {
    store.updateStep1('last_name', {
      isValid: true,
      validationMessage: '',
    });
  }

  if (!isValid) {
    toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
    return;
  }

  // متابعة الحفظ إذا كانت البيانات صحيحة
  try {
    loading.value = true;
    const updatedFields = {
      last_name: store.step1.last_name.value,
      employer_name: store.step1.employer_name.value,
      first_name: store.step1.first_name.value,
      middle_name: store.step1.middle_name.value,
      suffix: store.step1.suffix.value,
      country_now: store.step1.country_now.value,
      city: store.step1.city.value,
      governorate: store.step1.governorate.value,
      location_text: store.step1.location_text.value,
      street_address: store.step1.street_address.value,
      zip_code: store.step1.zip_code.value,
      date_living_address: store.step1.date_living_address.value,
      email: store.step1.email.value,
      // alias_name: store.step1.alias_name.value,
      // phone: store.step1.phone.value,
      date_of_birth: store.step1.date_of_birth.value,
    };
    console.log("**********//*/*/*/*/*/*/*",updatedFields)
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
/* أضف تنسيقات إضافية إذا لزم الأمر */
</style>