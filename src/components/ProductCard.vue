<template>
  <div class="card-wrapper">
    <!-- 獎牌在卡片外 -->
    <div v-if="badge <= 3 && badge" class="medals">
      <font-awesome-icon v-if="badge == 1" class="crown" :icon="['fas', 'crown']" />
      <font-awesome-icon v-else :class="{ silver: badge == 2, copper: badge == 3}" :icon="['fas', 'medal']" />
    </div>

    <!-- 商品卡片 -->
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
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: { type: Object, required: true },
  badge: { type: String, default: '' }   // 可傳入 '熱銷排行'、'新品上市'
})

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCrown, faMedal } from '@fortawesome/free-solid-svg-icons'

library.add(faCrown, faMedal)
</script>

<style scoped lang="scss">
.card-wrapper {
  position: relative;
    transition: transform 0.2s ease;
  
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

  .product-card {
    position: relative;
    background-color: #fff;
    border: 1px solid $color-border;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  
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
  }
}
</style>
