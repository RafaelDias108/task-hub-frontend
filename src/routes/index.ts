import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: 'dashboard',
        component: () => import('../layouts/DefaultLayout.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                // @ts-ignore
                component: () => import('../views/Dashboard/DashboardView.vue')
            },
            {
                path: 'projects',
                name: 'projects',
                component: () => import('../views/Projects/ProjectsView.vue')
            },
            {
                path: 'categories',
                name: 'categories',
                // @ts-ignore
                component: () => import('../views/Categories/CategoriesView.vue')
            }
        ]
    },
    {
        path: '/login',
        // @ts-ignore
        component: () => import('../views/pages/Login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router