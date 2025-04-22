import { defineStore } from 'pinia'

export const useSliderStore = defineStore('slider', {
  state: () => ({
    currentSlide: 0,
  }),
  actions: {
    goToSlide(index) {
      this.currentSlide = index
    },
    nextSlide(slideCount) {
      this.currentSlide = (this.currentSlide + 1) % slideCount
    },
    prevSlide(slideCount) {
      this.currentSlide =
        (this.currentSlide - 1 + slideCount) % slideCount
    }
  }
})
