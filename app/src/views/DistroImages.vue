<template>
  <h1>DigitalOcean Droplets</h1>
  <table>
    <thead>
      <tr>
        <th>Image ID</th>
        <th>Distribution</th>
        <th>Version</th>
        <th>Slug</th>
        <th>Min Disk Size</th>
      </tr>
    </thead>

    <p v-if="isLoading">Loading...</p>

    <tbody v-else>
      <tr v-for="image in images" :key="image.slug">
        <td>{{ image.id }}</td>
        <td>{{ image.distribution }}</td>
        <td>{{ image.name }}</td>
        <td>{{ image.slug }}</td>
        <td>{{ image.min_disk_size }}</td>
      </tr>
    </tbody>
  </table>
  <div class="has-text-right">
    <span class="has-text-grey-light">Retrieved at: {{ lastFetched }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '~/plugins/api'

const lastFetched = ref<string>('Never')

const images = ref([])

const isLoading = ref<boolean>(false)

const fetchImages = async () => {
  try {
    const { data } = await api.get('/images/distros')

    images.value = data.images

    lastFetched.value = data.retrieved_at
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

fetchImages()
</script>
