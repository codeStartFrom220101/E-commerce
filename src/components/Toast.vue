<template>
  <transition name="fade">
    <div v-if="toast.visible" class="toast">
      {{ toast.message }}
    </div>
  </transition>
</template>

<script setup>
import { useToastStore } from '@/stores/toastStore'
const toast = useToastStore()
</script>

<style scoped lang="scss">
.toast {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 12px 24px;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  z-index: 2000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
