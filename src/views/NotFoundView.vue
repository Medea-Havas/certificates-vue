<template>
  <div>
    <h1>404</h1>
    <div class="overNone">
      <img src="@/assets/404.gif" />
    </div>
    <el-button @click="goToLogin">IR A INICIO</el-button>
  </div>
</template>

<script setup>
import router from '@/router'

const goToLogin = () => {
  router.push('/')
}
</script>

<style scoped>
div {
  position: relative;
}
h1 {
  animation: 4s moveTitle ease-in-out infinite alternate-reverse;
  color: var(--white);
  font-size: 4rem;
  position: absolute;
  top: -2rem;
  text-align: center;
  width: 100%;
  z-index: 1;
}
button {
  bottom: -2rem;
  font-size: 1.5rem;
  left: 50%;
  opacity: 0.8;
  padding: 1.5rem;
  position: absolute;
  transform: translateX(-50%);
}
button:hover {
  opacity: 1;
}
img {
  width: 100%;
}
.overNone {
  border-radius: 100%;
  overflow: hidden;
}
@keyframes moveTitle {
  0% {
    opacity: 1;
  }
  60% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}
</style>
