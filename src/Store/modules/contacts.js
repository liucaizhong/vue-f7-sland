let contact = {
  'A': [
    {
      'id': '0',
      'name': 'Aaron',
      'comp': '博时',
      'indus': '电子',
      'grade': '分析师',
      'phone': '13817134049'
    },
    {
      'id': '1',
      'name': 'Adam',
      'comp': '博时',
      'indus': '计算机',
      'grade': '分析师',
      'phone': '13817134049'
    },
    {
      'id': '2',
      'name': 'Abbie',
      'comp': '博时',
      'indus': '电子',
      'grade': '助理',
      'phone': '13817134049'
    }
  ],
  'B': [
    {
      'id': '3',
      'name': 'Aaron',
      'comp': '博时',
      'indus': '电子',
      'grade': '分析师',
      'phone': '13817134049'
    },
    {
      'id': '4',
      'name': 'Adam',
      'comp': '嘉实',
      'indus': '计算机',
      'grade': '分析师',
      'phone': '13817134049'
    },
    {
      'id': '5',
      'name': 'Abbie',
      'comp': '嘉实',
      'indus': '电子',
      'grade': '助理',
      'phone': '13817134049'
    }
  ],
  'C': [
    {
      'id': '3',
      'name': 'Aaron',
      'comp': '博时',
      'indus': '电子',
      'grade': '分析师',
      'phone': '13817134049'
    },
    {
      'id': '4',
      'name': 'Adam',
      'comp': '嘉实',
      'indus': '计算机',
      'grade': '分析师',
      'phone': '13817134049'
    },
    {
      'id': '5',
      'name': 'Abbie',
      'comp': '嘉实',
      'indus': '电子',
      'grade': '助理',
      'phone': '13817134049'
    }
  ],
  'D': [
    {
      'id': '3',
      'name': 'Aaron',
      'comp': '博时',
      'indus': '电子',
      'grade': '分析师',
      'phone': '13817134049'
    },
    {
      'id': '4',
      'name': 'Adam',
      'comp': '嘉实',
      'indus': '计算机',
      'grade': '分析师',
      'phone': '13817134049'
    },
    {
      'id': '5',
      'name': 'Abbie',
      'comp': '嘉实',
      'indus': '电子',
      'grade': '助理',
      'phone': '13817134049'
    }
  ]
}
const state = {
  contact: contact
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
