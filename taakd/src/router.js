
import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

// let defaultRoute = window.default_route
// if (!defaultRoute || defaultRoute?.includes('{{')) {
//   defaultRoute = '/discussions'}
let step = 1
const routes = [
  {
    path: '/',
    name: 'Home',
    // redirect: defaultRoute,

    component: () => import('@/pages/Home.vue'),
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'Step_1',
    path: '/Step_1',
    component: () => import('@/pages/pagesOld/Step_1.vue'),
  },
  {
    name: 'Step_2',
    path: '/Step_2',
    component: () => import('@/pages/pagesOld/Step_2.vue'),
  },
  {
    name: 'Step_3',
    path: '/Step_3',
    component: () => import('@/pages/pagesOld/Step_3.vue'),
  },
  {
    name: 'Step_4',
    path: '/Step_4',
    component: () => import('@/pages/pagesOld/Step_4.vue'),
  },
  {
    name: 'Step_5',
    path: '/Step_5',
    component: () => import('@/pages/pagesOld/Step_5.vue'),
  },
  {
    name: 'Step_6',
    path: '/Step_6',
    component: () => import('@/pages/pagesOld/Step_6.vue'),
  },
  // {
  //   name: 'Hiring',
  //   path: '/Hiring',
  //   component: () => import('@/pages/Hiring.vue'),
  // },
  {
    name: 'reset',
    path: '/reset',
    component: () => import('@/pages/reset.vue'),
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/pages/home.vue'),
  },
  {
    name: 'steps',
    path: '/steps',
    component: () => import('@/pages/steps.vue'),
  },
  {
    name: 'test',
    path: '/test',
    component: () => import('@/pages/VerificationInstructionsRequest.vue'),
  },
  {
    name: 'step3test',
    path: '/step3test',
    component: () => import('@/pages/stepsSections/step3test.vue'),
  },  

]

let router = createRouter({
  history: createWebHistory('/taakd'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if (to.name === 'Login' && isLoggedIn) {
    
    next({ name: 'Home' })
  } else if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
