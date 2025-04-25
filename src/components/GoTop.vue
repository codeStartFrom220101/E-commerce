<template>
  <button v-show="showButton" class="go-top" @click="scrollToTop">
    <font-awesome-icon :icon="['fas', 'chevron-up']" />
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronUp)

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 200  // 滾動超過200px顯示按鈕
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.go-top {
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #ccc;
  color: #4a3b3b;
  border: none;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;

  &:hover {
    background: #aaa;
  }
}
</style>
