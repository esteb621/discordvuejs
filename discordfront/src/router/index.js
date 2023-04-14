import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView'
import SignUpView from '../views/SignUpView'
import MainView from '../views/MainView'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView,
    children:[

      {
        path: "personal",
        name: "privateMessage",
        component: MainView
      },
      {
        path: "server",
        name: "server",
        component: MainView,
        children:[
          {
            path: "channel/:id",
            component:MainView
          }
        ]
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:LoginView
  },
  {
    path:'/register',
    name:'signup',
    component:SignUpView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
