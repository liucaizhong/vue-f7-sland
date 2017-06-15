import Vue from 'vue'
import Vuex from 'vuex'
import contacts from './modules/contacts'
import workplan from './modules/workplan'
import loginfo from './modules/loginfo'
import conference from './modules/conference'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'production',
  modules: {
    contacts,
    workplan,
    loginfo,
    conference,
  }
})
