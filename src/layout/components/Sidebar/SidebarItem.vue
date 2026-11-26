
<template>
  <div v-if="!item.meta?.hidden">
    <!-- 有子菜单且只有一个子菜单时，直接显示子菜单（可选优化） -->
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <el-icon v-if="onlyOneChild.meta?.icon">
          <component :is="onlyOneChild.meta.icon" />
        </el-icon>
        <template #title>{{ onlyOneChild.meta?.title }}</template>
      </el-menu-item>
    </template>

    <!-- 有多个子菜单 -->
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import path from 'path-browserify' // 需 npm install path-browserify @types/path-browserify

const props = defineProps<{
  item: any
  basePath: string
}>()

const onlyOneChild = ref<any>(null)

const hasOneShowingChild = (children: any[] = [], parent: any) => {
  const showingChildren = children.filter((item) => !item.meta?.hidden)
  if (showingChildren.length === 1) {
    onlyOneChild.value = showingChildren[0]
    return true
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}

const resolvePath = (routePath: string) => {
  return path.resolve(props.basePath, routePath)
}
</script>
