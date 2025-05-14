<!-- src/components/CheckoutBreadcrumbs.vue -->
<template>
  <nav class="checkout-breadcrumbs">
    <div class="step-icons">
      <div class="step-icon-content">
        <div class="step-icon" :class="{ active: currentStep >= 1 }">1</div>
      </div>
      <div class="step-icon-content">
        <div class="step-icon" :class="{ active: currentStep >= 2 }">2</div>
      </div>
      <div class="step-icon-content">
        <div class="step-icon" :class="{ active: currentStep >= 3 }">3</div>
      </div>
      <div class="progressBar"></div>
      <div class="progressBar-bg" :style="{ width: `calc((100% / 3) * ${currentStep - 1})` }"></div>
    </div>
    <div class="step-labels">
      <div class="step-label-content">
        <div class="step-label" :class="{ active: currentStep >= 1 }">購物車</div>
      </div>
      <div class="step-label-content">
        <div class="step-label" :class="{ active: currentStep >= 2 }">填寫資料</div>
      </div>
      <div class="step-label-content">
        <div class="step-label" :class="{ active: currentStep >= 3 }">訂單確認</div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  currentStep: {
    type: Number,
    default: 1
  }
})
</script>

<style scoped lang="scss">
.checkout-breadcrumbs {
  padding: 32px 16px;

  .step-icons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    position: relative;

    .step-icon-content {
      display: flex;
      align-items: center;
      justify-content: center;

      .step-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: $color-secondary;
        color: $color-light-text;
        text-align: center;
        line-height: 32px;
        transition: all .3s ease 3s;

        &.active {
          background: $color-primary;
        }
      }
    }

    .progressBar {
      position: absolute;
      left: calc(100% / 6);
      top: 50%;
      transform: translateY(-50%);
      width: calc(100% / 6 * 4);
      height: 3px;
      background: $color-secondary;
      z-index: -2;
    }

    .progressBar-bg {
      position: absolute;
      left: calc(100% / 6);
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 3px;
      background: $color-primary;
      z-index: -1;
      transition: width 3s ease;
    }
  }

  .step-labels {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    .step-label-content {
      display: flex;
      align-items: center;
      justify-content: center;

      .step-label {
        font-size: 12px;
        color: $color-border;

        &.active {
          color: #000;
          transition: all .3s ease 3s;
        }
      }
    }
  }

}
</style>

