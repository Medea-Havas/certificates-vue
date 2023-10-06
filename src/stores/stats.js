import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', () => {
  const stats = ref({})
  const loading = ref(true)

  async function getStats() {
    return await fetch('https://certificates-api.hhytest.com/stats')
      .then((response) => response.json())
      .then((data) => {
        stats.value = data
        loading.value = false
        console.log('Data is fetched')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  getStats()

  return { stats, loading, getStats }
})
