import { defineStore } from 'pinia'

export const useBestsellerStore = defineStore('bestseller', {
  state: () => ({
    currentSlide: 0,
    totalSlide: 5, // 一定要給值
  }),
  actions: {
    next() {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlide
    },
    prev() {
      this.currentSlide = (this.currentSlide - 1 + this.totalSlide) % this.totalSlide
    },
    goTo(index) {
      this.currentSlide = index
    }
  }
})
