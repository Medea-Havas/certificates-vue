import { ref } from 'vue'
import { defineStore } from 'pinia'
import moment from 'moment'

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref([])
  const loading = ref(true)

  function getCourses() {
    fetch(`${import.meta.env.VITE_API_HOST}/courses`)
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
          course.certificate_thumbnail =
            import.meta.env.VITE_API_HOST + '/assets/certificates/' + course.certificate_thumbnail
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function addCourse(data) {
    console.log(data)
    fetch(`${import.meta.env.VITE_API_HOST}/courses`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json;charset=UTF-8' }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 201) {
          courses.value.push(res.data)
        }
      })
      .catch((error) => console.log(error))
  }

  function removeCourse(id) {
    fetch(`${import.meta.env.VITE_API_HOST}/courses/${id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json;charset=UTF-8' }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          courses.value = courses.value.filter((item) => item.id !== id)
          console.log(res)
        }
      })
      .catch((error) => console.log(error))
  }

  getCourses()

  return { courses, loading, getCourses, addCourse, removeCourse }
})
