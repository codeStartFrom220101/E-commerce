<template>
  <div class="login-banner" :style="{ backgroundImage: `url(${imageUrl})` }">
    <div class="items-container">
      <div v-for="(item, idx) in items" :key="idx" class="promo-item">
        <span class="tag">{{ item.tag }}</span>
        <span class="text">{{ item.text }}</span>
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
    padding: 32px 16px;
    gap: 16px;

    .promo-item {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: $color-light-text;

      .tag {
        display: inline-block;
        background: $color-light-text;
        padding: 4px 36px;
        color: #333;
        border-radius: 999px;
        font-size: 12px;
        white-space: nowrap;
      }
      
      .text {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}


</style>