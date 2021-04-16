import { createStore } from 'vuex'

let state = {}
let user = localStorage.getItem('user')
if (user) state={user}

export default createStore({
  state,
  mutations: {
  },
  actions: {
    login (_, user) {
      console.log(user)
    }
    register (_, user) {
      
    }
  },
  modules: {
  }
})
