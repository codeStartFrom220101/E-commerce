<template>
  <div id="app" ref="appRef" @scroll="handleScroll">
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
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import CartSideBar from '@/components/CartSideBar.vue'
import GoTop from '@/components/GoTop.vue'
import Footer from '@/components/Footer.vue'
import Toast from '@/components/Toast.vue'

// 取得 app 元素捲動狀態
const isTop = ref(true)
const appRef = ref(null)

const handleScroll = () => {
  isTop.value = appRef.value.scrollTop === 0
}

onMounted(() => {
  // 初次載入也判斷一次
  handleScroll()
})
</script>

<style scoped>
#app {
  height: 100vh;
  overflow-y: auto;

}
</style>
