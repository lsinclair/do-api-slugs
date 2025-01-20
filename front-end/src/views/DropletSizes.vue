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
    <tbody v-if="data">
    <tr v-for="droplet in data.sizes" :key="droplet.slug">
      <td>{{ droplet.description }} </td>
      <rd><code>{{ droplet.slug }}</code></rd>
      <td>{{ droplet.memory | mbToGb }} GB</td>
      <td>{{ droplet.vcpus }}</td>
      <td>{{ droplet.disk }} GB</td>
      <td>{{ droplet.transfer }} TB</td>
      <td>${{ droplet.price_hourly }}</td>
      <td>${{ droplet.price_monthly }}</td>
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
      .get('http://localhost:3000/sizes')
      .then(response => {
        this.data = response.data
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
