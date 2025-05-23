<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="home-container">
    <!-- 首页内容 -->
    <h1>欢迎使用 DW Prize 系统</h1>
    <div class="content-card">
      <!-- 内容卡片 -->
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 100%;
}

.content-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
