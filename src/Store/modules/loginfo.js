const state = {
  userInfo: {}
}

const mutations = {
  initUser (state, payload) {
    state.userInfo = {...payload}
  }
}

export default {
  state,
  mutations
}
