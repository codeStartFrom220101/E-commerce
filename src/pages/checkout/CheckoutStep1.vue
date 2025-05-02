<template>
  <div class="checkout-step1">
    <CheckoutBreadcrumbs :current-step="1" />
    <div class="cart-summary">
      <h2>購物車 ({{ totalItems }} 件)</h2>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" />
        <div class="details">
          <p class="name">{{ item.name }}</p>
          <p class="options">{{ item.category }} {{ item.variant }}</p>
          <p class="quantity">x{{ item.quantity }}</p>
          <p class="price">NT$ {{ item.quantity * item.price }}</p>
        </div>
        <button class="remove" @click="removeItem(item.id)">×</button>
      </div>
      <div class="discounts">
        <p>已享用之優惠</p>
        <ul>
          <li>情侶小物兩件折10元</li>
          <li>全站滿520免運</li>
        </ul>
      </div>
    </div>

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
import CheckoutBreadcrumbs from '@/components/CheckoutBreadcrumbs.vue'
import SwipeList from '@/components/SwipeList.vue'
import FormSelect from '@/components/FormSelect.vue'
import { useRouter } from 'vue-router'

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
</script>

<style scoped lang="scss">
// .checkout-step1 { /* 样式省略 */ }
</style>
