<template>
  <div class="custom-select" @click="toggleDropdown">
    <div class="select-header">
      {{ selectedOption.label }}
      <font-awesome-icon :icon="['fas', dropdownOpen ? 'chevron-up' : 'chevron-down']" />
    </div>
    <ul v-if="dropdownOpen" class="select-options">
      <li 
        v-for="option in options" 
        :key="option.value" 
        @click.stop="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronUp, faChevronDown)

const props = defineProps({
  options: { type: Array, required: true },
  defaultLabel: { type: String, default: '請選擇' },
})

const emit = defineEmits(['select'])

const dropdownOpen = ref(false)
const selectedOption = ref({ label: props.defaultLabel, value: '' })

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option) => {
  selectedOption.value = option
  dropdownOpen.value = false
  emit('select', option)   // 🔥 通知父層選擇了什麼
}
</script>


<style scoped lang="scss">
.custom-select {
  // width: 50%;
  border-bottom: 1px solid $color-text;
  position: relative;
  cursor: pointer;

  .select-header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    color: $color-text;
  }

  .select-options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #ccc;
    z-index: 10;

    li {
      padding: 10px;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
