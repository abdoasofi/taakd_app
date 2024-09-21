<template>
  <div class="relative">
    <!-- Label with dynamic color and optional mandatory indicator and info icon -->
    <label
      :class="[
        'mb-2 text-sm flex items-center',
        {
          [`text-${labelColor}`]: true,
        },
      ]"
      :for="id"
    >
      {{ labelText }}
      <!-- Mandatory indicator -->
      <span v-if="isMandatory" class="ml-1 text-red-500">*</span>
      <!-- Info icon -->
      <span
        v-if="infoText"
        class="ml-2 cursor-pointer relative"
        @mouseover="showInfo = true"
        @mouseleave="showInfo = false"
      >
        <svg
          class="w-5 h-5 text-mid_gray text-[10px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h1m0-4h-1v1h-1v1h1v2h1v-2h1v-1h-1V9zm-1-6a9 9 0 100 18 9 9 0 000-18z"
          />
        </svg>
        <!-- Info tooltip -->
        <div
          v-if="showInfo"
          class="absolute bg-gray-700 text-white text-xs rounded py-1 px-2 mt-1 left-1/2 transform -translate-x-1/2"
        >
          {{ infoText }}
        </div>
      </span>
    </label>

    <!-- Input field -->
    <input
      :id="id"
      :name="name"
      :type="inputType"
      :class="[
        'bg-transparent w-full p-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-none',
        {
          'border-1 border-mid_gray focus:border-black focus:ring-0':
            isValid === null,
          'border-1 border-warn focus:ring-warn': isValid === false,
          'border-3 border-secondary focus:ring-secondary': isValid === true,
        },
      ]"
      v-model="inputValue"
      @input="validateInput"
      placeholder="Enter at least 3 characters"
    />

    <FadeInOut>
      <p v-if="isValid === false" class="text-warn text-[10px]">{{
        validationMessage
      }}</p>
    </FadeInOut>
    <FadeInOut>
      <p v-if="isValid === true" class="text-secondary text-[10px]"
        >Input is valid!</p
      >
    </FadeInOut>
  </div>
</template>

<script>
import FadeInOut from "./fadeInOut.vue";

export default {
  name: "StyledInput",
  components: { FadeInOut },
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    labelText: {
      type: String,
      default: "Label",
    },
    labelColor: {
      type: String,
      default: "dark_gray",
    },
    isMandatory: {
      type: Boolean,
      default: false,
    },
    infoText: {
      type: String,
      default: "",
    },
    inputType: {
      type: String,
      default: "text",
    },
    isValid:  {
      type: Boolean,
     
    }, // The validity state of the input (true, false, or null)
      validationMessage: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {
      inputValue: "", // The value of the input field
       // Custom validation message for invalid input
      showInfo: false, // Controls the visibility of the info tooltip
    };
  },
  methods: {
    sendValueToParent() {
      this.$emit("input-change",{name:this.name,value:this.inputValue} ); // Emit event to parent
    },
    validateInput() {
      // Example validation logic: Input must be at least 3 characters long
      if (this.inputValue.length < 3) {
        this.isValid = false;
        this.validationMessage = "Input must be at least 3 characters long";
      } else {
        this.isValid = true;
      }
      sendValueToParent();
    },
  },
};
</script>

<style scoped>
/* Custom border-width utility for Tailwind */
.border-1 {
  border-width: 1px;
}
.border-3 {
  border-width: 3px;
}
</style>
