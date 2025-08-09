<template>
  <div class="form-select">
    <label v-if="label">{{ label }}</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
    >
      <option disabled value="">{{ defaultLabel }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  options: Array,
  defaultLabel: String,
  error: String,
})
const emit = defineEmits(['update:modelValue', 'blur'])
</script>

<style scoped lang="scss">
.form-select {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    margin-bottom: 4px;
    font-size: 14px;
    color: $color-text;
  }

  select {
    padding: 8px;
    border: 1px solid $color-border;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: $color-primary;
    }
  }

  .error {
    margin-top: 4px;
    font-size: 12px;
    color: #C9154A;
  }
}
</style>
