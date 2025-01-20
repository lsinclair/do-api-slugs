import { createRouter, createWebHistory } from 'vue-router'
import AppImages from '~/views/AppImages.vue'
import Databases from '~/views/Databases.vue'
import DistroImages from '~/views/DistroImages.vue'
import DropletSize from '~/views/DropletSizes.vue'
import Home from '~/views/Home.vue'
import Regions from '~/views/Regions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/droplet-sizes',
      name: 'droplet-sizes',
      component: DropletSize,
    },
    {
      path: '/distro-images',
      name: 'distro-images',
      component: DistroImages,
    },
    {
      path: '/app-images',
      name: 'app-images',
      component: AppImages,
    },
    {
      path: '/regions',
      name: 'regions',
      component: Regions,
    },
    {
      path: '/databases',
      name: 'databases',
      component: Databases,
    },
  ],
})

export default router
