<script setup>
import { ref, onMounted } from 'vue'

const students = ref(null)

const getStudents = async () => {
  return fetch(`${import.meta.env.VITE_API_HOST}/users`).then((response) => response.json())
}

onMounted(() => {
  getStudents().then((data) => (students.value = data))
})
</script>

<template>
  <h1>Alumnos</h1>
  <div v-for="student in students" :key="student.id">
    <p>{{ student.name }}</p>
  </div>
</template>
