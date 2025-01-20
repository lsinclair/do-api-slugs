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
    <tbody v-if="data">
    <tr v-for="region in data.regions" :key="region.slug">
      <td>{{ region.name }} </td>
      <td><code>{{ region.slug }}</code></td>
      <td v-if="region.available">Available</td>
      <td v-else>Unavailable</td>
    </tr>
    </tbody>
    <p v-else>Loading...</p>
  </table>
  <div class="has-text-right" v-if="data.retrieved_at">
    <span class="has-text-grey-light">Retrieved at: {{ data.retrieved_at }}</span>
  </div>
  <br>
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
      .get('http://localhost:3000/regions')
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
