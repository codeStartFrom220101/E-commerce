// src/stores/checkoutStore.js
import { defineStore } from 'pinia'
import { useCartStore }      from './cartStore'
import { usePromotionStore } from './promotionStore'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    // 仅存用户在结账流程里选择的那些表单字段
    region:         '',
    shippingMethod: '',
    paymentMethod:  '',
    // 你还可以加：发票类型、收货地址、会员备注、同意条款……
  }),

  getters: {
    // 直接引用 cartStore/promotionStore 的值，避免重复 state
    subtotal() {
      return useCartStore().totalAmount
    },
    shippingFee() {
      // 根据 state.shippingMethod 决定
      return this.shippingMethod === '全家超商'
        ? 40
        : this.subtotal >= 520
          ? 0
          : 60
    },
    shippingFeeText() {
      return this.shippingFee === 0 ? '免運' : `NT$ ${this.shippingFee}`
    },
    totalDiscount() {
      return usePromotionStore().totalPromoDiscount
    },
    grandTotal() {
      return this.subtotal + this.shippingFee - this.totalDiscount
    }
  },

  actions: {
    setStep1Data(payload) {
      // 只写入 checkout 相关字段，不 touch cartStore
      this.region         = payload.region
      this.shippingMethod = payload.shipping
      this.paymentMethod  = payload.payment
    }
  }
})
