const state = {
   contact: {}
}

const mutations = {
  initContact (state, payload) {
    state.contact = {...payload.data}
  }
}

export default {
  state,
  mutations
}
