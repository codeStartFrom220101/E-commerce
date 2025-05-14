<template>
  <div class="add-on-card">
    <img :src="image" :alt="title" />

    <div class="info">
      <h4 class="title">{{ title }}</h4>
      <p class="price">
        <span class="original">＄{{ originalPrice }} TWD</span>
        <span class="discounted">＄{{ discountedPrice }} TWD</span>
      </p>
    </div>

    <div v-if="locked" class="lock-overlay">
      <font-awesome-icon :icon="['fas','lock']" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  originalPrice: { type: [String, Number], required: true },
  discountedPrice: { type: [String, Number], required: true },
  locked: { type: Boolean, default: false }
})
</script>

<style scoped lang="scss">
.add-on-card {
  position: relative;
  flex: 0 0 auto;       // 保持固定寬度不撐滿
  width: 160px;
  border: 0.5px solid $color-border;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;

  img {
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  .info {
    padding: 8px;

    .title {
      font-size: 14px;
      margin: 0 0 4px;
      color: $color-text;
    }

    .price {
      font-size: 12px;
      .original {
        text-decoration: line-through;
        margin-right: 4px;
        color: $color-border;
      }
      .discounted {
        font-weight: bold;
        color: $color-primary;
      }
    }
  }

  .lock-overlay {
    position: absolute;
    right: 8px;
    bottom: 8px;
    font-size: 20px;
    color: rgba($color-border, 0.6);
  }
}
</style>
