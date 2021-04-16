import { createStore } from 'vuex'
import { login, register } from '../service/userService.js'

let state = {user: null}
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
    }, 
    logout(state) {
      state.user = null
    }
  },
  actions: {
    login ({ commit }, user) {
      login(user).then( user => {
        commit('loginSuccess', user)
      })
      .catch(() => {
        console.log('login failed !')
        commit('loginFailure')
        })
    },

    logout({commit}) {
      commit('logout')
    },

    register ({dispatch}, user) {
      register(user).then(dispatch('login', user))
    }
  },
  modules: {
  }
})
