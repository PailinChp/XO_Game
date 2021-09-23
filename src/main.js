import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import History from './components/History'
import Game from './components/Game'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/Home', name:'home', component: Home
    },{
      path: '/History', name: 'history', component: History
    },{
      path: '/Game', name: 'game', component: Game
    }
  ]
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')