<template> 
    <!-- ******************* -->
    <div class="container  bg-[#F7F7F7]">
     <div class="flex flex-row space-x-5 mt-4 mx-auto"> 
        <h1 class=" text-green-800 m-1" >Step 1</h1>
        <Button @click="" :variant="'subtle'" theme="green" size="sm" label="Button"> Save </Button>
        <Button @click="" :variant="'subtle'" theme="green" size="sm" label="Button"> Alias Name + </Button>
        <Button @click="" :variant="'subtle'" theme="green" size="sm" label="Button"> Phone + </Button>

        <router-link to ="/">
                <div>
               <Button :variant="'outline'" theme="green" size="sm" label="Button" >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.373 12.75H18.75C18.9628 12.75 19.141 12.6782 19.2845 12.5345C19.4282 12.391 19.5 12.2128 19.5 12C19.5 11.7872 19.4282 11.609 19.2845 11.4655C19.141 11.3218 18.9628 11.25 18.75 11.25H7.373L12.5423 6.08076C12.6909 5.93209 12.7643 5.75809 12.7625 5.55876C12.7605 5.35942 12.682 5.18217 12.527 5.02701C12.3718 4.88217 12.1962 4.80717 12 4.80201C11.8038 4.79684 11.6282 4.87184 11.473 5.02701L5.13275 11.3673C5.03908 11.4609 4.97308 11.5597 4.93475 11.6635C4.89625 11.7673 4.877 11.8795 4.877 12C4.877 12.1205 4.89625 12.2327 4.93475 12.3365C4.97308 12.4403 5.03908 12.5391 5.13275 12.6328L11.473 18.973C11.6115 19.1115 11.783 19.1823 11.9875 19.1855C12.192 19.1887 12.3718 19.1178 12.527 18.973C12.682 18.8178 12.7595 18.6397 12.7595 18.4385C12.7595 18.2372 12.682 18.0589 12.527 17.9038L7.373 12.75Z" fill="#969696"/>
                    </svg>
               </Button>
           </div>  
        </router-link>
           
         <router-link to ="/Step_2" >
          <div  class="flex items-center justify-between">
            <Button @click="" :variant="'subtle'" theme="green" size="sm" label="Button"> Step 2 </Button>
          </div>
         </router-link> 
         
    </div>
    </div>
    <!-- ******************* -->
    <div class="p-2">
        <h1 class=" text-lg text-p-2xl">Personal Information</h1>
        <h3 class="text-p-lg">This is my name</h3>
        <p class="text-p-2xs">
            I certify this is my current legal name, exactly as it is displayed on my government-issued identification document  
        </p>
    </div>
    <!-- ******************* -->
    <div class="grid grid-cols-2 gap-2 p-2">
        <FormControl
            :type="'text'"
            placeholder="First Name"
            label="First Name"
            v-model="first_name"
        />
        <FormControl
            :type="'text'"
            placeholder="Last Name"
            label="Last Name"
            v-model="last_name"
        /> 
        <FormControl
            type="checkbox"
            label="I don't have a middle name"
            v-model="dont_middle_name"
        /> 
        <br>
        <FormControl
            :type="'text'"
            placeholder="Middle Name"
            label="Middle Name"
            v-model="middle_name"
        />     
        <Select 
            :options="[
            {
                label: 'John Doe',
                value: 'john-doe',
            },
            {
                label: 'Jane Doe',
                value: 'jane-doe',
            },
            {
                label: 'John Smith',
                value: 'john-smith',
            },
            {
                label: 'Jane Smith',
                value: 'jane-smith',
                disabled: true,
            },
            {
                label: 'John Wayne',
                value: 'john-wayne',
            },
            {
                label: 'Jane Wayne',
                value: 'jane-wayne',
            },
            ]"
            v-model="suffix"
            
        />        
    </div>
    <!-- ******************* -->
    <br>
    <div class="p-2">
        <h3 class="text-p-lg">Current Mailing Address</h3>
        <div class="grid grid-cols-2 gap-2 py-2">
            <Autocomplete
            placeholder="Assign a user"
            :options="activeLcation"

          />
        </div>
    </div>

    <!-- ******************* -->
    <br>
    <div class="p-2">
        <h3 class="text-p-lg">Contact Information</h3>
        <ListView :options = "{
                    selectable: false,
                    resizeColumn: true,
                    emptyState: {
                    title: 'No Phone found',
                    description: 'Create a new Phone to get started',
                    button: {
                        label: 'New Phone',
                        variant: 'solid',
                        theme:'green',
                        onClick: () => console.log('New Phone'),
                    },
                    },

            }"
            :columns="[
                { 
                'label':'Phone',
                'key':'phone',
                },
            ]" 
            :rows="requestDoc.phone"
            
            />
    </div>
    <!-- ******************* -->
     <br>
    <div class="p-2">
        <h3 class="text-p-lg">Aliases</h3>
        <ListView v-for="alias in requestDoc.alias_name" 
            :columns="[
                { 
                'label':'First Name',
                'key':'first_name',
                },
                { 
                'label':'Middle Name',
                'key':'middle_name',
                },
                { 
                'label':'Last Name',
                'key':'last_name',
                }
            ]" 
              :rows="[
                        {
                        id: 1,
                        first_name: alias.first_name,
                        middle_name: alias.middle_name,
                        last_name: alias.last_name,
                        },
            ]"

            :options = "{
                    selectable: tr,
                    resizeColumn: true,
                    showTooltip: true,
                    resizeColumn: true,
                    emptyState: {
                    title: 'No Alias Name found',
                    description: 'Create a new Alias Name to get started',
                    button: {
                        label: 'New Alias Name',
                        variant: 'solid',
                        theme:'green',
                        onClick: () => console.log('New Record'),
                    },
                    },

            }"
            row-key="name"

            
            />
    </div>
    <!-- ******************* -->
    <br>
    <div class="p-2">
        <h3 class="text-p-lg">ID Card Information</h3>
        <p class="text-p-2xs">
            Most public records are stored using name and date of birth.<br>
            Therefore, providing this information allows us to search for these sources accurately
        </p>
        <div class="grid grid-cols-2 gap-2 py-2">
            <FormControl
                :type="'date'"
                label="Date of Birth"
                v-model="date_of_birth"
            />
            <FormControl
                :type="'date'"
                label="Repeat Enter Date of Birth"
                v-model="repeat_enter_date_of_birth"
            />            
        </div>

    </div>
    <!-- ******************* -->    
     
         <!-- ******************* -->
    <br>
    <div class="p-2">
        <h3 class="text-p-lg">ID Card Information</h3>
        <div class="">
            {{ requestDoc}}
            <br>
            {{ requestListResource.name}}
        </div>
        <p>{{ reques.secret }}</p>

    </div>
    <!-- ******************* -->  
</template>
      
      
<script setup>
    import { computed, ref , watch ,inject } from 'vue'
    import { Button , FormControl , ListView , ErrorMessage ,Select , Autocomplete } from 'frappe-ui'
    import { createResource , createListResource , createDocumentResource} from 'frappe-ui'
    import { session } from '../../data/session'

    const location = createListResource({
            type: 'list',
            doctype: 'Location',
            fields:["location_name","parent_location","location_type"],
            cache: 'location',
            auto: true,
            onSuccess() {
                console.log("********ssss****",location.data )
            },
                     
    })
    const activeLcation = computed(() => {
        return location.data 
    }) 
  
    const reques = inject("reques")
    const requestList = createListResource ({
        doctype : "Verification Instructions Request",
        fields: ['*'], 
        filters:{ "user_id": session.user },
        pageLength: 1,
        auto:true,
        onSuccess(data) {
            console.log("****#########****",requestList.list.data[0].name)
        },
    })
  
    const requestResource = createDocumentResource({
        doctype: 'Verification Instructions Request',
        name:reques.secret,

        auto:true,
        onSuccess(data) {
            console.log("********",data)
        },
    })

    const requestDoc =computed( () => {
        if (requestResource.doc){
            return requestResource.doc
        }
        else{
            return []
        }
    })
    const requestListResource  = computed( () => {
        if (requestList.data[0]){
            return requestList.data[0]
        }
        else{
            return []
        }
    })
</script>
      
    