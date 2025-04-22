import { createRouter, createWebHistory } from 'vue-router'

// 頁面元件
import Home from '../pages/Home.vue'
import LoginRegister from '../pages/LoginRegister.vue'
import NotFound from '../pages/NotFound.vue'

import Product from '../pages/Product/Product.vue'
import ProductDetail from '../pages/Product/ProductDetail.vue'
import All from '../pages/Product/All.vue'
import Couple from '../pages/Product/Couple.vue'
import Healing from '../pages/Product/Healing.vue'
import Useful from '../pages/Product/Useful.vue'

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
    path: '/product',
    component: Product,
    children: [
      { path: '', name: 'All', component: All },
      { path: 'couple', name: 'Couple', component: Couple },
      { path: 'healing', name: 'Healing', component: Healing },
      { path: 'useful', name: 'Useful', component: Useful },
    ]
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
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
  routes
})

export default router
