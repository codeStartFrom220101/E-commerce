// src/stores/promotionStore.js
import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'

export const usePromotionStore = defineStore('promotion', {
  state: () => ({
    // 你所有的限時活動都定義在這裡
    promotions: [
      {
        id: 'couple-pair',
        name: '情侶小物兩件折10元',
        // 只對 category = 'couple' 生效
        type: 'couplePair',
        amountPerPair: 10,
        // 如果需要時間範圍，也可以加 start/end
        start: null,
        end: null
      },
      {
        id: 'free-shipping-520',
        name: '全站滿520免運',
        type: 'freeShipping',
        threshold: 520,
        shippingFee: 0,
        start: null,
        end: null
      }
      // 未來再加其他活動…
    ]
  }),

  getters: {
    /**
     * 取得所有符合條件的活動
     */
    applicablePromos() {
      const cartStore = useCartStore()
      const items = cartStore.items
      const now = Date.now()

      return this.promotions.filter(promo => {
        if (promo.start && now < new Date(promo.start)) return false
        if (promo.end   && now > new Date(promo.end))   return false

        switch (promo.type) {
          case 'couplePair': {
            const count = items
              .filter(i => i.category === 'couple')
              .reduce((sum, i) => sum + i.quantity, 0)
            return count >= 2
          }
          case 'freeShipping': {
            const subtotal = items
              .reduce((sum, i) => sum + i.price * i.quantity, 0)
            return subtotal >= promo.threshold
          }
          default:
            return false
        }
      })
    },

    /**
     * 針對每個符合條件的活動，計算它帶來的折抵金額
     */
    promoDiscounts() {
      const cartStore = useCartStore()
      const items = cartStore.items

      return this.applicablePromos.map(promo => {
        switch (promo.type) {
          case 'couplePair': {
            const count = items
              .filter(i => i.category === 'couple')
              .reduce((sum, i) => sum + i.quantity, 0)
            const pairs = Math.floor(count / 2)
            return {
              id: promo.id,
              name: promo.name,
              amount: pairs * promo.amountPerPair
            }
          }
          case 'freeShipping':
            return {
              id: promo.id,
              name: promo.name,
              amount: promo.shippingFee
            }
        }
      })
    },

    /**
     * 所有折抵金額總和
     */
    totalPromoDiscount() {
      return this.promoDiscounts
        .reduce((sum, d) => sum + (d.amount || 0), 0)
    }
  }
})
