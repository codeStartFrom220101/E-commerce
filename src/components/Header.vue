<template>
  <header class="header">
    <div class="logo">Zoo GOODS</div>
    <div class="icons">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      <font-awesome-icon icon="fa-solid fa-user" />
      <font-awesome-icon icon="fa-solid fa-bag-shopping" @click="handleCartOpen"/>
      <font-awesome-icon icon="fa-solid fa-bars" @click="handleMenuOpen"/>
    </div>
  </header>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faUser, faBagShopping, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass, faUser, faBagShopping, faBars)

// asideMenu控制
import { useAsideMenuStore } from '@/stores/asideMenuStore'
const asideMenuStore = useAsideMenuStore()
const handleMenuOpen = () => {
  asideMenuStore.openMenu()
}

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
  }

  .icons {
    display: flex;
    gap: 12px;
    font-size: 24px;
    color: $color-light-text; // 根據你的 UI 顏色
    cursor: pointer;
    
    * {
      padding: .5rem;
    }
  }
}
</style>
