// stores/menuStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAsideMenuStore = defineStore('asideMenu', () => {
  const isOpen = ref(false)

  const openMenu = () => { isOpen.value = true }
  const closeMenu = () => { isOpen.value = false }
  const toggleMenu = () => { isOpen.value = !isOpen.value }

  return { isOpen, openMenu, closeMenu, toggleMenu }
})
