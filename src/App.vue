<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import router from '@/router'

const isCollapsed = ref(false)

const open = (route) => {
  router.push(route)
}
</script>

<template>
  <el-container>
    <el-aside :class="{ collapsed: isCollapsed }" width="200px">
      <el-menu router :collapse="isCollapsed" ref="mainMenu">
        <el-menu-item @click="isCollapsed = !isCollapsed" class="right">
          <el-icon><Plus v-if="isCollapsed" /><Close v-if="!isCollapsed" /></el-icon>
        </el-menu-item>
        <hr />
        <el-menu-item index="/" route="/" tabindex="0" @keyup.space="open('/')">
          <el-icon><HomeFilled /></el-icon>
          <span>Inicio</span>
        </el-menu-item>
        <hr />
        <el-menu-item index="/cursos" route="/cursos" tabindex="0" @keyup.space="open('/cursos')">
          <el-icon><Menu /></el-icon>
          <span>Cursos</span>
        </el-menu-item>
        <hr />
        <el-menu-item
          index="/alumnos"
          route="/alumnos"
          tabindex="0"
          @keyup.space="open('/alumnos')"
        >
          <el-icon><OfficeBuilding /></el-icon>
          <span>Alumnos</span>
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
  font-size: var(--sm);
  height: unset;
  left: 0;
  padding: 0.5rem 0;
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
  color: var(--white);
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
.el-menu-item.is-active,
.el-menu-item:focus {
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
.collapsed .right {
  justify-content: center;
}
.right {
  display: flex;
  justify-content: right;
  width: 100%;
}
</style>
