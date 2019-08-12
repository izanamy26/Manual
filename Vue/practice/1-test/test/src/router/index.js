import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Row from '@/components/Row'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Row',
      component: Row
    }
  ]
})
