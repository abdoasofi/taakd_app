<template>
    <div class="pt-6">
        <div class="flex gap-2 mb-2">
            <div class="w-7 lg:w-9 shrink-0">
                <StyledIcon  />
            </div>
            <Heading level="secondary" class="text-black" tag="h2">Here you can follow the progress of your report and communicate with Taakd</Heading>
        </div>
        <form action="">
            <div class="mt-3">
                <h3 class="text-lg font-medium mb-3 text-black">Contact details</h3>
                <div class="lg:grid lg:grid-cols-2 lg:gap-3 lg:w-1/2">
                    <div class="py-3">
                        <StyledInput id="mobile" name="mobile" labelText="Mobile Number" isMandatory="true" infoText="mobile number" inputType="text" @input-change="handleChange"  />
                        <small class="block text-[10px] font-normal">Supporting text</small>
                    </div>
                    <div class="py-3">
                        <Select id="country" name="country"  labelText="Country" isMandatory="true" infoText="Country"   :options="selectOptions"
                        @input-change="handleChange" />
                    </div>
                </div>
                <div class="py-3 text-sm ">
                    <span class="text-sm block mb-3">Did you obtain the degree or diploma? *</span>
                    <div class="flex flex-col gap-2">
                        <div>
                            <input type="radio" name="diploma" id="yes" />
                            <label for="yes">
                                Yes, I obtained
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="diploma" id="no" />
                            <label for="no">
                                No, I did not obtained
                            </label>
                        </div>
                    </div>
                </div>
                <div class="py-3">
                    <span class="text-sm font-medium block mb-2">Available Time</span>
                    <div class="grid grid-cols-2 gap-3 text-sm lg:w-1/2">
                        <div class="w-full">
                            <StyledInput id="from" name="from" labelText="From" isMandatory="true" infoText="from" inputType="date" @input-change=""  />
                        </div>
                        <div class="w-full">
            
                            <StyledInput id="to" name="to" labelText="To" isMandatory="true" infoText="To" inputType="date" @input-change=""  />
                        </div>
                    </div>
                </div>
                <div class="pt-5 flex w-full justify-center">
                    <Button level='other'>
                    save ->
                    </Button>
                </div>
            </div>
        </form>
    </div>
  
    
    </template>
    <script>
  
    import Button from '../../components/button.vue';
    import Heading from '../../components/heading.vue';
    import Select from '../../components/select.vue';

   import StyledIcon from '../../components/styledIcon.vue';
   import StyledInput from '../../components/styledInput.vue';

    
      export default {
        components: {
            Select,
            Heading,
            StyledIcon,
            StyledInput,
            Button
      },
        name: 'Contact',
     
  
  data() {
    return {
      data:{},
      selectOptions: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ],
    };
  },
  methods: {
    handleChange(value) {
        this.data[value.name]=value.value; // Update parent with child's value
    },
   
  },
      };
    </script>
    