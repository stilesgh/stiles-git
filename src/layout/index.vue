
<template>
  <el-container class="app-wrapper">
    <!-- 侧边栏 -->
    <el-aside width="210px" class="sidebar-container">
      <Sidebar />
    </el-aside>

    <el-container>
      <!-- 顶部导航 -->
      <el-header height="50px" class="navbar">
        <Navbar />
      </el-header>

      <!-- 主内容区 -->
      <el-main class="main-content">
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar/index.vue'
import AppMain from './components/AppMain/index.vue'
</script>

<style scoped>
.app-wrapper {
  height: 100vh;
}
.sidebar-container {
  background-color: #304156;
  transition: width 0.28s;
}
.navbar {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main-content {
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}
</style>
