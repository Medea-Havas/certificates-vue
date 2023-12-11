<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()
const width = ref(window.innerWidth)

const isCollapsed = ref(false)
const isMobile = ref(false)

const onResize = () => {
  width.value = window.innerWidth
  checkMobile()
}

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

const open = (route) => {
  router.push(route)
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  checkMobile()
})
</script>

<template>
  <div
    class="app"
    v-if="route.path != '/informe' && route.path != '/login' && route.path != '/404'"
  >
    <el-container>
      <el-aside :class="{ collapsed: isCollapsed, mobile: isMobile }" width="200px">
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
  <div class="report" v-if="route.path == '/informe'">
    <RouterView />
  </div>
  <div class="login" v-if="route.path == '/login'">
    <RouterView />
  </div>
  <div class="notfound" v-if="route.path == '/404'">
    <RouterView />
  </div>
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
.el-aside.mobile {
  position: absolute;
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
.login,
.notfound {
  height: 100vh;
  width: 100%;
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
