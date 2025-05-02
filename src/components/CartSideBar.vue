<template>
  <transition name="slide-cart">
    <div v-if="cartStore.isOpen" class="cart-overlay" @click="cartStore.closeCart()">
      <div class="cart-sidebar" @click.stop>
        <h2>購物車</h2>

        <div class="cart-none" v-if="cartStore.items.length == 0">
          您的購物車空空如也呢!!!
        </div>

        <div class="cart-items" v-else>
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" />
            <div class="info">
              <p class="name">{{ item.name }}</p>
              <p class="option">{{ item.option }}</p>
              <p class="price">{{ item.quantity }} x NT${{ item.price }}</p>
            </div>
            <button @click="cartRemove(item)" class="remove-btn">
              <font-awesome-icon :icon="['fas', 'trash-alt']" />
            </button>
          </div>
        </div>

        <div class="cart-total">
          總金額：NT$ {{ cartStore.totalAmount }}
        </div>

        <button class="checkout-btn">訂單結帳</button>
      </div>
    </div>
  </transition>
</template>

<script setup>

// 掛載 toast pinia
import { useToastStore } from '@/stores/toastStore'
const toastStore = useToastStore()

// 掛載 cartStore pinia
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()

const cartRemove = (item) => {
  cartStore.removeItem(item.id)
  toastStore.showToast(`${item.name}偷跑離購物車！`, 'info')
}
</script>

<style scoped lang="scss">
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;  // 確保在最上層
  
  .cart-sidebar {
    position: absolute;
    right: 0;
    top: 0;
    width: 80%;
    height: 100%;
    background: #f9f6f1;
    box-shadow: -2px 0 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    padding: 16px;
  
    h2 {
      font-size: 20px;
      margin-bottom: 16px;
    }

    .cart-none {
      flex-grow: 1;
      overflow-y: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-text;
      font-weight: bold;
    }
  
    .cart-items {
      flex-grow: 1;
      overflow-y: auto;
      padding-right: 16px;
  
      .cart-item {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
  
        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          margin-right: 12px;
        }
  
        .info {
          flex-grow: 1;
  
          .name {
            font-weight: bold;
          }
  
          .option {
            color: $color-text;
            font-weight: bold;
          }
  
          .price {
            margin-top: 4px;
          }
        }
  
        .remove-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: $color-text;
        }
      }
    }

    .cart-total {
      font-size: 18px;
      font-weight: bold;
      text-align: right;
      margin: 16px 0;
    }
  
    .checkout-btn {
      width: 100%;
      padding: 12px;
      background: $color-primary;
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      cursor: pointer;
    }
  }
}

/* Slide 動畫 */
.slide-cart-enter-active, .slide-cart-leave-active {
  transition: transform 0.3s ease;
}
.slide-cart-enter-from, .slide-cart-leave-to {
  transform: translateX(100%);
}
</style>
