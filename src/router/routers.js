const Home = () => import('@/views/Home')
const Vuex = () => import('@/views/Vuex')
const routes = [
  {
    path: '/home',
    name: '首页',
    component: Home,
  },
  {
    path: '/vmodel',
    name: 'v-model',
    component: () => import('@/views/VModel'),
  },
  {
    path: '/vuex',
    name: 'vuex状态管理',
    component: Vuex,
  },
  {
    path: '/lifecycle',
    name: '组件生命周期',
    component: () => import('@/views/LifeCycle'),
  },
]

export default routes
