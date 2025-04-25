<template>
  <section class="special-offer">
    <div class="offer-bg">
      <h4><span>Holiday Sale</span><br>連假限定<br><span>任選$<span>99</span>起</span></h4>
      
    </div>

    <div class="product-bg">
      <div class="product-showcase">
        <div class="product" v-for="item in products" :key="item.id">
          <p class="name">{{ item.name }}</p>
          <img :src="item.image" :alt="item.name" />
          <p class="price">${{ item.price }}</p>
        </div>
      </div>
  
      <a href="#" class="more-btn">查看更多</a>
    </div>
  </section>
</template>

<script setup>
const products = [
  { id: 1, name: '藍色小車 | 經典造型', price: 125, image: 'https://picsum.photos/seed/bluecar/100/100' },
  { id: 2, name: '黃色小車 | 小時候', price: 125, image: 'https://picsum.photos/seed/yellowcar/100/100' },
  { id: 3, name: '紅色小車 | 經典造型', price: 125, image: 'https://picsum.photos/seed/redcar/100/100' },
]
</script>

<style scoped lang="scss">
.special-offer {

  .offer-bg {
    position: relative;
    background: url('/images/offer-bg.png') no-repeat center/cover;
    height: 260px;

    h4 {
      position: absolute;
      top: 40%;
      left: 60%;
      transform: translateY(-50%);
      letter-spacing: 1px;
      font-size: 20px;
      color: $color-light-text;
      
      >span {
        font-weight: 500;
  
        &:first-child {
          font-weight: normal;
          font-size: 12px;
        }

        &:last-child {
          margin-left: 25px;
        }

        >span {
          font-size: 32px;
        }
    }
    }
  }
  

  .product-bg {
    background: $color-secondary;
    display: flex;
    flex-direction: column;

    .product-showcase {
      display: flex;
      justify-content: space-evenly;
      background: #fff;
      gap: 12px;
      padding: 12px;
      border-radius: 12px;
      place-self: center;
      transform: translateY(-30%);
  
      .product {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 80px;
          
        .name {
          font-size: 8px;
          text-align: center;
          margin-bottom: 6px;
          color: $color-text;
        }
        
        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 6px;
        }
  
        .price {
          font-size: 8px;
          text-align: center;
          font-weight: bold;
          margin-top: 2px;
          color: $color-dark;
        }
      }
    }
  
    .more-btn {
      margin-top: 12px;
      background: transparent;
      border: none;
      color: $color-light-text;
      font-weight: bold;
      font-size: 14px;
      text-decoration: underline;
      cursor: pointer;
      align-self: flex-end;
      margin: 12px 16px;
    }
  }
}
</style>
