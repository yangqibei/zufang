import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: ''
    },
    city: {
      label: '北京',
      pinyin: 'beijing',
      short: 'bj',
      value: 'AREA|88cff55c-aaa4-e2e0'
    },
    homeCode: ''
  },
  getters: {
  },
  mutations: {
    setToken (state, payload) {
      state.user.token = payload
    },
    setCity (state, payload) {
      state.city = payload
    },
    setHomeCode (state, payload) {
      state.homeCode = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
