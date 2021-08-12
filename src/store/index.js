import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    doubleCount: (state) => {
      return state.count * 2
    },
  },
  mutations: {
    increment(state) {
      state.count++
    },
  },
  // Action 提交的是 mutation，而不是直接变更状态。
  // Action 可以包含任意异步操作。
  actions: {
    actionA() {
      console.log('action A')
    },

    asyncIncrement({ commit, dispatch }) {
      dispatch('actionA')
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
  },
})

export default store
