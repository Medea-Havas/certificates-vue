import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStudentsStore = defineStore('students', () => {
  const loading = ref(true)
  const students = ref([])
  const studentsLength = ref(0)
  const usersNotFromCourse = ref([])

  async function getStudents() {
    loading.value = true
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
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function getUsersToEnroll(courseId) {
    loading.value = true
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
    loading.value = true
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
          loading.value = false
        }
      })
      .catch((error) => console.log(error))
  }

  async function updateStudent(data, studentId) {
    loading.value = true
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
          loading.value = false
        }
      })
      .catch((error) => console.log(error))
  }

  async function removeStudent(studentId) {
    loading.value = true
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
          loading.value = false
        }
      })
      .catch((error) => console.log(error))
  }

  getStudents()

  return {
    loading,
    students,
    studentsLength,
    usersNotFromCourse,
    addStudent,
    getStudents,
    getUsersToEnroll,
    removeStudent,
    updateStudent
  }
})
