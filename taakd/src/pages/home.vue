<template>
 
    <BaseLayout>
      <div class="pb-6">
        <BaseContainer>
          <div class=" w-full py-3">
                    <div class="aspect-[1.376] h-10 bg-mid_gray mb-2 m-auto">Logo</div>
          </div>
          <h1 class="text-sm text-secondary font-bold my-2 text-center w-full">Trust. Verify. Succeed</h1>
          <div class="my-8 grid grid-cols-3 lg:py-10 lg:px-40">
              <ProcessItem label="Job Request" />
              <ProcessItem  label="Verification of Basic Information" />
              <ProcessItem  label="Review and Report Writing" />
          </div>      
          <div  class="flex justify-center"><Button type="submit"  :class="['bg-secondary hover:bg-secondary_hover px-4 py-2 text-white']" >Fill the Form Now<span class="mx-2">-></span></Button></div>

          <!-- <div   class="gap-3 w-full flex flex-col justify-center items-center">
              <span class="text-primary font-bold text-lg block" >Thanks for your information</span>
              <span class="text-sm font-medium block" >Thanks for your information</span>
              <span class="text-xs font-medium block" >Your order ID: GA-06564-gh71</span>
              <Button class="w-fit" type="submit" ><i class="inline-block w-4 h-4 rounded-full bg-mid_gray" /> Rate</Button>
          </div> -->
        </BaseContainer>
      </div>
      <JobRequest />
      <Review />
      <Verification />
      <!-- <Contact  /> -->
    </BaseLayout>

    <!-- <button class="fixed z-30 bottom-0 bg-red-700 rounded-xl text-white p-2 " @click="triggerAlert('Your Contact details has been saved!')">زر تجربة الالرت</button> -->
 <!-- // انسخ الدفة مع الكمبونتت مع دوال الالرت والمتغير من تحت في اي مكان تريد عرض الرت -->
    <!-- <div class=" fixed z-10 bottom-0 py-6 px-4 flex flex-col gap-2">

      <div  v-for="(alert, index) in alerts" :key="index">
      <SnackBar :message="alert.message" @close="removeAlert(index)" />
      </div>
      <div  v-for="(alert, index) in alerts" :key="index">
      <SnackBar :isDanger="true" :message="alert.message" @close="removeAlert(index)" />
      </div>
    </div> -->
    <Cookies />
</template>

<script setup>

import { Button } from 'frappe-ui';

import BaseContainer from '../components/baseContainer.vue';
import BaseLayout from '../layouts/baseLayout.vue';
import ProcessItem from './homeSections/processItem.vue';
import Contact from './homeSections/contact.vue';
import SnackBar from '../components/snackBar.vue';

import JobRequest from './homeSections/jobRequest.vue';
import Review from './homeSections/review.vue';
import Verification from './homeSections/verification.vue';


// State variables
// const processed = ref(4);
// const alerts = ref([]);

// // Computed properties
// const statusJobRequest = computed(() => {
//   return processed.value < 1 ? 'init' : (processed.value === 1 ? 'process' : 'done');
// });

// const statusVerification = computed(() => {
//   return processed.value < 2 ? 'init' : (processed.value === 2 ? 'process' : 'done');
// });

// const statusReview = computed(() => {
//   return processed.value < 3 ? 'init' : (processed.value === 3 ? 'process' : 'done');
// });

// // Methods
// function triggerAlert(message) {
//   alerts.value.push({ message });
//   setTimeout(() => {
//     alerts.value.shift(); // Automatically remove the alert after some time
//   }, 3000);
// }

// function removeAlert(index) {
//   alerts.value.splice(index, 1);
// }

</script>

<style scoped>
/* Custom styles if needed */
</style>