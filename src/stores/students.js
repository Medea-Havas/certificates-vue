import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStudentsStore = defineStore('students', () => {
  const students = ref([])
  const studentsLength = ref(0)
  const usersNotFromCourse = ref([])
  const loading = ref(true)

  async function getStudents() {
    await fetch(`${import.meta.env.VITE_API_HOST}/users`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        students.value = data
        studentsLength.value = data.length
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function getUsersToEnroll(courseId) {
    await fetch(`${import.meta.env.VITE_API_HOST}/usersnotfromcourse/${courseId}`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        usersNotFromCourse.value = data
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function addStudent(data) {
    await fetch(`${import.meta.env.VITE_API_HOST}/users`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 201) {
          let tempData = data
          tempData.id = res.messages.id
          students.value.unshift(data)
        }
      })
      .catch((error) => console.log(error))
  }

  async function updateStudent(data, studentId) {
    await fetch(`${import.meta.env.VITE_API_HOST}/users/${studentId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          let index = students.value.findIndex((obj) => obj.id == studentId)
          students.value[index] = data
        }
      })
      .catch((error) => console.log(error))
  }

  async function removeStudent(studentId) {
    await fetch(`${import.meta.env.VITE_API_HOST}/users/${studentId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          students.value = students.value.filter((item) => item.id !== studentId)
        }
      })
      .catch((error) => console.log(error))
  }

  getStudents()

  return {
    students,
    usersNotFromCourse,
    loading,
    studentsLength,
    getStudents,
    getUsersToEnroll,
    addStudent,
    updateStudent,
    removeStudent
  }
})
