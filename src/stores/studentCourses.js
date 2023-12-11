import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStudentCoursesStore = defineStore('studentCourses', () => {
  const studentCourses = ref([])
  const loading = ref(true)

  async function getStudentCourses(studentId) {
    await fetch(`${import.meta.env.VITE_API_HOST}/coursesfromuser/${studentId}`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        studentCourses.value = data
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function removeStudentCourse(studentId, courseId) {
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
        }
      })
      .catch((error) => console.log(error))
  }

  return { studentCourses, getStudentCourses, removeStudentCourse, loading }
})
