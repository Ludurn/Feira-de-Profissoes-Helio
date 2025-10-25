import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DiaryView from '@/views/DiaryView.vue'
import LockerView from '@/views/LockerView.vue'
import DreamView from '@/views/DreamView.vue'
import GalleryView from '@/views/GalleryView.vue'
import FormView from '@/views/FormView.vue'

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
    path: '/locker',
    name: 'locker',
    component: LockerView
  },
  {
    path: '/dream',
    name: 'dream',
    component: DreamView
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: GalleryView
  }, {
    path: '/form',
    name: 'form',
    component: FormView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
