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
        shippingFee: 60,
        start: null,
        end: null
      }
      // 未來再加其他活動…
    ]
  }),

  getters: {
    // 以 cartStore.items 作為輸入，回傳所有「符合條件」的活動物件
    applicablePromos: (state) => {
      const cartStore = useCartStore()
      const items = cartStore.items

      return state.promotions.filter(promo => {
        // 判斷活動時效（如果有設定）
        const now = Date.now()
        if (promo.start && now < new Date(promo.start)) return false
        if (promo.end   && now > new Date(promo.end))   return false

        // 各種活動條件
        switch (promo.type) {
          case 'couplePair':
            // 算出 category='couple' 的數量
            const count = items
              .filter(i => i.category === 'couple')
              .reduce((sum, i) => sum + i.quantity, 0)

              console.log(count);
              
            return count >= 2

          case 'freeShipping':
            const subtotal = items
              .reduce((sum, i) => sum + i.price * i.quantity, 0)
            return subtotal >= promo.threshold

          default:
            return false
        }
      })
    },

    // 直接算出「每個活動帶來的折抵金額」陣列
    promoDiscounts: () => {
      const cartStore = useCartStore()
      const items = cartStore.items
      console.log(123);
      

      return getters.applicablePromos.map(promo => {
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

    // 總折扣金額
    totalPromoDiscount(state) {
      return state.promoDiscounts
        .reduce((sum, p) => sum + p.amount, 0)
    }
  },

  actions: {
    // 如果未來有需要從後端抓活動，也可以寫 fetchPromotions()
  }
})
