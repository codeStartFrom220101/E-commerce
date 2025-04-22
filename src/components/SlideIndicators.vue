<template>
  <div class="indicators">
    <span
      v-for="index in count"
      :key="index"
      @click="emit('update', index - 1)"
    >
      <span :class="{ active: index - 1 === current }"></span>
    </span>
  </div>
</template>

<script setup>
defineProps({
  count: Number,
  current: Number,
})
const emit = defineEmits(['update'])
</script>

<style scoped lang="scss">
.indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;

  > span {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: $color-homeSlider-arrow;
    cursor: pointer;

    > span {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: $color-dark;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;

      &.active {
        background: $color-primary;
        transform: translate(-50%, -50%) scale(1.3);
      }
    }
  }
}
</style>
