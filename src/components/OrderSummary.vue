<!-- src/components/OrderSummary.vue -->
<template>
  <FrameContainer>
    <template #header>訂單資訊</template>
    <div class="order-info">
      <div class="row"><span>小計：</span><span>NT$ {{ subtotal }}</span></div>
      <div class="row"><span>運費：</span><span>{{ shippingFeeText }}</span></div>
      <div class="row">
        <span>活動折扣：</span>
        <span class="discount">- NT$ {{ totalDiscount }}</span>
      </div>

      <div class="actions">
        <a href="#">使用會員優惠／使用優惠券</a>
        <a href="#">使用推薦代碼</a>
      </div>

      <hr />

      <div class="row total"><span>合計：</span><span>NT$ {{ total }}</span></div>

      <button
        class="checkout-btn"
        :disabled="!props.canProceed || !hasItems"
        @click="goToStep2"
      >
        前往結帳
      </button>
    </div>
  </FrameContainer>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { usePromotionStore } from '@/stores/promotionStore'
import { useCheckoutStore } from '@/stores/checkoutStore'
import FrameContainer from '@/components/FrameContainer.vue'

// 1. 接收父组件传来的 canProceed
const props = defineProps({
  canProceed:      Boolean,
  region:          String,
  shipping:        String,
  payment:         String
})

const router    = useRouter()
const cartStore = useCartStore()
const promoStore = usePromotionStore()
const checkoutStore = useCheckoutStore()

// 2. 计算订单各项金额
const subtotal = computed(() =>
  cartStore.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
)

const shippingFeeText = computed(() => {
  const fee = subtotal.value >= 520 ? 0 : 60
  return fee === 0 ? '免運' : `NT$ ${fee}`
})

const totalDiscount = computed(() =>
  promoStore.totalPromoDiscount
)

const total = computed(() =>
  subtotal.value
  + (shippingFeeText.value === '免運' ? 0 : parseInt(shippingFeeText.value.replace(/\D/g, '')))
  - totalDiscount.value
)

// 3. 在購物車沒商品時disabled
const hasItems = computed(() => cartStore.items.length > 0)

// 4. 点击按钮才会跳转
function goToStep2() {
  console.log(props.canProceed);
  
  if (!props.canProceed || !hasItems.value) return

  // 地址 付款方式 寫入checkoutStore
  checkoutStore.setStep1Data({
    region:   props.region,
    shipping: props.shipping,
    payment:  props.payment
  })

  // 跳轉到第二步驟
  router.push({ name: 'CheckoutStep2' })
}
</script>

<style scoped lang="scss">
@use "sass:color";

.order-info {
  color: $color-text;

  .row {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    font-size: 14px;

    &.total {
      font-size: 16px;
      font-weight: bold;
    }

    .discount {
      color: #C9154A;
      font-weight: bold;
    }
  }

  .actions {
    margin: 8px 0;

    a {
      display: block;
      font-size: 12px;
      color: $color-primary;
      text-decoration: none;
      margin-bottom: 4px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  hr {
    border: none;
    border-top: 1px solid $color-border;
    margin: 12px 0;
  }

  .checkout-btn {
    width: 100%;
    padding: 8px;
    background: $color-primary;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;

    &:disabled {
      background: $color-border;
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:not(:disabled):hover {
      background: color.adjust($color-primary, $lightness: -10%);
    }
  }
}
</style>
