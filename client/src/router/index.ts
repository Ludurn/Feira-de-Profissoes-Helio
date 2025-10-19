import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DiaryView from '@/views/DiaryView.vue'
import DreamView from '@/views/DreamView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/diary',
    name: 'diary',
    component: DiaryView
  },
  {
    path: '/dream',
    name: 'dream',
    component: DreamView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
