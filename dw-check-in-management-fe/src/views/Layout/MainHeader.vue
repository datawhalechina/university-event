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
  <el-header class="header">
    <div class="logo-section">
      <img alt="Logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
      <span class="logo-text">DW Prize</span>
    </div>
    
    <div class="user-section">
      <el-dropdown trigger="click">
        <div class="user-info">
          <el-avatar :size="32" :icon="UserFilled" />
          <span>{{ userStore.user.name || userStore.user.email }}</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <el-icon><SwitchButton /></el-icon>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
  height: 60px;
  padding: 0 20px;
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
  color: var(--el-color-primary);
}

.user-section {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: var(--el-fill-color-light);
}
</style>