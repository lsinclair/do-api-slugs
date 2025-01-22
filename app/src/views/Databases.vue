<template>
  <h1>DigitalOcean Droplets</h1>
  <table>
    <thead>
      <tr>
        <th>Region Name</th>
        <th>Region Slug</th>
        <th>Region Available</th>
      </tr>
    </thead>

    <p v-if="isLoading">Loading...</p>

    <tbody v-else>
      <!-- Only a temporary solution; decision on nest data structure TBC -->
      <tr v-for="database in Object.keys(databases)" :key="database">
        {{
          database
        }}
      </tr>
    </tbody>
  </table>
  <div class="has-text-right">
    <span class="has-text-grey-light">Retrieved at: {{ lastFetched }}</span>
  </div>
  <br />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '~/plugins/api'

const lastFetched = ref<string>('Never')

const databases = ref([])

const isLoading = ref<boolean>(false)

const fetchDatabases = async () => {
  try {
    const { data } = await api.get('/databases')

    databases.value = data.options

    lastFetched.value = data.retrieved_at
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

fetchDatabases()
</script>
