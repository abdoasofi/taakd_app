<!-- <template>
    <div class="bg-[#F7F7F7]">
        <div>
            <h1 class="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-900  py-px ">Screening Disclosure and Authorization</h1> 
            <p class="text-xl font-semibold px-8 m-2 " > I hereby provide my authorisation and consent for Taakd, on behalf of Requestor to: </p>
            <p class="text-xl font-semibold px-8 m-2 ">1.process my Personal Data in accordance with the verifications set out in the Information Notice and below: </p>
            <UL class="max-w-md space-y-1 list-disc list-inside text-gray-900">
                <Li class="flex items-center">
                    Global Education This check confirms academic credentials by verifying relevant education as determined by the Requestor, for example a degree, certificate or diploma claim directly with the awarding institution or its authorized agent 
                    <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                    </svg>         
                </Li>
                <Li class="flex items-center">Global Employment	A check to confirm your work history. You will be asked to provide company name, location dates worked and position or title held. This information will then be verified by contacting HR or official sources at each company to be verified. The Requestor has also requested that your..<span class=" text-gray-100 "> Read More</span> </Li>
            </UL>
            
        </div>
        <dev class="flex items-center p-4 m-4 ">
            <router-link to ="/Step_5">
                <div>
                    <Button :variant="'outline'" theme="green" size="sm" label="Button" >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.373 12.75H18.75C18.9628 12.75 19.141 12.6782 19.2845 12.5345C19.4282 12.391 19.5 12.2128 19.5 12C19.5 11.7872 19.4282 11.609 19.2845 11.4655C19.141 11.3218 18.9628 11.25 18.75 11.25H7.373L12.5423 6.08076C12.6909 5.93209 12.7643 5.75809 12.7625 5.55876C12.7605 5.35942 12.682 5.18217 12.527 5.02701C12.3718 4.88217 12.1962 4.80717 12 4.80201C11.8038 4.79684 11.6282 4.87184 11.473 5.02701L5.13275 11.3673C5.03908 11.4609 4.97308 11.5597 4.93475 11.6635C4.89625 11.7673 4.877 11.8795 4.877 12C4.877 12.1205 4.89625 12.2327 4.93475 12.3365C4.97308 12.4403 5.03908 12.5391 5.13275 12.6328L11.473 18.973C11.6115 19.1115 11.783 19.1823 11.9875 19.1855C12.192 19.1887 12.3718 19.1178 12.527 18.973C12.682 18.8178 12.7595 18.6397 12.7595 18.4385C12.7595 18.2372 12.682 18.0589 12.527 17.9038L7.373 12.75Z" fill="#969696"/>
                        </svg>
                    </Button>
                </div>    
            </router-link>


        <div class="flex items-center p-4 m-4 ">
            <Button @click="showDialog = true"  class="  p-1 m-2 " :variant="'subtle'" theme="gray" size="sm" label="Button">R </Button>
            <div >
            <Button @click="showDialog = true" :variant="'subtle'" theme="gray" size="sm" label="Button"> 
                <div class="flex items-center py-4  ">
                                <span class="  p-1 m-2 " >A</span> 
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.55025 9.51503L14.1888 0.876532C14.3374 0.727699 14.5114 0.651699 14.7107 0.648533C14.9101 0.645366 15.0873 0.721366 15.2425 0.876532C15.3977 1.0317 15.4753 1.20987 15.4753 1.41103C15.4753 1.61237 15.3977 1.79061 15.2425 1.94578L6.183 11.0208C6.00217 11.2014 5.79125 11.2918 5.55025 11.2918C5.30925 11.2918 5.09833 11.2014 4.9175 11.0208L0.742501 6.84578C0.593834 6.69695 0.520501 6.52028 0.522501 6.31578C0.524334 6.11145 0.602834 5.9317 0.758001 5.77653C0.913167 5.62137 1.09133 5.54378 1.2925 5.54378C1.49383 5.54378 1.67208 5.62137 1.82725 5.77653L5.55025 9.51503Z" fill="#969696"/>
                </svg>
                </div>

                </Button> 
            </div>
            
    
        </div>



        </dev>

    </div>    

    <Dialog title="Title" v-model="showDialog"> Dialog content </Dialog>

</template>
  
  
<script setup>
import { ref } from 'vue'

import { Dialog } from 'frappe-ui'

const showDialog = ref(false);

</script>
   -->

<!-- ************************************** -->

   <!-- <template>
  <div class="-mx-4 flex flex-wrap">
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <div class="mb-12">
        <label for="" class="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Default Input
        </label>
        <input
          type="text"
          placeholder="Default Input"
          class="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
        />
      </div>
    </div>
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <div class="mb-12">
        <label for="" class="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Active Input
        </label>
        <input
          type="text"
          placeholder="Active Input"
          class="w-full bg-transparent rounded-md border border-primary py-[10px] px-5 text-dark-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
        />
      </div>
    </div>
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <div class="mb-12">
        <label for="" class="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Disabled label
        </label>
        <input
          type="text"
          placeholder="Disabled Input"
          disabled
          class="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
        />
      </div>
    </div>
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <div class="mb-12">
        <label class="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Name
        </label>
        <div class="relative">
          <input
            type="text"
            placeholder="Devid Jhon"
            class="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
          />
          <span class="absolute top-1/2 left-4 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.72039 12.8864C4.50179 12.105 5.5616 11.666 6.66667 11.666H13.3333C14.4384 11.666 15.4982 12.105 16.2796 12.8864C17.061 13.6678 17.5 14.7276 17.5 15.8327V17.4993C17.5 17.9596 17.1269 18.3327 16.6667 18.3327C16.2064 18.3327 15.8333 17.9596 15.8333 17.4993V15.8327C15.8333 15.1696 15.5699 14.5338 15.1011 14.0649C14.6323 13.5961 13.9964 13.3327 13.3333 13.3327H6.66667C6.00363 13.3327 5.36774 13.5961 4.8989 14.0649C4.43006 14.5338 4.16667 15.1696 4.16667 15.8327V17.4993C4.16667 17.9596 3.79357 18.3327 3.33333 18.3327C2.8731 18.3327 2.5 17.9596 2.5 17.4993V15.8327C2.5 14.7276 2.93899 13.6678 3.72039 12.8864Z"
                  fill="#9CA3AF"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0007 3.33268C8.61994 3.33268 7.50065 4.45197 7.50065 5.83268C7.50065 7.21339 8.61994 8.33268 10.0007 8.33268C11.3814 8.33268 12.5006 7.21339 12.5006 5.83268C12.5006 4.45197 11.3814 3.33268 10.0007 3.33268ZM5.83398 5.83268C5.83398 3.5315 7.69946 1.66602 10.0007 1.66602C12.3018 1.66602 14.1673 3.5315 14.1673 5.83268C14.1673 8.13387 12.3018 9.99935 10.0007 9.99935C7.69946 9.99935 5.83398 8.13387 5.83398 5.83268Z"
                  fill="#9CA3AF"
                />
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <div class="mb-12">
        <label class="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Email
        </label>
        <div class="relative">
          <input
            type="email"
            placeholder="info@yourmai.com"
            class="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
          />
          <span class="absolute top-1/2 left-4 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.33398 4.16667C2.87756 4.16667 2.50065 4.54357 2.50065 5V15C2.50065 15.4564 2.87756 15.8333 3.33398 15.8333H16.6673C17.1238 15.8333 17.5007 15.4564 17.5007 15V5C17.5007 4.54357 17.1238 4.16667 16.6673 4.16667H3.33398ZM0.833984 5C0.833984 3.6231 1.95708 2.5 3.33398 2.5H16.6673C18.0442 2.5 19.1673 3.6231 19.1673 5V15C19.1673 16.3769 18.0442 17.5 16.6673 17.5H3.33398C1.95708 17.5 0.833984 16.3769 0.833984 15V5Z"
                  fill="#9CA3AF"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.984696 4.52154C1.24862 4.14449 1.76823 4.0528 2.14527 4.31673L10.0007 9.81554L17.8562 4.31673C18.2332 4.0528 18.7528 4.14449 19.0167 4.52154C19.2807 4.89858 19.189 5.41818 18.8119 5.68211L10.4786 11.5154C10.1917 11.7163 9.80977 11.7163 9.52284 11.5154L1.1895 5.68211C0.812463 5.41818 0.720767 4.89858 0.984696 4.52154Z"
                  fill="#9CA3AF"
                />
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <div class="mb-12">
        <label class="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Company Name
        </label>
        <div class="relative">
          <input
            type="text"
            placeholder="Pimjo Labs"
            class="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
          />
          <span class="absolute top-1/2 left-4 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.33398 6.66667C2.87375 6.66667 2.50065 7.03976 2.50065 7.5V15.8333C2.50065 16.2936 2.87375 16.6667 3.33398 16.6667H16.6673C17.1276 16.6667 17.5007 16.2936 17.5007 15.8333V7.5C17.5007 7.03976 17.1276 6.66667 16.6673 6.66667H3.33398ZM0.833984 7.5C0.833984 6.11929 1.95327 5 3.33398 5H16.6673C18.048 5 19.1673 6.11929 19.1673 7.5V15.8333C19.1673 17.214 18.048 18.3333 16.6673 18.3333H3.33398C1.95327 18.3333 0.833984 17.214 0.833984 15.8333V7.5Z"
                  fill="#9CA3AF"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.56622 2.39825C7.03506 1.92941 7.67094 1.66602 8.33398 1.66602H11.6673C12.3304 1.66602 12.9662 1.92941 13.4351 2.39825C13.9039 2.86709 14.1673 3.50297 14.1673 4.16602V17.4993C14.1673 17.9596 13.7942 18.3327 13.334 18.3327C12.8737 18.3327 12.5006 17.9596 12.5006 17.4993V4.16602C12.5006 3.945 12.4129 3.73304 12.2566 3.57676C12.1003 3.42048 11.8883 3.33268 11.6673 3.33268H8.33398C8.11297 3.33268 7.90101 3.42048 7.74473 3.57676C7.58845 3.73304 7.50065 3.945 7.50065 4.16602V17.4993C7.50065 17.9596 7.12755 18.3327 6.66732 18.3327C6.20708 18.3327 5.83398 17.9596 5.83398 17.4993V4.16602C5.83398 3.50297 6.09738 2.86709 6.56622 2.39825Z"
                  fill="#9CA3AF"
                />
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <div class="mb-12">
        <label class="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Currency
        </label>
        <div class="flex items-center">
          <span
            class="h-full rounded-tl-md rounded-bl-md border border-r-0 border-stroke dark:border-dark-3 bg-gray-2 dark:bg-dark-2 py-[10px] px-4 text-base uppercase text-body-color dark:text-dark-6"
          >
            USD
          </span>
          <input
            type="text"
            placeholder="Pimjo Labs"
            class="w-full bg-transparent rounded-br-md rounded-tr-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
          />
        </div>
      </div>
    </div>
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <div class="mb-12">
        <label class="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Email
        </label>
        <div class="relative">
          <input
            type="email"
            placeholder="Devid Jhon"
            class="w-full bg-transparent rounded-md border border-red py-[10px] pl-5 pr-12 text-dark-6 outline-none transition"
          />
          <span class="absolute top-1/2 right-4 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.9987 2.50065C5.85656 2.50065 2.4987 5.85852 2.4987 10.0007C2.4987 14.1428 5.85656 17.5007 9.9987 17.5007C14.1408 17.5007 17.4987 14.1428 17.4987 10.0007C17.4987 5.85852 14.1408 2.50065 9.9987 2.50065ZM0.832031 10.0007C0.832031 4.93804 4.93609 0.833984 9.9987 0.833984C15.0613 0.833984 19.1654 4.93804 19.1654 10.0007C19.1654 15.0633 15.0613 19.1673 9.9987 19.1673C4.93609 19.1673 0.832031 15.0633 0.832031 10.0007Z"
                fill="#DC3545"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.0013 5.83398C10.4615 5.83398 10.8346 6.20708 10.8346 6.66732V10.0007C10.8346 10.4609 10.4615 10.834 10.0013 10.834C9.54106 10.834 9.16797 10.4609 9.16797 10.0007V6.66732C9.16797 6.20708 9.54106 5.83398 10.0013 5.83398Z"
                fill="#DC3545"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.16797 13.3333C9.16797 12.8731 9.54106 12.5 10.0013 12.5H10.0096C10.4699 12.5 10.843 12.8731 10.843 13.3333C10.843 13.7936 10.4699 14.1667 10.0096 14.1667H10.0013C9.54106 14.1667 9.16797 13.7936 9.16797 13.3333Z"
                fill="#DC3545"
              />
            </svg>
          </span>
        </div>
        <p class="mt-[10px] text-sm text-red">Invalid email address</p>
      </div>
    </div>
    <div class="w-full px-4 md:w-1/2 lg:w-1/3">
      <div class="mb-12">
        <label class="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Email
        </label>
        <div class="relative">
          <input
            type="email"
            placeholder="Devid Jhon"
            class="w-full bg-transparent rounded-md border border-green py-[10px] px-12 text-dark-6 outline-none transition"
          />
          <span class="absolute top-1/2 left-4 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.16797 10.0007C3.70773 10.0007 3.33464 10.3737 3.33464 10.834V16.6673C3.33464 17.1276 3.70773 17.5007 4.16797 17.5007H15.8346C16.2949 17.5007 16.668 17.1276 16.668 16.6673V10.834C16.668 10.3737 16.2949 10.0007 15.8346 10.0007H4.16797ZM1.66797 10.834C1.66797 9.45327 2.78726 8.33398 4.16797 8.33398H15.8346C17.2153 8.33398 18.3346 9.45327 18.3346 10.834V16.6673C18.3346 18.048 17.2153 19.1673 15.8346 19.1673H4.16797C2.78726 19.1673 1.66797 18.048 1.66797 16.6673V10.834Z"
                  fill="#9CA3AF"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 2.50065C9.11594 2.50065 8.2681 2.85184 7.64298 3.47696C7.01786 4.10208 6.66667 4.94993 6.66667 5.83398V9.16732C6.66667 9.62756 6.29357 10.0007 5.83333 10.0007C5.3731 10.0007 5 9.62756 5 9.16732V5.83398C5 4.5079 5.52678 3.23613 6.46447 2.29845C7.40215 1.36077 8.67392 0.833984 10 0.833984C11.3261 0.833984 12.5979 1.36077 13.5355 2.29845C14.4732 3.23613 15 4.5079 15 5.83398V9.16732C15 9.62756 14.6269 10.0007 14.1667 10.0007C13.7064 10.0007 13.3333 9.62756 13.3333 9.16732V5.83398C13.3333 4.94993 12.9821 4.10208 12.357 3.47696C11.7319 2.85184 10.8841 2.50065 10 2.50065Z"
                  fill="#9CA3AF"
                />
              </g>
            </svg>
          </span>
          <span class="absolute top-1/2 right-4 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.0512 3.14409C11.5739 2.48584 9.9234 2.32277 8.34584 2.6792C6.76829 3.03562 5.34821 3.89245 4.29741 5.12189C3.2466 6.35133 2.62137 7.88751 2.51496 9.50132C2.40854 11.1151 2.82665 12.7201 3.70692 14.0769C4.58719 15.4337 5.88246 16.4695 7.39955 17.03C8.91664 17.5905 10.5743 17.6456 12.1252 17.187C13.6762 16.7284 15.0373 15.7808 16.0057 14.4855C16.9741 13.1901 17.4978 11.6164 17.4987 9.99909V9.2329C17.4987 8.77266 17.8718 8.39956 18.332 8.39956C18.7923 8.39956 19.1654 8.77266 19.1654 9.2329V9.99956C19.1642 11.9763 18.5242 13.9002 17.3406 15.4834C16.157 17.0666 14.4934 18.2248 12.5978 18.7853C10.7022 19.3457 8.67619 19.2784 6.82196 18.5934C4.96774 17.9084 3.38463 16.6423 2.30875 14.984C1.23286 13.3257 0.72184 11.3641 0.851902 9.39166C0.981963 7.41922 1.74614 5.54167 3.03045 4.03902C4.31477 2.53637 6.05042 1.48914 7.97854 1.05351C9.90666 0.617872 11.9239 0.817181 13.7295 1.62171C14.1499 1.80902 14.3389 2.30167 14.1516 2.72206C13.9642 3.14246 13.4716 3.3314 13.0512 3.14409Z"
                fill="#22AD5C"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.9236 2.74378C19.2492 3.06906 19.2495 3.59669 18.9242 3.92229L10.5909 12.264C10.4346 12.4204 10.2226 12.5083 10.0015 12.5083C9.78042 12.5084 9.56838 12.4206 9.41205 12.2643L6.91205 9.76426C6.58661 9.43882 6.58661 8.91118 6.91205 8.58574C7.23748 8.26031 7.76512 8.26031 8.09056 8.58574L10.001 10.4962L17.7451 2.74437C18.0704 2.41877 18.598 2.41851 18.9236 2.74378Z"
                fill="#22AD5C"
              />
            </svg>
          </span>
        </div>
        <p class="mt-[10px] text-sm text-green">Password is strong</p>
      </div>
    </div>
  </div>
</template> -->

<!-- ************************************** -->
<template>
	<section class="p-6 dark:bg-gray-100 dark:text-gray-900">
		<form  action="" class="container flex flex-col mx-auto space-y-12">
			<fieldset class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
				<div class="space-y-2 col-span-full lg:col-span-1">
					<p class="font-medium">Personal Inormation</p>
					<p class="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
				</div>
				<div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
					<div class="col-span-full sm:col-span-3">
						<label for="firstname" class="text-sm">First name</label>
						<input id="firstname" type="text" placeholder="First name" class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300">
					</div>
					<div class="col-span-full sm:col-span-3">
						<label for="lastname" class="text-sm">Last name</label>
						<input id="lastname" type="text" placeholder="Last name" class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300">
					</div>
					<div class="col-span-full sm:col-span-3">
						<label for="email" class="text-sm">Email</label>
						<input id="email" type="email" placeholder="Email" class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300">
					</div>
					<div class="col-span-full">
						<label for="address" class="text-sm">Address</label>
						<input id="address" type="text" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300">
					</div>
					<div class="col-span-full sm:col-span-2">
						<label for="city" class="text-sm">City</label>
						<input id="city" type="text" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300">
					</div>
					<div class="col-span-full sm:col-span-2">
						<label for="state" class="text-sm">State / Province</label>
						<input id="state" type="text" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300">
					</div>
					<div class="col-span-full sm:col-span-2">
						<label for="zip" class="text-sm">ZIP / Postal</label>
						<input id="zip" type="text" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300">
					</div>
				</div>
			</fieldset>
			<fieldset class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
				<div class="space-y-2 col-span-full lg:col-span-1">
					<p class="font-medium">Profile</p>
					<p class="text-xs">Adipisci fuga autem eum!</p>
				</div>
				<div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
					<div class="col-span-full sm:col-span-3">
						<label for="username" class="text-sm">Username</label>
						<input id="username" type="text" placeholder="Username" class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300">
					</div>
					<div class="col-span-full sm:col-span-3">
						<label for="website" class="text-sm">Website</label>
						<input id="website" type="text" placeholder="https://" class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300">
					</div>
					<div class="col-span-full">
						<label for="bio" class="text-sm">Bio</label>
						<textarea id="bio" placeholder="" class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"></textarea>
					</div>
					<div class="col-span-full">
						<label for="bio" class="text-sm">Photo</label>
						<div class="flex items-center space-x-2">
							<img src="https://source.unsplash.com/30x30/?random" alt="" class="w-10 h-10 dark:bg-gray-500 rounded-full dark:bg-gray-300">
							<button type="button" class="px-4 py-2 border rounded-md dark:border-gray-800">Change</button>
						</div>
					</div>
				</div>
			</fieldset>
		</form>
	</section>
</template>

<!-- ************************************** -->
