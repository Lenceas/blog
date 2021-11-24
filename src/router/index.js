import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login',
    component: () => import('../components/layout.vue'),
    children: [{
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin/index.vue')
      },
      {
        path: '/admin/user',
        name: 'user',
        component: () => import('../views/admin/user.vue')
      },
      {
        path: '/admin/setting',
        name: 'setting',
        component: () => import('../views/admin/setting.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 是一个函数,表示放行:  next() 放行  next('/login') 强制跳转
  if (to.path === '/login' || to.path === '/register' || to.path === '/home') return next()
  // 获取token
  const tokeninfo = JSON.parse(localStorage.getItem('TokenInfo'))
  if (!tokeninfo)
  {
    localStorage.clear()
    return next('/login')
  }
  next()
})

export default router