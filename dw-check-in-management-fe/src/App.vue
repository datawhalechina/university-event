<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  overflow-x: hidden; /* 防止水平滚动 */
}

* {
  box-sizing: border-box; /* 确保所有元素的盒模型一致 */
}
</style>
