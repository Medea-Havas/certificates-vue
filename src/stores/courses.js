import { ref } from 'vue'
import { defineStore } from 'pinia'
import moment from 'moment'

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref([])
  const coursesNotFromUser = ref([])
  const loading = ref(true)

  async function getCourses() {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/courses`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then(
        (data) =>
          // Initial sort by date_init
          (courses.value = data.sort(function (a, b) {
            let c = moment(a.date_init).format()
            let d = moment(b.date_init).format()
            return new Date(d) - new Date(c)
          }))
      )
      .then(() => {
        // Credits transform string to double
        courses.value.forEach((course) => {
          course.credits = parseFloat(course.credits)
        })
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function getCoursesToEnroll(userId) {
    await fetch(`${import.meta.env.VITE_API_HOST}/coursesnotfromuser/${userId}`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        coursesNotFromUser.value = data
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function addCourse(data) {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/courses`, {
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
          courses.value.unshift(res.data)
          loading.value = false
        }
      })
      .catch((error) => console.log(error))
  }

  async function enrollInCourse(data) {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/userscourses`, {
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
          console.log(data.course_id)
          coursesNotFromUser.value = coursesNotFromUser.value.filter(function (obj) {
            return obj.id !== data.course_id
          })
          console.log(coursesNotFromUser.value)
          loading.value = false
        }
      })
      .catch((error) => console.log(error))
  }

  async function updateCourse(data, courseId) {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/courses/${courseId}`, {
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
          let index = courses.value.findIndex((obj) => obj.id == courseId)
          data['certificate_thumbnail'] = `${import.meta.env.VITE_API_HOST}/assets/certificates/${
            data['certificate_thumbnail']
          }`
          data['certificate_image'] = `${import.meta.env.VITE_API_HOST}/assets/certificates/${
            data['certificate_image']
          }`
          data['certificate_image2'] = `${import.meta.env.VITE_API_HOST}/assets/certificates/${
            data['certificate_image2']
          }`
          courses.value[index] = data
          loading.value = false
        }
      })
      .catch((error) => console.log(error))
  }

  async function removeCourse(id) {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          courses.value = courses.value.filter((item) => item.id !== id)
          loading.value = false
        }
      })
      .catch((error) => console.log(error))
  }

  getCourses()

  return {
    courses,
    coursesNotFromUser,
    loading,
    addCourse,
    enrollInCourse,
    getCourses,
    getCoursesToEnroll,
    removeCourse,
    updateCourse
  }
})
