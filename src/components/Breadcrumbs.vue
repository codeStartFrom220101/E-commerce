<template>
  <nav class="breadcrumbs">
    <span v-for="(crumb, index) in paths" :key="index">
      <router-link v-if="crumb.link" :to="crumb.link">{{ crumb.name }}</router-link>
      <span v-else>{{ crumb.name }}</span>
      <span v-if="index < paths.length - 1"> / </span>
    </span>
  </nav>
</template>

<script setup>
defineProps({
  paths: {
    type: Array,
    required: true
  }
})
</script>

<style scoped lang="scss">
.breadcrumbs {
  background: $color-secondary;
  padding: 8px;
  font-size: 12px;
  color: #fff;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
