<template>
  <div class="product-slider-scroll">
    <div class="slider-wrapper" ref="wrapperRef" @scroll="handleScroll">
      <div
        class="slider-item"
        v-for="(item, index) in items"
        :key="item.id || index"
      >
        <slot name="card" :item="item" :index="index">
          <!-- 預設顯示卡片結構 -->
          <div class="default-card">
            <img :src="item.image" :alt="item.name" />
            <h3>{{ item.name }}</h3>
            <p>NT${{ item.price }}</p>
          </div>
        </slot>
      </div>
    </div>

    <!-- 指示器 -->
    <div class="indicators">
      <span
        v-for="(dot, i) in totalPages"
        :key="i"
        :class="{ active: i === currentSlide }"
        @click="goTo(i)"
      ><span></span></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted, watch } from 'vue'

const props = defineProps({
  items: { type: Array, required: true }
})

const wrapperRef = ref(null)
const currentSlide = ref(0)
const slideStep = ref(0) // 每次滑動多少 px
const totalPages = ref(0)

// 重新計算卡片寬度（依據實際排版）
const calculateSliderMetrics = () => {
  const wrapper = wrapperRef.value
  if (!wrapper) return

  // 滾動總距離 / 可視寬度 = 可滑動幾頁
  const scrollWidth = wrapper.scrollWidth
  const clientWidth = wrapper.clientWidth

  slideStep.value = clientWidth
  totalPages.value = Math.ceil((scrollWidth - clientWidth) / slideStep.value) + 1
}

// 手動滑動時更新 currentSlide
const goTo = (index) => {
  if (!wrapperRef.value) return
  const offset = index * slideStep.value
  wrapperRef.value.scrollTo({ left: offset, behavior: 'smooth' })
  currentSlide.value = index
}

const handleScroll = () => {
  if (!wrapperRef.value) return
  const scrollLeft = wrapperRef.value.scrollLeft
  currentSlide.value = Math.round(scrollLeft / slideStep.value)
}

// 自動輪播
let autoplayTimer = null
const startAutoplay = () => {
  autoplayTimer = setInterval(() => {
    console.log(props.items.length);
    
    const totalSlides = Math.ceil(props.items.length / visibleCards.value)
    const next = (currentSlide.value + 1) % totalSlides
    goTo(next)
  }, 5000)
}
const stopAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer)
}

onMounted(() => {
  nextTick(() => {
    calculateSliderMetrics()
  })
  window.addEventListener('resize', calculateSliderMetrics)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateSliderMetrics)
})

</script>

<style scoped lang="scss">
.product-slider-scroll {
  padding-bottom: 16px;
  margin-top: -4px;

  .slider-wrapper {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    gap: 16px;
    padding: 20px 8px;
  }

  .slider-item {
    flex: 0 0 auto;
    scroll-snap-align: start;
    width: 160px;
  }

  .default-card {
    background: #fff;
    border-radius: 12px;
    padding: 12px;
    text-align: center;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);

    img {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 8px;
    }

    h3 {
      font-size: 16px;
      margin-bottom: 4px;
    }

    p {
      font-size: 14px;
      color: #999;
    }
  }

  .indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;

    >span {
      position: relative;
      display: block;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      background: $color-homeSlider-arrow;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s;
      transition: all 0.3s;

      >span {
        position: absolute;
        display: block;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: $color-dark;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s;

      }
      
      &.active {
        transform: scale(1.1);

        >span {
          background-color: $color-primary;
        }
      }
    }
  }
}
</style>
