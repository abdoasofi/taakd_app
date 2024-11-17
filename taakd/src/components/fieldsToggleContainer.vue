<!-- fieldsToggleContainer.vue -->
 
<template>
  <div class="lg:container">
    <div class="p-4 bg-white border-b border-light_gray container m-auto px-4">
      <div class="flex justify-between items-center text-lg">
        <!-- عنوان القسم -->
        <div class="text-dark_gray text-sm font-semibold">{{ title }}</div>

        <!-- الأزرار: طي/فتح وحذف -->
        <div class="flex items-center space-x-2">
          <!-- زر الحذف -->
          <button @click="deleteSection" class="flex px-1 mx-1 text-red-400 hover:text-red-700 bg-red-200 rounded-sm text-sm">
            <v-icon :scale="scale" name="fa-minus" color="red" />
            <span class="items-center top-1">Remove</span>
          </button>

            <!-- زر الطي/الفتح -->
            <button @click="toggle" class="block">
            <svg 
              :class="{ 'transform rotate-180': open }" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6 text-primary cursor-pointer transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

        </div>
      </div>

      <!-- المحتوى القابل للطي -->
      <transition name="fade">
        <div :class="['py-3', { 'hidden': !open }]">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import StyledIcon from '../components/styledIcon.vue';

// تعريف Props
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});

// تعريف Emits
const emit = defineEmits(['delete'])

// الحالة (State)
const open = ref(false);

// دوال التحكم في الطي والفتح
const toggle = () => {
  open.value = !open.value;
}

// دالة الحذف
const deleteSection = () => {
  emit('delete');
}
</script>
<style scoped>
/* تأثير الانتقال للطي */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>