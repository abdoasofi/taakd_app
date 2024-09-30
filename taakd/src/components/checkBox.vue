<template>
  <div>
    <input
      type="checkbox"
      :id="id"
      :name="name"
      :value="value"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label :for="id"><slot></slot></label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      default: true
    }
  }
}
</script>

<style scoped>
/* أضف الأنماط المطلوبة هنا */
</style>