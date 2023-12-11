import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStudentStore = defineStore('student', () => {
  const student = ref({})
  const studentCourse = ref({})
  const loading = ref(true)

  async function getStudent(studentId) {
    await fetch(`${import.meta.env.VITE_API_HOST}/users/${studentId}`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        student.value = data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function getStudentCourse(studentId, courseId) {
    await fetch(`${import.meta.env.VITE_API_HOST}/usercourse/${studentId}/${courseId}`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        studentCourse.value = data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return { student, studentCourse, getStudent, getStudentCourse, loading }
})
