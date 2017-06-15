<template lang="html">
<f7-page class="workplan-option">
  <f7-navbar sliding>
    <f7-nav-left>
      <f7-link back>
        <f7-icon icon="icon-back">
        </f7-icon>
        {{backTitle}}
      </f7-link>
    </f7-nav-left>
    <f7-nav-center>{{mainTitle}}</f7-nav-center>
  </f7-navbar>
  <f7-preloader v-show="loading" color="blue" size="25px" class="spinner">
  </f7-preloader>
  <div v-for="(value, key) in members">
    <f7-block-title>
      {{key}}
    </f7-block-title>
    <f7-block class="block-container">
      <div
        class="chip"
        v-for="item in value"
        @click="onNavTo($event, item.userId)"
      >
        <div class="chip-label">{{item.userName}}</div>
        <div class="chip-media" v-if="item.amount">
          <span class="badge">{{item.amount}}</span>
        </div>
      </div>
    </f7-block>
  </div>
</f7-page>
</template>

<script>
import { DEPARTMENTS } from '../constant.js'
import { DEPARTMENTSDESC } from '../constant.js'
import axios from 'axios'

export default {
  data () {
    return {
      mainTitle: '工作计划',
      backTitle: '返回',
      loading: true,
      deps: DEPARTMENTS,
      depsdesc: DEPARTMENTSDESC,
      members: {},
      comp: '1', //南土资产
      year: '',
      quarter: '',
      isDev: process.env.NODE_ENV === 'development',
    }
  },
  created () {
    // get loginfo
    // will move to home-page in the further
    let curUri = window.location.href
    curUri = 'http://slandasset.applinzi.com/workplan/index.html?code=chenjw'//for test
    console.log('curUri: '+curUri)
    let patt = /code=(.*)/g
    let userId = patt.exec(curUri)[1]
    console.log(userId)
    this.$store.commit('initUser', {
      userId: userId
    })
    // set current year and quarter
    let date = new Date()
    this.year = date.getFullYear()
    this.quarter = Math.floor(date.getMonth()/3)
    // axios to get members
    //params: array[dep1, dep2, ...]
    let url = process.env.NODE_ENV === 'production'
              ? 'http://slandasset.applinzi.com/workplan/API/getUsers.php'
              : 'http://localhost:3000/getemployees'

    axios.get(url,{
      params: {
        comp: this.comp,
        deps: this.deps.map((cur) => {
          return this.depsdesc[cur]
        }).join(','),
        year: this.year,
        quarter: this.quarter
      }
    })
    .then((response) => {
      let dataObj = response.data
      Object.assign(this.members, dataObj)
      this.loading = false
    })
    .catch((error) => {
      console.log(error)
    })
  },
  methods: {
    // onBack () {
      // if(this.isDev) {
        // this.$router.back()
      // }
      // else {
      //   window.location.href = '/index.php'
      // }
    // },
    onNavTo (e, userId) {
      console.log(userId)
      let router = this.$router || this.$f7.mainView.router
      router.load({
        url: '/workplan/' + userId
      })
    }
  }
}
</script>
