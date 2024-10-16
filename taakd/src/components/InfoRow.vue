<!-- src/components/InfoRow.vue -->
<template>
  <div class="info-row">
    <label class="text-sm">{{ label }}</label>
    <span class="value">{{ value || 'N/A' }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  label: string;
  value: string;
}>();
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