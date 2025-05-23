<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

<template>
  <nav class="main-menu" v-if="userStore.isLoggedIn">
    <RouterLink to="/" class="menu-item">首页</RouterLink>
    <RouterLink to="/create-event" class="menu-item">举办活动</RouterLink>
  </nav>
</template>

<style scoped>
.main-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 10px 20px;
  position: relative;
  transition: background-color 0.2s;
}

.menu-item:hover,
.menu-item.router-link-active {
  color: #1976d2;
  background-color: #e0e0e0;
}

.menu-item.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #1976d2;
}

@media (max-width: 768px) {
  .menu-item {
    padding: 10px;
    text-align: center;
  }

  .menu-item span {
    display: none;
  }
}
</style>
