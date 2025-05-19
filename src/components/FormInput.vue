<template>
  <div class="form-field">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue:    { type: [String, Number], default: '' },
  label:         { type: String, default: '' },
  type:          { type: String, default: 'text' },        // 'text' | 'number'
  placeholder:   { type: String, default: '' },
  min:           { type: [String, Number], default: null },
  max:           { type: [String, Number], default: null },
  step:          { type: [String, Number], default: null },
  error:         { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'blur'])
</script>

<style scoped lang="scss">
.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    margin-bottom: 4px;
    font-size: 14px;
    color: $color-text;
  }

  input {
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
