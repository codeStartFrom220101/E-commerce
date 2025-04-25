<template>
  <transition name="slide-fade">
    <div class="overlay" v-if="asideMenuStore.isOpen" @click="asideMenuStore.closeMenu()">
      <aside class="aside-menu" @click.stop>
        <div class="header">
          <h1>Zoo-GOODS</h1>
          <button @click="asideMenuStore.closeMenu()">✕</button>
        </div>
  
        <!-- 商品分類 -->
        <!-- 商品分類 -->
        <div class="menu-item">
          <div class="menu-title" @click="toggleCategory">
            全站商品
            <span>
              <font-awesome-icon :icon="['fas', showCategory ? 'chevron-up' : 'chevron-down']" />
            </span>
          </div>
          <ul :class="{ active: showCategory}">
            <li>實用小物</li>
            <li>情侶小物</li>
            <li>療癒小物</li>
          </ul>
        </div>

        <!-- 限時活動 -->
        <div class="menu-item">
          <div class="menu-title" @click="togglePromo">
            限時活動
            <span>
              <font-awesome-icon :icon="['fas', showPromo ? 'chevron-up' : 'chevron-down']" />
            </span>
          </div>
          <ul :class="{ active: showPromo}">
            <li>520免運</li>
            <li>療癒選物99起</li>
            <li>情侶小物兩件折10元</li>
          </ul>
        </div>

      </aside>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronUp, faChevronDown)

import { useAsideMenuStore } from '@/stores/asideMenuStore'
const asideMenuStore = useAsideMenuStore()

const showCategory = ref(false)
const showPromo = ref(false)

const toggleCategory = () => {
  showCategory.value = !showCategory.value
}

const togglePromo = () => {
  showPromo.value = !showPromo.value
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .aside-menu {
    width: 75vw;
    height: 100vh;
    background: #f9f6f1;
    padding: 20px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
  
      h1 {
        font-size: 24px;
        color: #7c7366;
      }
  
      button {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
      }
    }
  
    .menu-item {
      padding: 8px 0;

      .menu-title {
        font-size: 18px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;

        >span {
          font-size: 12px;
        }
      }
  
      ul {
        max-height: 0;
        transition: max-height .3s ease;
  
        li {
          font-size: 0;
          transition: padding .3s ease;
        }

        &.active {
          max-height: 200px;
          transition: max-height .3s ease;

          li {
            cursor: pointer;
            padding: 8px 0 0;
            max-height: auto;
            font-size: 16px;
            transition: padding .3s ease;
  
            &:hover {
              color: #c49f72;
            }
          }
        }
      }
    }
  }
}


/* 定義過渡動畫 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}


</style>
