<script setup>
import { onMounted, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import router from '@/router'

const route = useRoute()

onMounted(() => {
  window.addEventListener('resize', onResize)
  checkMobile()
})

const isCollapsed = ref(false)
const isMobile = ref(false)
const width = ref(window.innerWidth)

const checkMobile = () => {
  if (width.value <= 500) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
  if (width.value <= '960') {
    isCollapsed.value = true
  } else {
    isCollapsed.value = false
  }
}

const onResize = () => {
  width.value = window.innerWidth
  checkMobile()
}

const open = (route) => {
  router.push(route)
}
</script>

<template>
  <div
    v-if="
      route.path != '/informe' &&
      route.path != '/login' &&
      route.path != '/aviso-legal' &&
      route.path != '/politica-de-privacidad' &&
      route.path != '/404'
    "
    class="app"
  >
    <el-container>
      <el-aside :class="{ collapsed: isCollapsed, mobile: isMobile }" width="200px">
        <el-menu ref="mainMenu" :collapse="isCollapsed" router>
          <el-menu-item @click="isCollapsed = !isCollapsed" class="right">
            <el-icon><Plus v-if="isCollapsed" /><Close v-if="!isCollapsed" /></el-icon>
          </el-menu-item>
          <hr />
          <el-menu-item @keyup.space="open('/')" index="/" route="/" tabindex="0">
            <el-icon><HomeFilled /></el-icon>
            <span>Inicio</span>
          </el-menu-item>
          <hr />
          <el-menu-item @keyup.space="open('/cursos')" index="/cursos" route="/cursos" tabindex="0">
            <el-icon><Menu /></el-icon>
            <span>Cursos</span>
          </el-menu-item>
          <hr />
          <el-menu-item
            @keyup.space="open('/alumnos')"
            index="/alumnos"
            route="/alumnos"
            tabindex="0"
          >
            <el-icon><OfficeBuilding /></el-icon>
            <span>Alumnos</span>
          </el-menu-item>
          <hr />
        </el-menu>
      </el-aside>
      <el-container>
        <el-header :class="{ mobile: isMobile }">
          <h1>Certificados Medea</h1>
        </el-header>
        <el-main :class="{ mobile: isMobile }">
          <RouterView />
        </el-main>
        <el-footer
          >© {{ new Date().getFullYear() }} Medea, Medical Education Agency S.L.</el-footer
        >
      </el-container>
    </el-container>
  </div>
  <div v-if="route.path == '/informe'" class="report">
    <RouterView />
  </div>
  <div v-if="route.path == '/login'" class="login">
    <RouterView />
  </div>
  <div v-if="route.path == '/aviso-legal'" class="aviso-legal">
    <RouterView />
  </div>
  <div v-if="route.path == '/politica-de-privacidad'" class="politica-de-privacidad">
    <RouterView />
  </div>
  <div v-if="route.path == '/404'" class="notfound">
    <RouterView />
  </div>
</template>

<style scoped>
h1 {
  line-height: 1;
  font-size: 19px;
}
.el-menu-item:hover,
.el-menu-item.is-active,
.el-menu-item:focus {
  background: var(--steelbluelowlight);
  color: white;
  box-shadow: 0px 2px 4px -1px var(--steelbluelowlight);
}
.login,
.notfound {
  height: 100vh;
  width: 100%;
}
.collapsed .right {
  justify-content: center;
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
.el-aside.mobile {
  position: absolute;
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
  z-index: 3;
}
.el-header {
  align-items: center;
  background: var(--steelbluelowlight);
  box-shadow: 0px 2px 4px -1px var(--steelbluelowlight);
  display: flex;
  justify-content: space-between;
  color: var(--white);
  height: 65px;
  padding: 20px;
}
.el-header.mobile {
  padding-left: 5rem;
}
.el-header h1 {
  font-weight: bold;
}
.el-main {
  padding: 1rem 1rem 5rem;
}
.el-main.mobile {
  padding-left: 5rem;
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
.el-menu-item.right {
  fill-opacity: 0.6;
}
.el-menu-item.right:hover {
  background: transparent;
  box-shadow: none;
  color: var(--steelbluelowlight);
  fill-opacity: 1;
}
.login {
  align-items: center;
  background: var(--steelbluelowlight);
  display: flex;
  justify-content: center;
}
.notfound {
  align-items: center;
  background: black;
  display: flex;
  justify-content: center;
}
.right {
  display: flex;
  justify-content: right;
  width: 100%;
}
@media screen and (min-width: 500px) {
  .el-main {
    padding: 2rem 2rem 6rem;
  }
}
</style>
