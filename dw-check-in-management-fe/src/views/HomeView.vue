<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="home-container">
    <div class="welcome-section">
      <h1>欢迎使用 DW Prize 系统</h1>
      <p>您已成功登录，{{ userStore.user.name || userStore.user.email }}！</p>
    </div>
    
    <div class="content-section">
      <div class="card">
        <h2>系统公告</h2>
        <p>这里是系统公告内容，可以显示重要信息和更新。</p>
      </div>
      
      <div class="card">
        <h2>快速操作</h2>
        <div class="quick-actions">
          <button class="action-button">查看奖品</button>
          <button class="action-button">个人中心</button>
          <button class="action-button">帮助中心</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  border-left: 4px solid #1976d2;
}

.welcome-section h1 {
  color: #1976d2;
  margin-bottom: 10px;
}

.content-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.card h2 {
  color: #1976d2;
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.action-button {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #1565c0;
}

@media (max-width: 768px) {
  .content-section {
    grid-template-columns: 1fr;
  }
}
</style>