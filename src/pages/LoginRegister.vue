<template>
  <LoginBanner
    imageUrl="/images/loginBanner.png"
    :items="[
      { tag: '限時活動', text: '首次註冊即贈 $30元購物金' },
      { tag: '限時活動', text: '無須重新註冊點選忘記密碼登入完成送 $100購物金' },
      { tag: '專屬優惠', text: '端午系列商品單品項9折優惠' }
    ]"
  />
  <div class="register-page">
    <div class="tabs">
      <button :class="{ active: mode==='signup' }" @click="mode='signup'">註冊會員</button>
      <button :class="{ active: mode==='login'  }" @click="mode='login'">登入會員</button>
    </div>
    <div class="form-container">
      <form v-if="mode==='signup'" @submit.prevent="onSignup">
        <hr>
        <FormInput
          v-model="form.username"
          label="用戶名"
          placeholder="請輸入6~16字元的英數組合"
        />
        <FormInput
          v-model="form.password"
          label="密碼"
          type="password"
          placeholder="請輸入6~16字元的英數組合"
        />
        <FormInput
          v-model="form.phone"
          label="電話號碼"
          type="tel"
          placeholder="0912345678"
        />
        <FormSelect
          v-model="form.gender"
          label="性別"
          :options="genderOptions"
          defaultLabel="請選擇性別"
        />
        <div class="birthdate">
          <FormSelect v-model="form.birthYear" :options="yearOptions" defaultLabel="年" />
          <FormSelect v-model="form.birthMonth" :options="monthOptions" defaultLabel="月" />
          <FormSelect v-model="form.birthDay" :options="dayOptions" defaultLabel="日" />
        </div>
        <div class="checkboxes">
          <label><input type="checkbox" v-model="form.acceptNews" /> 我願意接收 ZOO-GOODS 的最新消息、優惠及服務推廣相關資訊</label>
          <label><input type="checkbox" v-model="form.acceptTerms" /> 我同意網站<a href="#">服務條款</a>及<a href="#">隱私政策</a></label>
        </div>
        <button class="submit-btn" :disabled="!canSignup">立即加入</button>
      </form>

      <form v-else @submit.prevent="onLogin">
        <div class="line-login-btn">
          使用Line登入
        </div>
        <hr>
        <FormInput
          v-model="login.email"
          label="電子郵件"
          type="email"
          placeholder="abc@cdefg.com.tw"
        />
        <FormInput
          v-model="login.password"
          label="密碼"
          type="password"
          placeholder="請輸入密碼"
        />
        <button class="submit-btn" :disabled="!canLogin">登入</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
// import FrameContainer from '@/components/FrameContainer.vue'
import FormInput from '@/components/FormInput.vue'
import FormSelect from '@/components/FormSelect.vue'
import LoginBanner from '@/components/LoginBanner.vue'

const mode = ref('signup')

// 註冊表單
const form = reactive({
  username: '',
  password: '',
  phone: '',
  gender: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  acceptNews: false,
  acceptTerms: false
})

// 登入表單
const login = reactive({
  email: '',
  password: ''
})

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
  { label: '不透露', value: 'other' }
]
const yearOptions = Array.from({ length: 100 }, (_,i) => ({ label: `${1950+i}`, value: 1950+i }))
const monthOptions = Array.from({ length: 12 }, (_,i) => ({ label: `${i+1}`, value: i+1 }))
const dayOptions = Array.from({ length: 31 }, (_,i) => ({ label: `${i+1}`, value: i+1 }))

const canSignup = computed(() =>
  form.username && form.password &&
  form.phone && form.gender &&
  form.birthYear && form.birthMonth && form.birthDay &&
  form.acceptTerms
)

const canLogin = computed(() => login.email && login.password)

function onSignup() {
  // TODO: 呼叫 API 註冊，然後跳轉／提示
  console.log('註冊資料', form)
}

function onLogin() {
  // TODO: 呼叫 API 登入
  console.log('登入資料', login)
}
</script>

<style scoped lang="scss">
.register-page {
  background: white;
  max-width: 400px;
  margin: 16px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .tabs {
    display: flex;
    width: 100%;

    button {
      border: none;
      flex: 1;
      padding: 24px;
      background: none;
      font-size: 16px;
      cursor: pointer;
      border-bottom: 1px solid $color-border;

      &.active {
        border: 1px solid $color-border;
        border-bottom: none;
      }
    }
  }

  .form-container {
    border: 1px solid $color-border;
    border-top: none;
    padding: 24px;
    width: 100%;
    max-width: 400px;
    
    form {
      display: flex;
      flex-direction: column;

      .line-login-btn {
        margin-bottom: 16px;
        background: #85C433;
        color: $color-light-text;
        text-align: center;
        padding: 4px 0;
        border-radius: 3px;
      }
      
      hr {
        margin-bottom: 16px;
      }

      .birthdate {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-bottom: 16px;
      }

      .checkboxes {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
        font-size: 14px;
        label {
          margin-bottom: 8px;
          input { margin-right: 8px; }
          a { color: $color-primary; text-decoration: underline; }
        }
      }

      .submit-btn {
        padding: 12px;
        background: $color-primary;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        &:disabled { opacity: 0.5; cursor: not-allowed; }
      }
    }
  }
}
</style>