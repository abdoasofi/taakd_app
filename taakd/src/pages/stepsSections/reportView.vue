<template>
  <div class="w-full p-3">
    <div class="flex justify-between text-sm">
      <div>{{ store.step1.employer_name.value }}</div>
      <div>request number:{{ store.documentName }}</div>
    </div>
    <div>
      <div class="py-10"><img src="@/assets/logo.png" alt="Logo" class="h-40  w-72 mb-4" /></div>
      <div
        class="text-xl font-bold py-3 border-b-2 border-b-black uppercase w-1/3"
      >
        NAME
      </div>
      <div class="text-3xl">{{ store.step1.employer_name.value }}</div>
      <div class="mt-10">
        <div class="flex gap-3 text-xl font-bold p-1">
          <div class="uppercase">date of birth</div>
          <div>{{ store.step1.date_of_birth.value }}</div>
        </div>
        <div class="flex gap-3 text-xl font-bold p-1">
          <div class="uppercase">job location</div>
          <div>[job location]</div>
        </div>
      </div>
    </div>
    <div class="flex justify-end text-xl font-bold uppercase">
      <div>
        <div class="grid grid-cols-2 border-b-2 border-b-black p-2">
          <div>REQUEST NUMBER</div>
          <div>{{ store.documentName }}</div>
        </div>
        <div class="grid grid-cols-2 border-b-2 border-b-black p-2">
          <div>STATUS</div>
          <div>[STATUS]</div>
        </div>
        <div class="grid grid-cols-2 border-b-2 border-b-black p-2">
          <div>TURNAROUND TIME</div>
          <div>[TURNAROUND TIME]</div>
        </div>
        <div class="grid grid-cols-2">
          <div>REQUEST NUMBER</div>
          <div>GA-060824-G562M</div>
        </div>
      </div>
    </div>
    <span class="block border-b-2 border-b-black my-3"></span>
    <div class="font-bold text-xl uppercase">
      <div>PREPARED BY:</div>
      <div>[prepared by]</div>
      <div>tel:</div>
      <div>[tel]</div>
    </div>
    <div class="flex justify-end font-bold text-xl uppercase">
      <div>
        <div>REQUESTED BY::</div>
        <div>[REQUESTED BY:]</div>
        <div>tel:</div>
        <div>[tel]</div>
      </div>
    </div>
    <div id="table" class="py-5">
      <div
        id="table-header"
        class="grid grid-cols-3 uppercase text-2xl font-bold"
      >
        <div>PRODUCTS</div>
        <div>VERIFICATION SOURCES</div>
        <div>SEARCH RESULTS</div>
      </div>
      <div id="table-body" class="space-y-3 mt-3 font-bold">
        <div class="grid grid-cols-3 p-4 border-[1px] border-black">
          <div class="flex items-center gap-1 place-self-start">
            <div><span class="relative top-1 left-1 block"><AcademicCapIcon class="h-10 w-10 text-secondary  " /></span></div>
            <div class="underline">global education</div>
          </div>
          <div>
            <div
              v-for="(education, index) in educationInformation"
              :key="education.id"
            >
              <div>{{ education.name_of_school_or_college_university }}</div>
            </div>
          </div>
          <div>
            <div
              v-for="(education, index) in educationInformation"
              :key="education.id"
            >
              <div>{{ education.name_of_school_or_college_university }}</div>
            </div>
          </div>
          <!-- <div>Complete - Data Verified</div> -->
        </div>
        <div class="grid grid-cols-3 p-4 border-[1px] border-black">
          <div class="flex items-center gap-1 place-self-start">
            <div><span class="relative top-1 left-1 block"><BriefcaseIcon class="h-10 w-10 text-secondary  " /></span></div>
            <div class="underline">Global Employment</div>
          </div>
          <div>
            <div
              v-for="(employment, index) in employmentHistory"
              :key="employment.employment_id"
            >
              <div>{{ employment.company }}</div>
            </div>
          </div>
          <div>
            <div
              v-for="(employment, index) in employmentHistory"
              :key="employment.employment_id"
            >
              <div>{{ employment.company }}</div>
            </div>
          </div>
          <!-- <div>Complete - Data Verified</div> -->
        </div>
        <div class="grid grid-cols-3 p-4 border-[1px] border-black">
          <div class="flex items-center gap-1 place-self-start">
            <div><span class="relative top-1 left-1 block"><CheckBadgeIcon class="h-10 w-10 text-secondary  " /></span></div>

            <div class="underline">Additional Professional Qualifications
            </div>
          </div>
          <div>
            <div
              v-for="(professional_qualification, index) in professionalQualification"
              :key="professional_qualification.id"
            >
              <div>{{ professional_qualification.awarding_body }}</div>
            </div>
          </div>
          <div>
            <div
              v-for="(professional_qualification, index) in professionalQualification"
              :key="professional_qualification.id"
            >
              <div>{{ professional_qualification.awarding_body }}</div>
            </div>
          </div>
          <!-- <div>Complete - Data Verified</div> -->
        </div>
      </div>
    </div>
    <!-- <div class="></div> -->
    <div class="break-before-page p-1">
      <div class="relative">
        <div class="bg-secondary flex gap-12 p-4 text-white">
          <div>
            <div
              class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-secondary -left-5"
            >
              <span class="relative top-1 left-1 block"><AcademicCapIcon class="h-10 w-10 text-white  " /></span>
            </div>
          </div>
          <div class="text-xl font-bold">Global Education</div>
        </div>
      </div>
      <div
        class="[&>*:nth-child(5n)]:break-before-page "
      >
        <div
          v-for="(education, index) in educationInformation"
          :key="education.id"
          class="p-1"
        >
          <!-- <div v-if="index%4===0&&index!==0"  class="relative printOnly " >
            <div class="bg-black flex gap-12 p-4 text-white">
              <div>
                <div
                  class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-black -left-5"
                >
                  <span class="relative top-3 left-1 block">[icon]</span>
                </div>
              </div>
              <div class="text-xl font-bold">Global Education</div>
            </div>
          </div> -->
          <div id="education-body" class="py-4">
            <div class="grid grid-cols-2">
              <div>School</div>
              <div>{{ education.name_of_school_or_college_university }}</div>
            </div>
            <div class="flex justify-end">Complete - Data 1 Verified</div>
            <span class="block border-b-2 border-b-black my-3"></span>
            <div class="space-y-3 font-bold">
              <div
                class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600"
              >
                <div>location</div>
                <div class="font-normal">{{ education.phone }}</div>
              </div>
              <div
                class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600"
              >
                <div>School</div>
                <div class="font-normal">[school]</div>
              </div>
              <div
                class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600"
              >
                <div>School</div>
                <div class="font-normal">[school]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="break-before-page p-1">
      <div class="relative">
        <div class="bg-secondary flex gap-12 p-4 text-white">
          <div>
            <div
              class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-secondary -left-5"
            >
            <span class="relative top-1 left-1 block"><BriefcaseIcon class="h-10 w-10 text-white  " /></span>
            </div>
          </div>
          <div class="text-xl font-bold">Global Employment</div>
        </div>
      </div>
      <div
        class="[&>*:nth-child(5n)]:break-before-page "
      >
        <div
          v-for="(employment, index) in employmentHistory"
          :key="employment.employment_id"
          class="p-1"
        >
        <!-- <div v-if="index%4===0&&index!==0"  class="relative printOnly ">
            <div class="bg-black flex gap-12 p-4 text-white">
              <div>
                <div
                  class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-black -left-5"
                >
                  <span class="relative top-3 left-1 block">[icon]</span>
                </div>
              </div>
              <div class="text-xl font-bold">Global Employment</div>
            </div>
          </div> -->
          <div id="education-body" class="py-4">
            <div class="ch"></div>
            <div class="grid grid-cols-2">
              <div>party</div>
              <div>{{ employment.company }}</div>
            </div>
            <div class="flex justify-end">Complete - Data 1 Verified</div>
            <span class="block border-b-2 border-b-black my-3"></span>
            <div class="space-y-3 font-bold">
              <div
                class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600"
              >
                <div>location</div>
                <div class="font-normal">{{ employment.phone }}</div>
              </div>
              <div
                class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600"
              >
                <div>School</div>
                <div class="font-normal">[school]</div>
              </div>
              <div
                class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600"
              >
                <div>School</div>
                <div class="font-normal">[school]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="break-before-page p-1">
      <div class="relative">
        <div class="bg-secondary flex gap-12 p-4 text-white">
          <div>
            <div
              class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-secondary -left-5"
            >
              <span class="relative top-1 left-1 block"><CheckBadgeIcon class="h-10 w-10 text-white  " /></span>
            </div>
          </div>
          <div class="text-xl font-bold">Additional Professional Qualifications</div>
        </div>
      </div>
      <div
        class="[&>*:nth-child(5n)]:break-before-page "
      >
        <div
          v-for="(professional_qualification, index) in professionalQualification"
          :key="professional_qualification.id"
          class="p-1"
        >
          <!-- <div v-if="index%4===0&&index!==0"  class="relative printOnly " >
            <div class="bg-black flex gap-12 p-4 text-white">
              <div>
                <div
                  class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-black -left-5"
                >
                  <span class="relative top-3 left-1 block">[icon]</span>
                </div>
              </div>
              <div class="text-xl font-bold">Global Education</div>
            </div>
          </div> -->
          <div id="professional_qualification-body" class="py-4">
            <div class="grid grid-cols-2">
              <div>Awarding Body</div>
              <div>{{ professional_qualification.awarding_body }}</div>
            </div>
            <div class="flex justify-end">Date Awarded : {{professional_qualification.date_awarded  }}</div>
            <span class="block border-b-2 border-b-black my-3"></span>
            <div class="space-y-3 font-bold">
              <div
                class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600"
              >
                <div>License or Certificate Number</div>
                <div class="font-normal">{{ professional_qualification.license_or_certificate_number }}</div>
              </div>
              <div
                class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600"
              >
                <div>School</div>
                <div class="font-normal">[school]</div>
              </div>
              <div
                class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600"
              >
                <div>School</div>
                <div class="font-normal">[school]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="break-before-all"></div>
  </div>
</template>

<script setup lang="ts">
import { AcademicCapIcon, BriefcaseIcon, CheckBadgeIcon } from '@heroicons/vue/24/solid';
import { useVerificationRequestStore } from '../../stores/verificationRequest'

const store = useVerificationRequestStore()
const educationInformation = store.step2.educationInformation
const employmentHistory = store.step3.employment_history
const professionalQualification = store.step4.professional_qualification
</script>

<style scoped>
/* @media screen {
  .printOnly {
    visibility: hidden !important;
  }
}

@media print {
  .printOnly {
    visibility: visible !important; 
  }
} */
</style>