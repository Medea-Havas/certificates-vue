<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const isCollapsed = ref(false)
</script>

<template>
  <el-container>
    <el-aside :class="{ collapsed: isCollapsed }" width="200px">
      <el-menu router :collapse="isCollapsed">
        <el-menu-item @click="isCollapsed = !isCollapsed" class="right">
          <el-icon><Plus v-if="isCollapsed" /><Close v-if="!isCollapsed" /></el-icon>
        </el-menu-item>
        <hr />
        <el-menu-item index="/" route="/">
          <el-icon><HomeFilled /></el-icon>
          <span>Inicio</span>
        </el-menu-item>
        <hr />
        <el-menu-item index="/cursos" route="/cursos">
          <el-icon><Menu /></el-icon>
          <span>Cursos</span>
        </el-menu-item>
        <hr />
        <el-menu-item index="/estudiantes" route="/estudiantes">
          <el-icon><OfficeBuilding /></el-icon>
          <span>Estudiantes</span>
        </el-menu-item>
        <hr />
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h1>Certificados Medea</h1>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>© {{ new Date().getFullYear() }} Medea, Medical Education Agency S.L.</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
h1 {
  line-height: 1;
  font-size: 19px;
}
.el-aside {
  position: relative;
  overflow: hidden;
  width: unset;
  z-index: 2;
}
.el-aside.collapsed ul {
  align-items: center;
  display: flex;
  flex-direction: column;
}
.el-footer {
  background: #f8cacc;
  bottom: 0;
  font-size: 0.8333rem;
  height: unset;
  left: 0;
  padding: 1rem 2rem;
  position: fixed;
  text-align: center;
  width: 100%;
  z-index: 2;
}
.el-header {
  align-items: center;
  background: var(--steelbluelowlight);
  box-shadow: 0px 2px 4px -1px var(--steelbluelowlight);
  display: flex;
  justify-content: space-between;
  color: white;
  height: 65px;
}
.el-main {
  padding: 2rem 2rem 6rem;
}
.el-menu {
  background: var(--lightgray);
  border-right: 1px solid var(--gray);
  height: 100vh;
}
.el-menu hr {
  border: 0.1rem solid var(--gray);
}
.el-menu-item {
  font-size: 20px;
  padding: 2rem;
}
.el-menu-item i {
  margin-right: 0.5rem;
}
.el-menu-item:hover,
.el-menu-item.is-active {
  background: var(--steelbluelowlight);
  color: white;
  box-shadow: 0px 2px 4px -1px var(--steelbluelowlight);
}
.el-menu-item.right {
  fill-opacity: 0.6;
}
.el-menu-item.right:hover {
  background: transparent;
  box-shadow: none;
  color: var(--steelbluelowlight);
  fill-opacity: 1;
}
.right {
  display: flex;
  justify-content: right;
}
</style>
