import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCourseStudentsStore = defineStore('courseStudents', () => {
  const courseStudents = ref([])
  const loading = ref(true)

  async function getCourseStudents(courseId) {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/usersfromcourse/${courseId}`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        courseStudents.value = data
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function removeCourseStudent(studentId, courseId) {
    await fetch(`${import.meta.env.VITE_API_HOST}/usersfromcourse/${studentId}/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          courseStudents.value = courseStudents.value.filter((item) => item.id !== studentId)
        }
      })
      .catch((error) => console.log(error))
  }

  return { courseStudents, getCourseStudents, removeCourseStudent, loading }
})
