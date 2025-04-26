// stores/cartStore.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    isOpen: false,
    items: []
  }),
  getters: {
    totalAmount(state) {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
  },
  actions: {
    addItem(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeItem(id) {
      console.log("why");
      this.items = this.items.filter(item => item.id !== id)},
    openCart() {
      this.isOpen = true
    },
    closeCart() {
      this.isOpen = false
    }
  }
})
