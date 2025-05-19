<!-- src/components/FormSelect.vue -->
<template>
  <div class="form-field">
    <label v-if="label">{{ label }}</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <!-- 可变式的「请选择…」默认项 -->
      <option
        v-if="defaultLabel"
        disabled
        value=""
        class="default"
      >{{ defaultLabel }}</option>

      <!-- 真正的选项 -->
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="fig"   class="fig">{{ fig }}</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue:    { type: [String, Number], default: '' },
  label:         { type: String, default: '' },
  options:       { type: Array, default: () => [] },    // [{ label, value }]
  defaultLabel:  { type: String, default: '' },         // <— 新增
  error:         { type: String, default: '' },
  fig:           { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])
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

  select {
    padding: 8px;
    border: 1px solid $color-border;
    border-radius: 4px;
    font-size: 14px;
    background: #fff;

    &:focus {
      outline: none;
      border-color: $color-primary;
    }

    .default {
      color: $color-border;
    }
  }

  .error {
    margin-top: 4px;
    font-size: 12px;
    color: #C9154A;
  }

  .fig {
    margin-top: 4px;
    font-size: 12px;
  }
}
</style>
