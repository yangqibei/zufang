import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/findhouse',
        name: 'findhouse',
        component: () => import('@/views/findhouse')
      },
      {
        path: '/info',
        name: 'info',
        component: () => import('@/views/info')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/home/list',
    name: 'list',
    component: () => import('@/views/homelist')
  },
  {
    path: '/citys',
    name: 'citys',
    component: () => import('@/views/citys')
  },
  {
    path: '/maps',
    name: 'maps',
    component: () => import('@/views/maps')
  },
  {
    path: '/regiset',
    name: 'regiset',
    component: () => import('@/views/regiset')
  },
  {
    path: '/favorate',
    name: 'favorate',
    component: () => import('@/views/favorate')
  },
  {
    path: '/rent',
    name: 'rent',
    component: () => import('@/views/rent')
  },
  {
    path: '/rent/add',
    name: 'add',
    component: () => import('@/views/add')
  },
  {
    path: '/rent/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/detial',
    name: 'detial',
    component: () => import('@/views/homedetial')
  }
]

const router = new VueRouter({
  routes
})

export default router
