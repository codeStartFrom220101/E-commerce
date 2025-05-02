<template>
  <transition name="slide-fade">
    <div class="product-detail-wrapper">
      <Breadcrumbs :paths="breadcrumbPaths" />
      <div class="product-detail" v-if="product">
        <!-- 商品圖片 -->
        <div class="image-section">
          <img :src="product.image" :alt="product.name" />
        </div>

        <!-- 資訊區 -->
        <div class="info-section">
          <h2 class="name">{{ product.name }}</h2>
          <ul class="promo-info">
            <li>限時至 4/30・全站滿 $520 免運費！</li>
            <li>
              連假限定｜
              <router-link
                :to="{ name: 'ProductList', params: { category: 'healing' } }"
                class="promo-link"
              >
                療癒選物
              </router-link>
              只要 $99 起！
            </li>
            <li>
              <router-link
                :to="{ name: 'ProductList', params: { category: 'couple' } }"
                class="promo-link"
              >
                情侶小物
              </router-link>
              任選 2 件 現折 $10
            </li>
          </ul>
          <p class="price">NT$ {{ product.price }}</p>
          <p class="description">
            {{ product.description || '這是商品的詳細描述內容...' }}
          </p>

          <div class="quantity-control">
            <button @click="decreaseQty">-</button>
            <input
              type="number"
              v-model.number="quantity"
              min="1"
              @blur="validateQty"
            />
            <button @click="increaseQty">+</button>
          </div>

          <button class="add-cart-btn" @click="addToCart">
            加入購物車
          </button>
        </div>
      </div>
      <div v-else class="not-found">
        找不到此商品！
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

// 取得路由與 Store
const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

// 動態抓取產品資料
const productId = computed(() => Number(route.params.id))
const product = computed(() =>
  productStore.products.find(p => p.id === productId.value)
)

onMounted(async () => {
  if (!productStore.products.length) {
    await productStore.fetchProducts()
  }
  // 若無此商品，自動導回列表
  if (!product.value) {
    router.replace({ name: 'ProductList' })
  }
  // 滾動至頂部
  window.scrollTo(0, 0)
})

// 分類名稱對照
const categoryLabels = {
  all: '全部商品',
  couple: '情侶專區',
  healing: '療癒小物',
  useful: '實用選品'
}
// 由產品或 route 決定分類
const category = computed(() =>
  route.params.category || product.value?.category || 'all'
)

// 動態 breadcrumb
const breadcrumbPaths = computed(() => {
  const paths = [
    { name: '首頁', link: '/' },
    { name: '全部商品', link: '/product' }
  ]
  if (category.value !== 'all') {
    paths.push({
      name: categoryLabels[category.value],
      link: { name: 'ProductList', params: { category: category.value } }
    })
  }
  if (product.value) {
    paths.push({ name: product.value.name })
  }
  return paths
})

// 購物車
const cartStore = useCartStore()
const quantity = ref(1)
function increaseQty() { quantity.value++ }
function decreaseQty() { if (quantity.value > 1) quantity.value-- }
function validateQty() { if (quantity.value < 1 || isNaN(quantity.value)) quantity.value = 1 }
function addToCart() {
  if (product.value) {
    cartStore.addItem({ ...product.value, quantity: quantity.value })
    cartStore.openCart()
  }
}
</script>

<style scoped lang="scss">
@use "sass:color";

.product-detail {
  display: flex;
  flex-direction: column;

  .image-section {
    text-align: center;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .info-section {
    margin: 20px 0;
    padding: 0 16px;

    .name {
      font-size: 32px;
      font-weight: bolder;
      margin-bottom: 8px;
    }

    .promo-info {
      border-left: 2px solid $color-text;
      padding: 0 8px;
      font-size: 14px;
      margin-bottom: 8px;

      li > .promo-link {
        color: #828282;
      }
    }


    .price {
      font-size: 20px;
      color: $color-text;
      margin-bottom: 16px;
      font-weight: bold;
    }

    .description {
      font-size: 14px;
      color: $color-text;
      margin-bottom: 20px;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      button {
        width: 32px;
        height: 32px;
        font-size: 18px;
        border: 1px solid $color-border;
        background: transparent;
        color: $color-text;
      }

      input {
        width: 100%;
        text-align: center;
        height: 32px;
        font-size: 16px;
        border: 1px solid $color-border;
        border-left: none;
        border-right: none;
        background: transparent;
        color: $color-text;

        &:focus {

        }
      }
    }


    .add-cart-btn {
      background: $color-primary;
      color: #fff;
      padding: 12px;
      width: 100%;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      transition: all .3s ease;

      &:hover {
        background: color.adjust($color-primary, $lightness: -10%);
      }
    }
  }
}

.not-found {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #999;
}
</style>
