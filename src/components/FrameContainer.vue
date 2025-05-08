<template>
  <div class="frame-container">
    <div class="frame-header">
      <slot name="header" />
    </div>
    <div class="frame-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
// 通用外框容器，无需额外脚本逻辑
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as vars; // 假设你在变量文件里定义了 color-secondary, color-border

.frame-container {
  border: 0.5px solid $color-border;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  background: #fff;
}

.frame-header {
  background: $color-secondary;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: bold;
  height: 48px;
}


</style>
