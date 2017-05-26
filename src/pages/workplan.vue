<template lang="html">
<f7-page class="workplan">
  <f7-navbar sliding>
    <f7-nav-left>
      <f7-link @click="onBack">
        <f7-icon v-show="!editing" icon="icon-back" class="m-r-7">
        </f7-icon>
        {{backTitle}}
      </f7-link>
    </f7-nav-left>
    <f7-nav-center>{{mainTitle}}</f7-nav-center>
    <f7-nav-right>
      <f7-link @click="onEdit">{{editTitle}}</f7-link>
    </f7-nav-right>
  </f7-navbar>
  <f7-preloader v-show="loading" color="blue" size="25px" class="spinner">
  </f7-preloader>
  <f7-block-title>筛选条件</f7-block-title>
  <f7-list form>
    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-back-on-select
      smart-select-open-in="picker"
      title="部门"
    >
      <!-- <f7-label>部门</f7-label> -->
      <select name="dep" v-model="dep">
        <!-- <option value="" data-default disabled>部门</option> -->
        <option value="0">投资部</option>
        <option value="1">研究部</option>
        <option value="2">固收部</option>
        <option value="3">投资2部</option>
        <option value="4">研究2部</option>
        <option value="5">固收2部</option>
      </select>
    </f7-list-item>

    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-back-on-select
      smart-select-open-in="picker"
      title="员工"
    >
      <!-- <f7-label>人员</f7-label> -->
      <select name="emp" v-model="emp">
        <!-- <option value="" data-default disabled>人员</option> -->
        <option value="0">刘一</option>
        <option value="1">刘二</option>
        <option value="2">刘三</option>
      </select>
    </f7-list-item>

    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-open-in="picker"
      title="年度"
    >
      <!-- <f7-label>年度</f7-label> -->
      <select name="year" v-model="year">
        <!-- <option value="" data-default disabled>年度</option> -->
        <option value="0">2016</option>
        <option value="1">2017</option>
        <option value="2">2018</option>
      </select>
    </f7-list-item>

    <f7-list-item
      smart-select
      smart-select-searchbar
      smart-select-searchbar-placeholder="搜索"
      smart-select-searchbar-cancel="取消"
      smart-select-open-in="picker"
      title="季度"
    >
      <!-- <f7-label>季度</f7-label> -->
      <select name="quarter" v-model="quarter">
        <!-- <option value="" data-default disabled>季度</option> -->
        <option value="0">第一季度</option>
        <option value="1">第二季度</option>
        <option value="2">第三季度</option>
        <option value="3">第四季度</option>
      </select>
    </f7-list-item>
  </f7-list>

  <f7-block-title>
    <f7-icon
      v-show="editing"
      f7="add_round_fill"
      class="m-r-7"
      size="22px"
      color="green">
    </f7-icon>
    调研计划
  </f7-block-title>
  <f7-list>
    <f7-list-item
      v-for="(value, key) in items"
      :title="'Item ' + value"
      :link="'/resplan'"
      class="li-transition">
      <div slot="media" @touchstart.prevent.stop="onDel($event)">
        <f7-icon
          v-show="editing"
          f7="delete_round_fill"
          class="m-r-7"
          size="22px"
          color="red"
        >
        </f7-icon>
      </div>
      <div
        slot="root"
        class="delete-btn"
        @touchstart.stop="onConfirmDel($event)"
        :data-idx="key"
        :data-arr="'resplan'"
      >
        删除
      </div>
    </f7-list-item>
  </f7-list>

  <f7-block-title>
    <f7-icon
      v-show="editing"
      f7="add_round_fill"
      class="m-r-7"
      size="22px"
      color="green">
    </f7-icon>
    个股报告计划
  </f7-block-title>
  <f7-list>
    <f7-list-item
      v-for="item in items"
      :title="'Item ' + item"
      :link="'/'+item">
      <div slot="media">
        <f7-icon
          v-show="editing"
          f7="delete_round_fill"
          class="m-r-7"
          size="22px"
          color="red">
        </f7-icon>
      </div>
    </f7-list-item>
  </f7-list>
  <f7-block-title>
    <f7-icon
      v-show="editing"
      f7="add_round_fill"
      class="m-r-7"
      size="22px"
      color="green">
    </f7-icon>
    行业报告计划
  </f7-block-title>
  <f7-list>
    <f7-list-item
      v-for="item in items"
      :title="'Item ' + item"
      :link="'/'+item">
      <div slot="media">
        <f7-icon
          v-show="editing"
          f7="delete_round_fill"
          class="m-r-7"
          size="22px"
          color="red">
        </f7-icon>
      </div>
    </f7-list-item>
  </f7-list>
</f7-page>
</template>

<script>
export default {
  data () {
    return {
      mainTitle: '工作计划',
      loading: false,
      dep: '',
      emp: '',
      year: '',
      quarter: '',
      editing: false,
      deleting: false,
      items: [1, 2, 3, 4, 5]
    }
  },
  created () {
    let $$ = this.$$
    $$(document).on('touchstart', (e)=>{
      let delLi = $$("li.li-transition[style='transform: translateX(-60px);']")
      let isDelBtn = $$(e.target).hasClass('delete-btn')
      if(!isDelBtn && delLi.length) {
        e.preventDefault()
        e.stopImmediatePropagation()
        Array.prototype.forEach.call(delLi, (cur)=>{
          cur.style.transform = 'translateX(0)'
        })
      }
    }, {
      capture: true,
      passive: false
    })
  },
  computed: {
    backTitle: function () {
      return this.editing ? '取消' : '返回'
    },
    editTitle: function () {
      return this.editing ? '保存' : '编辑'
    },
  },
  methods: {
    onEdit () {
      this.editing = !this.editing
    },
    onBack () {
      if(this.editing) {
        this.editing = !this.editing
      }
      else {
        this.$router.back()
      }
    },
    onDel (e) {
      let parentLi = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
      parentLi.style.transform = 'translateX(-60px)'
    },
    onConfirmDel (e) {
      let delLi = e.target.parentElement
      let delUl = delLi.parentElement
      let index = e.target.getAttribute('data-idx')
      let delPromise = new Promise((resolve, reject)=>{
        delLi.setAttribute('class', 'animated fadeOutLeft')
        setTimeout(()=>{
          resolve()
        }, 300)
      })
      delPromise.then(()=>{
        delLi.removeAttribute('class')
        delLi.setAttribute('class', 'li-transition')
        delLi.style.transform = 'translateX(0px)'
        this.items.splice(index, 1)
      })
    }
  }
}
</script>
