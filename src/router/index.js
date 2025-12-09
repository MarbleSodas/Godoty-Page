import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AuthCallback from '../views/AuthCallback.vue'
import CheckoutSuccess from '../views/CheckoutSuccess.vue'
import CheckoutCancel from '../views/CheckoutCancel.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/auth/callback',
        name: 'AuthCallback',
        component: AuthCallback
    },
    {
        path: '/checkout/success',
        name: 'CheckoutSuccess',
        component: CheckoutSuccess
    },
    {
        path: '/checkout/cancel',
        name: 'CheckoutCancel',
        component: CheckoutCancel
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        }
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0 }
    }
})

export default router
