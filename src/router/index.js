import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cursos',
      name: 'courses',
      component: () => import('../views/CoursesView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/curso/:id',
      name: 'course',
      component: () => import('../views/CourseView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/alumnos',
      name: 'students',
      component: () => import('../views/StudentsView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/alumno/:id',
      name: 'student',
      component: () => import('../views/StudentView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/certificado',
      name: 'certificate',
      component: () => import('../views/CertificateView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/informe',
      name: 'report',
      component: () => import('../views/ReportView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/404',
      name: 'notfound',
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (sessionStorage.getItem('token') == '' || sessionStorage.getItem('token') == null) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
