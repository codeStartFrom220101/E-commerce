<!-- src/pages/checkout/CheckoutLayout.vue -->
<template>
  <div class="checkout-layout">
    <!-- 1. 放在 Layout 最上方，只渲染一次 -->
    <CheckoutBreadcrumbs :current-step="currentStep" />

    <!-- 2. 子路由內容 -->
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CheckoutBreadcrumbs from '@/components/CheckoutBreadcrumbs.vue'

// 根據目前路由 name 決定是哪一步
const route = useRoute()
const currentStep = computed(() => {
  switch (route.name) {
    case 'CheckoutStep1': return 1
    case 'CheckoutStep2': return 2
    case 'CheckoutStep3': return 3
    default: return 1
  }
})
</script>
