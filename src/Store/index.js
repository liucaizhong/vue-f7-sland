import Vue from 'vue'
import Vuex from 'vuex'
import contacts from './modules/contacts'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'production',
  modules: {
    contacts
  }
})
