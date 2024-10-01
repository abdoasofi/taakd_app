<template>
    <div class="info-row">
      <span class="label">{{ label }}:</span>
      <span class="value">{{ value }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InfoRow',
    props: {
      label: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .label {
    font-weight: bold;
    color: #374151; /* لون للعنوان */
  }
  
  .value {
    color: #111827; /* لون للقيمة */
  }
  </style>