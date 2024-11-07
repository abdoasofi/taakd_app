<template>
    <div class="py-6">
        <div class="flex gap-2 mb-2 items-center">
            <div class="w-10 lg:w-14 shrink-0">
                <StyledIcon status=1 scalse=1 icon="io-document-text-outline"/>
            </div>
            <Heading level="secondary" class="text-black" tag="h2">Background Verification Instructions:</Heading>
        </div>
        <div class="my-2">
        <ul class="list-disc list-outside ltr:ml-2 rtl:mr-2 mt-2 space-y-3 text-black">
            <li>Welcome to Applicant Center! This is your personal site which will assist you through the Background Verification process. To begin please provide the information required to complete your Background Verification for TAAKD.</li>
            <li>This is the first of three distinct phases of the Background Verification process. 
                You can save your work and exit the application by clicking the ‘Save’ button. This application must be completed and submitted within 7 days of receiving the Background Verification request email. Once you submit your application you will not be able to make any modifications, and Taakd will start working on your Background Verifications.</li>
            <li>While your Background Verification is in process you may be contacted by Taakd to provide additional information necessary to complete this request. Please respond to any of Taakd’s requests for information as quickly as possible in order to expedite completion of your Background Verification.</li>
        </ul>
        </div>
        <Heading level="secondary" class="text-black" tag="h2">Additinal instructions</Heading>

        <div class="my-2">
        <ul class="list-disc list-outside ltr:ml-2 rtl:mr-2  mt-2 space-y-3 text-black">
            <li>Please list the best phone number and email address for Taakd to contact you for questions regarding your information.</li>
            <li>Have a copy of your resume or CV handy when completing the information.</li>
            <li>Research your own history, including employment dates, job titles and salaries, so that you are able to provide complete and accurate information to Taakd if asked.</li>
            <li>Be prepared to provide your current and past addresses.</li>
            <li>Locate education transcripts, diplomas, or certificates in advance.</li>
            <li>Collect past paychecks/payslips and tax documents that can be used to verify your employment.</li>
            <li>To view Taakd’s Website Accessibility Policy, report website accessibility problems, or request accessible services and information please go to www.Taakd.com/accessibility.</li>
            
            <!-- <li>If you need help, you can visit our Candidate Help Center or contact Taakd using Live Help.</li> -->
            <!-- <li>Taakd is committed to protecting your privacy. Find out more about our privacy policies for your respective regions: US, Canada, EMEA, APAC and Australia.</li> -->

        </ul>
        <p class="text-black p-3 " >If you need help, you can visit our Candidate Help Center or contact Taakd using Live Help.</p>
        <p class="text-black">Taakd is committed to protecting your privacy. Find out more about our privacy policies for your respective regions: US, Canada, EMEA, APAC and Australia.</p>
        </div>
    </div>
  
    
    </template>
    <script setup>
 
import Heading from '../../components/heading.vue';
   import StyledIcon from '../../components/styledIcon.vue';

    </script>
    