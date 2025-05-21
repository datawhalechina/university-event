<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="app-container">
    <!-- 标题栏 -->
    <header class="header">
      <div class="logo-section">
        <img alt="Logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
        <span class="logo-text">DW Prize</span>
      </div>
      
      <nav class="main-nav" v-if="userStore.isLoggedIn">
        <RouterLink to="/" class="nav-item">首页</RouterLink>
        <a href="#" class="nav-item">AI推荐</a>
        <a href="#" class="nav-item">AI测评</a>
        <a href="#" class="nav-item">榜单</a>
        <a href="#" class="nav-item">资讯</a>
        <a href="#" class="nav-item">COMPETITION</a>
        <a href="#" class="nav-item">认证</a>
        <a href="#" class="nav-item">资源</a>
      </nav>
      
      <div class="user-section">
        <nav v-if="!userStore.isLoggedIn">
          <RouterLink to="/login" class="login-btn">登录</RouterLink>
          <RouterLink to="/register" class="register-btn">注册</RouterLink>
        </nav>
        
        <div v-else class="user-info">
          <span>{{ userStore.user.name || userStore.user.email }}</span>
          <a href="#" @click.prevent="logout" class="logout-link">退出</a>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 10px;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1976d2;
}

.main-nav {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 5px 0;
  position: relative;
}

.nav-item:hover, .nav-item.router-link-active {
  color: #1976d2;
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1976d2;
}

.user-section {
  display: flex;
  align-items: center;
}

.login-btn, .register-btn {
  padding: 6px 15px;
  border-radius: 4px;
  text-decoration: none;
  margin-left: 10px;
  font-size: 0.9rem;
}

.login-btn {
  color: #1976d2;
  border: 1px solid #1976d2;
}

.register-btn {
  background-color: #1976d2;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-link {
  color: #e53935;
  text-decoration: none;
  font-size: 0.9rem;
}

.main-content {
  flex: 1;
  padding: 20px;
}

@media (max-width: 768px) {
  .main-nav {
    display: none;
  }
  
  .header {
    padding: 0 10px;
  }
}
</style>
