import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],   // 購物車列表
    isOpen: false
  }),
  actions: {
    openCart() {
      this.isOpen = true
    },
    closeCart() {
      this.isOpen = false
    },
    addItem(product) {
      const existingItem = this.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    }
  }
})