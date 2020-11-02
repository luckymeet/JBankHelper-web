import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/views/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index'),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/public/home')
            },
            {
                path: '/financial/account-check',
                name: 'AccountCheck',
                component: () => import('@/views/financial/accountCheck')
            }
        ]
    }
  ]
})

const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
