import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: {},
    city: '',
    homeCode: ''
  },
  getters: {
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
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
