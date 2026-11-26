
<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical"
    background-color="#304156"
    text-color="#bfcbd9"
    active-text-color="#409EFF"
    router
  >
    <sidebar-item
      v-for="route in permissionRoutes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    />
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePermissionStore } from '@/stores/permission'
import SidebarItem from './SidebarItem.vue'

const route = useRoute()
const permissionStore = usePermissionStore()

const activeMenu = computed(() => route.path)
const permissionRoutes = computed(() => permissionStore.routes)
</script>

<style scoped>
.el-menu-vertical {
  border-right: none;
}
</style>
