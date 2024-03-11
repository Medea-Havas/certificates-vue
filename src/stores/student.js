import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useStudentStore = defineStore('student', () => {
  const loading = ref(true)
  const student = ref({})
  const studentCourse = ref({})

  async function getStudent(studentId) {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/users/${studentId}`, {
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
        student.value = data
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function getStudentCourse(studentId, courseId) {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/usercourse/${studentId}/${courseId}`, {
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
        studentCourse.value = data
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { loading, student, studentCourse, getStudent, getStudentCourse }
})
