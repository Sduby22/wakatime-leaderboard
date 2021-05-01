import { createStore } from 'vuex'
import { login, register } from '../service/userService.js'

let state = { user: null }
let user = localStorage.getItem('user')
if (user) state.user = user

export default createStore({
  state,
  mutations: {
    loginSuccess(state, user) {
      state.user = user
    },
    loginFailure(state) {
      state.user = null
      localStorage.removeItem('user')
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('user')
    }
  },

  actions: {
    login({ commit }, user) {
      return login(user).then(user => {
        commit('loginSuccess', user)
      }).catch((e) => {
        commit('loginFailure')
        return Promise.reject(e)
      })
    },
    logout({ commit }) {
      commit('logout')
    },
    register({ commit }, user) {
      return register(user).then(e => { commit('loginSuccess', e) })
    }
  },
  modules: {
  }
})
