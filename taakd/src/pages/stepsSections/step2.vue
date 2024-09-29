<template>
  <div class="pt-3 container">
    <h3 class="text-lg font-medium mb-3 text-black">2 Basic Information</h3>
  

    </div>
    <div dir="ltr" class="p-6 bg-bg min-h-screen">
    <div v-if="request.doc" class="max-w-7xl mx-auto bg-bg shadow-md rounded-lg p-6">
      
      <!-- Error Messages -->
      <div v-if="errors.length > 0" class="mb-4 space-y-2">
        <ErrorMessage 
          v-for="(error, index) in errors" 
          :key="index" 
          :message="error" 
        />
      </div>

      <!-- Education Information Sections -->
      <div class="space-y-4">
        <div 
          v-for="(education, index) in request.doc.education_information" 
          :key="education.id" 
          class="border border-light_gray rounded-md"
        >
          <!-- Toggle and Delete Buttons Container -->
          <div class="flex justify-between items-center px-4 py-2 bg-more_lighter_gray hover:bg-bg rounded-t-md">
            <!-- Toggle Button -->
            <button 
              :id="'section-button-' + education.id"
              @click="toggleSection(education.id)" 
              :aria-expanded="isOpen(education.id)"
              :aria-controls="'section-content-' + education.id"
              class="flex items-center space-x-2 focus:outline-none"
            >
              <span class="text-dark_gray">{{ education.name_of_school_or_college_university || 'New Education Record' }}</span>
              <svg 
                :class="{'transform rotate-180': isOpen(education.id)}" 
                class="w-5 h-5 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <!-- Delete Button -->
            <button 
              @click="confirmRemove(education.id)" 
              class="bg-warn hover:bg-warn_hover text-white px-2 py-1 rounded-md"
              title="Delete Record"
            >
              Delete
            </button>
          </div>

          <!-- Toggleable Content -->
          <transition name="accordion">
            <div 
              v-show="isOpen(education.id)" 
              class="p-4 space-y-4"
              :id="'section-content-' + education.id"
              role="region"
              :aria-labelledby="'section-button-' + education.id"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- School Name -->
                <div>
                  <label class="block text-dark_gray">Name of School or College/University</label>
                  <input 
                    v-model="education.name_of_school_or_college_university" 
                    placeholder="Name of School or College/University"  
                    class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <!-- Field of Study -->
                <div>
                  <label class="block text-dark_gray">Field of Study or Major</label>
                  <input 
                    v-model="education.field_of_study_or_major" 
                    placeholder="Field of Study or Major"  
                    class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <!-- Date Enrolled From -->
                <div>
                  <label class="block text-dark_gray">Date Enrolled From</label>
                  <input 
                    type="date" 
                    v-model="education.date_enrolled_from" 
                    class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <!-- Date Enrolled To -->
                <div>
                  <label class="block text-dark_gray">Date Enrolled To</label>
                  <input 
                    type="date" 
                    v-model="education.date_enrolled_to" 
                    class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <!-- Country -->
                <div>
                  <label class="block text-dark_gray">Country</label>
                  <select 
                    v-model="education.country" 
                    @change="education.selectedCity = ''" 
                    class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Country</option>
                    <option 
                      v-for="country in optionCountry" 
                      :key="country.value" 
                      :value="country.value"
                    >
                      {{ country.label }}
                    </option>
                  </select>
                </div>

                <!-- City -->
                <div>
                  <label class="block text-dark_gray">City</label>
                  <select 
                    v-model="education.city" 
                    @change="education.governorate = ''" 
                    class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select City</option>
                    <option 
                      v-for="city in getOptionCity(education.country)" 
                      :key="city.value" 
                      :value="city.value"
                    >
                      {{ city.label }}
                    </option>
                  </select>
                </div>

                <!-- Governorate -->
                <div>
                  <label class="block text-dark_gray">Governorate</label>
                  <select 
                    v-model="education.governorate" 
                    class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Governorate</option>
                    <option 
                      v-for="governorate in getOptionGovernorate(education.city)" 
                      :key="governorate.value" 
                      :value="governorate.value"
                    >
                      {{ governorate.label }}
                    </option>
                  </select>
                </div>

                <!-- Phone -->
                <div>
                  <label class="block text-dark_gray">Phone:</label>
                  <input 
                    type="tel" 
                    v-model="education.phone" 
                    placeholder="Phone" 
                    pattern="[0-9]{10,15}"
                    class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <!-- Extension -->
                <div>
                  <label class="block text-dark_gray">Extension</label>
                  <input 
                    v-model="education.ext" 
                    placeholder="Extension"  
                    class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <!-- Diploma Completion -->
                <div>
                  <label class="block text-dark_gray">Have you completed the degree/diploma?</label>
                  <select 
                    v-model="education.diploma" 
                    class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <!-- Another Name Used -->
                <div>
                  <label class="block text-dark_gray">Have you used any other name besides the one on your current government ID card?</label>
                  <select 
                    v-model="education.another_name" 
                    class="w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                
              </div>

              <!-- Remove Button (Removed from here as it's now moved next to toggle) -->
              <!--
              <div class="flex justify-end">
                <button 
                  @click="confirmRemove(education.id)" 
                  class="bg-warn hover:bg-warn_hover text-white px-4 py-2 rounded-md"
                >
                  Delete Record
                </button>
              </div>
              -->
            </div>
          </transition>
        </div>
      </div>

      <!-- Add and Save Buttons -->
      <div class="flex justify-center items-center mt-6 space-x-4">
        <button 
          @click="addEducation" 
          class="bg-primary hover:bg-primary_hover text-white px-4 py-2 rounded-md"
        >
          Add Education Record
        </button>
        <button 
          @click="saveRequest" 
          :disabled="isSaving"
          class="bg-secondary hover:bg-secondary_hover text-white px-4 py-2 rounded-md"
        >
          <span v-if="!isSaving">Save Request</span>
          <span v-else>Saving...</span>
        </button>
      </div>
    </div>
    
    <div v-else class="flex justify-center items-center h-full">
      <p class="text-dark_gray">Loading...</p>
    </div>
    </div>    
   <!-- <div class="flex justify-center py-3"><Button level="secondary" @clicked="addCompany">+ add company</Button></div>
    </div> -->
</template>
<script setup>
// ========================
// Data
const companies = ref(1);
// Props
const props = defineProps({
	stepData :{
		type: Object,
		required:true
	}
});

// Methods
const handleInput = function(value) {
	props.stepData[value.name]["value"] = value.value; 
	props.stepData[value.name]["isValid"] = true; 
	props.stepData[value.name]["validationMessage"] = null;
}
// ========================

// ========Start new================
import { createDocumentResource, ErrorMessage } from 'frappe-ui'
import { ref, watch, reactive, nextTick, computed } from 'vue'
// import { v4 as uuidv4 } from 'uuid' // For unique IDs
import { location } from '../../data/useAddressLogic'
import { useToast } from "vue-toastification" // Optional: Toast Notifications

// Initialize toast
const toast = useToast()

// Create the document resource
const request = createDocumentResource({
  doctype: 'Verification Instructions Request',
  name: 'VIR-2024-26-09-000007', // Uncomment to create a new request
})

// Computed properties for dropdown options
const optionCountry = computed(() => {
  return location.data
    .filter(loc => loc.location_type === 'Country')
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))
})

const getOptionCity = (country) => {
  if (!country) return []
  return location.data
    .filter(loc => loc.location_type === 'City' && loc.parent_location === country)
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))
}

const getOptionGovernorate = (city) => {
  if (!city) return []
  return location.data
    .filter(loc => loc.location_type === 'Governorate' && loc.parent_location === city)
    .map(loc => ({
      label: loc.location_name,
      value: loc.location_name
    }))
}

// Initialize education_information as an array if not present
watch(() => request.doc, (newDoc) => {
  if (newDoc && !newDoc.education_information) {
    newDoc.education_information = []
  }
}, { immediate: true })

// Manage open sections
const openSections = reactive({})

const toggleSection = (id) => {
  openSections[id] = !openSections[id]
}

const isOpen = (id) => {
  return openSections[id]
}

// Manage errors
const errors = ref([])

// Add a new education record
const addEducation = () => {
  const newEducation = {
    // id: uuidv4(), // Use UUID for unique ID
    country: '',
    city: '',
    governorate: '',
    continuous: false,
    name_of_school_or_college_university: '',
    field_of_study_or_major: '',
    phone: '',
    ext: '',
    diploma: '',
    date_enrolled_from: '',
    date_enrolled_to: '',
    another_name: '',
    selectedCountry: '',
    selectedCity: ''
  }
  request.doc.education_information.push(newEducation)
  nextTick(() => {
    openSections[newEducation.id] = true
  })
}

// Confirm before removing an education record
const confirmRemove = (id) => {
  if (confirm('Are you sure you want to delete this education record?')) {
    removeEducation(id)
  }
}

// Remove an education record
// const removeEducation = (id) => {
//   const index = request.doc.education_information.findIndex(edu => edu.id === id)
//   if (index !== -1) {
//     request.doc.education_information.splice(index, 1)
//     delete openSections[id]
//   }
// }

 // **4. Function to delete an education record from the sub-table based on the index**
 const removeEducation = (id) => {
    const index = request.doc.education_information.findIndex(edu => edu.id === id)
    if (index !== -1) {
      request.doc.education_information.splice(index, 1)
      delete openSections[id]
    }
  }
// Save the request
const isSaving = ref(false)

const saveRequest = async () => {
  errors.value = [] // Reset errors before validation

  request.doc.education_information.forEach((education, index) => {
    if (!education.name_of_school_or_college_university) {
      errors.value.push(`Name of School or College/University is required in record number ${index + 1}.`)
    }
    if (!education.field_of_study_or_major) {
      errors.value.push(`Field of Study or Major is required in record number ${index + 1}.`)
    }
    if (!education.country) {
      errors.value.push(`Country is required in record number ${index + 1}.`)
    }
    if (!education.city) {
      errors.value.push(`City is required in record number ${index + 1}.`)
    }
    if (!education.governorate) {
      errors.value.push(`Governorate is required in record number ${index + 1}.`)
    }
    if (!education.diploma) {
      errors.value.push(`Diploma completion status is required in record number ${index + 1}.`)
    }
    if (!education.date_enrolled_from) {
      errors.value.push(`Start date is required in record number ${index + 1}.`)
    }
    if (!education.date_enrolled_to) {
      errors.value.push(`End date is required in record number ${index + 1}.`)
    }

    // Phone pattern validation
    // const phonePattern = /^[0-9]{10,15}$/
    // if (education.phone && !phonePattern.test(education.phone)) {
    //   errors.value.push(`Invalid phone number in record number ${index + 1}.`)
    // }
  })

  if (errors.value.length > 0) {
    return
  }

  isSaving.value = true
  try {
    await request.setValue.submit({
      education_information: request.doc.education_information,
      // You can add other fields if necessary
    })
    toast.success('Request has been successfully saved!')
  } catch (error) {
    errors.value.push(`An error occurred while saving the request: ${error.message}`)
  } finally {
    isSaving.value = false
  }
}

// Format date (if needed elsewhere)
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US')
}
// ===========End new=============



</script>

<style scoped>
.accordion-enter-active, .accordion-leave-active {
  transition: max-height 0.3s ease;
}
.accordion-enter-from, .accordion-leave-to {
  max-height: 0;
  overflow: hidden;
}
/* Optional: Add more styles as needed */
</style>