const state = {
   contact: {}
}

const mutations = {
  updateContacts (state, payload) {
    let willUpdateDetail = payload.willUpdateDetail
    let group = Object.keys(willUpdateDetail)[0]
    let updateObj = willUpdateDetail[group]
    state.contact[group].forEach((el) => {
      if(el.id === updateObj.id) {
        Object.assign(el, updateObj)
      }
    })
  },

  addContact (state, payload) {
    state.contact = {...state.contact, [payload.key]: payload.data }
  },

  initContact (state, payload) {
    state.contact = {...payload.data}
  },

  delContact (state, payload) {
    state.contact[payload.key].forEach((cur, i, arr) => {
      if(cur.id === payload.id) {
        arr.splice(i,1)
      }
    })
  }
}

export default {
  state,
  mutations
}
