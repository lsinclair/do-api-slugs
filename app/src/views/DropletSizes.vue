<template>
  <h1>DigitalOcean Droplets</h1>
  <table>
    <thead>
      <tr>
        <th>Droplet Description</th>
        <th>Slug</th>
        <th>RAM</th>
        <th>CPU</th>
        <th>Disk</th>
        <th>Transfer</th>
        <th>Price Hourly</th>
        <th>Price Monthly</th>
      </tr>
    </thead>
    <p v-if="isLoading">Loading...</p>

    <tbody v-else-if="sizes.length && !isLoading">
      <tr v-for="droplet in sizes" :key="droplet.slug">
        <td>{{ droplet.description }}</td>
        <rd>
          <code>{{ droplet.slug }}</code>
        </rd>
        <td>{{ mbToGb(droplet.memory) }} GB</td>
        <td>{{ droplet.vcpus }}</td>
        <td>{{ droplet.disk }} GB</td>
        <td>{{ droplet.transfer }} TB</td>
        <td>${{ droplet.price_hourly }}</td>
        <td>${{ droplet.price_monthly }}</td>
      </tr>
    </tbody>
  </table>
  <div class="has-text-right">
    <span class="has-text-grey-light">Retrieved at: {{ lastFetched }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useSizes from '~/composables/useSizes'
import api from '~/plugins/api'

const lastFetched = ref<string>('Never')

const sizes = ref([])

const isLoading = ref<boolean>(false)

const { mbToGb } = useSizes()

const fetchSizes = async (): Promise<void> => {
  isLoading.value = true

  try {
    const { data } = await api.get('/sizes')

    sizes.value = data.sizes

    lastFetched.value = data.retrieved_at
  } catch (err) {
    console.log('ERROR:', err)
  } finally {
    isLoading.value = false
  }
}

fetchSizes()
</script>
