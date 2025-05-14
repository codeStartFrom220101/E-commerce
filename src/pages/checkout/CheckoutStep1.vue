<template>
  <div class="checkout-step1">
      <FrameContainer>
        <template #header>
          購物車 ({{ totalItems }} 件)
        </template>
        <CartItemRow
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          @remove="removeItem"
          @updateQty="updateQuantity"
        />
        <!-- 已使用優惠 -->
        <div v-if="promos.length" class="discounts">
          <p>已享用之優惠</p>
          <ul>
            <li v-for="d in promos" :key="d.id">
              <div class="tag">限時優惠</div>
              <div class="discount">
                <span>{{ d.name }}</span> <span class="amount">- NT$ {{ d.amount }}</span>
              </div>
            </li>
          </ul>
          <p>折抵總額：-NT$ {{ totalDiscount }}</p>
        </div>

      </FrameContainer>

      <FrameContainer>
        <template #header>
          加購專區
        </template>

        <!-- 水平滾動容器 -->
        <div class="add-ons-wrapper">
          <AddOnCard
            v-for="item in addOnItems"
            :key="item.id"
            :image="item.image"
            :title="item.name"
            :originalPrice="item.price"
            :discountedPrice="item.price - 5"
          />
        </div>
      </FrameContainer>

    <div class="shipping-payment">
      <h3>選擇送貨及付款方式</h3>
      <!-- <FormSelect v-model="form.region" :options="regions" label="配送地點" />
      <FormSelect v-model="form.shipping" :options="shippings" label="送貨方式" />
      <FormSelect v-model="form.payment" :options="payments" label="付款方式" /> -->
      <p class="note">*若使用超商取貨，需額外收取 40 元手續費</p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
// import SwipeList from '@/components/SwipeList.vue'
// import FormSelect from '@/components/FormSelect.vue'
// import { useRouter } from 'vue-router'
import FrameContainer from '@/components/FrameContainer.vue'
import CartItemRow from '@/components/CartItemRow.vue'
import AddOnCard from '@/components/AddOnCard.vue'

// 活動判定 
import { usePromotionStore } from '@/stores/promotionStore'
import { useProductStore } from '@/stores/productStore'

const promoStore = usePromotionStore()
const promos = computed(() => promoStore.promoDiscounts)

// 總折抵
const totalDiscount = computed(() => promoStore.totalPromoDiscount)

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
const totalItems = computed(() => cartStore.items.reduce((sum, i) => sum + i.quantity, 0))
const subtotal = computed(() => cartStore.items.reduce((sum, i) => sum + i.quantity * i.price, 0))

// 表單選項
const regions = ['台灣']
const shippings = ['新竹物流', '全家超商']
const payments = ['Line Pay', '信用卡']

// 綁定表單
const form = reactive({ region: '台灣', shipping: '新竹物流', payment: 'Line Pay' })

const shippingFee = computed(() => {
  if (form.shipping === '全家超商') return 40
  return subtotal.value >= 520 ? 0 : 60
})
const shippingFeeText = computed(() => shippingFee.value === 0 ? '免運' : `NT$ ${shippingFee.value}`)

const discountTotal = computed(() => 10) // 提示寫死或視優惠邏輯而定
const total = computed(() => subtotal.value + shippingFee.value - discountTotal.value)

function removeItem(id) {
  cartStore.removeItem(id)
}

// 新增 updateQuantity（或你模板里叫 @updateQty 的名字）
function updateQuantity({ id, delta, quantity }) {
  const found = cartStore.items.find(i => i.id === id)
  if (!found) return

  // 用 delta 來調整
  const newQty = quantity !== undefined
    ? quantity
    : Math.max(1, found.quantity + delta)

  cartStore.updateQuantity({ id, quantity: newQty })
}

// 加購專區


const productStore = useProductStore()
const addOnItems = ref([])

onMounted(async () => {
  // 如果你是从 API 拿 products，需要先 fetch
  if (!productStore.products.length && productStore.fetchProducts) {
    await productStore.fetchProducts()
  }
  // 拿排除购物车商品后的随机5件
  addOnItems.value = productStore.randomAddOns
    // 或 productStore.randomAddOns 如果是 getter
})
</script>

<style scoped lang="scss">
  .discounts {
    padding: 8px 16px;
    color: #000;

    p {
      font-size: 10px; 
      margin-bottom: 4px;
    }

    ul {

      li {
        font-size: 10px;
        margin-bottom: 4px;
        
        .tag {
          background: $color-primary;
          color: $color-light-text;
          padding: 0px 10px;
          width: 100px;
          border-radius: 16px;
          font-size: 8px;
          text-align: center;
          margin-bottom: 4px;
        }

        .discount {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .amount {
            color: #C9154A;
            font-weight: bold;
          }
        }
      }
    }

  }

  .add-ons-wrapper {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding: 16px 0;

  /* 隱藏原生滾動條（可選） */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
