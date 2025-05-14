// src/stores/productStore.js
import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    sortType: 'newest',     // 排序方式
    categoryFilter: 'all'   // 分類篩選，可選 'all', 'healing', …
  }),
  actions: {
    // 從 public/products.json 載入 mock 資料
    async fetchProducts() {
      try {
        const res = await fetch('/data/products.json')
        if (!res.ok) {
          throw new Error(`讀取 products.json 失敗，HTTP ${res.status}`)
        }
        this.products = await res.json()
      } catch (err) {
        console.error('載入產品失敗：', err)
        this.products = []
      }
    },
    // 更新分類
    setCategory(cat) {
      this.categoryFilter = cat
    },
    // 更新排序條件
    setSort(type) {
      this.sortType = type
    }
  },
  getters: {
    // 統一篩選 & 排序邏輯，各頁、首頁都可共用
    filteredAndSorted: (state) => {
      let items = state.categoryFilter === 'all'
        ? [...state.products]                // ← 正確的 spread 語法
        : state.products.filter(p => p.category === state.categoryFilter)

      switch (state.sortType) {
        case 'newest':
          return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        case 'oldest':
          return items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        case 'priceLow':
          return items.sort((a, b) => a.price - b.price)
        case 'priceHigh':
          return items.sort((a, b) => b.price - a.price)
        case 'salesHigh':
          return items.sort((a, b) => b.sold - a.sold)
        case 'salesLow':
          return items.sort((a, b) => a.sold - b.sold)
        default:
          return items
      }
    },
    // 首頁專用：最新上架前 4 筆
    newArrivals: (state) =>
      [...state.products]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4),
    // 首頁專用：暢銷前 10 筆
    bestsellers: (state) =>
      [...state.products]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10),
    
    // 根據商品 ID，回傳同分類隨機 4 筆
    similarProducts: (state) => (id) => {
      const current = state.products.find(p => p.id === id)
      if (!current) return []
      const candidates = state.products.filter(
        p => p.category === current.category && p.id !== id
      )
      // 隨機排序
      const shuffled = [...candidates].sort(() => Math.random() - 0.5)
      return shuffled.slice(0, 4)
    },

    /**
     * 加購商品
     * 排除購物車已有商品
     */
    randomAddOns() {
      const cartStore = useCartStore()
      // 先取出购物车里所有的商品 id
      const cartIds = cartStore.items.map(i => i.id)
      // 过滤掉购物车里的，再打乱、取前 5
      const candidates = this.products.filter(p => !cartIds.includes(p.id))
      return [...candidates]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
    }
  }
})
