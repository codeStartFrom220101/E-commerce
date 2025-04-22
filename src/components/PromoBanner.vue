<template>
  <div class="promo-banner" :style="{ backgroundImage: `url(${image})` }">
    <div class="content">
      <h2 v-html="formattedTitle"></h2>
      <button class="cta-btn">{{ ctaText }}</button>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue'

const props = defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  ctaText: { type: String, default: '立即選購' },
})

// 自動將逗號換成 <br>
const formattedTitle = computed(() => {
  return props.title.replace(/，/g, '<br>')
})
</script>

<style scoped lang="scss">
.promo-banner {
  position: relative;
  width: 100%;
  height: 260px;
  background-size: cover;
  background-position: 10% 30%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 24px;

  .content {
    margin-top: 60px;
    text-align: right;
    color: #fff;

    h2 {
      font-size: 20px;
      margin-bottom: 12px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .cta-btn {
      background-color: $color-primary;
      color: #fff;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: darken($color-primary, 10%);
      }
    }
  }
}
</style>
