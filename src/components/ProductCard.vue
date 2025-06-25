<template>
  <div class="card-wrapper">
    <!-- 獎牌在卡片外 -->
    <div v-if="badge <= 3 && badge" class="medals">
      <font-awesome-icon v-if="badge == 1" class="crown" :icon="['fas', 'crown']" />
      <font-awesome-icon v-else :class="{ silver: badge == 2, copper: badge == 3}" :icon="['fas', 'medal']" />
    </div>

    <!-- 商品卡片 -->
    <router-link :to="`/product/${product.id}`" class="link-style">
      <div class="product-card">
        <div v-if="badge" class="badge">
          <div class="badge-content">{{ badge }}</div>
        </div>
        <div class="image-wrap">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="info">
          <h3 class="name">{{ product.name }}</h3>
          <p class="price">NT$ {{ product.price }}</p>
        </div>
        <div class="addToCart">
          <font-awesome-icon icon="fa-solid fa-bag-shopping" @click.stop.prevent="addToCart"/>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>

// 掛載 toast 
import { useToastStore } from '@/stores/toastStore'
const toastStore = useToastStore()

// 掛載 購物車
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const props = defineProps({
  product: { type: Object, required: true },
  badge: { type: [String, Number], default: '' }  // 支援字串或數字
})
const addToCart = () => {
  cartStore.addItem(props.product)
  toastStore.showToast(`${props.product.name}已加入購物車！`, 'success')
}
</script>

<style scoped lang="scss">
.card-wrapper {
  position: relative;
    transition: transform 0.2s ease;
    border-radius: 12px;
  
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      .product-card {
        border: 1px solid $color-border;
      }
    }

  .medals {
    position: absolute;
    right: 8px;
    top: -20px;
    z-index: 20;
    font-size: 20px;

    .crown {
      color: gold;
    }

    .silver {
      color: silver;
    }

    .copper {
      color: #C47F39;
    }
  }

  .link-style {
    text-decoration: none;

    .product-card {
      position: relative;
      background-color: #fff;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border: 1px solid $color-border;
    
      .badge {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 20px;
        left: 20px;
        width: 100px;
        background: $color-secondary;
        transform: rotate(-45deg) translate(-50%, -50%);
        transform-origin: top left;
    
        &-content {
          transform: rotate(45deg);
          color: $color-dark;
          font-weight: bold;
        }
      }
    
      .image-wrap {
        width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        padding: 1rem;
    
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          border-radius: 6px;
        }
      }
    
      .info {
        padding: 0 12px 12px 12px;
    
        .name {
          font-size: 16px;
          font-weight: bold;
          color: $color-text;
        }
    
        .price {
          font-size: 14px;
          font-weight: bold;
          color: $color-dark;
          margin-top: 4px;
        }
      }
  
      .addToCart {
        position: absolute;
        right: 16px;
        bottom: 8px;
        font-size: 32px;
        color: $color-border;
        transition: color .3s ease ;
        cursor: pointer;
  
        &:hover {
          color: $color-primary;
        }
  
        &:active {
          color: $color-primary
        }
      }
    }
  }

}
</style>
