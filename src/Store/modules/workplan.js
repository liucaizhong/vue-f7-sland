import { PLANTYPES } from '../../constant.js'

let types = PLANTYPES
let preState = {}
types.forEach((cur) => {
  preState[cur] = {
    curPlan: [],
    bakPlan: [],
    willUpdPlan: [], //including insert, update, delete
  }
})
const state = {...preState}

const mutations = {
  init (state, payload) {
    for (let k in payload) {
      state[k].curPlan = [...payload[k]]
      state[k].bakPlan = [...payload[k]]
    }
  },
  save (state, payload) {
    // for test
    for(let type in state) {
      state[type].bakPlan = [...state[type].curPlan]
      state[type].willUpdPlan = []
    }
  },
  cancel (state) {
    for(let type in state) {
      state[type].curPlan = [...state[type].bakPlan]
      state[type].willUpdPlan = []
    }
  },
  prepare (state, payload) {
    let lastIdx = state[payload.type].bakPlan.length
    let curIdx = payload.idx || lastIdx
    if(payload.method === 'delete') {
      if(curIdx >= lastIdx) {
        state[payload.type].willUpdPlan.splice(curIdx, 1)
        state[payload.type].curPlan.splice(curIdx, 1)
      }
      else {
        state[payload.type].willUpdPlan[curIdx] = {...payload.data}
        state[payload.type].curPlan.splice(curIdx, 1, undefined)
      }
    }
    else if(payload.method === 'update') {
      state[payload.type].willUpdPlan[curIdx] = {...payload.data}
      state[payload.type].curPlan.splice(curIdx, 1, payload.data)
    }
    else {
      state[payload.type].willUpdPlan[curIdx] = {...payload.data}
      state[payload.type].curPlan.splice(curIdx, 0, payload.data)
    }
  }
}

export default {
  state,
  mutations
}
