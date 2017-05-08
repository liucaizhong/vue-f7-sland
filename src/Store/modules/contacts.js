const state = {}

const mutations = {
  initContacts (state, payload) {
    Object.assign(state, payload.contacts)
  },

  delContacts (state) {
    state = {}
  }
}

export default {
  state,
  mutations
}
