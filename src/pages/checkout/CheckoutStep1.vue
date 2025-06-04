<template>
  <div class="checkout-step1">
      <!-- 購物車 -->
      <FrameContainer>
        <template #header>
          購物車 ({{ cartItems.length }} 件)
        </template>
        <CartItemRow
        v-for="item in cartItems"
        :key="item.id"
        :item="item"
        :editable="true"
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
      <template #header>加購專區(選擇一項您喜歡的商品吧)</template>
      <div class="add-ons-wrapper">
        <div class="hidden-control">
          <AddOnCard
            v-for="item in addOnItems"
            :key="item.id"
            :item="item"                              
            :image="item.image"
            :title="item.name"
            :originalPrice="item.price"
            :discountedPrice="item.price - 5"
            :locked="false"
            @select="addOneAddOn"
          />
        </div>
      </div>
    </FrameContainer>

    <FrameContainer>
      <template #header>選擇送貨及付款方式</template>
      <form action="#" class="form-container">

        <!-- 運送地點 -->
        <FormSelect
          v-model="form.region"
          :options="regionOptions"
          label="運送地點"
          defaultLabel="請選擇運送地點"
        />

        <!-- 送貨方式 -->
        <FormSelect
          v-model="form.shipping"
          :options="shippingOptions"
          label="送貨方式"
          defaultLabel="請選擇送貨方式"
          :fig="'貼心提醒♡若使用超商地址為收件地址，需額外收取 40 元手續費。'"
        />

        <!-- 付款方式 -->
        <FormSelect
          v-model="form.payment"
          :options="paymentOptions"
          label="付款方式"
          defaultLabel="請選擇付款方式"
          :fig="'【首購獨享】新註冊會員送$100購物金，加入LINE官方好友送$300'"
        />
      </form>
    </FrameContainer>

    <OrderSummary
      :subtotal="subtotal"
      :shipping-fee-text="shippingFeeText"
      :total-discount="totalDiscount"
      :total="total"
      :can-proceed="canProceed"
      :region="form.region"
      :shipping="form.shipping"
      :payment="form.payment"
      @proceed="goToStep2"
  />


  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import FormSelect from '@/components/FormSelect.vue'
import OrderSummary from '@/components/OrderSummary.vue'
import FrameContainer from '@/components/FrameContainer.vue'
import CartItemRow from '@/components/CartItemRow.vue'
import AddOnCard from '@/components/AddOnCard.vue'
import { useRouter } from 'vue-router'


// 活動判定 
import { usePromotionStore } from '@/stores/promotionStore'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { useCheckoutStore } from '@/stores/checkoutStore'

const router        = useRouter()
const cartStore     = useCartStore()
const checkoutStore = useCheckoutStore()
const promoStore = usePromotionStore()
const promos = computed(() => promoStore.promoDiscounts)

// 總折抵
const totalDiscount = computed(() => promoStore.totalPromoDiscount)



// 初始化資料
onMounted(() => {
  checkoutStore.initStep1({
    items:        cartStore.items,
    addOnItems:   addOnItems.value,      // 如果有加购
    region:       form.region,
    shippingMethod: form.shipping,
    paymentMethod:  form.payment
  })
})

// 購物車
const cartItems = computed(() => checkoutStore.items)
// 商品總額
const subtotal = computed(() =>
  checkoutStore.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
)


// 加購專區

const productStore = useProductStore()
const addOnItems = ref([])

 onMounted(async () => {
   // 先保证 load 了 products
   if (!productStore.products.length && productStore.fetchProducts) {
     await productStore.fetchProducts()
   }
  // 2) 只执行一次——拿初始随机并排除购物车已有，然后写入 ref
  addOnItems.value = productStore.randomAddOns.filter(
    p => !checkoutStore.items.some(i => i.id === p.id)
  )
})

function addOneAddOn(item) {
  checkoutStore.addAddOn(item)
}

// 表單選項
const regionOptions = [
  { label: '台灣', value: '台灣' },
  { label: '香港', value: '香港' },
  { label: '澳門', value: '澳門' }
]

const shippingOptions = [
  { label: '新竹物流', value: '新竹物流' },
  { label: '全家超商', value: '全家超商' },
  { label: '宅配到府', value: '宅配到府' }
]

const paymentOptions = [
  { label: 'Line Pay', value: 'Line Pay' },
  { label: '信用卡', value: '信用卡' },
  { label: '貨到付款', value: '貨到付款' }
]

// 2. 用 reactive 建立 form model，並指定預設值
const form = reactive({
  region:   "",
  shipping: "",
  payment:  ""
})


const canProceed = computed(() => {
  return Boolean(form.region) 
      && Boolean(form.shipping) 
      && Boolean(form.payment)
})

const shippingFee = computed(() => {
  if (form.shipping === '全家超商') return 40
  return subtotal.value >= 520 ? 0 : 60
})
const shippingFeeText = computed(() => shippingFee.value === 0 ? '免運' : `NT$ ${shippingFee.value}`)

const discountTotal = computed(() => 10) // 提示寫死或視優惠邏輯而定
const total = computed(() => subtotal.value + shippingFee.value - discountTotal.value)

function removeItem(id) {
  checkoutStore.removeItem(id)
}

// 新增 updateQuantity（或你模板里叫 @updateQty 的名字）
function updateQuantity({ id, delta, quantity }) {
  const found = checkoutStore.items.find(i => i.id === id)
  if (!found) return

  // 用 delta 來調整
  const newQty = quantity !== undefined
    ? quantity
    : Math.max(1, found.quantity + delta)

  checkoutStore.updateQuantity({ id, quantity: newQty })
}

// 4. 蒐集資料及畫面跳轉
function goToStep2() {

  // 地址 付款方式 寫入checkoutStore
  checkoutStore.initStep1({
    items:      cartStore.items,
    addOnItems: [],           // 或者之前选好的加购
    region:     form.region,
    shippingMethod: form.shipping,
    paymentMethod:  form.payment
  })


  // 跳轉到第二步驟
  router.push({ name: 'CheckoutStep2' })
}
</script>

<style scoped lang="scss">
.discounts {
  color: #000;
  padding-top: 16px;

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

  .hidden-control {
    overflow-x: auto;
    display: flex;
    gap: 16px;

    
    /* 隱藏原生滾動條（可選） */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
