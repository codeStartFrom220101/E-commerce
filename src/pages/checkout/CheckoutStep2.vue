<template>
  <div class="checkout-step2">
    <!-- 訂單資訊小結 -->
    <div class="top-block">
      <FrameContainer>
        <template #header>訂購商品</template>
        <div v-show="toggleState">
          <CartItemRow :items="cartItems" :editable="false" />
        </div>
        <div class="sub-total" v-if="toggleState">
          <span>小計：</span><span>NT$ {{ subtotal }}</span>
        </div>
        <div class="shipping-fee" v-if="toggleState">
          <span>運費：</span><span>NT$ {{ shippingFee }}</span>
        </div>
        <div class="discount-info" v-if="toggleState && promotions.length">
          <div v-for="promo in promotions" :key="promo.id" class="promo-item">
            <span>{{ promo.name }}：</span>
            <span class="amount">-NT$ {{ promo.amount }}</span>
          </div>
        </div>
        <div class="final-total" v-if="toggleState">
          <span>折後合計：</span>
          <span class="amount">NT$ {{ subtotal + shippingFee - totalDiscount }}</span>
        </div>
        <div class="order-toggle" @click="toggleCart">
          <font-awesome-icon :icon="['fas', toggleState ? 'chevron-up' : 'chevron-down']" />
        </div>
      </FrameContainer>
    </div>

    <!-- 顧客資料與其他區塊 -->
    <div class="bottom-block">
      <FrameContainer>
        <template #header>顧客資料</template>
        <FormInput v-model="form.customerName" label="姓名" placeholder="請輸入姓名" :error="errors.customerName" />
        <FormInput v-model="form.email" label="電子信箱" placeholder="abc@cdefg.com.tw" type="email" :error="errors.email" />
        <FormInput v-model="form.phone" label="電話號碼" placeholder="0912345678" type="tel" :error="errors.phone" />
        <FormSelect
          v-model="form.gender"
          label="性別"
          :options="genderOptions"
          defaultLabel="請選擇性別"
          :error="errors.gender"
          @blur="() => null"
        />
        <div class="birthdate">
          <h6 class="birth-title">生日日期</h6>
          <FormSelect v-model="form.birthYear" :options="yearOptions" defaultLabel="年" />
          <FormSelect v-model="form.birthMonth" :options="monthOptions" defaultLabel="月" />
          <FormSelect v-model="form.birthDay" :options="dayOptions" defaultLabel="日" />
        </div>
      </FrameContainer>

      <FrameContainer>
        <template #header>
          送貨資料 <span class="fee">運費：{{ shippingFeeText }}</span>
        </template>
        <div class="shipping-methods">已選用物流方式: {{ form.shippingMethod }}</div>
        <label class="checkbox">
          <input type="checkbox" v-model="sameAsCustomer" /> 與顧客資料相同
        </label>
        <FormInput v-model="form.recipientName" label="收件人姓名" placeholder="請輸入收件人姓名" :error="errors.recipientName" @blur="handleBlur('customerName')"/>
        <FormInput v-model="form.recipientPhone" label="收件人電話" placeholder="0912345678" type="tel" :error="errors.recipientPhone" />
        <div class="address-select">
          <h6>地址</h6>
          <div class="grid-2">
            <FormSelect
              v-model="form.region"
              :options="regionOptions"
              defaultLabel="請選擇縣市"
              :error="errors.region"
            />
            <FormSelect
              v-model="form.city"
              :options="cityOptions"
              defaultLabel="請選擇鄉鎮"
              :error="errors.city"
            />
          </div>
          <FormInput v-model="form.address" placeholder="請輸入地址" :error="errors.address" />
        </div>
        <label class="checkbox">
          <input type="checkbox" v-model="form.saveAddress" /> 儲存為預設收貨地址
        </label>
      </FrameContainer>

      <FrameContainer>
        <template #header>
          付款資料 <span class="total">合計：NT$ {{ subtotal + shippingFee - totalDiscount }}</span>
        </template>
        <div class="payment-method">
          <h6>已選用付款方式: {{ form.paymentMethod }}</h6>
          <div class="payment-placeholder">
            <font-awesome-icon :icon="['far', 'credit-card']" />
          </div>
        </div>
      </FrameContainer>

      <FrameContainer>
        <template #header>索取發票</template>
        <FormSelect v-model="form.invoiceType" label="發票類型" :options="invoiceTypeOptions" defaultLabel="請選擇發票類型" />
        <div v-if="form.invoiceType === 'company'">
          <FormInput v-model="form.companyName" label="公司抬頭" placeholder="請輸入公司抬頭" />
          <FormInput v-model="form.taxId" label="統一編號" placeholder="請輸入統一編號" type="tel" />
        </div>
        <FormSelect v-if="form.invoiceType === 'eInvoice'" v-model="form.invoiceMethod" label="載具類別" :options="invoiceMethodOptions" defaultLabel="請選擇載具" />
        <FormInput v-if="form.invoiceMethod === 'certificate'" v-model="form.citizenCertificate" label="自然人憑證卡號" placeholder="請輸入憑證卡號" />
        <FormInput v-if="form.invoiceMethod === 'mobile'" v-model="form.mobileCarrier" label="手機條碼載具" placeholder="請輸入手機條碼" />
      </FrameContainer>

      <FrameContainer>
        <template #header>
          <label class="checkbox">
            <input type="checkbox" v-model="form.agreeTerms" /> 我同意相關
            <a href="#">服務條款</a> 及 <a href="#">隱私政策</a>
          </label>
        </template>
        <button class="complete-btn" :disabled="!form.agreeTerms" @click="submitOrder">
          完成訂單
        </button>
      </FrameContainer>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { usePromotionStore } from '@/stores/promotionStore'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import FrameContainer from '@/components/FrameContainer.vue'
import FormInput from '@/components/FormInput.vue'
import FormSelect from '@/components/FormSelect.vue'
import CartItemRow from '@/components/CartItemRow.vue'

const checkoutStore = useCheckoutStore()
const promoStore = usePromotionStore()

const cartItems = computed(() => checkoutStore.items)
const subtotal = computed(() => checkoutStore.subtotal)
const shippingFee = computed(() => checkoutStore.shippingFee)
const shippingFeeText = computed(() => checkoutStore.shippingFeeText)
const totalDiscount = computed(() => checkoutStore.totalDiscount)
const promotions = computed(() => promoStore.promoDiscounts)

const toggleState = ref(true)
function toggleCart() { toggleState.value = !toggleState.value }

const form = reactive({
  customerName: '', email: '', phone: '', gender: '', birthYear: '', birthMonth: '', birthDay: '',
  region: checkoutStore.region, city: checkoutStore.city, address: '', saveAddress: false,
  paymentMethod: checkoutStore.paymentMethod, invoiceType: '', invoiceMethod: '',
  companyName: '', taxId: '', citizenCertificate: '', mobileCarrier: '', agreeTerms: false,
  recipientName: '', recipientPhone: ''
})

const schema = yup.object({
  customerName: yup.string().required('請輸入姓名'),
  email: yup.string().email('格式錯誤').required('請輸入電子信箱'),
  phone: yup.string().matches(/^09\d{8}$/, '請輸入正確電話號碼').required(),
  gender: yup.string().required('請選擇性別'),
  region: yup.string().required('請選擇縣市'),
  city: yup.string().required('請選擇鄉鎮'),
  address: yup.string().required('請輸入地址'),
  recipientName: yup.string().required('請輸入收件人姓名'),
  recipientPhone: yup.string().matches(/^09\d{8}$/, '請輸入正確收件人電話'),
  agreeTerms: yup.bool().oneOf([true], '請勾選同意條款'),
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: form
})

const sameAsCustomer = ref(false)
watch(sameAsCustomer, val => {
  if (val) {
    form.recipientName = form.customerName
    form.recipientPhone = form.phone
  }
})

const invoiceTypeOptions = [
  { label: '公司戶（紙本）', value: 'company' },
  { label: '雲端發票', value: 'eInvoice' }
]
const invoiceMethodOptions = [
  { label: '自然人憑證', value: 'certificate' },
  { label: '手機載具', value: 'mobile' },
  { label: '會員載具(將會直接寄入您的電子信箱)', value: 'member' }
]

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
  { label: '不透露', value: 'other' }
]
const yearOptions = Array.from({ length: 100 }, (_, i) => ({ label: String(1950 + i), value: 1950 + i }))
const monthOptions = Array.from({ length: 12 }, (_, i) => ({ label: String(i + 1), value: i + 1 }))
const dayOptions = Array.from({ length: 31 }, (_, i) => ({ label: String(i + 1), value: i + 1 }))

const regionOptions = ref([])
const cityOptions = ref([])

async function fetchRegions() {
  const res = await axios.get('https://api.nlsc.gov.tw/other/ListCounty', { responseType: 'text' })
  const xmlDoc = new DOMParser().parseFromString(res.data, 'application/xml')
  regionOptions.value = Array.from(xmlDoc.getElementsByTagName('countyItem')).map(item => ({
    label: item.getElementsByTagName('countyname')[0].textContent.trim(),
    value: item.getElementsByTagName('countycode')[0].textContent.trim()
  }))
}

async function fetchCities(code) {
  const res = await axios.get(`https://api.nlsc.gov.tw/other/ListTown/${code}`, { responseType: 'text' })
  const xmlDoc = new DOMParser().parseFromString(res.data, 'application/xml')
  cityOptions.value = Array.from(xmlDoc.getElementsByTagName('townItem')).map(item => ({
    label: item.getElementsByTagName('townname')[0].textContent.trim(),
    value: item.getElementsByTagName('towncode')[0].textContent.trim()
  }))
}

watch(() => form.region, code => {
  if (code) fetchCities(code)
  form.city = ''
})

onMounted(fetchRegions)

const router = useRouter()
const submitOrder = handleSubmit((values) => {
  console.log(123);
  if (!values.agreeTerms) return
  
  checkoutStore.setStep2Data({ ...values })
  router.push({ name: 'CheckoutStep3' })
})
</script>


<style scoped lang="scss">
@use "sass:color";

.checkout-step2 {

  @include respond-md {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  @include respond-xl {
    justify-content: center;
  }

  .top-block {
    @include respond-md {
      width: 100%;
    }

    @include respond-xl {
      max-width: 1400px;
    }
  }

  .bottom-block {

    @include respond-md {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    @include respond-xl {
      max-width: 1400px;
    }
  }
}

.sub-total,
.shipping-fee,
.final-total {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 4px;
}

.shipping-fee {
  margin-bottom: 4px;
}

.discount-info {
  margin-top: 4px;

  .promo-item,
  .promo-total {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 4px;
  }

  .amount {
    color: #c9154a;
    font-weight: bold;
  }
}

.final-total {
  font-weight: bold;

  .amount {
    color: $color-primary;
  }
}

.order-toggle {
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 8px;
}

.birthdate {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 16px;

  .birth-title {
    grid-column: 1 / -1;
    margin-bottom: 4px;
    font-size: 14px;
    color: $color-text;
    font-weight: normal;
  } 
}

.address-select {
  display: grid;
  grid-template-columns: repeat;
  grid-auto-rows: auto;
  gap: 8px;


  h6 {
    font-size: 14px;
    font-weight: normal;
    grid-column: 1 / -1;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

}

.payment-method {


  h6 {
    font-size: 14px;
    font-weight: normal;
  }

  .payment-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 150px;
  }
}

.shipping-methods {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 14px;
}

.fee {
  float: right;
  font-size: 14px;
  color: $color-text;
}

.total {
  float: right;
  font-weight: bold;
  color: $color-text;
}

textarea {
  width: 100%;
  min-height: 100px;
  padding: 8px;
  border: 1px solid $color-border;
  border-radius: 4px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: $color-primary;
  }
}

.checkbox {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 4px;
  margin-bottom: 12px;

  input {
    margin-right: 4px;
  }

  a {
    color: $color-primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.complete-btn {
  width: 100%;
  padding: 8px;
  background: $color-primary;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: color.adjust($color-primary, $lightness: -10%);
  }
}


</style>
