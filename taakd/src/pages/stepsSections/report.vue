<!-- report.vue -->
<template>
  <div class="w-full p-3">
    <div class="flex justify-between text-sm">
      <div>{{ store.step1.employer_name.value }}</div>
      <div>{{ $t('report.requestNumber') }}: {{ store.documentName }}</div>
    </div>
    <div>
      <div class="py-10">
        <img src="@/assets/logo.png" alt="Logo" class="h-40 w-72 mb-4" />
      </div>
      <div
        class="text-xl font-bold py-3 border-b-2 border-b-black uppercase w-1/3"
      >
        {{ $t('report.name') }}
      </div>
      <div class="text-3xl">{{ store.step1.employer_name.value }}</div>
      <div class="mt-10">
        <div class="flex gap-3 text-xl font-bold p-1">
          <div class="uppercase">{{ $t('report.dateOfBirth') }}</div>
          <div>{{ store.step1.date_of_birth.value }}</div>
        </div>
        <div class="flex gap-3 text-xl font-bold p-1">
          <div class="uppercase">{{ $t('report.jobLocation') }}</div>
          <div>[{{ $t('report.jobLocationPlaceholder') }}]</div>
        </div>
      </div>
    </div>
    <div class="flex justify-end text-xl font-bold uppercase">
      <div>
        <div class="grid grid-cols-2 border-b-2 border-b-black p-2">
          <div>{{ $t('report.requestNumber') }}</div>
          <div>{{ store.documentName }}</div>
        </div>
        <div class="grid grid-cols-2 border-b-2 border-b-black p-2">
          <div>{{ $t('report.status') }}</div>
          <div>[{{ $t('report.statusPlaceholder') }}]</div>
        </div>
        <div class="grid grid-cols-2 border-b-2 border-b-black p-2">
          <div>{{ $t('report.turnaroundTime') }}</div>
          <div>[{{ $t('report.turnaroundTimePlaceholder') }}]</div>
        </div>
        <div class="grid grid-cols-2">
          <div>{{ $t('report.requestNumber') }}</div>
          <div>{{ $t('report.exampleRequestNumber') }}</div>
        </div>
      </div>
    </div>
    <span class="block border-b-2 border-b-black my-3"></span>
    <!-- 
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
    -->
    <div id="table" class="py-5">
      <div
        id="table-header"
        class="grid grid-cols-3 uppercase text-2xl font-bold"
      >
        <div>{{ $t('report.products') }}</div>
        <div>{{ $t('report.verificationSources') }}</div>
        <div>{{ $t('report.searchResults') }}</div>
      </div>
      <div id="table-body" class="space-y-3 mt-3 font-bold">
        <div class="grid grid-cols-3 p-4 border-[1px] border-black">
          <div class="flex items-center gap-1 place-self-start">
            <div>
              <span class="relative top-1 start-1 block">
                <AcademicCapIcon class="h-10 w-10 text-secondary" />
              </span>
            </div>
            <div class="underline">{{ $t('report.globalEducation') }}</div>
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
            <div>
              <span class="relative top-1 start-1 block">
                <BriefcaseIcon class="h-10 w-10 text-secondary" />
              </span>
            </div>
            <div class="underline">{{ $t('report.globalEmployment') }}</div>
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
            <div>
              <span class="relative top-1 start-1 block">
                <CheckBadgeIcon class="h-10 w-10 text-secondary" />
              </span>
            </div>
            <div class="underline">{{ $t('report.additionalProfessionalQualifications') }}</div>
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
              class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-secondary -start-5"
            >
              <span class="relative top-1 start-1 block">
                <AcademicCapIcon class="h-10 w-10 text-white" />
              </span>
            </div>
          </div>
          <div class="text-xl font-bold">{{ $t('report.globalEducation') }}</div>
        </div>
      </div>
      <div
        class="[&>*:nth-child(5n)]:break-before-page"
      >
        <div
          v-for="(education, index) in educationInformation"
          :key="education.id"
          class="p-1"
        >
          <div v-if="index % 2 === 0 && index !== 0" class="relative printOnly">
            <div class="bg-black flex gap-12 p-4 text-white">
              <div>
                <div
                  class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-black -start-5"
                >
                  <span class="relative top-3 start-1 block">[icon]</span>
                </div>
              </div>
              <div class="text-xl font-bold">{{ $t('report.globalEducation') }}</div>
            </div>
          </div>
          <div id="education-body" class="py-4">
            <div class="grid grid-cols-2">
              <div>{{ $t('report.school') }}</div>
              <div>{{ education.name_of_school_or_college_university }}</div>
            </div>
            <div class="flex justify-end">{{ $t('report.completeDataVerified') }}</div>
            <span class="block border-b-2 border-b-black my-3"></span>
            <div class="space-y-3 font-bold">
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600" >
                <div>{{ $t('report.country') }}</div>
                <div class="font-normal">{{ education.country }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600" >
                <div>{{ $t('report.city') }}</div>
                <div class="font-normal">{{ education.city }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600" >
                <div>{{ $t('report.governorate') }}</div>
                <div class="font-normal">{{ education.governorate }}</div>
              </div>

              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600" >
                <div>{{ $t('report.location_text') }}</div>
                <div class="font-normal">{{ education.location_text }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600" >
                <div>{{ $t('report.from_date') }}</div>
                <div class="font-normal">{{ education.from_date }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600" >
                <div>{{ $t('report.to_date') }}</div>
                <div class="font-normal">{{ education.to_date }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600" >
                <div>{{ $t('report.field_of_study_or_major') }}</div>
                <div class="font-normal">{{ education.field_of_study_or_major }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600" >
                <div>{{ $t('report.phone') }}</div>
                <div class="font-normal">{{ education.phone }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600" >
                <div>{{ $t('report.ext') }}</div>
                <div class="font-normal">{{ education.ext }}</div>
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
              class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-secondary -start-5"
            >
              <span class="relative top-1 start-1 block">
                <BriefcaseIcon class="h-10 w-10 text-white" />
              </span>
            </div>
          </div>
          <div class="text-xl font-bold">{{ $t('report.globalEmployment') }}</div>
        </div>
      </div>
      <div
        class="[&>*:nth-child(5n)]:break-before-page"
      >
        <div
          v-for="(employment, index) in employmentHistory"
          :key="employment.employment_id"
          class="p-1"
        >
          <div v-if="index % 4 === 0 && index !== 0" class="relative printOnly">
            <div class="bg-black flex gap-12 p-4 text-white">
              <div>
                <div
                  class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-black -start-5"
                >
                  <span class="relative top-3 start-1 block">[icon]</span>
                </div>
              </div>
              <div class="text-xl font-bold">{{ $t('report.globalEmployment') }}</div>
            </div>
          </div>
          <div id="employment-body" class="py-4">
            <div class="grid grid-cols-2">
              <div>{{ $t('report.party') }}</div>
              <div>{{ employment.company }}</div>
            </div>

            <div class="flex justify-end">{{ $t('report.completeDataVerified') }}</div>
            <span class="block border-b-2 border-b-black my-3"></span>
            <div class="space-y-3 font-bold">
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.name_of_your_employer') }}</div>
                <div class="font-normal">{{ employment.name_of_your_employer }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.contact_the_employer') }}</div>
                <div class="font-normal">{{ employment.contact_the_employer }}</div>
              </div>
              <!-- <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.issuing_salary') }}</div>
                <div class="font-normal">{{ employment.issuing_salary }}</div>
              </div> -->
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.country') }}</div>
                <div class="font-normal">{{ employment.country }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.city') }}</div>
                <div class="font-normal">{{ employment.city }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.location_text') }}</div>
                <div class="font-normal">{{ employment.location_text }}</div>
              </div>
              <!-- <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.continuous') }}</div>
                <div class="font-normal">{{ employment.continuous }}</div>
              </div> -->
              <!-- <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.activity_has_stopped') }}</div>
                <div class="font-normal">{{ employment.activity_has_stopped }}</div>
              </div> -->
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.from_date') }}</div>
                <div class="font-normal">{{ employment.from_date }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.end_date') }}</div>
                <div class="font-normal">{{ employment.end_date }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.phone') }}</div>
                <div class="font-normal">{{ employment.phone }}</div>
              </div>
              <!-- <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.ext') }}</div>
                <div class="font-normal">{{ employment.ext }}</div>
              </div> -->
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.official_job_title_held_currently') }}</div>
                <div class="font-normal">{{ employment.official_job_title_held_currently }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.type_of_employment') }}</div>
                <div class="font-normal">{{ employment.type_of_employment }}</div>
              </div>
              <!-- <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.the_company_has_different_names') }}</div>
                <div class="font-normal">{{ employment.the_company_has_different_names }}</div>
              </div> -->
              <!-- <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.different_company_names') }}</div>
                <div class="font-normal">{{ employment.different_company_names }}</div>
              </div> -->
              <!-- <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.you_have_a_nicknamecx') }}</div>
                <div class="font-normal">{{ employment.you_have_a_nicknamecx }}</div>
              </div> -->
              <!-- <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.nickname') }}</div>
                <div class="font-normal">{{ employment.nickname }}</div>
              </div> -->

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
              class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-secondary -start-5"
            >
              <span class="relative top-1 start-1 block">
                <CheckBadgeIcon class="h-10 w-10 text-white" />
              </span>
            </div>
          </div>
          <div class="text-xl font-bold">{{ $t('report.additionalProfessionalQualifications') }}</div>
        </div>
      </div>
      <div
        class="[&>*:nth-child(5n)]:break-before-page"
      >
        <div
          v-for="(professional_qualification, index) in professionalQualification"
          :key="professional_qualification.id"
          class="p-1"
        >
          <div v-if="index % 4 === 0 && index !== 0" class="relative printOnly">
            <div class="bg-black flex gap-12 p-4 text-white">
              <div>
                <div
                  class="rounded-full border-white border-4 h-14 w-14 absolute -top-[2px] bg-black -start-5"
                >
                  <span class="relative top-3 start-1 block">[icon]</span>
                </div>
              </div>
              <div class="text-xl font-bold">{{ $t('report.additionalProfessionalQualifications') }}</div>
            </div>
          </div>
          <div id="professional_qualification-body" class="py-4">
            <div class="grid grid-cols-2">
              <div>{{ $t('report.awardingBody') }}</div>
              <div>{{ professional_qualification.awarding_body }}</div>
            </div>
            <div class="flex justify-end">{{ $t('report.dateAwarded') }}: {{ professional_qualification.date_awarded }}</div>
            <span class="block border-b-2 border-b-black my-3"></span>
            <div class="space-y-3 font-bold">
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.licenseOrCertificateNumber') }}</div>
                <div class="font-normal">{{ professional_qualification.license_or_certificate_number }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.issuing_country') }}</div>
                <div class="font-normal">{{ professional_qualification.issuing_country }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.date_awarded') }}</div>
                <div class="font-normal">{{ professional_qualification.date_awarded }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.expiration_date') }}</div>
                <div class="font-normal">{{ professional_qualification.expiration_date }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.award_name_description') }}</div>
                <div class="font-normal">{{ professional_qualification.award_name_description }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.is_an_expiration_date') }}</div>
                <div class="font-normal">{{ professional_qualification.is_an_expiration_date }}</div>
              </div>
              <div class="grid grid-cols-2 border-b-2 border-dotted border-b-gray-600">
                <div>{{ $t('report.your_name_varies') }}</div>
                <div class="font-normal">{{ professional_qualification.your_name_varies }}</div>
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
import { useVerificationRequestStore } from '../../stores/verificationRequest';
import { onUpdated } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useVerificationRequestStore();
const educationInformation = store.step2.educationInformation;
const employmentHistory = store.step3.employment_history;
const professionalQualification = store.step4.professional_qualification;

onUpdated(async () => {
  await store.loadDocument();
});
</script>

<style scoped>

</style>