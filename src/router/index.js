import {createRouter, createWebHistory} from 'vue-router'
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
            path: '/movie/:id',
            name: 'movie',
            component: () => import('../views/MovieView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/reset_password',
            name: 'reset_password',
            component: () => import('../views/ResetPasswordView.vue')
        },
        {
            path: '/reset_password_confirm/:uid/:token',
            name: 'reset_password_confirm',
            component: () => import('../views/ResetPasswordConfirmView.vue')
        },
        {
            path: '/activate/:uid/:token',
            name: 'activate',
            component: () => import('../views/ActivateView.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        }
    ]
})

export default router
