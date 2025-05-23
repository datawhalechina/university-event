<script setup>
import MainHeader from './MainHeader.vue'
import SideBar from './SideBar.vue'
</script>

<template>
  <div class="layout-container">
    <MainHeader />
    <div class="content-wrapper">
      <SideBar />
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  flex: 1;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 220px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 60px;
  }
}
</style>