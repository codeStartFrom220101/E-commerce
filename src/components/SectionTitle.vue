<template>
  <div class="section-title">
    <h2>{{ text }}</h2>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  }
})
</script>

<style scoped lang="scss">
.section-title {
  width: 100%;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: $color-text;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      display: block;
      width: 36px;
      height: 3px;
      background-color: $color-primary;
      margin-top: 6px;
    }
  }
}
</style>
