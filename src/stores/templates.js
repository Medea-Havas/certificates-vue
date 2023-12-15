import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTemplatesStore = defineStore('templates', () => {
  const loading = ref(true)
  const templates = ref({})

  async function getTemplates() {
    return await fetch(`${import.meta.env.VITE_API_HOST}/templates`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        templates.value = data
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function addTemplate(data) {
    await fetch(`${import.meta.env.VITE_API_HOST}/templates`, {
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
          templates.value.unshift(res.data)
        }
      })
      .catch((error) => console.log(error))
  }

  async function updateTemplate(data) {
    await fetch(`${import.meta.env.VITE_API_HOST}/templates/${data.id}`, {
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
          let index = templates.value.findIndex((obj) => obj.id == data.id)
          templates.value[index] = data
        }
      })
      .catch((error) => console.log(error))
  }

  async function removeTemplate(id) {
    await fetch(`${import.meta.env.VITE_API_HOST}/templates/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          templates.value = templates.value.filter((item) => item.id !== id).title
        }
      })
      .catch((error) => console.log(error))
  }

  getTemplates()

  return {
    loading,
    templates,
    addTemplate,
    getTemplates,
    removeTemplate,
    updateTemplate
  }
})
