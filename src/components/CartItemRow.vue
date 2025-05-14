<template>
  <div class="cart-item-row">
    <!-- 商品縮圖，跨兩行顯示 -->
    <div class="section1">
      <img
        class="thumbnail"
        :src="item.image"
        :alt="item.name"
      />
  
      <!-- 商品名稱與規格 -->
      <div class="title">
        {{ item.name }}
        <span class="variant">| {{ item.variant }}</span>
      </div>
  
      <!-- 刪除按鈕 -->
       <div class="mobile-block">
         <button
           class="remove-btn"
           @click="$emit('remove', item.id)"
           aria-label="移除商品"
         >
          <font-awesome-icon :icon="['fas', 'xmark']" />
         </button>
     
         <!-- 單價  -->
         <div class="unit-price">
           NT$ {{ item.price }}
         </div>
       </div>
    </div>

    <div class="section2">
      <!-- 數量控制  -->
      <div class="quantity-control">
        <button
          @click="$emit('updateQty', { id: item.id, delta: -1 })"
          :disabled="item.quantity <= 1"
          aria-label="減少數量"
        >
          <font-awesome-icon :icon="['fa', 'minus']" />
        </button>
        <input
          type="number"
          v-model.number="localQty"
          min="1"
          @change="onQtyChange"
          aria-label="商品數量"
        />
        <button
          @click="$emit('updateQty', { id: item.id, delta: 1 })"
          aria-label="增加數量"
        >
          <font-awesome-icon :icon="['fa', 'plus']" />
        </button>
      </div>
  
      <!-- 小計  -->
      <div class="line-total">
        NT$ {{ item.quantity * item.price }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['remove', 'updateQty'])

// 本地管理 input 綁定，props 變更時也同步回來
const localQty = ref(props.item.quantity)
watch(
  () => props.item.quantity,
  (q) => { localQty.value = q }
)
function onQtyChange() {
  // 若使用者直接輸入數量，發出更新事件
  emit('updateQty', { id: props.item.id, quantity: localQty.value })
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as vars; // 定義了 $color-border, $color-secondary, $color-text

.cart-item-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  border-bottom: 0.5px solid vars.$color-border;
  padding: 16px;
  font-size: 10px;

  .section1 {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 16px;

    .thumbnail {
      flex: 0 1 auto;
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
    }
  
  
    .title {
      color: vars.$color-text;
      flex-grow: 1;

      .variant {
        margin-left: 8px;
        color: vars.$color-secondary;
      }
    }
  
    .mobile-block {
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: end;

      .remove-btn {
        background: none;
        border: none;
        font-size: 12px;
        font-weight: bold;
        color: $color-text;
        cursor: pointer;
      }
    
      .unit-price {
        font-size: 10px;
        font-weight: bold;
      }
    }
  }

  .section2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .quantity-control {
      display: flex;
      align-items: center;

      button {
        width: 24px;
        height: 24px;
        border: 1px solid $color-border;
        background: none;
        cursor: pointer;
        font-size: 12px;

        &:nth-of-type(1) {
          border-radius: 3px 0 0 3px;
        }

        &:nth-of-type(2) {
          border-radius: 0 3px 3px 0;
        }
      }

      input {
        width: 120px;
        height: 24px;
        text-align: center;
        border: none;
        border-top: 1px solid $color-border;
        border-bottom: 1px solid $color-border;
        font-size: 10px;
      }
    }
  
    .line-total {
      font-size: 10px;
      font-weight: bold;
    }
  }


}
</style>
