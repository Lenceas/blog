import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/admin',
    redirect: '/admin/index',
    name: 'admin',
    meta: {
      title: '系统面板'
    },
    component: () => import('../components/admin-layout.vue'),
    children: [{
        path: '/admin/index',
        name: 'index',
        meta: {
          title: '系统面板'
        },
        component: () => import('../views/admin/index.vue')
      },
      {
        path: '/admin/article',
        name: 'article',
        meta: {
          title: '博文日记'
        },
        component: () => import('../views/admin/article.vue')
      },
      {
        path: '/admin/user',
        name: 'user',
        meta: {
          title: '用户中心'
        },
        component: () => import('../views/admin/user.vue')
      },
      {
        path: '/admin/setting',
        name: 'setting',
        meta: {
          title: '系统设置'
        },
        component: () => import('../views/admin/setting.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('../components/home-layout.vue'),
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('../views/home/index.vue')
    }]
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

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 是一个函数,表示放行:  next() 放行  next('/login') 强制跳转
  if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/home')
  } else {
    if (to.path == '/login' || to.path == '/register' || to.path == '/' || to.path == '/home')
      return next()
    else {
      // 获取token
      const tokeninfo = JSON.parse(localStorage.getItem('TokenInfo'))
      if (!tokeninfo) {
        localStorage.clear()
        return next('/login')
      }
      next()
    }
  }
})

export default router