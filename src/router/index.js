import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cursos',
      name: 'courses',
      component: () => import('../views/CoursesView.vue')
    },
    {
      path: '/curso/:id',
      name: 'course',
      component: () => import('../views/CourseView.vue')
    },
    {
      path: '/alumnos',
      name: 'students',
      component: () => import('../views/StudentsView.vue')
    }
  ]
})

export default router
