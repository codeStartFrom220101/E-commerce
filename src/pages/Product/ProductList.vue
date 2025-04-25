<template>
  <div class="product-page">
    <ProductBanner :title="bannerTitle" :background="bannerImage" />
    
    <div class="sectionTitle-grid">
      <SectionTitle :text="sectionTitle"/>
    </div>

    <div class="dropdown-grid">
      <CostumSelectDropdown  
        :options="sortOptions1" 
        defaultLabel="商品排序"
        @select="handleSort"
      />
      <CostumSelectDropdown  
        :options="sortOptions2" 
        defaultLabel="每頁顯示數量"
        @select="handlePageSize"
      />
    </div>

    <div class="product-grid">
      <ProductCard v-for="item in displayedProducts" :key="item.id" :product="item" />
    </div>
  </div>

  <div class="custom-pagination">
  <span @click="prevPage" :class="{ disabled: currentPage === 1 }">‹</span>

  <span
    v-for="page in totalPages"
    :key="page"
    @click="goToPage(page)"
    :class="{ active: page === currentPage }"
  >
    {{ page }}
  </span>

  <span @click="nextPage" :class="{ disabled: currentPage === totalPages }">›</span>
</div>

</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import ProductBanner from '@/components/ProductBanner.vue'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const store = useProductStore()

const category = computed(() => route.params.category || 'all')

const filteredProducts = computed(() => {
  if (category.value === 'all') return store.products
  return store.products.filter(p => p.category === category.value)
})

// Banner 樣式動態設定
const bannerMap = {
  all: { title: '探索全站好物', background: '/images/飛機啦.png' },
  couple: { title: '甜蜜情侶專區', background: '/images/banner-couple.jpg' },
  healing: { title: '療癒小物集合', background: '/images/banner-healing.jpg' },
  useful: { title: '實用生活選品', background: '/images/banner-useful.jpg' }
}

const bannerTitle = computed(() => bannerMap[category.value]?.title || '精選商品')
const bannerImage = computed(() => bannerMap[category.value]?.background || '/images/default-banner.jpg')


// 標題切換
import SectionTitle from '@/components/SectionTitle.vue'
const titleMap = {
  all: '全部商品',
  couple: '情侶專區',
  healing: '療癒小物',
  useful: '實用選品'
}

const sectionTitle = computed(() => titleMap[category.value] || '精選商品')


// 下拉選單
import CostumSelectDropdown from '@/components/CostumSelectDropdown.vue'

const sortOptions1 = [
  { label: '上架時間：由新到舊', value: 'newest' },
  { label: '上架時間：由舊到新', value: 'oldest' },
  { label: '價格：由低至高', value: 'priceLow' },
  { label: '價格：由高至低', value: 'priceHigh' },
  { label: '銷量：由高至低', value: 'salesHigh' },
  { label: '銷量：由低至高', value: 'salesLow' },
]


const sortOptions2 = [
  { label: '每頁顯示36個', value: 'large' },
  { label: '每頁顯示24個', value: 'middle' },
  { label: '每頁顯示12個', value: 'small' },
]


// 處理排序
const sortType = ref('')  // 紀錄當前排序條件
const pageSize = ref(12);

const sortedProducts = computed(() => {
  let products = [...filteredProducts.value]

  switch (sortType.value) {
    case 'newest':
      return products.sort((a, b) => b.dateAdded - a.dateAdded)
    case 'oldest':
      return products.sort((a, b) => a.dateAdded - b.dateAdded)
    case 'priceLow':
      return products.sort((a, b) => a.price - b.price)
    case 'priceHigh':
      return products.sort((a, b) => b.price - a.price)
    case 'salesHigh':
      return products.sort((a, b) => b.sales - a.sales)
    case 'salesLow':
      return products.sort((a, b) => a.sales - b.sales)
    default:
      return products
  }
})


const handleSort = (option) => {
  sortType.value = option.value
  currentPage.value = 1  // 重置到第1頁
}

const handlePageSize = (option) => {
  switch (option.value) {
    case 'large':
      pageSize.value = 36
      break
    case 'middle':
      pageSize.value = 24
      break
    case 'small':
      pageSize.value = 12
      break
    default:
      pageSize.value = 12
  }
  currentPage.value = 1  // 換頁大小時也重置到第1頁
}



const displayedProducts = computed(() => {
  if (!Array.isArray(sortedProducts.value)) return []

  const size = Number(pageSize.value) || 12
  const start = (currentPage.value - 1) * size
  const end = start + size

  return sortedProducts.value.slice(start, end)
})

// 分頁按鈕
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / pageSize.value)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}


</script>

<style scoped lang="scss">
.sectionTitle-grid {
  padding: 16px;
}

.dropdown-grid {
  display: grid;
  padding: 0 16px;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.product-grid {
  display: grid;
  padding: 16px;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.custom-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin: 24px 0;
  font-size: 16px;
  color: $color-border;

  span {
    cursor: pointer;
    padding: 0 6px;
    transition: color 0.2s;
    border-bottom: 2px solid transparent;

    &.active {
      color: #1f1f1f;
      font-weight: bold;
      border-bottom: 2px solid #1f1f1f;
    }

    &.disabled {
      opacity: 0.5;
      cursor: default;
    }

    &:hover:not(.active):not(.disabled) {
      color: #666;
    }
  }
}

</style>
