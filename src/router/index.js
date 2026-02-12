import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TermsOfService from '../views/TermsOfService.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
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
        path: '/:pathMatch(.*)*',
        redirect: '/'
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
