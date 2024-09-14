<template>
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
            <router-link to ="/Step_4">
                <div>
                    <Button :variant="'outline'" theme="green" size="sm" label="Button" >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.373 12.75H18.75C18.9628 12.75 19.141 12.6782 19.2845 12.5345C19.4282 12.391 19.5 12.2128 19.5 12C19.5 11.7872 19.4282 11.609 19.2845 11.4655C19.141 11.3218 18.9628 11.25 18.75 11.25H7.373L12.5423 6.08076C12.6909 5.93209 12.7643 5.75809 12.7625 5.55876C12.7605 5.35942 12.682 5.18217 12.527 5.02701C12.3718 4.88217 12.1962 4.80717 12 4.80201C11.8038 4.79684 11.6282 4.87184 11.473 5.02701L5.13275 11.3673C5.03908 11.4609 4.97308 11.5597 4.93475 11.6635C4.89625 11.7673 4.877 11.8795 4.877 12C4.877 12.1205 4.89625 12.2327 4.93475 12.3365C4.97308 12.4403 5.03908 12.5391 5.13275 12.6328L11.473 18.973C11.6115 19.1115 11.783 19.1823 11.9875 19.1855C12.192 19.1887 12.3718 19.1178 12.527 18.973C12.682 18.8178 12.7595 18.6397 12.7595 18.4385C12.7595 18.2372 12.682 18.0589 12.527 17.9038L7.373 12.75Z" fill="#969696"/>
                        </svg>
                    </Button>
                </div>    
            </router-link>


        <div class="flex items-center p-4 m-4 ">
            <router-link to ="/Step_6">
                <Button class="  p-1 m-2 " :variant="'subtle'" theme="gray" size="sm" label="Button">Reject </Button>

            </router-link>

            
            <div >
            <Button @click="showDialog = true" :variant="'subtle'" theme="gray" size="sm" label="Button"> 
                <div class="flex items-center py-4  ">
                                <span class="  p-1 m-2 " >Accept</span> 
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
  