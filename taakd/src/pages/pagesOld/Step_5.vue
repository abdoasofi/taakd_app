<template>
      <div id="yourDivId" ref="reportContent"  >
        <!-- ترويسة PDF -->
        <div  >
          <img src="@/assets/logo.png" alt="Logo" class="h-16 mx-auto mb-4" />
          <h2 class="text-3xl font-semibold text-center text-gray-700">Information Review Report</h2>
        </div>
        <!-- مكونات الخطوات المنفصلة -->
        <section  class="my-5">
          <Step1PersonalInfo />
        </section>
        <section  class="my-5">
          <Step2EducationInfo />
        </section>
        <section class="my-5">
          <Step3EmploymentHistory />
        </section>
        <section class="my-5">
          <Step4ProfessionalQualification />
        </section>
        <!-- تذييل PDF -->
        <div class="text-right text-sm text-gray-500 mt-8">
          <span class="page-number"></span>
        </div>
      </div>
</template>
<script setup>

</script>