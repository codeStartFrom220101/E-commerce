<template>
  <div class="home">

    <!-- Hero Banner 區 -->
    <HomeSlider />

    <!-- 商品分類導覽區 -->
    <section class="category-nav">
      <!-- 這裡可以放三個導覽卡片連到 /product/couple 等分類頁 -->
    </section>

    <!-- 新品上市區 -->
    <section class="new-arrivals">
      <SectionTitle text="新品上市" />
      <div class="product-grid">
        <ProductCard v-for="item in newArrivals" :key="item.id" :product="item" />
      </div>
    </section>

    <!-- 熱銷排行區 -->
    <section class="bestseller">
      <SectionTitle text="熱銷排行" />
      <ProductSlider :items="bestsellers">
          <template #card="{ item, index }">
            <ProductCard :product="item" :badge="`${index + 1}`" />
          </template>
      </ProductSlider>
    </section>

    <!-- 推薦選購情侶商品 -->
    <PromoBanner
      image="/images/promoBanner375.png"
      title="把微小的幸福，送給最愛的人"
      ctaText="立即選購"
    />

    <!-- 活動推銷 -->
    <section class="promo-message">
      <p>
        期間限定 全站滿 <span class="highlight">520</span> 免運
      </p>
    </section>

    <SpecialOffer />

  </div>
</template>

<script setup>
import HomeSlider from '@/components/HomeSlider.vue'
import ProductCard from '@/components/ProductCard.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ProductSlider from '@/components/ProductSlider.vue'
import PromoBanner from '@/components/PromoBanner.vue'
import SpecialOffer from '@/components/SpecialOffer.vue'

import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'

// 取得 Pinia 資料
const productStore = useProductStore()
const { newArrivals, bestsellers } = storeToRefs(productStore)

</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
}

.scroll-row {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 0 16px;
}

// 新品上市區塊
.new-arrivals {
  padding: 32px 16px 0 16px;

  .product-grid {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}


// 熱銷排行榜
.bestseller {
  padding: 32px 16px 0 16px;
}


// 活動推銷
.promo-message {
  background-color: $color-background;
  text-align: center;
  padding: 16px 0;
  font-size: 20px;
  font-weight: bold;
  color: $color-text;

  .highlight {
    color: #EE5555;
    font-size: 30px;
  }
}

</style>