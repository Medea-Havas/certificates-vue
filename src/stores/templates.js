import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTemplatesStore = defineStore('templates', () => {
  const templates = ref({})
  const loading = ref(true)

  async function getTemplates() {
    return await fetch(`${import.meta.env.VITE_API_HOST}/templates`)
      .then((response) => response.json())
      .then((data) => {
        templates.value = data
        loading.value = false
        console.log('Data is fetched')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getTemplates()

  return { templates, loading, getTemplates }
})
