import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStudentCoursesStore = defineStore('studentCourses', () => {
  const studentCourses = ref([])
  const loading = ref(true)

  async function getStudentCourses(studentId) {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/coursesfromuser/${studentId}`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        studentCourses.value = data
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function removeStudentCourse(studentId, courseId) {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/userscourses/${studentId}/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          studentCourses.value = studentCourses.value.filter((item) => item.id !== courseId)
          loading.value = false
        }
      })
      .catch((error) => console.log(error))
  }

  return { studentCourses, getStudentCourses, removeStudentCourse, loading }
})
