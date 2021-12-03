import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from "../modules/auth.module"
import worktime from "../modules/worktime.module"


export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    worktime
  }
})
