import { createRouter, createWebHistory } from "vue-router";
import Login from './components/login/MyLogin.vue'
import Register from './components/register/MyRegister.vue'

// 创建路由对象
const router = createRouter({
    // 路由的工作模式
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        { path: '/register', component: Register }
    ]
})

export default router