import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Shops from '../components/Shop'
import Items from '../components/Item'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Update from '../components/UpdateItems'
import Comment from '../components/Comments'
import LoginSignUp from '../components/LoginNSignUp'
import Roles from '../components/Roles'
import Distributor from '../components/Distributor'
import Brand_inventory from '../components/Brand_inventory'
import BuyItems from '../components/BuyItems'
import Vendor_stock from '../components/Vendor_stock'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/vendorstock',
      name: 'vendorstock',
      component: Vendor_stock,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/buyitems',
      name: 'buyitems',
      component: BuyItems,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/brand_inventory',
      name: 'brand_inventory',
      component: Brand_inventory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/roles',
      name: 'roles',
      component: Roles,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/slogin',
      name: 'SLogin',
      component: LoginSignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/items',
      name: 'Items',
      component: Items,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/distributor',
      name: 'distributor',
      component: Distributor,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/shops',
      name: 'Shops',
      component: Shops,
      meta: {
        requiresAuth: true
      }
    },
      {
        path: '/update',
        name: 'Update',
        component: Update,
        meta: {
          requiresAuth: true
        }
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment,
      meta: {
        requiresAuth: true
      }
  }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('comics')
  else next()
})

export default router
