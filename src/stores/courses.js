import { ref } from 'vue'
import { defineStore } from 'pinia'
import moment from 'moment'
import router from '@/router'
import { useStatsStore } from './stats'

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref([])
  const coursesNotFromUser = ref([])
  const loading = ref(true)

  async function getCourses() {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/courses`, {
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
        if (res.status === 201) {
          let tempData = res.data
          tempData['id'] = '' + res.data.id + ''
          tempData['template'] = data.template
          tempData['template_id'] = data.template_id
          orderCoursesByDateInit(tempData)
          loading.value = false
          const stats = useStatsStore()
          stats.getStats()
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
        if (res.status === 201) {
          coursesNotFromUser.value = coursesNotFromUser.value.filter(function (obj) {
            return obj.id !== data.course_id
          })
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
          courses.value = courses.value.filter((item) => item.id !== id)
          loading.value = false
        }
      })
      .catch((error) => console.log(error))
  }

  function orderCoursesByDateInit(data) {
    courses.value.unshift(data)
    courses.value = courses.value.sort((a, b) => new Date(b.date_init) - new Date(a.date_init))
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
