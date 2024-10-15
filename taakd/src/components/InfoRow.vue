<!-- InfoRow.vue -->
<template>
  <div class="info-row">
    <label class="block mb-1">{{ label }}</label>
    <div class="value">{{ value || 'N/A' }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    default: ''
  }
});
</script>

<style scoped>
.info-row {
  display: flex;
  flex-direction: column;
}

.info-row label {
  font-weight: 600;
  color: #4a5568;
}

.info-row .value {
  margin-top: 2px;
  color: #2d3748;
}
</style>