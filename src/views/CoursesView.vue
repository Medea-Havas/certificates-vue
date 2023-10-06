<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const courses = ref(null)

const getCourses = async () => {
  return fetch('https://certificates-api.hhytest.com/courses').then((response) => response.json())
}

onMounted(() => {
  getCourses().then((data) => (courses.value = data))
})
</script>

<template>
  <h1>Cursos</h1>
  <div v-for="course in courses" :key="course.id">
    <RouterLink :to="`/curso/${course.id}`">{{ course.title }}</RouterLink>
  </div>
</template>
