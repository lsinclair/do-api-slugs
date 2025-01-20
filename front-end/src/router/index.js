import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DropletSize from "../views/DropletSizes.vue";
import DistroImages from "@/views/DistroImages.vue";
import AppImages from "@/views/AppImages.vue";
import Regions from "@/views/Regions.vue";
import Databases from "@/views/Databases.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/droplet-sizes',
      name: 'droplet-sizes',
      component: DropletSize,
      meta: {
        title: 'Droplet Images'
      }
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
