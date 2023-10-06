<script setup>
import { ref, onMounted } from 'vue'

const students = ref(null)

const getStudents = async () => {
  return fetch('https://certificates-api.hhytest.com/users').then((response) => response.json())
}

onMounted(() => {
  getStudents().then((data) => (students.value = data))
})
</script>

<template>
  <h1>Estudiantes</h1>
  <div v-for="student in students" :key="student.id">
    <p>{{ student.name }}</p>
  </div>
</template>
