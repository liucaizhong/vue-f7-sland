<template lang="html">
<f7-page class="workplan-option">
  <f7-navbar sliding>
    <f7-nav-left>
      <f7-link @click="onBack">
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
        class="chip bg-blue"
        v-for="item in value"
        @click="onNavTo($event, item.userId)"
      >
        <div class="chip-label">{{item.userName}}</div>
        <div class="chip-media">
          <span class="badge color-red">{{item.amount}}</span>
        </div>
      </div>
    </f7-block>
  </div>
</f7-page>
</template>

<script>
import { DEPARTMENTS } from '../constant.js'
import { DEPARTMENTSDESC } from '../constant.js'

export default {
  data () {
    return {
      mainTitle: '工作计划',
      backTitle: '返回',
      loading: false,
      departments: DEPARTMENTS,
      members: {},
      isDev: process.env.NODE_ENV === 'development',
    }
  },
  created () {
    // axios to get members
    //params: array[dep1, dep2, ...]r
    // to do further
    Object.assign(this.members, {
      '研究部': [{
        userId: '001',
        userName: '刘1',
        amount: '1'
      },{
        userId: '002',
        userName: '刘2',
        amount: '2'
      },{
        userId: '003',
        userName: '刘3',
        amount: '3'
      },{
        userId: '004',
        userName: '刘4',
        amount: '4'
      },{
        userId: '005',
        userName: '刘5',
        amount: '5'
      },{
        userId: '006',
        userName: '刘6',
        amount: '6'
      },{
        userId: '007',
        userName: '刘7',
        amount: '7'
      },{
        userId: '008',
        userName: '刘8',
        amount: '8'
      },{
        userId: '009',
        userName: '刘9',
        amount: '9'
      }]
    })
  },
  methods: {
    onBack () {
      if(this.isDev) {
        this.$router.back()
      }
      else {
        window.location.href = '/index.php'
      }
    },
    onNavTo (e, userId) {
      console.log(userId)
      this.$router.load({
        url: '/workplan/' + userId
      })
    }
  }
}
</script>
