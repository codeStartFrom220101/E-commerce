<template>
  <header class="header">
    <router-link :to="{ name: 'Home' }" class="icon-link">
      <div class="logo">Zoo GOODS</div>
    </router-link>
    <div class="icons">
      <router-link :to="{ name: 'LoginRegister' }" class="icon-link">
        <font-awesome-icon class="icon" :icon="['fas','user']" />
      </router-link>
      <div class="cart-content">
        <font-awesome-icon class="icon" icon="fa-solid fa-bag-shopping" @click="handleCartOpen"/>
        <div class="cart-count">{{ cartStore.items.length }}</div>
      </div>
      <font-awesome-icon class="icon" icon="fa-solid fa-bars" @click="handleMenuOpen"/>
    </div>
  </header>
</template>

<script setup>

// asideMenu控制
import { useAsideMenuStore } from '@/stores/asideMenuStore'
const asideMenuStore = useAsideMenuStore()
const handleMenuOpen = () => {
  asideMenuStore.openMenu()
}

// 引入cartStore 抓取購物車內商品數量
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()

const handleCartOpen = () => {
  cartStore.openCart()
}



</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: $color-header-bg;

  .logo { 
    font-size: 20px;
    font-weight: bold;
    color: $color-light-text; // 根據你的 UI 顏色

    @include respond-lg {
      font-size: 32px;
    }
  }

  .icon-link {
    color: $color-light-text;
    text-decoration: none;
  }

  .icons {
    display: flex;
    gap: 12px;
    font-size: 24px;
    color: $color-light-text; // 根據你的 UI 顏色
    cursor: pointer;

    .cart-content {
      position: relative;

      .cart-count {
        position: absolute;
        right: 3px;
        bottom: 3px;
        width: 12px;
        height: 12px;
        line-height: 12px;
        border-radius: 50%;
        text-align: center;
        font-size: .6rem;
        background: #EE5555;
      }
    }
    
    .icon {
      padding: .5rem;
    }
  }
}
</style>
