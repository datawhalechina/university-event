<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeIndex = ref(route.path)
</script>

<template>
  <el-aside width="220px" class="sidebar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      router
      :collapse="false"
    >
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-menu-item index="/create-event">
        <el-icon><Calendar /></el-icon>
        <template #title>举办活动</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.sidebar {
  height: calc(100vh - 60px);
  background-color: var(--el-bg-color);
  border-right: 1px solid var(--el-border-color-light);
}

.el-menu-vertical {
  height: 100%;
  border-right: none;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
}
</style>