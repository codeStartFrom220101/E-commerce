<template>
  <div class="product-page">
    
    <ProductBanner :title="bannerTitle" :background="bannerImage" />
    <Breadcrumbs :paths="breadcrumbPaths" />
    <div class="outside-grid">
      <nav class="category-nav">
        <router-link
          v-for="(label, key) in categoryLabels"
          :key="key"
          :to="`/product/${key}`"
          :class="{ active: category === key }"
          class="category-link"
        >
          {{ label }}
        </router-link>
      </nav>
      <div class="product-block">
        <div class="top-bar">
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
        </div>
    
    
        <div class="product-grid">
          <ProductCard v-for="item in displayedProducts" :key="item.id" :product="item" />
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
      </div>
    </div>
  </div>

</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ProductBanner from '@/components/ProductBanner.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CostumSelectDropdown from '@/components/CostumSelectDropdown.vue'
import ProductCard from '@/components/ProductCard.vue'

// 分類對映中文標籤
const categoryLabels = {
  all: '全部商品',
  couple: '情侶專區',
  healing: '療癒小物',
  useful: '實用選品'
}

// 1. 取得路由參數、Pinia Store
const route = useRoute()
const store = useProductStore()

// 2. 分類參數變動，通知 Store 並重置頁數
const category = computed(() => route.params.category || 'all')
watch(category, (newCat) => {
  store.setCategory(newCat)
  currentPage.value = 1
})

// 3. 元件掛載時，先抓一次 mock 資料，並設初始分類
onMounted(async () => {
  await store.fetchProducts()
  store.setCategory(category.value)
})

// 4. 下拉選排序：呼叫 Store action
function handleSort(option) {
  store.setSort(option.value)
  currentPage.value = 1
}

// 5. 下拉選頁數：元件內管理
const pageSize = ref(12)
function handlePageSize(option) {
  pageSize.value = option.value === 'large'
    ? 36
    : option.value === 'middle'
    ? 24
    : 12
  currentPage.value = 1
}

// 6. 分頁狀態
const currentPage = ref(1)
const displayedProducts = computed(() => {
  const list = store.filteredAndSorted
  const size = Number(pageSize.value) || 12
  const start = (currentPage.value - 1) * size
  return list.slice(start, start + size)
})
const totalPages = computed(() =>
  Math.ceil(store.filteredAndSorted.length / pageSize.value)
)
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

// 7. 其他固定資料
const bannerMap = {
  all:    { title: '探索全站好物',     background: '/images/飛機啦.png' },
  couple: { title: '甜蜜情侶專區',     background: '/images/BANNER情侶商品.png' },
  healing:{ title: '療癒小物集合',     background: '/images/BANNER四商品.png' },
  useful: { title: '實用生活選品',     background: '/images/banner-useful.jpg' }
}
const bannerTitle = computed(() =>
  bannerMap[category.value]?.title || '精選商品'
)
const bannerImage = computed(() =>
  bannerMap[category.value]?.background || '/images/default-banner.jpg'
)
const titleMap = {
  all: '全部商品',
  couple: '情侶專區',
  healing: '療癒小物',
  useful: '實用選品'
}
const sectionTitle = computed(() =>
  titleMap[category.value] || '精選商品'
)
const breadcrumbPaths = computed(() => {
  const paths = [
    { name: '首頁', link: '/' },
    { name: categoryLabels.all, link: '/product' }
  ]
  if (category.value !== 'all') {
    paths.push({
      name: categoryLabels[category.value],
      link: `/product/${category.value}`
    })
  }
  return paths
})
const sortOptions1 = [
  { label: '上架時間：由新到舊', value: 'newest' },
  { label: '上架時間：由舊到新', value: 'oldest' },
  { label: '價格：由低至高',     value: 'priceLow' },
  { label: '價格：由高至低',     value: 'priceHigh' },
  { label: '銷量：由高至低',     value: 'salesHigh' },
  { label: '銷量：由低至高',     value: 'salesLow' },
]
const sortOptions2 = [
  { label: '每頁顯示36個', value: 'large' },
  { label: '每頁顯示24個', value: 'middle' },
  { label: '每頁顯示12個', value: 'small' },
]
</script>

<style scoped lang="scss">

.outside-grid {
  @include respond-lg {
    display: grid;
    grid-template-columns: 1fr 5fr;
    max-width: 1400px;
    margin: 0 auto;
  }

  .category-nav {
    display: none;

    @include respond-lg {
      display: flex;
      // justify-content: center;
      flex-direction: column;
      gap: 24px;
      padding: 16px 0;
      background: #f8f8f8;

      .category-link {
        color: #666;
        font-size: 16px;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 4px;
        transition: background 0.2s;

        @include respond-sm {
          font-size: 18px;
        }

        @include respond-lg {
          font-size: 20px;
        }

        @include respond-xxl {
          font-size: 22px;
        }

        &:hover {
          background: #ddd;
        }

        &.active {
          background: $color-primary;
          color: white;
        }
      }
    }
}

  .top-bar {
    display: grid;
  
    @include respond-sm {
      grid-template-columns: 1fr 1fr;
    }
  
    .sectionTitle-grid {
      padding: 16px;
  
      @include respond-sm {
        padding: 16px 16px 0;
      }
    }
    
    .dropdown-grid {
      display: grid;
      padding: 8px 16px;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
  }
  
  .product-grid {
    display: grid;
    padding: 16px;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @include respond-md {
      grid-template-columns: repeat(3, 1fr);
    }

    @include respond-xl {
      grid-template-columns: repeat(4, 1fr);
    }
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
}
</style>
