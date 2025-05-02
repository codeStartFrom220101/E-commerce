<template>
  <section class="product-hero-banner" :style="{ backgroundImage: `url(${background})` }">
    <div class="content">
      <h2>{{ title }}</h2>
      <button class="cta">{{ ctaText }}</button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  ctaText: { type: String, default: '立即選購' },
  background: { type: String, required: true }
})
</script>

<style scoped lang="scss">
@use "sass:color";
.product-hero-banner {
  position: relative;
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    position: absolute;
    right: 20px;
    top: 40%;
    text-align: right;
    padding: 16px 24px;
    
    h2 {
      background: rgba(0, 0, 0, 0.3);
      padding: 1rem;
      color: $color-light-text;
      font-size: 24px;
      margin-bottom: 12px;
    }

    .cta {
      background: $color-primary;
      color: $color-light-text;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;

      &:hover {
        background: color.adjust($color-primary, $lightness: -10%);
      }
    }
  }
}
</style>
