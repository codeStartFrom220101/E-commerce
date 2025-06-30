<template>
  <Swiper
    :modules="[Navigation, Pagination, Autoplay]"
    :loop="true"
    :autoplay="{ delay: 5000 }"
    :pagination="{ clickable: true }"
    navigation
    class="mySwiper"
  >
    <SwiperSlide v-for="(slide, index) in slides" :key="index">
      <img :src="slide.image" :alt="slide.alt" />
      <div class="slide-content">
        <div class="txt">
          <h2>{{ slide.title }}</h2>
        </div>
        <RouterLink class="cta-btn" :to="slide.link">{{ slide.ctaText }}</RouterLink>
      </div>
    </SwiperSlide>
  </Swiper>

  <!-- 如果想保留自訂箭頭或指示器也可以覆寫 -->
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slides = [
  {
    id: 1,
    image: '/E-commerce/images/unsplash/1.jpg',
    title: '帥氣星際小物',
    ctaText: '立即選購',
    link: '/product/couple',
  },
  {
    id: 2,
    image: '/E-commerce/images/unsplash/2.jpg',
    title: '各式療育娃娃',
    ctaText: '查看優惠',
    link: '/product',
  },
  {
    id: 3,
    image: '/E-commerce/images/unsplash/3.jpg',
    title: '新品登場',
    ctaText: '搶先看',
    link: '/product',
  },
  {
    id: 4,
    image: '/E-commerce/images/unsplash/4.jpg',
    title: '溫柔相伴',
    ctaText: '馬上逛',
    link: '/product/healing',
  },
  {
    id: 5,
    image: '/E-commerce/images/unsplash/5.jpg',
    title: '萌怪來襲',
    ctaText: '收服牠',
    link: '/product',
  },
]

</script>

<style scoped lang="scss">
@use "sass:color";

.mySwiper {
  width: 100%;
  height: 100%; // ✅ 吃父層高度 .homeSlider
}

.swiper-slide {
  position: relative;

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
    }

    .cta-btn {
      margin-top: auto;
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

</style>
