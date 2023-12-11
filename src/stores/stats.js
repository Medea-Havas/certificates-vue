import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', () => {
  const stats = ref({})
  const loading = ref(true)

  async function getStats() {
    await fetch(`${import.meta.env.VITE_API_HOST}/stats`, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        Token: 'Bearer ' + sessionStorage.getItem('token')
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

  return { stats, loading, getStats }
})
