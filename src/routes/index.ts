import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { authGuard } from '../middlewares/auth'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: 'dashboard',
        component: () => import('../layouts/DefaultLayout.vue'),
        beforeEnter: authGuard,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                meta: { requiresAuth: true },
                // @ts-ignore
                component: () => import('../views/Dashboard/DashboardView.vue')
            },
            {
                path: 'projects',
                name: 'projects',
                meta: { requiresAuth: true },
                component: () => import('../views/Projects/ProjectsView.vue')
            },
            {
                path: 'categories',
                name: 'categories',
                meta: { requiresAuth: true },
                // @ts-ignore
                component: () => import('../views/Categories/CategoriesView.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        // @ts-ignore
        component: () => import('../views/pages/Login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router