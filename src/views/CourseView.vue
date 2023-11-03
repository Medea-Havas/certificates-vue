<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const course = ref(null)

const getCourse = async () => {
  return fetch(`${import.meta.env.VITE_API_HOST}/courses/${route.params.id}`).then((response) =>
    response.json()
  )
}

onMounted(() => {
  getCourse().then((data) => {
    console.log(data[0])
    course.value = data[0]
  })
})
</script>

<template>
  <h1>Curso {{ route.params.id }}</h1>
  <div>
    <h2 v-if="course">{{ course.title }}</h2>
  </div>
</template>
