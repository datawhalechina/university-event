<script setup>
import MainMenu from '../../components/MainMenu.vue'
</script>

<template>
  <aside class="sidebar">
    <MainMenu />
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #f5f5f5;
  border-right: 1px solid #e0e0e0;
  padding: 20px 0;
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  left: 0;
}

@media (max-width: 768px) {
  .sidebar {
    width: 60px;
  }
}
</style>