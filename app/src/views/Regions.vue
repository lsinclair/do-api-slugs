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
      <tr v-for="region in regions" :key="region.slug">
        <td>{{ region.name }}</td>
        <td>
          <code>{{ region.slug }}</code>
        </td>
        <td v-if="region.available">Available</td>
        <td v-else>Unavailable</td>
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

const regions = ref([])

const isLoading = ref<boolean>(false)

const fetchRegions = async () => {
  try {
    const { data } = await api.get('/regions')

    regions.value = data.regions

    lastFetched.value = data.retrieved_at
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

fetchRegions()
</script>
