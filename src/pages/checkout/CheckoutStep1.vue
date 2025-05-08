<template>
  <div class="checkout-step1">
      <FrameContainer>
        <template #header>
          購物車 ({{ totalItems }} 件)
        </template>
        <CartItemRow
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          @remove="removeItem"
          @updateQty="updateQuantity"
        />
        <!-- 已使用優惠 -->
        <div class="discounts">
          <p>已享用之優惠</p>
          <ul>
            <li v-for="p in promos" :key="p.id">
              {{ p.name }} -NT$ {{ p.amount }}
            </li>
          </ul>
        </div>
      </FrameContainer>

    <div class="additional-purchase">
      <h3>加購專區 (左右滑動)</h3>
      <SwipeList :items="recommendedItems" />
    </div>

    <div class="shipping-payment">
      <h3>選擇送貨及付款方式</h3>
      <FormSelect v-model="form.region" :options="regions" label="配送地點" />
      <FormSelect v-model="form.shipping" :options="shippings" label="送貨方式" />
      <FormSelect v-model="form.payment" :options="payments" label="付款方式" />
      <p class="note">*若使用超商取貨，需額外收取 40 元手續費</p>
    </div>

    <div class="order-info">
      <h3>訂單資訊</h3>
      <p>小計: NT$ {{ subtotal }}</p>
      <p>運費: {{ shippingFeeText }}</p>
      <p>活動折扣: -NT$ {{ discountTotal }}</p>
      <p class="total">合計: NT$ {{ total }}</p>
      <RouterLink to="/checkout/step2" class="next-btn">前往結帳</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useCartStore } from '@/stores/cartStore'
// import SwipeList from '@/components/SwipeList.vue'
// import FormSelect from '@/components/FormSelect.vue'
import { useRouter } from 'vue-router'
import FrameContainer from '@/components/FrameContainer.vue'
import CartItemRow from '@/components/CartItemRow.vue'

// 活動判定 
import { usePromotionStore } from '@/stores/promotionStore'
const promoStore = usePromotionStore()

// 活動清單
const promos = computed(() => promoStore.promotionDiscounts)
console.log(promos);

// 總折抵
const totalDiscount = computed(() => promoStore.totalPromoDiscount)

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
const totalItems = computed(() => cartStore.items.reduce((sum, i) => sum + i.quantity, 0))
const subtotal = computed(() => cartStore.items.reduce((sum, i) => sum + i.quantity * i.price, 0))

// 加購推薦
const recommendedItems = computed(() => cartStore.recommendations)

// 表單選項
const regions = ['台灣']
const shippings = ['新竹物流', '全家超商']
const payments = ['Line Pay', '信用卡']

// 綁定表單
const form = reactive({ region: '台灣', shipping: '新竹物流', payment: 'Line Pay' })

const shippingFee = computed(() => {
  if (form.shipping === '全家超商') return 40
  return subtotal.value >= 520 ? 0 : 60
})
const shippingFeeText = computed(() => shippingFee.value === 0 ? '免運' : `NT$ ${shippingFee.value}`)

const discountTotal = computed(() => 10) // 提示寫死或視優惠邏輯而定
const total = computed(() => subtotal.value + shippingFee.value - discountTotal.value)

function removeItem(id) {
  cartStore.removeItem(id)
}

// 新增 updateQuantity（或你模板里叫 @updateQty 的名字）
function updateQuantity({ id, delta, quantity }) {
  const found = cartStore.items.find(i => i.id === id)
  if (!found) return

  // 用 delta 來調整
  const newQty = quantity !== undefined
    ? quantity
    : Math.max(1, found.quantity + delta)

  cartStore.updateQuantity({ id, quantity: newQty })
}
</script>

<style scoped lang="scss">
  .discount {

  }
</style>
