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
    <tbody v-if="data">
    <tr v-for="image in data.images" :key="image.slug">
      <td>{{ image.id }} </td>
      <td>{{ image.distribution	 }} </td>
      <td>{{ image.name	 }} </td>
      <td>{{ image.slug }} </td>
      <td>{{ image.min_disk_size }} </td>
    </tr>
    </tbody>
    <p v-else>Loading...</p>
  </table>
  <div class="has-text-right" v-if="data.retrieved_at">
    <span class="has-text-grey-light">Retrieved at: {{ data.retrieved_at }}</span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      data: [],
      isLoading: true,
      isEmpty: false,
      errored: false
    }
  },
  filters: {
    mbToGb: function (value) {
      return value / 1024
    }
  },
  created () {
    axios
      .get('http://localhost:3000/images/distros')
      .then(response => {
        this.data = response.data
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
        this.isEmpty = true
        this.errored = true
      })
      .finally(() => { this.isLoading = false })
  }
}
</script>
