import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    message: '',
    visible: false
  }),
  actions: {
    showToast(msg, duration = 2000) {
      this.message = msg
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, duration)
    }
  }
})
