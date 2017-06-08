const state = {
  userInfo: {
    userId: '',
    userName: '',
    password: ''
  }
}

const mutations = {
  initUser (state, payload) {
    state.userInfo = {...payload.data}
  }
}

export default {
  state,
  mutations
}
