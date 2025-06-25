<template>
  <div id="app">
    <Header :isTop="isTop" />
    <AsideMenu />
    <CartSideBar />
    <Toast ref="toastRef" />
    <router-view/>
    <GoTop />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from '@/components/Header.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import CartSideBar from '@/components/CartSideBar.vue'
import GoTop from '@/components/GoTop.vue'
import Footer from '@/components/Footer.vue'
import Toast from '@/components/Toast.vue'

// 取得 app 元素捲動狀態
const isTop = ref(true)


const handleScroll = () => {
  isTop.value = window.scrollY === 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // 初始判斷一次
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
</style>
