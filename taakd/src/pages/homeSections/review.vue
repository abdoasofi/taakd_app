<!-- review.vue -->
<template>
    <div class="py-6">
      <div class="flex gap-2 mb-2 items-center">
        <div class="w-10 lg:w-14 shrink-0">
          <StyledIcon :status="1" :scale="1" icon="io-document-text-outline"/>
        </div>
        <Heading level="secondary" class="text-black" tag="h2">
          {{ $t('review.heading') }}
        </Heading>
      </div>
      <div class="my-2">
        <ul class="list-disc list-outside ltr:ml-2 rtl:mr-2 mt-2 space-y-3 text-black">
          <li>{{ $t('review.listItem1') }}</li>
          <li>{{ $t('review.listItem2') }}</li>
          <li>{{ $t('review.listItem3') }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  import Heading from '../../components/heading.vue';
  import StyledIcon from '../../components/styledIcon.vue';
  </script>
  
  <style scoped>
  /* أضف أي أنماط مخصصة للمكون هنا */
  </style>