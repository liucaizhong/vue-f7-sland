const state = {
  conf_list: {}
}

const mutations = {
  initConf (state, payload) {
    state.conf_list = {...payload.data}
  },
  delConf (state, payload) {
    let data = {...state.conf_list}
    payload.forEach((cur) => {
      data[cur.key].splice(cur.idx, 1, undefined)
    })
    state.conf_list = {...data}
  }
}

export default {
  state,
  mutations
}
