import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from '@/stores/user'
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
            component: () => import('../views/RegisterView.vue'),
            meta: {requiresGuest: true} // 只有未登录用户才能访问
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: {requiresGuest: true}
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
            path: '/set_password',
            name: 'set_password',
            component: () => import('../views/SetPasswordView.vue'),
            meta: {requiresAuth: true}  // 只有登录用户才能访问
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: {requiresAuth: true}
        },
        {
            path: '/favorite',
            name: 'favorite',
            component: () => import('../views/FavoriteView.vue'),
            meta: {requiresAuth: true}
        },
        {
            path: '/member_card',
            name: 'member_card',
            component: () => import('../views/MemberCardView.vue'),
            meta: {requiresAuth: true}
        }
    ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!userStore.isLogin) {
            next({
                name: 'login',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (userStore.isLogin) {
            next({name: 'home'})
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
