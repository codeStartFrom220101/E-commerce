import { createRouter, createWebHistory } from 'vue-router'

// 頁面元件
import Home from '../pages/Home.vue'
import LoginRegister from '../pages/LoginRegister.vue'
import NotFound from '../pages/NotFound.vue'

import ProductList from '@/pages/Product/ProductList.vue'

import CheckoutLayout from '../pages/checkout/CheckoutLayout.vue'
import CheckoutStep1 from '../pages/checkout/CheckoutStep1.vue'
import CheckoutStep2 from '../pages/checkout/CheckoutStep2.vue'
import CheckoutStep3 from '../pages/checkout/CheckoutStep3.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginRegister',
    component: LoginRegister
  },
  {
    path: '/product/:id(\\d+)',
    name: 'ProductDetail',
    component: () => import('@/pages/Product/ProductDetail.vue')
  },
  {
    path: '/product/:category?',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/checkout',
    component: CheckoutLayout,
    children: [
      { path: '', redirect: '/checkout/step1' },
      { path: 'step1', name: 'CheckoutStep1', component: CheckoutStep1 },
      { path: 'step2', name: 'CheckoutStep2', component: CheckoutStep2 },
      { path: 'step3', name: 'CheckoutStep3', component: CheckoutStep3 },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果是浏览器前进/后退，可保留原位置
    if (savedPosition) {
      return savedPosition
    }
    // 默认都滚到顶部
    return { left: 0, top: 0 }
  }
})

export default router
