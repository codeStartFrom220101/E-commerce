// stores/toastStore.js
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    queue: []  // 儲存多筆通知
  }),
  actions: {
    showToast(message, type = 'success', duration = 2000) {
      const id = Date.now() + Math.random()  // 簡單生成唯一 ID
      this.queue.push({ id, message, type })

      // 自動移除這筆通知
      setTimeout(() => {
        this.queue = this.queue.filter(toast => toast.id !== id)
      }, duration)
    }
  }
})
