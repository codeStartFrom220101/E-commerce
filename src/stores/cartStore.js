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
    /**
     * 加入購物車
     * @param payload 商品物件，可帶 quantity
     * 若 payload.quantity 未指定，則預設為 1
     */
    addItem(payload) {
      console.log('cartStore', payload);
      
      const qty = payload.quantity ?? 1
      const existing = this.items.find(item => item.id === payload.id)
      if (existing) {
        // 累加傳入的數量
        existing.quantity += qty
      } else {
        // 新項目，設置預設或傳入的數量
        this.items.push({
          ...payload,
          quantity: qty
        })
      }
    },
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    },
    clearCart() {
      this.items = []
    },
    updateQuantity({ id, quantity }) {
      const item = this.items.find(i => i.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
    openCart() {
      this.isOpen = true
    },
    closeCart() {
      this.isOpen = false
    }
  }
})
