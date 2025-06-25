<template>
  <header :class="['header', { 'is-top': isTop }]">
    <router-link :to="{ name: 'Home' }" class="icon-link">
      <div class="logo">Zoo GOODS</div>
    </router-link>

    <!-- 電腦版 menu -->
    <nav class="desktop-nav">
      <router-link to="/login" class="nav-item">登入/註冊</router-link>

      <div class="nav-item dropdown">
        全站商品
        <ul class="dropdown-menu">
          <li><router-link to="/product">全部商品</router-link></li>
          <li><router-link to="/product/useful">實用選品</router-link></li>
          <li><router-link to="/product/healing">療癒小物</router-link></li>
          <li><router-link to="/product/couple">情侶專區</router-link></li>
        </ul>
      </div>

      <div class="nav-item dropdown">
        限時活動
        <ul class="dropdown-menu">
          <li><a href="#">520免運</a></li>
          <li><a href="#">療癒選物99元起</a></li>
          <li><a href="#">情侶小物兩件折10元</a></li>
        </ul>
      </div>
          <!-- icon 區：維持原樣 -->
      <div class="icons">
        <div class="cart-content">
          <font-awesome-icon class="icon" icon="fa-solid fa-bag-shopping" @click="handleCartOpen"/>
          <div class="cart-count">{{ cartStore.items.length }}</div>
        </div>
      </div>
    </nav>
    
    <div class="icons mobile-only">
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
defineProps({
  isTop: Boolean
})

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
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: $color-header-bg;
  transition: background 0.3s ease;
  z-index: 100;

  @include respond-lg {
    padding: 16px 32px;
  }

  .logo { 
    font-size: 20px;
    font-weight: bold;
    color: $color-light-text; // 根據你的 UI 顏色

    @include respond-sm {
      font-size: 24px;
    }

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

  .desktop-nav {
    display: none;

    @include respond-lg {
      display: flex;
      gap: 24px;
      align-items: center;

      .nav-item {
        position: relative;
        color: $color-light-text;
        cursor: pointer;
        padding: 0.5rem 0.75rem;
        text-decoration: none;

        &:hover .dropdown-menu {
          display: block;
        }
      }

      .dropdown-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        color: black;
        border-radius: 4px;
        padding: 0.5rem 0;
        min-width: 160px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        li {
          padding: 0.5rem 1rem;

          a {
            color: black;
            text-decoration: none;

            &:hover {
              color: $color-primary;
            }
          }
        }
      }
    }
  }

  .mobile-only {
    @include respond-lg {
      display: none;
    }
  }

  
  &.is-top {
    background: transparent;

    .logo {
      color: $color-text;
    }

    .icon-link {
      color: $color-text;
    }

    .icons {
      color: $color-text;
    }

    .desktop-nav {

      @include respond-lg {

        .nav-item {
          color: $color-text;

          &:hover {
            color: black;

            .dropdown-menu {
              display: block;
            }
          }
        }

        .dropdown-menu {

          li {

            a {
              color: black;

              &:hover {
                color: $color-primary;
              }
            }
          }
        }
      }
    }
  }
}
</style>
