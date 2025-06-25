<template>
  <table class="cart-item-row-pc
  ">
    <thead>
      <tr>
        <th>商品資料</th>
        <th>單件價格</th>
        <th>數量</th>
        <th>小計</th>
        <th>刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.items" :key="item.id">
        <td>
          <img class="thumbnail" :src="item.image" :alt="item.name" />
          <div class="title">
            {{ item.name }}
            <span class="variant">| {{ item.variant }} {{ `${item.isAddOn ? '加購商品' : ''}` }}</span>
          </div>
        </td>
        <td>
          <div class="unit-price">NT$ {{ item.price }}</div>
        </td>
        <td>
          <div v-if="props.editable && !item.isAddOn" class="quantity-control">
            <button @click="emit('updateQty', { id: item.id, delta: -1 })" :disabled="item.quantity <= 1">
              <font-awesome-icon :icon="['fas', 'minus']" />
            </button>
            <input
              type="number"
              v-model.number="quantities[item.id]"
              min="1"
              @change="onQtyChange(item.id)"
            />
            <button @click="emit('updateQty', { id: item.id, delta: 1 })">
              <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
          </div>
          <div v-else class="quantity-static">{{ item.quantity }}</div>
        </td>
        <td>
          <div class="line-total">NT$ {{ item.quantity * item.price }}</div>
        </td>
        <td>
          
        </td>
      </tr>
    </tbody>
  </table>

  <div class="cart-item-row-mb" v-for="item in props.items" :key="item.id">
    <!-- section1 -->
    <div class="section1">
      <img class="thumbnail" :src="item.image" :alt="item.name" />
      <div class="title">
        {{ item.name }}
        <span class="variant">| {{ item.variant }} {{ `${item.isAddOn ? '加購商品' : ''}` }}</span>
      </div>
      <div class="mobile-block" :class="{ 'step2': !props.editable }">
        <button
          class="remove-btn"
          @click="emit('remove', item.id)"
          v-if="props.editable"
        >
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </button>
        <div class="unit-price">NT$ {{ item.price }}</div>
      </div>
    </div>

    <!-- section2 -->
    <div class="section2">
      <div class="quantity-container">
        <div class="quantity-fig">數量:</div>
        <div v-if="props.editable && !item.isAddOn" class="quantity-control">
          <button @click="emit('updateQty', { id: item.id, delta: -1 })" :disabled="item.quantity <= 1">
            <font-awesome-icon :icon="['fas', 'minus']" />
          </button>
          <input
            type="number"
            v-model.number="quantities[item.id]"
            min="1"
            @change="onQtyChange(item.id)"
          />
          <button @click="emit('updateQty', { id: item.id, delta: 1 })">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
        </div>
        <div v-else class="quantity-static">{{ item.quantity }}</div>
      </div>
      <div class="line-total">NT$ {{ item.quantity * item.price }}</div>
    </div>
  </div>
</template>

<script setup>



import { reactive, watchEffect } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  editable: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['remove', 'updateQty'])

// 用物件儲存每一個商品的數量
const quantities = reactive({})

// 初始化所有商品數量（有 item 才會進來）
watchEffect(() => {
  props.items.forEach(item => {
    if (item && item.id !== undefined) {
      quantities[item.id] = item.quantity
    }
  })
})

// 數量 input change handler
function onQtyChange(id) {
  return () => {
    const quantity = quantities[id]
    if (typeof quantity === 'number' && quantity >= 1) {
      emit('updateQty', { id, quantity })
    }
  }
}

</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as vars; // 定義了 $color-border, $color-secondary, $color-text

.cart-item-row-pc {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  margin-bottom: 24px;

  thead {
    background-color: #f8f8f8;

    th {
      padding: 12px 8px;
      text-align: left;
      color: vars.$color-text;
      font-weight: 600;
      border-bottom: 1px solid vars.$color-border;

      
      &:nth-of-type(4) {
        text-align: right;
      }
    }

  }

  tbody {
    tr {
      border-bottom: 1px solid vars.$color-border;

      td {
        padding: 12px 8px;
        vertical-align: middle;

        &:nth-of-type(4) {
          text-align: right;
        }
      }

      // 商品圖片 + 名稱
      td:nth-child(1) {
        display: flex;
        align-items: center;
        gap: 12px;

        .thumbnail {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 4px;
        }

        .title {
          flex-grow: 1;
          color: vars.$color-text;

          .variant {
            margin-left: 8px;
            color: vars.$color-secondary;
            font-size: 12px;
          }
        }
      }

      // 單價
      .unit-price {
        font-size: 14px;
        font-weight: bold;
      }

      // 數量控制區
      .quantity-control {
        display: flex;
        align-items: center;

        button {
          width: 28px;
          height: 28px;
          border: 1px solid vars.$color-border;
          background: none;
          cursor: pointer;
          font-size: 14px;

          &:nth-of-type(1) {
            border-radius: 4px 0 0 4px;
          }

          &:nth-of-type(2) {
            border-radius: 0 4px 4px 0;
          }
        }

        input {
          width: 48px;
          height: 28px;
          text-align: center;
          border-top: 1px solid vars.$color-border;
          border-bottom: 1px solid vars.$color-border;
          border-left: none;
          border-right: none;
          font-size: 14px;
        }
      }

      .quantity-static {
        font-size: 14px;
        font-weight: bold;
      }

      // 小計
      .line-total {
        font-size: 14px;
        font-weight: bold;
        color: vars.$color-text;
      }
    }
  }
}

.cart-item-row-mb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  border-bottom: 0.5px solid vars.$color-border;
  padding: 16px 0;
  font-size: 10px;

  &:nth-child(1) {
    padding-top: 0;
  }
  

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

      &.step2 {
        justify-content: end;
      }

      .remove-btn {
        background: none;
        border: none;
        font-size: 12px;
        font-weight: bold;
        color: vars.$color-text;
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

    .quantity-container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .quantity-fig {
        width: 100%;
      }

      .quantity-control {
        display: flex;
        align-items: center;
  
        button {
          width: 24px;
          height: 24px;
          border: 1px solid vars.$color-border;
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
          border-top: 1px solid vars.$color-border;
          border-bottom: 1px solid vars.$color-border;
          font-size: 10px;
        }
      }

      .quantity-static {
        font-size: 10px;
        font-weight: bold;
      }
    }
  
    .line-total {
      font-size: 10px;
      font-weight: bold;
    }
  }
}

.cart-item-row-pc {
  display: none;

  @include respond-md {
    display: table;
  }
}

.cart-item-row-mb {
  display: block;

  @include respond-md {
    display: none;
  }
}
</style>
