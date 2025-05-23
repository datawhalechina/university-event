<script setup>
import { useUserStore } from '../../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="header">
    <div class="logo-section">
      <img alt="Logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
      <span class="logo-text">DW Prize</span>
    </div>
    
    <div class="user-section">
      <div class="user-info">
        <span>{{ userStore.user.name || userStore.user.email }}</span>
        <a href="#" @click.prevent="logout" class="logout-link">退出</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
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

.user-section {
  display: flex;
  align-items: center;
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
</style>