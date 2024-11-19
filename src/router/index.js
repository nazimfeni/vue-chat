import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import { api } from '../services/api';

const routes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { 
        path: '/dashboard', 
        name: 'Dashboard', 
        component: Dashboard,
         meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Add navigation guard
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isAuthenticated = !!localStorage.getItem('authToken'); // Example check for token
        if (!isAuthenticated) {
            next('/login'); // Redirect to login if not authenticated
        } else {
            next(); // Proceed to the route
        }
    } else {
        next(); // No auth required
    }
});

export default router;
