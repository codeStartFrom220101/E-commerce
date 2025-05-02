<template>
    <!-- 隐藏的 SVG 渐变定义，只在此组件内可用 -->
    <svg width="0" height="0" style="position:absolute;visibility:hidden;" aria-hidden="true">
    <defs>
      <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#405de6" />
        <stop offset="25%" stop-color="#833ab4" />
        <stop offset="50%" stop-color="#e1306c" />
        <stop offset="75%" stop-color="#f56040" />
        <stop offset="100%" stop-color="#ffdc80" />
      </linearGradient>
    </defs>
  </svg>

  <transition name="slide-fade">
    <div class="product-detail-wrapper">
      <Breadcrumbs :paths="breadcrumbPaths" />
      <div class="product-detail" v-if="product">
        <!-- 商品圖片 -->
        <div class="image-section">
          <img :src="product.image" :alt="product.name" />
        </div>
        <!-- 分享區 -->
        <div class="share">
          <h6>分享到：</h6>
          <a :href="facebookShareUrl" class="facebook" target="_blank" rel="noopener noreferrer">
            <font-awesome-icon :icon="['fab', 'facebook']" />
          </a>
          <a :href="lineShareUrl" class="line" target="_blank" rel="noopener noreferrer">
            <font-awesome-icon :icon="['fab', 'line']" />
          </a>
          <button @click="shareWeb" class="instagram-btn">
            <font-awesome-icon 
              class="instagram" 
              :icon="['fab', 'instagram']" 
            />
          </button>
        </div>

        <!-- 商品資訊區 -->
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

          <!-- 數量控制 -->
          <div class="quantity-control">
            <h6>數量</h6>
            <button @click="decreaseQty">
              <font-awesome-icon :icon="['fas', 'minus']" />
            </button>
            <input
              type="number"
              v-model.number="quantity"
              min="1"
              @blur="validateQty"
            />
            <button @click="increaseQty">
              <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
          </div>

          <!-- 加入購物車 / 立即購買 -->
          <div class="btn-content">
            <button class="add-cart-btn" @click="addToCart">
              加入購物車
            </button>
            <button class="buy-btn" @click="addToCart">
              立即購買
            </button>
          </div>

          <!-- 商品描述 / 顧客評價 -->
          <div class="another-info">
            <div class="title">
              <div class="title-block">
                <h4 class="active">商品描述</h4>
              </div>
              <div class="title-block">
                <h4>顧客評價</h4>
              </div>
            </div>
            <div class="description" v-if="true">
              <h3>商品描述</h3>
              <p>{{ product.description }}</p>
            </div>
            <div class="costumer-response" v-else>
              <h3>顧客評價</h3>
            </div>
          </div>

          <!-- 相似產品 -->
          <div class="similar">
            <h3>相似產品</h3>
            <div class="similar-product">
                <ProductCard v-for="item in similarProducts" :key="item.id" :product="item" />
            </div>
          </div>

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
import ProductCard from '@/components/ProductCard.vue'

// 路由與 Store
const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

// 動態產品資料
const productId = computed(() => Number(route.params.id))
const product = computed(() =>
  productStore.products.find(p => p.id === productId.value)
)

// 取得並初始化
onMounted(async () => {
  if (!productStore.products.length) {
    await productStore.fetchProducts()
  }
  if (!product.value) {
    router.replace({ name: 'ProductList' })
  }
  window.scrollTo(0, 0)
})

// 分享連結
const shareUrl = computed(() => window.location.href)
const facebookShareUrl = computed(
  () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`
)
const lineShareUrl = computed(
  () => `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl.value)}`
)
const shareWeb = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.value.name,
        url: shareUrl.value
      })
    } catch (e) {
      console.error('Web Share 失敗', e)
    }
  } else {
    window.open(facebookShareUrl.value, '_blank')
  }
}

// Breadcrumb 與分類對照
const categoryLabels = {
  all: '全部商品',
  couple: '情侶專區',
  healing: '療癒小物',
  useful: '實用選品'
}
const category = computed(() =>
  route.params.category || product.value?.category || 'all'
)
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
  if (product.value) paths.push({ name: product.value.name })
  return paths
})

// 數量控制
const quantity = ref(1)
const increaseQty = () => quantity.value++
const decreaseQty = () => { if (quantity.value > 1) quantity.value-- }
const validateQty = () => { if (quantity.value < 1 || isNaN(quantity.value)) quantity.value = 1 }

// 加入購物車
const addToCart = () => {
  if (product.value) {
    cartStore.addItem({ ...product.value, quantity: quantity.value })
    cartStore.openCart()
  }
}

// 立即結帳保留位置

// 相似產品列表產生
const similarProducts = computed(() =>
  productStore.similarProducts(productId.value)
)
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

  .share {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;

    h6 {
      font-weight: normal;
      font-size: 12px;
    }

    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;

      &.facebook {
        color: #434E94;
      }

      &.line {
        color: #85C433;
      }

    }

    .instagram-btn {
      border: none;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
         

      .instagram {
        font-size: 24px;

        &::v-deep path {
          fill: url(#instagramGradient) !important;
        }
      }
    }

    // .instagram-btn .instagram ::v-deep path {
    // }
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
        text-decoration: none;
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
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 20px;

      h6 {
        width: 100%;
        margin-bottom: 4px;
      }

      button {
        width: 40px;
        height: 40px;
        font-size: 18px;
        border: 1px solid $color-border;
        background: transparent;
        color: $color-text;
        cursor: pointer;
        transition: all .3s ease;

        &:hover {
          color: #000;
        }
      }

      input {
        width: calc(100% - 80px);
        padding: 12px;
        height: 40px;
        font-size: 16px;
        border: 1px solid $color-border;
        border-left: none;
        border-right: none;
        background: transparent;
        color: $color-text;

        &:focus {
          outline: none;
        }
      }
    }




    .btn-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;

      .add-cart-btn, .buy-btn {
        flex: 1;
        color: #fff;
        padding: 10px;
        border: none;
        cursor: pointer;
        font-size: 12px;
        transition: all .3s ease;
      }

      .add-cart-btn {
        background: #000;

        &:hover {
          background: color.adjust(#000, $lightness: 10%);
        }
      }

      .buy-btn {
        background: $color-primary;

        &:hover {
          background: color.adjust($color-primary, $lightness: -10%);
        }
      }
    }

    .another-info {

      .title {
        display: flex;
        font-size: 16px;
        border-bottom: 2px solid #d9d9d9;
        margin-bottom: 16px;

        &-block {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;

          h4 {
            text-align: center;
            padding: 8px 16px;
            cursor: pointer;
            
            &.active {
              border-bottom: 2px solid #000;
            }
          }
        }
      }

      .description {

        h3 {
          font-size: 20px;
          text-align: center;
          position: relative;
          padding-bottom: 8px;
          margin-bottom: 16px;

          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            border-bottom: 2px solid #000;
          }
        }
      }
    }

    .similar {

      h3 {
          font-size: 20px;
          text-align: center;
          position: relative;
          padding-bottom: 8px;
          margin-bottom: 16px;

          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            border-bottom: 2px solid #000;
          }
      }

      .similar-product {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
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
