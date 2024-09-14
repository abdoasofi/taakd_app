<!-- <template>
  <div class="max-w-3xl py-12 mx-auto">
    <h2 class="font-bold text-lg text-gray-600 mb-4">
      Welcome {{ session.user }}!
    </h2>

    <Button theme="gray" variant="solid" icon-left="code" @click="ping.fetch" :loading="ping.loading">
      Click to send 'ping' request
    </Button>
    <div>
      {{ ping.data }}
    </div>
    <pre>{{ ping }}</pre>

    <div class="flex flex-row space-x-2 mt-4">
      <Button @click="showDialog = true">Open Dialog</Button>
      <Button @click="session.logout.submit()">Logout</Button>
    </div>

    <Dialog title="Title" v-model="showDialog"> Dialog content </Dialog>
  </div>
</template> -->

<template>
  <!-- <div class="flex items-center p-4 m-4 ">
     <div class=" w-28 h-28 text-center py-10 border-2 rounded-full"> ccc </div>
 
     <div class=" w-28 h-28 text-center py-10 border-2 rounded-full"> ccc </div>
     <div class=" w-28 h-28 text-center py-10 border-2 rounded-full"> ccc </div>
  </div> -->
   
 <div class="h-screen flex items-center justify-center bg-[#F7F7F7]">
 <router-link to ="/Step_1" >
  <button>sss</button>

     <!-- <B_1 class="  "></B_1> -->
   </router-link> 
  <div class="flex flex-row space-x-2 mt-4">
      <Button @click="session.logout.submit()">Logout</Button>
  </div>   
 </div>
  
 <Steps></Steps>

 <Snackbar></Snackbar>

<Review></Review>

<Modal></Modal>

<Blog></Blog>

<ResetPassword></ResetPassword>

<NewLogin></NewLogin>

 </template>
<script setup>
import { ref } from 'vue'
import { Dialog } from 'frappe-ui'
import { createResource } from 'frappe-ui'
import { session } from '../data/session'

import Steps from '../components/Steps.vue';
import Snackbar from '../components/Snackbar.vue';
import Review from '../components/Review.vue';
import Modal from '../components/Modal.vue';
import Blog from '../components/Blog.vue';
import ResetPassword from '../pages/ResetPassword.vue';
import NewLogin from '../pages/NewLogin.vue';

const ping = createResource({
  url: 'ping',
  auto: true,
})

const showDialog = ref(false)
</script>
