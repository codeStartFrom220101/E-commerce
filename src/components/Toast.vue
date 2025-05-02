<template>
  <div class="toast-container">
    <transition-group name="fade" tag="div">
      <div 
        v-for="toast in toastStore.queue" 
        :key="toast.id" 
        class="toast" 
        :class="toast.type"
      >
        <span v-if="toast.type === 'success'">✅</span>
        <span v-else-if="toast.type === 'error'">❌</span>
        <span v-else-if="toast.type === 'warning'">⚠️</span>
        <span v-else>ℹ️</span>
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToastStore } from '@/stores/toastStore'
const toastStore = useToastStore()
</script>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 2000;
}

.toast {
  min-width: 300px;
  padding: 12px 24px;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  text-align: center;

  &.success { background: #4caf50; }
  &.error { background: #f44336; }
  &.warning { background: #ff9800; }
  &.info { background: #2196f3; }
}

/* 動畫 */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
