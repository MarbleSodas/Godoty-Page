import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AuthCallback from '../views/AuthCallback.vue'
import DesktopAuthCallback from '../views/DesktopAuthCallback.vue'
import CheckoutSuccess from '../views/CheckoutSuccess.vue'
import CheckoutCancel from '../views/CheckoutCancel.vue'
import CreditPacks from '../views/CreditPacks.vue'
import TermsOfService from '../views/TermsOfService.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/credits',
        name: 'CreditPacks',
        component: CreditPacks
    },
    {
        path: '/terms',
        name: 'TermsOfService',
        component: TermsOfService
    },
    {
        path: '/privacy',
        name: 'PrivacyPolicy',
        component: PrivacyPolicy
    },
    {
        path: '/auth/callback',
        name: 'AuthCallback',
        component: AuthCallback
    },
    {
        path: '/auth/desktop-callback',
        name: 'DesktopAuthCallback',
        component: DesktopAuthCallback
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
