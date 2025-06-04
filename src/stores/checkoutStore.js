import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'
import { usePromotionStore } from './promotionStore'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    // Step1 data
    items: [],             // 购物车所有商品（含加购）
    subtotal: 0,           // 小计
    region: '',
    shippingMethod: '',
    paymentMethod: '',
    // Step2/3 data...
  }),

  getters: {
    // 运费金額
    shippingFee(state) {
      if (state.shippingMethod === '全家超商') return 40
      return state.subtotal >= 520 ? 0 : 60
    },
    shippingFeeText() {
      return this.shippingFee === 0 ? '免運' : `NT$ ${this.shippingFee}`
    },
    // 折扣总额
    totalDiscount() {
      return usePromotionStore().totalPromoDiscount
    },
    // 最终合计
    grandTotal() {
      return this.subtotal + this.shippingFee - this.totalDiscount
    }
  },

  actions: {
    /**
     * 初始化 Step1 数据：购物车商品、加购商品、小计、表单
     */
    initStep1(payload) {
      const items      = payload.items || [];       // <-- 默认空数组
      const addOnItems = payload.addOnItems || [];
      this.items           = [...items, ...addOnItems]
      this.subtotal        = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      this.region          = payload.region
      this.shippingMethod  = payload.shippingMethod
      this.paymentMethod   = payload.paymentMethod
    },

    /**
     * Step2 收集其余表单数据
     */
    setStep2Data(data) {
      Object.assign(this, data)
    },

    /**
     * 完成订单后清空所有
     */
    clear() {
      this.$reset()
    },
    
    /* 加購產品 */
    addAddOn(item) {
      const cart = useCartStore()
      console.log(cart.items);
      
      // 清除旧加购
      cart.items.filter(i=>i.isAddOn).forEach(i=>cart.removeItem(i.id))
      // 加入新加购
      cart.addItem({ ...item, price: item.discountedPrice, quantity: 1, isAddOn: true })
      // 同步引用
      this.items = cart.items
    },

    // 移除產品
    removeItem(id) {
      const cart = useCartStore()
      console.log('remove');
      
      cart.removeItem(id)
      this.items = cart.items
    },

    // 變更數量
    updateQuantity({ id, quantity }) {
      const cart = useCartStore()
      cart.updateQuantity({ id, quantity })
      this.items = cart.items
    },
  }
})
