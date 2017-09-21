import Vue from 'vue'
import Router from 'vue-router'
import Hot from '../components/hot/Hot.vue'
import Wait from '../components/waitting/Waitting.vue'
import Billboard from '../components/billboard/Billboard.vue'
import Search from "../components/search/Search.vue"

Vue.use(Router)
const routes = [
  {path: '/hot', name: 'Hot', component: Hot},
  {path: '/wait', name: 'Wait', component: Wait},
  {path: '/billboard', name: 'Billboard', component: Billboard},
  {path:'/search',name:'Search',component:Search}
]

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes
})

