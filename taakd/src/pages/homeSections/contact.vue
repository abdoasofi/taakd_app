<template>
  <div class="pt-6">
    <div class="flex gap-2 mb-2">
      <div class="w-7 lg:w-9 shrink-0">
        <!-- <StyledIcon /> -->
       <VerificationInformation />
      </div>
      <Heading level="secondary" class="text-black" tag="h2"
        >Here you can follow the progress of your report and communicate with
        Taakd</Heading
      >
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
              inputType="phone"
              @input-change="handleInput"
                @isValid="data['mobile_number']['isValid']"
                @validationMessage="data['mobile_number']['validationMessage']"
                         
            />
            <small class="block text-[10px] font-normal">Supporting text</small>
          </div>
          <FieldContainer>
            <Autocomp
              labelText="country"
              :isMandatory="true"
              infoText="country"
              inputType="text"
              name="country"
              id="country"
              @input-change="handleCountryChange"
              :options="optionCountry"
              :isValid="false"
              :validationMessage="'you can edit message'"
            />
          </FieldContainer>
        </div>
        <div class="py-3 text-sm">
          <span class="text-sm block mb-3"
            >Did you obtain the degree or diploma? *</span
          >
          <div class="flex flex-col gap-2">
            <div>
              <input type="radio" name="diploma" id="yes" />
              <label for="yes">Yes, I obtained</label>
            </div>
            <div>
              <input type="radio" name="diploma" id="no" />
              <label for="no">No, I did not obtain</label>
            </div>
          </div>
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
                @input-change="handleInput"
                @isValid="data['from_time']['isValid']"
                @validationMessage="data['from_time']['validationMessage']"
              />
            </div>
            <div class="w-full">
              <StyledInput
                id="to"
                name="to_time"
                labelText="To Time"
                infoText="To Time"
                inputType="time"
                @input-change="handleInput"
                @isValid="data['to_time']['isValid']"
                @validationMessage="data['to_time']['validationMessage']"                
              />
            </div>
          </div>
        </div>
        <div class="pt-5 flex w-full justify-center">
          <Button level="other"  @click="save" >save -></Button>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class=" fixed z-10 bottom-0 py-6 px-4 flex flex-col gap-2">
      <div v-for="(alert, index) in alerts" :key="index">
        <SnackBar :isDanger="true" :message="alert.message" @close="removeAlert(index)" />
      </div>
  </div>    -->
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, reactive } from 'vue'
import { Autocomplete } from 'frappe-ui'
import Button from '../../components/button.vue'
import Heading from '../../components/heading.vue'
import StyledIcon from '../../components/styledIcon.vue'
import StyledInput from '../../components/styledInput.vue'
import FieldContainer from '../../components/fieldContainer.vue'
import Autocomp from '../../components/autocomp.vue'
import validateInputContact from '../../data/validate/validateInputContact'
import objectConvertor from '../../data/validate/convertor'
import { createRequestList, updateFieldsInRequestList } from '../../data/request'
import VerificationInformation from '../../components/Icons/verificationInformation.vue'
import { useVerificationRequestStore } from '../../stores/verificationRequest';

// Props
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  location: {
    type: Object,
  },
})
const store = useVerificationRequestStore();

// ===== 1 =====
const fieldsContact = ['name', 'mobile_number','country', 'from_time', 'to_time' ,'is_degree_or_diploma']
const requestListContact = createRequestList(fieldsContact)

// ===== 2 =====
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

})
const handleInput = function (value) {
  // props.data["country"]['value']=value.value
  data[value.name]['value'] = value.value
}
const valueCountry = ref('')
// const selectedCountry = ref('')

// تأكد أن location و data موجودة قبل استخدامها
const optionCountry = computed(() => {
  if (props.location && props.location.data) {
    return props.location.data
      .filter((loc) => loc.location_type === 'Country')
      .map((loc) => ({
        label: loc.location_name,
        value: loc.location_name,
      }))
  }
  return [] // إرجاع مصفوفة فارغة إذا لم تتوفر البيانات
})

// معالجة تغيير اختيار الدولة
const handleCountryChange = (value) => {
  data["country"]['value']=value.value
}
// ====== alerts =========
// const alerts = reactive([]);
// Methods
// const triggerAlert = function(message) {
// 	alerts.push({ message });
// 	setTimeout(() => {
// 		alerts.shift(); // Automatically remove the alert after some time
// 	}, 3000);
// }

// const removeAlert = function(index) {
// 	alerts.splice(index, 1);
// }
// =============== ============

function save() {
  const finalData = objectConvertor({
    ...store.home,
    // ...store.step2,
    // ...store.step3,
    // ...store.step4,
    // ...store.step5,
    // ...store.step6,
  });
  console.log('***** data ****',data)

  const requestList = createRequestList(['name', 'user_id']); // تأكد من تحديد الحقول المطلوبة
  updateFieldsInRequestList(requestList, { ...data, name: 'VIR-2024-26-09-000008'});

//   console.log('***** updateFieldsInRequestList ****')
//   // اذا حفظت بنجاح
//   // data["اسم الحقل"]["value"]
//   // مالم اعرض الرت او عالج الفاليديشن
//   console.log(" ******* data  ********** ",data)
//   let validateRes = validateInputContact(data)

//   if (validateRes===true) {
//     console.log("aaaaaaaaaaaaaaaaaaaaa")
// 	// triggerAlert("aaaaaaaaaaaaaaaaaaaaa")
//   } else {
//     let converted = objectConvertor(data)

//     updateFieldsInRequestList(requestListContact, converted)
//   }
}

// =============== ============

</script>

<style scoped>
/* Custom styles if needed */
</style>
