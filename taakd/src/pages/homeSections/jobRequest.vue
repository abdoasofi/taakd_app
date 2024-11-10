<!-- jobRequest.vue -->
<template>
    <div class="py-6">
      <div class="flex gap-2 mb-2 items-center">
        <div class="w-10 lg:w-14 shrink-0">
          <StyledIcon :status="1" :scale="1" icon="io-document-text-outline"/>
        </div>
        <Heading level="secondary" class="text-black" tag="h2">
          {{ $t('jobRequest.backgroundVerificationInstructions') }}
        </Heading>
      </div>
  
      <div class="my-2">
        <ul class="list-disc list-outside ltr:ml-2 rtl:mr-2 mt-2 space-y-3 text-black">
          <li>{{ $t('jobRequest.instructions.welcome') }}</li>
          <li>{{ $t('jobRequest.instructions.phase1') }}</li>
          <li>{{ $t('jobRequest.instructions.process') }}</li>
        </ul>
      </div>
  
      <Heading level="secondary" class="text-black" tag="h2">
        {{ $t('jobRequest.additionalInstructions') }}
      </Heading>
  
      <div class="my-2">
        <ul class="list-disc list-outside ltr:ml-2 rtl:mr-2 mt-2 space-y-3 text-black">
          <li>{{ $t('jobRequest.additional.phoneNumber') }}</li>
          <li>{{ $t('jobRequest.additional.resume') }}</li>
          <li>{{ $t('jobRequest.additional.history') }}</li>
          <li>{{ $t('jobRequest.additional.addresses') }}</li>
          <li>{{ $t('jobRequest.additional.education') }}</li>
          <li>{{ $t('jobRequest.additional.paychecks') }}</li>
          <li>
            <a href="https://www.Taakd.com/accessibility" class="text-blue-500 underline">
              {{ $t('jobRequest.additional.accessibilityPolicy') }}
            </a>
          </li>
        </ul>
        <p class="text-black p-3">
          {{ $t('jobRequest.helpCenter') }}
        </p>
        <p class="text-black">
          {{ $t('jobRequest.privacyPolicy') }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import Heading from '../../components/heading.vue';
  import StyledIcon from '../../components/styledIcon.vue';
  </script>
  
  <style scoped>
  /* أضف أي أنماط مخصصة للمكون هنا */
  </style>