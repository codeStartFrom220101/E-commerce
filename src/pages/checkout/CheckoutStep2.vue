<!-- src/pages/checkout/CheckoutStep2.vue -->
<template>
  <div class="checkout-step2">

    <!-- 2. 訂單資訊小結（可選） -->
    <OrderSummary />

    <!-- 3. 顧客資料 -->
    <FrameContainer>
      <template #header>顧客資料</template>
      <FormInput
        v-model="form.customerName"
        label="姓名"
        placeholder="請輸入姓名"
      />
      <FormInput
        v-model="form.email"
        label="電子信箱"
        placeholder="abc@cdefg.com.tw"
        type="email"
      />
      <FormInput
        v-model="form.phone"
        label="電話號碼"
        placeholder="0912345678"
        type="tel"
      />
      <FormSelect
        v-model="form.gender"
        label="性別"
        :options="genderOptions"
        defaultLabel="請選擇性別"
      />
      <div class="birthdate">
        <h6 class="birth-title">
          生日日期
        </h6>
        <FormSelect
          v-model="form.birthYear"
          :options="yearOptions"
          defaultLabel="年"
        />
        <FormSelect
          v-model="form.birthMonth"
          :options="monthOptions"
          defaultLabel="月"
        />
        <FormSelect
          v-model="form.birthDay"
          :options="dayOptions"
          defaultLabel="日"
        />
      </div>
    </FrameContainer>

    <!-- 4. 送貨資料 -->
    <FrameContainer>
      <template #header>
        送貨資料 <span class="fee">運費：{{ shippingFeeText }}</span>
      </template>
      <div class="shipping-methods">
        已選用物流方式:新竹物流
      </div>
      <label class="checkbox">
        <input type="checkbox" name="" id="same-person">
        與顧客資料相同
      </label>
      <FormInput
        v-model="form.recipientName"
        label="收件人姓名"
        placeholder="請輸入收件人姓名"
      />
      <FormInput
        v-model="form.recipientPhone"
        label="收件人電話"
        placeholder="0912345678"
        type="tel"
      />
      <div class="address-select">
        <FormSelect
          v-model="form.region"
          :options="regionOptions"
          defaultLabel="縣市"
        />
        <FormSelect
          v-model="form.city"
          :options="cityOptions"
          defaultLabel="鄉鎮"
        />
        <FormSelect
          v-model="form.district"
          :options="districtOptions"
          defaultLabel="村里"
        />
      </div>
      <FormInput
        v-model="form.address"
        label="地址"
        placeholder="請輸入地址"
      />
      <label class="checkbox">
        <input type="checkbox" v-model="form.saveAddress" />
        儲存為預設收貨地址
      </label>
    </FrameContainer>

    <!-- 5. 付款資料 -->
    <FrameContainer>
      <template #header>
        付款資料 <span class="total">合計：NT$ {{ total }}</span>
      </template>
      <FormSelect
        v-model="form.paymentMethod"
        label="付款方式"
        :options="paymentOptions"
        defaultLabel="請選擇付款方式"
      />
      <!-- 這裡可放支付圖示 -->
      <div class="payment-placeholder">
        <!-- ex. Line Pay、信用卡等圖示 -->
      </div>
    </FrameContainer>

    <!-- 6. 發票資訊 -->
    <FrameContainer>
      <template #header>發票資訊</template>
      <FormSelect
        v-model="form.invoiceType"
        label="發票類型"
        :options="invoiceTypeOptions"
        defaultLabel="請選擇發票類型"
      />
      <FormSelect
        v-model="form.invoiceMethod"
        label="載具類別"
        :options="invoiceMethodOptions"
        defaultLabel="請選擇載具"
      />
    </FrameContainer>

    <!-- 7. 訂單備註 -->
    <FrameContainer>
      <template #header>訂單備註</template>
      <textarea
        v-model="form.orderNote"
        placeholder="想對賣家說的話……"
      ></textarea>
    </FrameContainer>

    <!-- 8. 同意條款 & 完成訂單 -->
    <FrameContainer>
      <template #header>&nbsp;</template>
      <label class="checkbox">
        <input type="checkbox" v-model="form.agreeTerms" />
        我同意相關
        <a href="#">服務條款</a>
        及
        <a href="#">隱私政策</a>
      </label>
      <button
        class="complete-btn"
        :disabled="!form.agreeTerms"
        @click="submitOrder"
      >
        完成訂單
      </button>
    </FrameContainer>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import FrameContainer from '@/components/FrameContainer.vue'
import FormInput from '@/components/FormInput.vue'
import FormSelect from '@/components/FormSelect.vue'
import OrderSummary from '@/components/OrderSummary.vue'
import { useCheckoutStore }  from '@/stores/checkoutStore'

const store = useCheckoutStore()

// 金額計算
const shippingFeeText = computed(() => store.shippingFeeText)
const total            = computed(() => store.total)

// 表單資料 & 選項
const form = reactive({
  customerName:    '',
  email:           '',
  phone:           '',
  gender:          '',
  birthYear:       '',
  birthMonth:      '',
  birthDay:        '',
  shippingMethod:  '',
  recipientName:   '',
  recipientPhone:  '',
  region:          '',
  city:            '',
  district:        '',
  address:         '',
  saveAddress:     false,
  paymentMethod:   '',
  invoiceType:     '',
  invoiceMethod:   '',
  orderNote:       '',
  agreeTerms:      false
})

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
  { label: '不透漏', value: 'other' }
]

// 假資料：可依真實需求換成 API
const yearOptions      = Array.from({ length: 100 }, (_, i) => ({ label: `${1950 + i}`, value: 1950 + i }))
const monthOptions     = Array.from({ length: 12 }, (_, i) => ({ label: `${i+1}`, value: i+1 }))
const dayOptions       = Array.from({ length: 31 }, (_, i) => ({ label: `${i+1}`, value: i+1 }))
const regionOptions    = [{ label: '台灣', value: 'TW' }, { label: '香港', value: 'HK' }]
const cityOptions      = [{ label: '新竹市', value: 'Hsinchu' }, { label: '台北市', value: 'Taipei' }]
const districtOptions  = [{ label: '東區', value: 'east' }, { label: '西區', value: 'west' }]

const paymentOptions = [
  { label: 'Line Pay', value: 'linepay' },
  { label: '信用卡', value: 'creditcard' },
  { label: '貨到付款', value: 'cod' }
]

const invoiceTypeOptions = [
  { label: '二聯式發票', value: 'paper2' },
  { label: '三聯式發票', value: 'paper3' }
]
const invoiceMethodOptions = [
  { label: '會員載具', value: 'member' },
  { label: '手機條碼', value: 'mobile' }
]

function submitOrder() {
  if (!form.agreeTerms) return
  // 送後端或 router.push({ name: 'CheckoutStep3' })
  console.log('訂單送出', form)
}
</script>

<style scoped lang="scss">
@use "sass:color";
.checkout-step2 {
  display: grid;
  gap: 16px;
  padding-bottom: 32px;
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
  display: flex;
  gap: 8px;
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
  padding: 12px;
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
