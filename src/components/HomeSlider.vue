<template>
  <div class="home-slider">
    <div
      class="slide"
      v-for="(slide, index) in slides"
      :key="index"
      :class="{ active: index === slider.currentSlide }"
    >
      <img :src="slide.image" :alt="slide.alt" />
      <div class="slide-content">
        <div class="txt">
          <h2>{{ slide.title }}</h2>
        </div>
        <button class="cta-btn">{{ slide.ctaText }}</button>
      </div>
    </div>

    <!-- Indicator -->
    <SlideIndicators
      :count="slides.length"
      :current="slider.currentSlide"
      @update="goToSlide"
    />

    <!-- 左箭頭 -->
    <div class="nav-arrow left" @click="prevSlide">
      <font-awesome-icon icon="fa-solid fa-caret-left" />
    </div>
    
    <!-- 右箭頭 -->
    <div class="nav-arrow right" @click="nextSlide">
      <font-awesome-icon icon="fa-solid fa-caret-right" />
    </div>
  </div>
</template>

<script setup>
import { useSliderStore } from '@/stores/sliderStore'
import { onMounted, onUnmounted } from 'vue'

import SlideIndicators from '@/components/SlideIndicators.vue'

const slider = useSliderStore()
const slides = [
  {
    id: 1,
    image: '/images/slide1.png',
    title: '送給彼此',
    ctaText: '立即選購',
    link: '/product/couple',
  },
  {
    id: 2,
    image: '/images/slide2.png',
    title: '限時優惠',
    ctaText: '查看優惠',
    link: '/product',
  },
  {
    id: 3,
    image: '/images/slide3.png',
    title: '新品登場',
    ctaText: '搶先看',
    link: '/product',
  },
  {
    id: 4,
    image: '/images/slide4.png',
    title: '溫柔相伴',
    ctaText: '馬上逛',
    link: '/product/healing',
  },
  {
    id: 5,
    image: '/images/slide5.png',
    title: '萌怪來襲',
    ctaText: '收服牠',
    link: '/product',
  },
]

let timer = null

const nextSlide = () => {
  slider.nextSlide(slides.length)
}

const prevSlide = () => {
  slider.prevSlide(slides.length)
}

const goToSlide = (index) => {
  slider.goToSlide(index)
}


onMounted(() => {
  timer = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
@use "sass:color";

.home-slider {
  position: relative;
  width: 100%;
  height: 375px;
  overflow: hidden;

  @include respond-lg {
    height: 100vh;
  }

  .slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 0;

    &.active {
      opacity: 1;
      z-index: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .slide-content {
      position: absolute;
      right: 24px;
      bottom: 24px;
      padding: 16px;
      color: $color-light-text;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      
      .txt {
        background: rgba($color: #000000, $alpha: 0.33);
        padding: 1rem;

        h2 {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 4px;
        }
  
        p {
          font-size: 14px;
          margin-bottom: 8px;
        }
      }

      .cta-btn {
        margin-top: auto; // push 到最底
        background-color: $color-primary;
        color: #fff;
        border: none;
        padding: 11px 8px;
        border-radius: 12px;
        font-size: 14px;
        cursor: pointer;
        transform: translate(50%, -50%);
        transition: background-color 0.3s;

        &:hover {
          background-color: color.adjust($color-primary, $lightness: -10%);
        }
      }
    }
  }

  .indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 10;

    >span {
      position: relative;
      display: block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: $color-homeSlider-arrow;
      // opacity: 0.4;
      cursor: pointer;

      >span {
        position: absolute;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: $color-dark;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;

        &.active {
          opacity: 0;
        }
      }

    }
  }

  .nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    font-size: 100px;
    color: rgba($color: $color-light-text, $alpha: 0.8);

    &.left {
      left: 20px;
    }

    &.right {
      right: 20px;
    }
  }
}
</style>
