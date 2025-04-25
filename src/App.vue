<template>
  <div id="app">
    <Header />
    <AsideMenu />
    <CartSideBar />
    <Toast ref="toastRef" />
    <router-view />
    <GoTop />
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import CartSideBar from '@/components/CartSideBar.vue'
import GoTop from '@/components/GoTop.vue'
import Footer from '@/components/Footer.vue'

// toast
import Toast from '@/components/Toast.vue'
import { ref } from 'vue'

const toastRef = ref(null)

// 提供全局呼叫方式
const showGlobalToast = (msg) => {
  toastRef.value.showToast(msg)
}

// 如果想綁到 window 方便呼叫
window.$toast = showGlobalToast
</script>

<style scoped>
</style>
