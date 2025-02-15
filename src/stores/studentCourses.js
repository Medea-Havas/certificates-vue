import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useStudentCoursesStore = defineStore('studentCourses', () => {
  const loading = ref(true)
  const studentCourses = ref([])

  async function getStudentCourses(studentId) {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/coursesfromuser/${studentId}`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        if (response.status == 401) {
          router.push('/login')
        } else {
          console.log(response)
        }
      })
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
        Token: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        if (response.status == 401) {
          router.push('/login')
        } else {
          console.log(response)
        }
      })
      .then((res) => {
        if (res.status === 200) {
          studentCourses.value = studentCourses.value.filter((item) => item.id !== courseId)
          loading.value = false
        }
      })
      .catch((error) => console.log(error))
  }

  return { loading, studentCourses, getStudentCourses, removeStudentCourse }
})
