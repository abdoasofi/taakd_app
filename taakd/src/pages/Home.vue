<template> 
 <div class="container  bg-[#F7F7F7]">
  <div class="flex flex-row space-x-10 mt-4 mx-auto">
    <h1>Create New Password</h1>
    <h3>{{ session.user }}</h3>
    <!-- <h3>{{ session.login }}</h3> -->
    <Button @click="updatePassword">Handle Password</Button>
    <Button @click="createUser">Create User</Button>
    <!-- <Button @click="handlePassword">Test</Button> -->
    <router-link to ="Step_1">
      <Button>Step 1</Button>
    </router-link>
    <Button @click="session.logout.submit()">Logout</Button>
  </div>
   
  <div class="  bg-[hsl(72,71%,82%)]">

<div
  class="p-2"
  label="Enter password"
>
  <FormControl
    :type="'password'"
    size="sm"
    variant="subtle"
    placeholder="Placeholder"
    :disabled="false"
    label="Enter password"
    v-model="enterPassword"
  />
</div>
<!-- ******** -->
<div
  class="p-2"
  label="Enter Password"
>
  <FormControl 
    :type="'password'"
    size="sm"
    variant="subtle"
    placeholder="Placeholder"
    :disabled="false"
    label="Confirm Password"
    v-model="confirmPassword"
  />
  <ErrorMessage  :message="Error('There was an error')" />
</div>
<!-- ******** -->
  <ListView :options = "{
        selectable: false,
        resizeColumn: true,
        emptyState: {
          title: 'No records found',
          description: 'Create a new record to get started',
          button: {
            label: 'New Record',
            variant: 'solid',
            onClick: () => console.log('New Record'),
          },
        },

  }"
  :columns="[
    { 
      'label':'Full Name',
      'key':'full_name',
    },
    { 
      'label':'Name',
      'key':'username',
    },
    { 
      'label':'Email',
      'key':'email',
    }
  ]" 

  :rows="userList.data"
  
  />
  </div> 
 </div>
</template>
<script setup>
import { ref , watch } from 'vue'
import { Button , FormControl , ListView , ErrorMessage} from 'frappe-ui'
import { createResource , createListResource} from 'frappe-ui'
import { session } from '../data/session'

const confirmPassword = ref('')
const enterPassword = ref('')
const new_pass = ref('')
const err = ref(false)
const ping = createResource({
  url: 'ping',
  auto: true,
})

// function handlePassword(event) {
//   if (enterPassword.value == confirmPassword.value){
//     err = false
//   }
//   else{
//     err = true
//   }
//   } 
  
  const userList = createListResource({
  doctype: 'User',
  fields: ['email','username','full_name','new_password','name','first_name'],
  filters: {
      email: session.user
    },
    auto:true,
  // pageLength: 1,
  insert: {
        onSuccess(d) {
          console.log('****************************************');
        },
        onError() {}
    }, 
    setValue: {
        onSuccess(d) {
          console.log('*************333***************************');
        },
        onError() {}
    },
})
const updatedDescription = ref({
  // email:session.user,
  new_password:confirmPassword.value

})
function updatePassword() {
  userList.setValue.submit({
    name:session.user,
    new_password: confirmPassword.value
})
}

function createUser() {
  userList.insert.submit({
    email:'test100@gmail.com',
    first_name: 'Asofi'
})
  }

const showDialog = ref(false)
</script>
