<template>
  <div class="page">
        <!-- Confirmation Card -->
    <div class="card">
      <div class="icon">
        <font-awesome-icon :icon="['fas', 'check-circle']" />
      </div>
      <h2>訂購完成</h2>
      <p class="subtitle">您的訂單已完成</p>
      <hr />
      <div class="order-info">
        <div class="info-row">
          <span>訂單編號：</span><span>{{ order.id }}</span>
        </div>
        <div class="info-row">
          <span>訂購日期：</span><span>{{ order.date }}</span>
        </div>
        <div class="info-row">
          <span>訂單金額：</span><span>NT$ {{ order.total }}</span>
        </div>
      </div>
      <button class="btn" @click="viewOrder">查看訂單</button>
      <hr />
      <div class="contact-info">
        <h3>聯絡資訊</h3>
        <div class="info-row"><span>購買人：</span><span>{{ order.customer }}</span></div>
        <div class="info-row"><span>電子信箱：</span><span>{{ order.email }}</span></div>
      </div>
      <hr />
      <div class="payment-info">
        <h3>付款資訊</h3>
        <div class="info-row"><span>付款方式：</span><span>{{ order.payment }}</span></div>
      </div>
      <button class="btn" @click="goToHome">跳轉至首頁</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useCheckoutStore } from '../../stores/checkoutStore'
import { useCartStore } from '../../stores/cartStore'

const router = useRouter()
const checkoutStore = useCheckoutStore()
const cartStore = useCartStore()


const order = reactive({
  id: '123456789',
  date: new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }),
  total: checkoutStore.subtotal,
  customer: checkoutStore.customerName,
  email: checkoutStore.email,
  payment: checkoutStore.paymentMethod
})

function viewOrder() {
  router.push({ name: 'OrderDetail', params: { id: order.id } })
}

function goToHome() {
  checkoutStore.clear()
  cartStore.clearCart()
  
  router.push({ name: 'Home'})
}
</script>

<style scoped lang="scss">
@use "sass:color";
.card {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    width: 100%;
    max-width: 360px;
    text-align: center;
    margin: 0 auto 32px;
    border: 1px solid $color-text;

    .icon {
      font-size: 80px;
      color: #cda15c;
      margin-bottom: 16px;
    }
    h2 {
      margin: 0 0 8px;
    }
    .subtitle {
      color: #666;
      margin-bottom: 16px;
    }
    hr {
      border: none;
      border-top: 1px solid $color-text;
      margin: 16px 0;
    }
    .order-info,
    .contact-info,
    .payment-info {
      text-align: left;
      margin-bottom: 16px;

      h3 {
        font-size: 16px;
        margin-bottom: 8px;
      }
      .info-row {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin-bottom: 4px;
      }
    }
    .btn {
      display: block;
      width: 100%;
      padding: 12px 0;
      background: #cda15c;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-bottom: 16px;

      &:hover {
        background-color: color.adjust(#cda15c, $lightness: -5%);
      }
    }
  }

</style>
