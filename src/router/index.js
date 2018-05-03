import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Count from '@/components/Count'
import BuildJob from '@/components/BuildJob'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/count',
      name: 'Count',
      component: Count
    },
    {
      path: '/buildJob',
      name: 'BuildJob',
      component: BuildJob
    },
  ]
})
