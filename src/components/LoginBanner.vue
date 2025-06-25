<template>
  <div class="login-banner" :style="{ backgroundImage: `url(${imageUrl})` }">
    <div class="items-container">
      <div v-for="(item, idx) in items" :key="idx" class="promo-item">
        <div class="promo-grid">
          <div class="tag">{{ item.tag }}</div>
          <div class="text">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  /** 背景圖片 URL */
  imageUrl: {
    type: String,
    required: true
  },
  /** 要顯示的多條訊息，每一項有 tag 和 text */
  items: {
    type: Array,
    required: true,
    validator: arr => arr.every(
      i => typeof i.tag === 'string' && typeof i.text === 'string'
    )
  }
})
</script>

<style scoped lang="scss">
.login-banner {
  position: relative;
  background-size: cover;
  background-position: center;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;


  .items-container {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .promo-item {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: $color-light-text;
      text-wrap: wrap;

      @include respond-sm {
        font-size: 14px;
      }

      .promo-grid {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        gap: 8px;

        @include respond-sm {
          flex-wrap: nowrap;
        }
        
        .tag {
          display: inline-block;
          background: $color-light-text;
          padding: 4px 18px;
          color: #333;
          border-radius: 999px;
          font-size: 12px;
          white-space: nowrap;
  
          @include respond-sm {
            padding: 4px 36px;
          }
        }
        
        .text {
          width: 100%;
          text-align: center;
          white-space: nowrap;

          @include respond-sm {
          text-align: left;
          }
        }
      }

    }
  }
}


</style>