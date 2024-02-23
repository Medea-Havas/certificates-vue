import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', () => {
  const loading = ref(true)
  const stats = ref({})

  async function getStats() {
    loading.value = true
    await fetch(`${import.meta.env.VITE_API_HOST}/stats`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((data) => {
        stats.value = data
        loading.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getStats()

  return { loading, stats, getStats }
})
