import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCourseStore = defineStore('course', () => {
  const course = ref([])
  const loading = ref(true)

  async function getCourse(courseId) {
    await fetch(`${import.meta.env.VITE_API_HOST}/courses/${courseId}`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        course.value = data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { course, getCourse, loading }
})
